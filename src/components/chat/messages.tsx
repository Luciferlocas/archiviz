"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useChat } from "@/store";
import Suggestions from "./suggestions";
import MessageBubble from "./message-bubble";
import { ScrollArea } from "../ui/scroll-area";

export default function ChatMessages() {
  const { messages, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1 overflow-y-auto p-4 bg-stone-950">
      <div className="flex flex-col gap-4">
        {messages.length === 0 && <Suggestions />}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && (
            <div className="flex justify-start">
              <div className="bg-stone-900 border border-stone-800 shadow-sm rounded-xl px-3 py-2 flex items-center space-x-3">
                <Loader2 className="animate-spin text-stone-500" size={20} />
                <span className="text-stone-400 text-sm font-medium">
                  Architecting solution...
                </span>
              </div>
            </div>
          )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
