import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JourneyNav } from "./JourneyNav";

export function JourneyHeader({ active }: { active: string }) {
  return (
    <>
      <header className="border-b border-border/60 bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link to="/" className="font-display text-2xl text-foreground">CareerSaathi</Link>
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link to="/counsellor"><MessageCircle /> Talk to Saathi</Link>
          </Button>
        </div>
      </header>
      <JourneyNav active={active} />
    </>
  );
}