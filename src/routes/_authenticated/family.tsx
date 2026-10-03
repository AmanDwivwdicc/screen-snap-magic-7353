import { createFileRoute, Link } from "@tanstack/react-router";
import { BriefcaseBusiness, GraduationCap, HeartHandshake, IndianRupee, MapPin, ShieldCheck } from "lucide-react";
import { JourneyHeader } from "@/components/journey/JourneyHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/family")({
  head: () => ({ meta: [
    { title: "Family Discussion — CareerSaathi" },
    { name: "description", content: "Prepare a clear family conversation about income, safety, job security, growth, and training quality." },
    { property: "og:title", content: "Family Discussion — CareerSaathi" },
    { property: "og:description", content: "Prepare a clear family conversation about income, safety, job security, growth, and training quality." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: FamilyPage,
});

const CONCERNS = [
  { icon: IndianRupee, title: "Income", question: "What can they earn at the start, and after three years?", answer: "Compare realistic ranges, not exceptional success stories." },
  { icon: ShieldCheck, title: "Safety", question: "What does a normal workday look like, and what training protects them?", answer: "Ask the institute about equipment, supervision, and workplace partners." },
  { icon: BriefcaseBusiness, title: "Job security", question: "Are employers hiring for this skill near us?", answer: "Look for current apprenticeships and verified local placements." },
  { icon: GraduationCap, title: "Future study", question: "Can this qualification lead to a diploma or higher level?", answer: "Check the formal progression path before enrolling." },
  { icon: MapPin, title: "Location", question: "Can they find work close to home, or is relocation likely?", answer: "Compare local demand with travel and living costs." },
  { icon: HeartHandshake, title: "Respect & growth", question: "Can this become a stable, respected long-term career?", answer: "Focus on skill, responsibility, advancement, and self-employment options." },
];

function FamilyPage() {
  return (
    <div className="min-h-dvh bg-background">
      <JourneyHeader active="family" />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_320px]">
          <div>
            <p className="text-sm font-semibold text-primary">Phase 4 · Family</p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-foreground md:text-6xl">Turn worries into good questions</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">A strong family decision starts when everyone feels heard. Use these prompts to discuss facts without pressure.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {CONCERNS.map(({ icon: Icon, title, question, answer }) => <article key={title} className="rounded-lg border border-border bg-card p-5"><span className="flex size-10 items-center justify-center rounded-lg bg-saffron-soft text-accent-foreground"><Icon className="size-5" /></span><p className="mt-4 text-xs font-bold uppercase text-primary">{title}</p><h2 className="mt-1 font-semibold leading-snug text-foreground">{question}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p></article>)}
            </div>
          </div>
          <aside className="sticky top-6 rounded-lg bg-primary p-6 text-primary-foreground md:mt-16">
            <p className="text-xs font-bold uppercase opacity-70">Saathi’s suggestion</p>
            <blockquote className="mt-4 font-display text-2xl leading-snug">“Let each person name one hope and one worry. Then check the facts together.”</blockquote>
            <div className="mt-6 border-t border-primary-foreground/20 pt-6">
              <p className="text-sm leading-relaxed opacity-80">Saathi can guide this conversation in simple language and make sure both student and parent get time to speak.</p>
              <Button asChild variant="secondary" className="mt-5 w-full rounded-full"><Link to="/counsellor">Start with Saathi</Link></Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}