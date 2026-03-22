# 🏗️ Archiviz — System Design Visualizer

**Learn system design interactively with AI-powered explanations and auto-generated architecture diagrams.**

Archiviz is a conversational AI tool that helps you understand real-world system architectures — from URL shorteners to e-commerce platforms — through natural dialogue and hand-drawn style Mermaid.js diagrams you can zoom, pan, and explore.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Gemini](https://img.shields.io/badge/Gemini_AI-3.1_Pro-blue?logo=google)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

---

## 💡 Why I Built This

I'm from the same field — software engineering — and I've seen firsthand how **system design** has become one of the most important skills to learn, whether you're preparing for interviews, building scalable products, or simply trying to understand how the tech you use every day actually works under the hood.

The problem? System design is inherently visual and complex. Reading walls of text about load balancers, message queues, and database sharding only gets you so far. What really makes things click is **seeing the architecture** — the flow of data, the connections between services, the big picture.

That's the idea behind Archiviz: **use AI to explain pre-existing systems while generating architecture diagrams in real-time**. Instead of passively reading documentation, you have a conversation. You ask questions, the AI walks you through the design, and a live diagram builds itself right next to the explanation. It's interactive, visual, and — most importantly — it makes learning system design genuinely enjoyable.

---

## ✨ Features

- **AI-Powered Conversations** — Chat with Google Gemini AI to explore any system design topic, from microservices to CDNs.
- **Auto-Generated Diagrams** — Every response includes Mermaid.js architecture diagrams that render automatically in a side panel.
- **Interactive Diagram Playground** — Zoom in, zoom out, pan, pinch, reset, and fit-to-view. Double-click to reset. Full control over the diagram canvas.
- **3 AI Persona Tones**:
  - 🔧 **Technical** — Direct, professional, no-nonsense architecture breakdowns.
  - 📖 **Storyteller** — Engaging narratives with analogies that make complex systems feel like stories.
  - 🤝 **Buddy** — Casual, multilingual explanations that feel like chatting with a friend over coffee.
- **Personalized Experience** — Set your native language, age, and preferred tone so the AI adapts its explanations to you.
- **Streaming Responses** — Responses stream in real-time, so you see the explanation build word by word.
- **Hand-Drawn Diagram Style** — Diagrams use a sketched, hand-drawn aesthetic that feels approachable and less intimidating.
- **Split-Panel Layout** — Chat on the left, diagram on the right. Seamless, distraction-free learning.

---

## 🔍 How It Works

Archiviz follows a simple but effective flow:

```
User asks a question
        ↓
  Next.js API route receives the request
        ↓
  Google Gemini AI generates a response
  (with Mermaid.js diagram code embedded)
        ↓
  Response streams back to the client in real-time
        ↓
  Chat panel renders the markdown explanation
  Diagram panel extracts and renders the Mermaid code
        ↓
  User explores the diagram with zoom/pan controls
```

### Architecture Overview

1. **Chat Interface** — A responsive chat UI where users type system design questions. Starter prompts are provided for quick exploration.
2. **API Layer** — A Next.js API route (`/api/chat`) sends the conversation history along with user preferences to Google Gemini AI with a tailored system prompt based on the selected tone.
3. **Streaming** — The Gemini response streams back as chunks, updating the chat and diagram in real-time for a fluid experience.
4. **Diagram Extraction** — Mermaid code blocks are extracted from the AI response on the fly. The latest diagram is rendered in the side panel using Mermaid.js.
5. **Interactive Canvas** — The diagram panel wraps the rendered SVG in a zoom/pan/pinch container, giving full control to explore complex architectures.
6. **State Management** — Zustand manages global state (messages, active diagram, preferences) for clean, predictable data flow across components.

---

## 🛠️ Tech Stack

| Layer         | Technology                                                       |
| ------------- | ---------------------------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org/) (App Router)                  |
| Language      | [TypeScript](https://www.typescriptlang.org/)                   |
| AI Model      | [Google Gemini 3.1 Pro](https://ai.google.dev/)                 |
| Diagrams      | [Mermaid.js](https://mermaid.js.org/)                           |
| Styling       | [Tailwind CSS 4](https://tailwindcss.com/)                      |
| UI Components | [Radix UI](https://www.radix-ui.com/) / shadcn                  |
| State         | [Zustand](https://zustand-demo.pmnd.rs/)                        |
| Animations    | [Framer Motion](https://www.framer.com/motion/)                 |
| Zoom/Pan      | [react-zoom-pan-pinch](https://github.com/BetterTyped/react-zoom-pan-pinch) |
| Package Mgr   | [pnpm](https://pnpm.io/)                                        |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **pnpm** installed globally (`npm install -g pnpm`)
- A **Google Gemini API key** ([get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/archiviz.git
   cd archiviz
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root:

   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000) and start exploring system designs.

---
