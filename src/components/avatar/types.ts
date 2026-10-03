export type AvatarState =
  | "idle"
  | "greeting"
  | "listening"
  | "understanding"
  | "thinking"
  | "talking"
  | "celebrating"
  | "concerned"
  | "goodbye";
export type AvatarMood = "neutral" | "happy" | "empathetic" | "encouraging" | "curious";

export const MOODS: AvatarMood[] = ["neutral", "happy", "empathetic", "encouraging", "curious"];

/** Model replies start with a hidden tag like [[mood:empathetic]]. */
export function parseMood(text: string): { mood: AvatarMood | null; clean: string } {
  const m = text.match(/^\s*\[\[mood:(\w+)\]\]\s*/);
  if (!m) {
    // hide a partially streamed tag
    if (/^\s*\[\[?m?o?o?d?:?\w*$/.test(text)) return { mood: null, clean: "" };
    return { mood: null, clean: text };
  }
  const tag = m[1] ?? "";
  const mood = (MOODS as string[]).includes(tag) ? (tag as AvatarMood) : "neutral";
  return { mood, clean: text.slice(m[0].length) };
}
