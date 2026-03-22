import { create } from "zustand";
import { Message, Preferences } from "@/lib/types";

interface ChatStore {
  messages: Message[];
  input: string;
  isLoading: boolean;
  activeDiagram: string | null;
  preferences: Preferences;
  addMessage: (message: Message) => void;
  updateLastMessage: (text: string, diagrams?: string[]) => void;
  setInput: (input: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setActiveDiagram: (diagram: string | null) => void;
  setPreferences: (preferences: Preferences) => void;
  clearMessages: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  input: "",
  isLoading: false,
  activeDiagram: null,
  preferences: {
    language: "English",
    age: "25",
    tone: "storyteller",
  },

  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  updateLastMessage: (text: string, diagrams?: string[]) =>
    set((state) => {
      const updatedMessages = [...state.messages];
      if (updatedMessages.length > 0) {
        updatedMessages[updatedMessages.length - 1] = {
          ...updatedMessages[updatedMessages.length - 1],
          text,
          diagrams,
        };
      }
      return { messages: updatedMessages };
    }),

  setInput: (input: string) => set({ input }),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  setActiveDiagram: (diagram: string | null) => set({ activeDiagram: diagram }),

  setPreferences: (preferences: Preferences) => set({ preferences }),

  clearMessages: () => set({ messages: [] }),
}));

export const useChat = () => useChatStore();
