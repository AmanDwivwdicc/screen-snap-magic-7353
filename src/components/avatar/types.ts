export type AvatarState = "idle" | "listening" | "thinking" | "talking";
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
  const mood = (MOODS as string[]).includes(m[1]) ? (m[1] as AvatarMood) : "neutral";
  return { mood, clean: text.slice(m[0].length) };
}
