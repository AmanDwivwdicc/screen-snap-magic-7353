import { Link } from "@tanstack/react-router";
import { ArrowRight, IndianRupee, MapPin } from "lucide-react";
import type { Career } from "@/lib/career-data";
import { Button } from "@/components/ui/button";

export function CareerCard({ career }: { career: Career }) {
  const Icon = career.icon;
  return (
    <article className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-5" /></span>
        <span className="rounded-full bg-saffron-soft px-2.5 py-1 text-xs font-bold text-accent-foreground">{career.fit}% fit</span>
      </div>
      <p className="mt-5 text-xs font-semibold uppercase text-muted-foreground">{career.sector}</p>
      <h2 className="mt-1 text-xl font-semibold text-card-foreground">{career.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{career.summary}</p>
      <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
        <p className="flex items-center gap-2 text-foreground"><IndianRupee className="size-4 text-primary" /> {career.startingIncome}</p>
        <p className="flex items-start gap-2 text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> {career.localOpportunity}</p>
      </div>
      <div className="mt-auto pt-5">
        <Button asChild variant="ghost" className="w-full justify-between rounded-md">
          <Link to="/compare" search={{ careers: [career.id, "healthcare-technician"] }}>Compare this career <ArrowRight /></Link>
        </Button>
      </div>
    </article>
  );
}