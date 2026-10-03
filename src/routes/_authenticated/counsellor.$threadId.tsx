import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Square,
  RotateCcw,
  Plus,
  MessagesSquare,
  LogOut,
  Trash2,
  Languages,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { MentorAvatar } from "@/components/avatar/MentorAvatar";
import { parseMood, type AvatarMood, type AvatarState } from "@/components/avatar/types";
import { LANGUAGES, createRecognizer, speak, speechLocale, stopSpeaking, type LangCode } from "@/lib/voice";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/counsellor/$threadId")({
  head: () => ({
    meta: [
      { title: "Talk to Saathi — CareerSaathi" },
      { name: "description", content: "Talk with Saathi, your AI career mentor, by voice or text." },
      { property: "og:title", content: "Talk to Saathi — CareerSaathi" },
      { property: "og:description", content: "Talk with Saathi, your AI career mentor, by voice or text." },
    ],
  }),
  component: CounsellorPage,
});

type ThreadRow = { id: string; title: string; updated_at: string };

function useThreads() {
  return useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("threads")
        .select("id,title,updated_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data as ThreadRow[];
    },
  });
}

function CounsellorPage() {
  const { threadId } = Route.useParams();
  const { data: initial, isLoading, error } = useQuery({
    queryKey: ["messages", threadId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("sdk_id, role, parts")
        .eq("thread_id", threadId)
        .order("created_at");
      if (error) throw error;
      return (data ?? []).map((r) => ({ id: r.sdk_id, role: r.role, parts: r.parts }) as unknown as UIMessage);
    },
    staleTime: Infinity,
  });

  return (
    <div className="flex h-dvh flex-col bg-background">
      <TopBar threadId={threadId} />
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Shimmer>Getting Saathi ready…</Shimmer>
        </div>
      ) : error ? (
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          Couldn't open this conversation.
        </div>
      ) : (
        <Session key={threadId} threadId={threadId} initial={initial ?? []} />
      )}
    </div>
  );
}

