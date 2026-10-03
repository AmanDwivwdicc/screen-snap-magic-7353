import { Link } from "@tanstack/react-router";
import { Check, Compass, GitCompareArrows, HeartHandshake, MessageCircleMore, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Understand", to: "/counsellor" as const, icon: MessageCircleMore },
  { label: "Discover", to: "/discover" as const, icon: Compass },
  { label: "Compare", to: "/compare" as const, icon: GitCompareArrows },
  { label: "Family", to: "/family" as const, icon: HeartHandshake },
  { label: "Decide", icon: Target },
];

export function JourneyNav({ active }: { active: string }) {
  return (
    <nav aria-label="Your career journey" className="border-b border-border/70 bg-card/70">
      <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2 md:justify-center md:px-6">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const selected = active === step.label.toLowerCase();
          const destination = "to" in step ? step.to : null;
          const content = (
            <>
              <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full", selected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
                {index < STEPS.findIndex((item) => item.label.toLowerCase() === active) ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}
              </span>
              <span className="whitespace-nowrap text-xs font-semibold">{step.label}</span>
            </>
          );
          return destination ? (
            <Link key={step.label} to={destination} className={cn("flex items-center gap-2 rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground", selected && "text-foreground")}>{content}</Link>
          ) : (
            <span key={step.label} aria-disabled="true" className="flex items-center gap-2 rounded-full px-3 py-2 text-muted-foreground/60" title="Coming next">{content}</span>
          );
        })}
      </div>
    </nav>
  );
}