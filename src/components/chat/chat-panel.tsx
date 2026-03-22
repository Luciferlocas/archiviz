"use client";

import { useCallback } from "react";
import ChatMessages from "./messages";
import PromptInput from "./prompt-input";
import DiagramPanel from "./diagram-panel";
import { useChat } from "@/store";
import { Message } from "@/lib/types";

export default function ChatPanel() {
  const {
    messages,
    input,
    isLoading,
    activeDiagram,
    preferences,
    addMessage,
    updateLastMessage,
    setInput,
    setIsLoading,
    setActiveDiagram,
  } = useChat();

  const extractMermaid = (text: string) => {
    const regex = /```mermaid\n([\s\S]*?)```/g;
    let match;
    const diagrams = [];
    while ((match = regex.exec(text)) !== null) {
      diagrams.push(match[1]);
    }
    return diagrams;
  };

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input,
    };

    addMessage(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          preferences,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let modelMessageAdded = false;
      const modelMessageId = (Date.now() + 1).toString();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        const diagrams = extractMermaid(accumulatedText);

        if (!modelMessageAdded) {
          modelMessageAdded = true;
          addMessage({
            id: modelMessageId,
            role: "model",
            text: accumulatedText,
            diagrams: diagrams.length > 0 ? diagrams : undefined,
          });
        } else {
          updateLastMessage(
            accumulatedText,
            diagrams.length > 0 ? diagrams : undefined
          );
        }

        if (diagrams.length > 0) {
          setActiveDiagram(diagrams[diagrams.length - 1]);
        }
      }
    } catch (error) {
      console.error("Error generating response:", error);
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "model") {
        updateLastMessage(
          lastMessage.text +
            "\n\n**Error:** Connection lost or stream interrupted. Please try again."
        );
      } else {
        addMessage({
          id: (Date.now() + 1).toString(),
          role: "model",
          text: "Sorry, I encountered an error while processing your request. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    input,
    isLoading,
    messages,
    preferences,
    addMessage,
    updateLastMessage,
    setInput,
    setIsLoading,
    setActiveDiagram,
  ]);

  return (
    <div className="flex h-screen bg-stone-950 text-stone-200 font-sans overflow-hidden">
      <div
        className={`flex flex-col h-full transition-all duration-500 ease-in-out ${activeDiagram ? "w-1/2 border-r border-stone-800" : "w-full max-w-4xl mx-auto"}`}
      >
        <ChatMessages />
        <PromptInput onSend={handleSend} />
      </div>
      <DiagramPanel />
    </div>
  );
}