function TopBar({ threadId }: { threadId: string }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: threads } = useThreads();
  const [open, setOpen] = useState(false);

  async function newThread() {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const { data, error } = await supabase.from("threads").insert({ user_id: u.user.id }).select("id").single();
    if (error) return toast.error("Couldn't start a new conversation");
    await qc.invalidateQueries({ queryKey: ["threads"] });
    setOpen(false);
    navigate({ to: "/counsellor/$threadId", params: { threadId: data.id } });
  }

  async function remove(id: string) {
    const { error } = await supabase.from("threads").delete().eq("id", id);
    if (error) return toast.error("Couldn't delete");
    await qc.invalidateQueries({ queryKey: ["threads"] });
    if (id === threadId) navigate({ to: "/counsellor" });
  }

  return (
    <header className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3 md:px-6">
      <div className="flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Your conversations">
              <MessagesSquare />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-sidebar p-0">
            <SheetHeader className="border-b border-border p-5">
              <SheetTitle className="font-display text-2xl font-normal">Your conversations</SheetTitle>
            </SheetHeader>
            <div className="p-3">
              <Button onClick={newThread} className="w-full rounded-full">
                <Plus /> New conversation
              </Button>
            </div>
            <ul className="space-y-1 overflow-y-auto px-3 pb-6">
              {threads?.map((t) => (
                <li
                  key={t.id}
                  className={cn(
                    "group flex items-center gap-1 rounded-xl pr-1 transition-colors hover:bg-sidebar-accent",
                    t.id === threadId && "bg-sidebar-accent",
                  )}
                >
                  <Link
                    to="/counsellor/$threadId"
                    params={{ threadId: t.id }}
                    onClick={() => setOpen(false)}
                    className="min-w-0 flex-1 truncate px-3 py-2.5 text-sm text-sidebar-foreground"
                  >
                    {t.title}
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="opacity-0 group-hover:opacity-100"
                    aria-label="Delete conversation"
                    onClick={() => remove(t.id)}
                  >
                    <Trash2 />
                  </Button>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
        <Link to="/" className="font-display text-xl text-foreground md:text-2xl">CareerSaathi</Link>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="rounded-full" onClick={newThread}>
          <Plus /> <span className="hidden sm:inline">New</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Sign out"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
        >
          <LogOut />
        </Button>
      </div>
    </header>
  );
}

const SUGGESTIONS = [
  "I like computers but my parents want me to do a normal degree.",
  "Which jobs can I get after an ITI course?",
  "My family worries about salary and safety. Help!",
];

function textOf(m: UIMessage) {
  return m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
}

function Session({ threadId, initial }: { threadId: string; initial: UIMessage[] }) {
  const qc = useQueryClient();
  const [lang, setLang] = useState<LangCode>("en");
  const langRef = useRef(lang);
  langRef.current = lang;
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [input, setInput] = useState("");
  const recRef = useRef<ReturnType<typeof createRecognizer>>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        headers: async (): Promise<Record<string, string>> => {
          const { data } = await supabase.auth.getSession();
          const token = data.session?.access_token;
          return token ? { Authorization: `Bearer ${token}` } : {};
        },
        body: () => ({ threadId, lang: langRef.current }),
      }),
    [threadId],
  );

  const { messages, sendMessage, status, stop } = useChat({
    id: threadId,
    messages: initial,
    transport,
    onError: (e) => toast.error(e.message || "Saathi couldn't answer. Please try again."),
    onFinish: ({ message }) => {
      qc.invalidateQueries({ queryKey: ["threads"] });
      qc.setQueryData(["messages", threadId], undefined);
      if (!mutedRef.current) {
        const { clean } = parseMood(textOf(message));
        if (clean) speak(clean, langRef.current, { onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false) });
      }
    },
  });
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  const busy = status === "submitted" || status === "streaming";
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const lastParsed = lastAssistant ? parseMood(textOf(lastAssistant)) : null;
  const mood: AvatarMood = lastParsed?.mood ?? "happy";
  const streamingHasText = status === "streaming" && messages.at(-1)?.role === "assistant" && !!lastParsed?.clean;

  const avatarState: AvatarState = listening
    ? "listening"
    : speaking || (muted && streamingHasText)
      ? "talking"
      : busy
        ? "thinking"
        : "idle";

  const send = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t || busy) return;
      stopSpeaking();
      setSpeaking(false);
      sendMessage({ text: t });
      setInput("");
    },
    [busy, sendMessage],
  );

  useEffect(() => () => {
    stopSpeaking();
    recRef.current?.stop();
  }, []);

  function toggleMic() {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const rec = createRecognizer();
    if (!rec) {
      toast("Voice input isn't supported in this browser — you can type instead.");
      return;
    }
    stopSpeaking();
    setSpeaking(false);
    rec.lang = speechLocale(lang);
    rec.interimResults = true;
    rec.continuous = false;
    let finalText = "";
    rec.onresult = (e) => {
      let txt = "";
      for (let i = 0; i < e.results.length; i++) {
        txt += e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText = txt;
      }
      setInterim(txt);
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed") toast.error("Please allow microphone access to talk to Saathi.");
    };
    rec.onend = () => {
      setListening(false);
      setInterim("");
      if (finalText) send(finalText);
    };
    recRef.current = rec;
    setListening(true);
    rec.start();
  }

  function replay() {
    if (!lastParsed?.clean) return;
    speak(lastParsed.clean, lang, { onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false) });
  }

  const statusLabel =
    avatarState === "listening"
      ? "I'm listening…"
      : avatarState === "thinking"
        ? "Thinking…"
        : avatarState === "talking"
          ? "Speaking"
          : "Tap to speak";

  return (
    <div className="flex min-h-0 flex-1 flex-col md:flex-row">
      {/* Stage */}
      <section className="relative flex h-[45dvh] shrink-0 flex-col bg-stage-gradient md:h-auto md:w-[55%]">
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 md:left-6 md:top-6">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-stage-foreground">
            <span className={cn("size-2 rounded-full", avatarState === "idle" ? "bg-primary" : "bg-saffron")} />
            Saathi · {statusLabel}
          </span>
        </div>
        <div className="absolute right-4 top-4 z-10 md:right-6 md:top-6">
          <label className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-stage-foreground">
            <Languages className="size-3.5" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as LangCode)}
              className="bg-transparent outline-none"
              aria-label="Language"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="relative min-h-0 flex-1">
          <MentorAvatar
            state={avatarState}
            mood={mood}
            className="absolute inset-x-0 bottom-0 mx-auto h-[92%] max-w-[520px]"
          />
        </div>

        {/* voice dock */}
        <div className="absolute inset-x-0 bottom-3 z-10 flex flex-col items-center gap-2 md:bottom-8">
          {interim && (
            <p className="glass max-w-[80%] rounded-2xl px-4 py-2 text-center text-sm text-foreground animate-float-up">
              “{interim}”
            </p>
          )}
          <div className="glass flex items-center gap-2 rounded-full p-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label={muted ? "Unmute Saathi" : "Mute Saathi"}
              onClick={() => {
                if (!muted) stopSpeaking(), setSpeaking(false);
                setMuted(!muted);
              }}
            >
              {muted ? <VolumeX /> : <Volume2 />}
            </Button>
            <button
              onClick={toggleMic}
              aria-label={listening ? "Stop listening" : "Tap to speak"}
              className={cn(
                "relative flex h-14 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors",
                listening ? "bg-saffron text-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              {listening && <span className="animate-ring-pulse absolute inset-0 rounded-full bg-saffron" />}
              <span className="relative flex items-center gap-2">
                {listening ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                {listening || speaking ? <Waveform /> : <span className="hidden sm:inline">Tap to speak</span>}
              </span>
            </button>
            {speaking ? (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Stop speaking"
                onClick={() => {
                  stopSpeaking();
                  setSpeaking(false);
                }}
              >
                <Square />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Replay last answer"
                disabled={!lastParsed?.clean || busy}
                onClick={replay}
              >
                <RotateCcw />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Conversation */}
      <section className="flex min-h-0 flex-1 flex-col border-border/60 md:border-l">
        <Conversation className="min-h-0 flex-1">
          <ConversationContent className="mx-auto w-full max-w-2xl gap-5 px-4 py-6 md:px-8">
            {messages.length === 0 && (
              <div className="animate-float-up space-y-5 pt-4">
                <p className="font-display text-3xl leading-tight text-foreground md:text-4xl">
                  Hey! 👋 What are you thinking about these days?
                </p>
                <p className="text-sm text-muted-foreground">
                  Tell me what you enjoy, what worries you, or what your family wants. We'll figure it out together.
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm text-card-foreground transition-colors hover:border-primary/40 hover:bg-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m) => {
              const raw = textOf(m);
              const text = m.role === "assistant" ? parseMood(raw).clean : raw;
              if (!text) return null;
              return (
                <Message key={m.id} from={m.role} className="animate-float-up">
                  <MessageContent
                    className={cn(
                      "text-[15px] leading-relaxed",
                      m.role === "user" && "group-[.is-user]:rounded-2xl group-[.is-user]:rounded-br-sm group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground",
                    )}
                  >
                    {m.role === "assistant" ? <MessageResponse>{text}</MessageResponse> : text}
                  </MessageContent>
                </Message>
              );
            })}
            {busy && !streamingHasText && (
              <Shimmer className="text-sm">Saathi is thinking…</Shimmer>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="mx-auto w-full max-w-2xl px-4 pb-4 md:px-8 md:pb-6">
          <PromptInput
            onSubmit={(msg: PromptInputMessage) => send(msg.text ?? "")}
            className="rounded-2xl bg-card shadow-soft"
          >
            <PromptInputTextarea
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === "hi" ? "यहाँ लिखें…" : "Or type here…"}
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={!busy && !input.trim()} onStop={stop} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </section>
    </div>
  );
}

function Waveform() {
  return (
    <span className="flex h-5 items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="animate-wave block h-full w-1 rounded-full bg-current"
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </span>
  );
}
