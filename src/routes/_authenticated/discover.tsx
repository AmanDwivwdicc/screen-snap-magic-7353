import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { CareerCard } from "@/components/journey/CareerCard";
import { JourneyHeader } from "@/components/journey/JourneyHeader";
import { CAREERS } from "@/lib/career-data";

export const Route = createFileRoute("/_authenticated/discover")({
  head: () => ({ meta: [
    { title: "Discover Careers — CareerSaathi" },
    { name: "description", content: "Explore vocational careers matched to your interests, training goals, and family priorities." },
    { property: "og:title", content: "Discover Careers — CareerSaathi" },
    { property: "og:description", content: "Explore vocational careers matched to your interests, training goals, and family priorities." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: DiscoverPage,
});

function DiscoverPage() {
  return (
    <div className="min-h-dvh bg-background">
      <JourneyHeader active="discover" />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">Phase 2 · Discover</p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-foreground md:text-6xl">Careers that could fit you</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">These are starting points based on practical skills, growth potential, and questions families usually ask. Talk to Saathi to make them personal.</p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground"><SlidersHorizontal className="size-4" /> Ranked by overall fit</div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAREERS.map((career) => <CareerCard key={career.id} career={career} />)}
        </div>
      </main>
    </div>
  );
}