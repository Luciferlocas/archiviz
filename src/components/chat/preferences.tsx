"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/store";
import type { Tone } from "@/lib/types";

export default function PreferencesDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences, setPreferences } = useChat();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({ ...preferences, language: e.target.value });
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({ ...preferences, age: e.target.value });
  };

  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferences({ ...preferences, tone: e.target.value as Tone });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Settings size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-stone-900 border-stone-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-stone-100">
            <Settings size={20} className="text-stone-400" />
            Architect Settings
          </DialogTitle>
          <DialogDescription className="text-stone-400">
            Customize your architect experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-400">
              Native Language
            </label>
            <Input
              type="text"
              value={preferences.language}
              onChange={handleLanguageChange}
              placeholder="e.g., Hindi, Kannada, Spanish"
              className="bg-stone-950 border-stone-800 text-stone-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-400">
              Your Age
            </label>
            <Input
              type="number"
              value={preferences.age}
              onChange={handleAgeChange}
              className="bg-stone-950 border-stone-800 text-stone-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-400">
              AI Persona Tone
            </label>
            <select
              value={preferences.tone}
              onChange={handleToneChange}
              className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-lg focus:border-stone-600 outline-none text-stone-200 transition-all appearance-none cursor-pointer"
            >
              <option value="technical">
                Technical (Direct & Professional)
              </option>
              <option value="storyteller">
                Storyteller (Interactive & Analogies)
              </option>
              <option value="buddy">Buddy (Casual & Multilingual)</option>
            </select>
          </div>
        </div>

        <Button
          onClick={() => setIsOpen(false)}
          className="w-full bg-stone-200 text-stone-900 hover:bg-white"
        >
          Save Preferences
        </Button>
      </DialogContent>
    </Dialog>
  );
}
