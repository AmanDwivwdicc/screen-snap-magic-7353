import { cn } from "@/lib/utils";
import type { AvatarMood, AvatarState } from "./types";

/**
 * Illustrated mentor avatar ("Saathi").
 * Pure SVG + CSS animation. Swap this component for a real avatar provider
 * (video/3D/lip-sync API) by implementing the same props contract.
 */
export function MentorAvatar({
  state,
  mood,
  className,
}: {
  state: AvatarState;
  mood: AvatarMood;
  className?: string;
}) {
  const talking = state === "talking";
  const thinking = state === "thinking";
  const listening = state === "listening";

  // Eye gaze offset
  const gaze = thinking ? { x: 4, y: -4 } : listening ? { x: 0, y: 1 } : { x: 0, y: 0 };

  // Eyebrow shapes per mood
  const brow =
    mood === "empathetic"
      ? { l: "M146 178 Q164 168 182 176", r: "M218 176 Q236 168 254 178" }
      : mood === "curious" || thinking
        ? { l: "M146 176 Q164 170 182 176", r: "M218 168 Q236 160 254 168" }
        : mood === "happy" || mood === "encouraging"
          ? { l: "M146 174 Q164 162 182 172", r: "M218 172 Q236 162 254 174" }
          : { l: "M146 176 Q164 168 182 175", r: "M218 175 Q236 168 254 176" };

  // Resting mouth per mood
  const mouth =
    mood === "happy" || mood === "encouraging"
      ? "M180 252 Q200 272 220 252"
      : mood === "empathetic"
        ? "M184 256 Q200 263 216 256"
        : mood === "curious"
          ? "M188 256 Q200 260 212 254"
          : "M184 254 Q200 264 216 254";

  const headAnim = talking ? "animate-nod" : thinking ? "animate-tilt" : "animate-sway";

  return (
    <div className={cn("relative select-none", className)} aria-label={`Saathi is ${state}`} role="img">
      <svg viewBox="0 0 400 480" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="cheek" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--lip)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--lip)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* soft floor shadow */}
        <ellipse cx="200" cy="470" rx="150" ry="10" fill="var(--stage-foreground)" opacity="0.08" />

        <g className="animate-breathe">
          {/* Body / kurta */}
          <path d="M70 480 Q78 360 150 330 L250 330 Q322 360 330 480 Z" fill="var(--kurta)" />
          <path d="M150 330 L200 392 L250 330 Z" fill="var(--kurta-shade)" />
          {/* dupatta */}
          <path d="M120 345 Q170 400 140 480 L105 480 Q128 400 98 360 Z" fill="var(--saffron)" opacity="0.92" />
          {/* neck */}
          <path d="M178 290 L178 332 Q200 348 222 332 L222 290 Z" fill="var(--skin-shade)" />

          {/* Left arm (viewer's left) */}
          <g className={cn(listening && "translate-y-1", talking && "animate-gesture-l")}>
            <path d="M92 400 Q70 450 110 470 L150 440 Q130 420 128 380 Z" fill="var(--kurta-shade)" />
            <ellipse cx="150" cy="440" rx="20" ry="16" fill="var(--skin)" />
          </g>

          {/* Right arm — gestures */}
          <g
            className={cn(talking && "animate-gesture-r")}
            style={{ transition: "transform .6s ease" }}
          >
            {thinking ? (
              <>
                <path d="M308 400 Q330 360 280 320 L258 336 Q290 370 280 400 Z" fill="var(--kurta-shade)" />
                <ellipse cx="250" cy="300" rx="17" ry="20" fill="var(--skin)" />
              </>
            ) : (
              <>
                <path d="M308 400 Q332 450 290 470 L250 440 Q270 420 272 380 Z" fill="var(--kurta-shade)" />
                <ellipse cx="250" cy="440" rx="20" ry="16" fill="var(--skin)" />
                {listening && <ellipse cx="200" cy="446" rx="34" ry="14" fill="var(--skin-shade)" opacity="0.5" />}
              </>
            )}
          </g>

          {/* Head group */}
          <g className={headAnim}>
            {/* hair back + bun */}
            <circle cx="200" cy="112" r="34" fill="var(--hair)" />
            <path d="M118 210 Q112 110 200 102 Q288 110 282 210 Q282 250 270 270 L130 270 Q118 250 118 210 Z" fill="var(--hair)" />
            {/* face */}
            <path d="M138 200 Q138 128 200 126 Q262 128 262 200 Q262 270 200 296 Q138 270 138 200 Z" fill="var(--skin)" />
            {/* ears + earrings */}
            <ellipse cx="136" cy="212" rx="9" ry="15" fill="var(--skin-shade)" />
            <ellipse cx="264" cy="212" rx="9" ry="15" fill="var(--skin-shade)" />
            <circle cx="136" cy="234" r="4" fill="var(--saffron)" />
            <circle cx="264" cy="234" r="4" fill="var(--saffron)" />
            {/* fringe */}
            <path d="M138 180 Q150 128 204 128 Q170 146 160 176 Q150 170 138 180 Z" fill="var(--hair)" />
            <path d="M262 178 Q252 130 200 128 Q238 140 246 172 Z" fill="var(--hair)" />
            {/* bindi */}
            <circle cx="200" cy="172" r="3.5" fill="var(--lip)" />

            {/* brows */}
            <path d={brow.l} stroke="var(--hair)" strokeWidth="4.5" strokeLinecap="round" fill="none" style={{ transition: "d .4s ease" }} />
            <path d={brow.r} stroke="var(--hair)" strokeWidth="4.5" strokeLinecap="round" fill="none" style={{ transition: "d .4s ease" }} />

            {/* eyes */}
            <g className="animate-blink">
              <ellipse cx="164" cy="202" rx="13" ry={mood === "happy" ? 8 : 10} fill="var(--card)" />
              <ellipse cx="236" cy="202" rx="13" ry={mood === "happy" ? 8 : 10} fill="var(--card)" />
              <g style={{ transform: `translate(${gaze.x}px, ${gaze.y}px)`, transition: "transform .5s ease" }}>
                <circle cx="164" cy="203" r="6.5" fill="var(--hair)" />
                <circle cx="236" cy="203" r="6.5" fill="var(--hair)" />
                <circle cx="166" cy="200" r="2" fill="var(--card)" />
                <circle cx="238" cy="200" r="2" fill="var(--card)" />
              </g>
            </g>

            {/* nose */}
            <path d="M200 208 Q194 232 200 236 Q205 236 207 233" stroke="var(--skin-shade)" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* cheeks */}
            <circle cx="156" cy="238" r="18" fill="url(#cheek)" />
            <circle cx="244" cy="238" r="18" fill="url(#cheek)" />

            {/* mouth */}
            {talking ? (
              <g>
                <ellipse cx="200" cy="258" rx="14" ry="9" fill="var(--lip)" className="animate-talk" />
              </g>
            ) : (
              <path d={mouth} stroke="var(--lip)" strokeWidth="4.5" fill="none" strokeLinecap="round" style={{ transition: "d .4s ease" }} />
            )}
          </g>
        </g>
      </svg>

      {/* thinking bubble */}
      {thinking && (
        <div className="glass absolute right-[12%] top-[6%] flex gap-1.5 rounded-full px-4 py-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="animate-think-dot block size-2 rounded-full bg-primary"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
