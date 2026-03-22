"use client";

import { PenTool } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Message } from "@/lib/types";
import { useChat } from "@/store";

export default function MessageBubble({ message }: { message: Message }) {
  const { setActiveDiagram } = useChat();

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-xl px-3 py-2 bg-stone-700 text-white shadow-md">
          <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-xl px-3 py-2 bg-stone-900 border border-stone-800 shadow-sm">
        <div className="prose prose-invert prose-stone prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-stone-950 prose-pre:border prose-pre:border-stone-800">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                if (!inline && match && match[1] === "mermaid") {
                  const codeContent = String(children).replace(/\n$/, "");
                  return (
                    <div
                      className="my-4 p-4 bg-stone-950 rounded-xl border border-stone-800 flex flex-col items-center justify-center cursor-pointer hover:bg-stone-800 hover:border-stone-700 transition-all group"
                      onClick={() => setActiveDiagram(codeContent)}
                    >
                      <div className="w-12 h-12 bg-stone-900 border border-stone-700 rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <PenTool size={20} className="text-stone-400" />
                      </div>
                      <p className="text-sm font-medium text-stone-300 mb-1">
                        Mermaid Diagram Generated
                      </p>
                      <p className="text-xs text-stone-500">
                        Click to view in panel
                      </p>
                    </div>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
