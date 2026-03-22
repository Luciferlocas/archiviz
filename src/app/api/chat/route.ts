import { GoogleGenAI } from "@google/genai";
import { type Preferences } from "@/lib/types";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

interface ChatRequest {
  messages: Array<{ role: string; text: string }>;
  preferences: Preferences;
}

function getSystemInstruction(prefs: Preferences) {
  const { language, age, tone } = prefs;

  let baseInstruction = `You are a world-class System Design Architect. The user is ${age} years old and their native language is ${language}. 
Always include a Mermaid.js diagram to visually represent the architecture or flow you are explaining. Wrap the mermaid code in \`\`\`mermaid ... \`\`\` blocks.
Use standard mermaid flowchart (graph TD or LR) or sequenceDiagram syntax. Keep it simple and comprehensive.`;

  if (tone === "technical") {
    return `${baseInstruction}
**Tone: Technical**. Provide direct, professional, and highly technical answers. Focus on efficiency, scalability, and industry standards. No fluff, just architecture.`;
  } else if (tone === "storyteller") {
    return `${baseInstruction}
**Tone: Storyteller**. Explain concepts using engaging stories and analogies. 
1. **Interactive Flow**: Do not provide the entire solution immediately. Start by acknowledging the user's request, then ask how deep they want to go. Ask if they want a high-level "Grand Tour" or to dive deep into a specific "Chapter".
2. **Technical Vocabulary**: While using simple language, always introduce and use the correct technical terms so the user learns the professional vocabulary for the long term.`;
  } else {
    return `${baseInstruction}
**Tone: Buddy**. Talk like a close friend or "buddy". Use the user's native language (${language}) intermittently in your response (e.g., if Hindi, use phrases like "arre yaar samhaj meri baat aise hota hai"). 
Keep the user engaged, be informal, but still teach them the correct technical terms. Make it feel like a casual conversation over coffee.`;
  }
}

export async function POST(request: Request) {
  try {
    const { messages, preferences }: ChatRequest = await request.json();

    const contents = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const responseStream = await ai.models.generateContentStream({
            model: "gemini-3.1-pro-preview",
            contents: contents as any,
            config: {
              systemInstruction: getSystemInstruction(preferences),
            },
          });

          for await (const chunk of responseStream) {
            const text = chunk.text || "";
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
            }
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
