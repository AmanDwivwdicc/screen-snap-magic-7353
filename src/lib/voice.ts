/** Browser voice helpers (Web Speech API). Add languages to LANGUAGES to extend. */
export const LANGUAGES = [
  { code: "en", label: "English", speech: "en-IN" },
  { code: "hi", label: "हिन्दी", speech: "hi-IN" },
] as const;
export type LangCode = (typeof LANGUAGES)[number]["code"];

export function speechLocale(code: LangCode) {
  return LANGUAGES.find((l) => l.code === code)?.speech ?? "en-IN";
}

type Rec = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
};

export function createRecognizer(): Rec | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

export function stripForSpeech(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[*_#>`~]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .trim();
}

export function speak(text: string, code: LangCode, handlers: { onStart?: () => void; onEnd?: () => void }) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    handlers.onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(stripForSpeech(text));
  const locale = speechLocale(code);
  u.lang = locale;
  const voices = window.speechSynthesis.getVoices();
  const v =
    voices.find((x) => x.lang === locale && /female|google/i.test(x.name)) ??
    voices.find((x) => x.lang === locale) ??
    voices.find((x) => x.lang.startsWith(code));
  if (v) u.voice = v;
  u.rate = 1;
  u.pitch = 1.05;
  u.onstart = () => handlers.onStart?.();
  u.onend = () => handlers.onEnd?.();
  u.onerror = () => handlers.onEnd?.();
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}
