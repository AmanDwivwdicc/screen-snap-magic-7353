import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ChevronDown, ShieldCheck, TrendingUp } from "lucide-react";
import { JourneyHeader } from "@/components/journey/JourneyHeader";
import { Button } from "@/components/ui/button";
import { CAREERS, getCareer } from "@/lib/career-data";

type CompareSearch = { careers?: string[] };

export const Route = createFileRoute("/_authenticated/compare")({
  validateSearch: (search: Record<string, unknown>): CompareSearch => ({ careers: Array.isArray(search.careers) ? search.careers.filter((value): value is string => typeof value === "string").slice(0, 2) : undefined }),
  head: () => ({ meta: [
    { title: "Compare Careers — CareerSaathi" },
    { name: "description", content: "Compare vocational careers side by side across income, security, growth, training, and family priorities." },
    { property: "og:title", content: "Compare Careers — CareerSaathi" },
    { property: "og:description", content: "Compare vocational careers side by side across income, security, growth, training, and family priorities." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: ComparePage,
});

const ROWS = [
  { label: "Training path", key: "training" as const },
  { label: "Starting income", key: "startingIncome" as const },
  { label: "With experience", key: "experiencedIncome" as const },
  { label: "Job security", key: "jobSecurity" as const },
  { label: "Career growth", key: "growth" as const },
  { label: "Opportunity near home", key: "localOpportunity" as const },
  { label: "Safety", key: "safety" as const },
];

function ComparePage() {
  const search = Route.useSearch();
  const first = getCareer(search.careers?.[0] ?? "solar-technician") ?? CAREERS[0];
  const second = getCareer(search.careers?.[1] ?? "healthcare-technician") ?? CAREERS[1];
  if (!first || !second) return null;
  return (
    <div className="min-h-dvh bg-background">
      <JourneyHeader active="compare" />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <p className="text-sm font-semibold text-primary">Phase 3 · Compare</p>
        <h1 className="mt-2 font-display text-4xl text-foreground md:text-6xl">See the trade-offs clearly</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">No career wins on every point. Compare what matters to you and your family before deciding.</p>

        <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card">
          <div className="grid grid-cols-[120px_1fr_1fr] border-b border-border md:grid-cols-[220px_1fr_1fr]">
            <div className="p-3 md:p-5"><span className="text-xs font-semibold uppercase text-muted-foreground">Compare</span></div>
            {[first, second].map((career) => { const Icon = career.icon; return <div key={career.id} className="border-l border-border p-3 md:p-5"><Icon className="size-5 text-primary" /><h2 className="mt-3 text-sm font-bold text-foreground md:text-xl">{career.title}</h2><p className="mt-1 hidden text-sm text-muted-foreground md:block">{career.sector}</p></div>; })}
          </div>
          {ROWS.map((row) => <div key={row.key} className="grid grid-cols-[120px_1fr_1fr] border-b border-border last:border-0 md:grid-cols-[220px_1fr_1fr]"><div className="p-3 text-xs font-semibold text-muted-foreground md:p-5 md:text-sm">{row.label}</div><div className="border-l border-border p-3 text-xs leading-relaxed text-foreground md:p-5 md:text-sm">{first[row.key]}</div><div className="border-l border-border p-3 text-xs leading-relaxed text-foreground md:p-5 md:text-sm">{second[row.key]}</div></div>)}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[first, second].map((career, index) => <article key={career.id} className="rounded-lg border border-border bg-card p-5"><div className="flex items-center gap-2 text-sm font-bold text-foreground">{index === 0 ? <TrendingUp className="size-4 text-primary" /> : <ShieldCheck className="size-4 text-primary" />} Family takeaway</div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{career.familyNote}</p></article>)}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-primary p-5 text-primary-foreground md:p-7"><div><p className="font-semibold">Ready to discuss these options together?</p><p className="mt-1 text-sm opacity-80">Use the family view to prepare a calm, practical conversation.</p></div><Button asChild variant="secondary" className="rounded-full"><Link to="/family">Prepare family discussion <ArrowRight /></Link></Button></div>
      </main>
    </div>
  );
}