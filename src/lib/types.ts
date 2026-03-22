export type Tone = "technical" | "storyteller" | "buddy";

export type Preferences = {
  language: string;
  age: string;
  tone: Tone;
};

export type Message = {
  id: string;
  role: "user" | "model";
  text: string;
  diagrams?: string[];
};
