"use client";

import { Send } from "lucide-react";
import { useChat } from "@/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import PreferencesDialog from "./preferences";

export default function PromptInput({ onSend }: { onSend: () => void }) {
  const { input, isLoading, setInput } = useChat();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4">
      <div className="relative flex items-center max-w-4xl mx-auto">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a system design question..."
          className="w-full pr-14 pb-14 max-h-40 rounded-xl"
          rows={4}
        />
        <div className="absolute right-2 bottom-2 rounded-lg flex gap-2">
          <PreferencesDialog />
          <Button
            onClick={onSend}
            disabled={!input.trim() || isLoading}
            size="icon"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
