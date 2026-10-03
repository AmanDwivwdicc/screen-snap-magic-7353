import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mic, Users, ShieldCheck } from "lucide-react";
import { MentorAvatar } from "@/components/avatar/MentorAvatar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerSaathi — Talk to your AI career mentor" },
      {
        name: "description",
        content: "Saathi listens, understands your family's worries, and helps you choose a vocational career together.",
      },
      { property: "og:title", content: "CareerSaathi — Talk to your AI career mentor" },
      {
        property: "og:description",
        content: "A warm AI mentor for vocational careers, built for students and their families.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-warm-gradient">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl text-foreground">CareerSaathi</span>
        </div>
        <Link to="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Sign in
        </Link>
      </header>

      <main className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-4 md:grid-cols-[1.1fr_1fr] md:pt-10">
        <div className="animate-float-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-saffron-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
            Your Career. Your Future. Your Family.
          </p>
          <h1 className="font-display text-5xl leading-[1.05] text-foreground md:text-7xl">
            Meet Saathi — a mentor who <em className="text-primary">actually listens.</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Talk out loud or type. Saathi helps you explore vocational careers, answers your parents' questions about
            income and safety, and helps your family decide together.
          </p>
          <Link
            to="/counsellor"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Start talking to Saathi <ArrowRight className="size-4" />
          </Link>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mic className="size-4 text-primary" /> English & हिन्दी voice</li>
            <li className="flex items-center gap-2"><Users className="size-4 text-primary" /> Family-first guidance</li>
            <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Honest, simple answers</li>
          </ul>
        </div>

        <div className="relative mx-auto aspect-[5/6] w-full max-w-md rounded-[2.5rem] bg-stage-gradient shadow-soft">
          <MentorAvatar state="greeting" mood="happy" className="absolute inset-x-6 bottom-0 top-8" />
          <div className="glass absolute left-6 top-6 max-w-[70%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-foreground">
            Hey! 👋 What are you thinking about these days?
          </div>
        </div>
      </main>
    </div>
  );
}
