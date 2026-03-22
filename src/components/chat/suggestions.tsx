"use client";

import { LayoutPanelLeft } from "lucide-react";
import { useChat } from "@/store";

const EXAMPLE_PROMPTS = [
  {
    title: "The Amazonian Empire",
    prompt:
      "Tell me the story of how an e-commerce giant like Amazon handles millions of orders. Where do we start?",
  },
  {
    title: "The Global Whisperer",
    prompt:
      "How does a message travel across the world in a social network like Twitter? I want to hear the story of a Tweet.",
  },
  {
    title: "The Map Maker",
    prompt:
      "Explain the magic behind a URL shortener. How does a tiny link find its way home?",
  },
];

export default function Suggestions() {
  const { setInput } = useChat();

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-stone-500 p-4">
      <div className="flex flex-col items-center space-y-4 mb-10">
        <LayoutPanelLeft
          size={48}
          strokeWidth={1.5}
          className="text-stone-700"
        />
        <p className="text-center max-w-md text-stone-400">
          Welcome to the Storyteller's Studio. Choose a system to explore, and
          we'll build the story together.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {EXAMPLE_PROMPTS.map((example, i) => (
          <button
            key={i}
            onClick={() => handleExampleClick(example.prompt)}
            className="p-5 bg-stone-900 border border-stone-800 rounded-2xl hover:border-stone-600 hover:bg-stone-800 hover:shadow-md transition-all text-left flex flex-col space-y-2 group"
          >
            <span className="font-semibold text-stone-300 group-hover:text-stone-100">
              {example.title}
            </span>
            <span className="text-xs text-stone-400 leading-relaxed">
              {example.prompt}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
