import { cn } from "@/lib/utils";
import type { AvatarMood, AvatarState } from "./types";

export function MentorAvatar({ state, mood, className }: { state: AvatarState; mood: AvatarMood; className?: string }) {
  const talking = state === "talking";
  const thinking = state === "thinking";
  const listening = state === "listening" || state === "understanding";
  const greeting = state === "greeting" || state === "goodbye";
  const celebrating = state === "celebrating";
  const concerned = state === "concerned" || mood === "empathetic";
  const gaze = thinking ? { x: 4, y: -3 } : concerned ? { x: -1, y: 2 } : { x: 0, y: 0 };
  const expression = concerned ? "concerned" : mood;
  const brow = expression === "concerned"
    ? { l: "M150 185 Q169 176 186 187", r: "M214 187 Q231 176 250 185" }
    : thinking || mood === "curious"
      ? { l: "M150 184 Q169 175 187 182", r: "M214 176 Q232 168 250 177" }
      : { l: "M150 181 Q169 169 187 179", r: "M213 179 Q231 169 250 181" };
  const mouth = concerned
    ? "M187 267 Q200 261 213 267"
    : mood === "happy" || mood === "encouraging" || celebrating || greeting
      ? "M181 261 Q200 281 219 261 Q201 272 181 261"
      : "M185 263 Q200 271 215 263";
  const bodyAnimation = celebrating ? "animate-celebrate" : "animate-breathe";
  const headAnimation = listening ? "animate-affirm" : concerned ? "animate-reassure" : talking ? "animate-nod" : thinking ? "animate-tilt" : "animate-sway";

  return (
    <div className={cn("relative select-none", className)} aria-label={`Saathi is ${state}`} role="img">
      <svg viewBox="0 0 400 500" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="skinLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="color-mix(in oklab, var(--skin) 80%, white)" />
            <stop offset=".6" stopColor="var(--skin)" />
            <stop offset="1" stopColor="var(--skin-shade)" />
          </linearGradient>
          <linearGradient id="hairGloss" x1="0" y1="0" x2="1" y2=".7">
            <stop offset="0" stopColor="var(--hair-light)" />
            <stop offset=".35" stopColor="var(--hair)" />
            <stop offset="1" stopColor="color-mix(in oklab, var(--hair) 82%, black)" />
          </linearGradient>
          <linearGradient id="kurtaLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="color-mix(in oklab, var(--kurta) 82%, white)" />
            <stop offset="1" stopColor="var(--kurta-shade)" />
          </linearGradient>
          <radialGradient id="cheek"><stop stopColor="var(--lip)" stopOpacity=".24" /><stop offset="1" stopColor="var(--lip)" stopOpacity="0" /></radialGradient>
          <radialGradient id="iris"><stop stopColor="color-mix(in oklab, var(--iris) 55%, white)" /><stop offset=".65" stopColor="var(--iris)" /><stop offset="1" stopColor="var(--hair)" /></radialGradient>
          <filter id="softShadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="var(--stage-foreground)" floodOpacity=".16" /></filter>
        </defs>

        <ellipse cx="200" cy="486" rx="140" ry="10" fill="var(--stage-foreground)" opacity=".1" />
        <g className={bodyAnimation}>
          <g filter="url(#softShadow)">
            <path d="M72 500 Q80 380 143 345 Q167 331 200 331 Q233 331 257 345 Q320 380 328 500Z" fill="url(#kurtaLight)" />
            <path d="M177 335 L200 376 L223 335 Q236 340 250 350 L232 500 L168 500 L150 350 Q164 340 177 335Z" fill="var(--kurta)" opacity=".72" />
            <path d="M112 365 Q151 402 143 500 H101 Q119 432 92 391Z" fill="var(--saffron)" />
            <path d="M288 365 Q249 402 257 500 H299 Q281 432 308 391Z" fill="var(--saffron)" opacity=".88" />
            <path d="M109 367 Q149 405 140 492" stroke="var(--saffron-soft)" strokeWidth="3" fill="none" opacity=".8" />
            <path d="M291 367 Q251 405 260 492" stroke="var(--saffron-soft)" strokeWidth="3" fill="none" opacity=".8" />
            <path d="M179 296 V338 Q200 353 221 338 V296Z" fill="url(#skinLight)" />

            <g className={cn(talking && "animate-gesture-l", celebrating && "animate-greet")}>
              <path d="M112 390 Q76 423 93 487 L137 487 Q129 441 157 409Z" fill="var(--kurta-shade)" />
              <path d="M137 472 Q155 459 174 469 Q166 489 139 491Z" fill="url(#skinLight)" />
            </g>

            <g className={cn((greeting || celebrating) && "animate-greet", talking && "animate-gesture-r")}>
              {thinking ? (
                <>
                  <path d="M286 391 Q306 358 270 325 L244 346 Q271 375 266 414Z" fill="var(--kurta-shade)" />
                  <path d="M255 328 Q242 315 248 297 Q262 290 273 301 Q276 316 266 331Z" fill="url(#skinLight)" />
                  <path d="M253 302 Q256 288 263 280" stroke="var(--skin-shade)" strokeWidth="5" strokeLinecap="round" />
                </>
              ) : greeting || celebrating ? (
                <>
                  <path d="M286 392 Q319 354 307 290 L276 294 Q282 342 253 383Z" fill="var(--kurta-shade)" />
                  <path d="M307 295 Q321 281 317 262 Q304 252 291 263 Q285 278 295 296Z" fill="url(#skinLight)" />
                  <path d="M296 270 l-8 -12 M302 267 l-2 -16 M309 270 l6 -14" stroke="var(--skin-shade)" strokeWidth="3" strokeLinecap="round" />
                </>
              ) : concerned ? (
                <>
                  <path d="M286 391 Q294 422 260 454 L232 435 Q260 411 258 374Z" fill="var(--kurta-shade)" />
                  <path d="M229 430 Q210 426 196 438 Q206 456 232 452Z" fill="url(#skinLight)" />
                </>
              ) : (
                <>
                  <path d="M288 390 Q324 423 307 487 L263 487 Q271 441 243 409Z" fill="var(--kurta-shade)" />
                  <path d="M263 472 Q245 459 226 469 Q234 489 261 491Z" fill="url(#skinLight)" />
                </>
              )}
            </g>
          </g>

          <g className={headAnimation}>
            <g className="animate-hair-shift">
              <path d="M116 218 Q105 111 200 93 Q295 111 284 218 L271 309 Q244 337 200 336 Q156 337 129 309Z" fill="url(#hairGloss)" />
              <path d="M120 196 Q91 250 121 342 Q139 323 148 287Z" fill="var(--hair)" />
              <path d="M280 196 Q309 250 279 342 Q261 323 252 287Z" fill="var(--hair)" />
            </g>
            <ellipse cx="200" cy="205" rx="69" ry="97" fill="url(#skinLight)" />
            <ellipse cx="132" cy="217" rx="10" ry="18" fill="var(--skin)" />
            <ellipse cx="268" cy="217" rx="10" ry="18" fill="var(--skin)" />
            <path d="M133 180 Q137 113 202 106 Q165 131 151 177Z" fill="url(#hairGloss)" />
            <path d="M267 180 Q259 116 200 106 Q236 126 251 173Z" fill="url(#hairGloss)" />
            <path d="M151 145 Q183 112 223 111 Q197 126 185 166Z" fill="var(--hair-light)" opacity=".5" />
            <circle cx="200" cy="165" r="3.5" fill="var(--lip)" />

            <path d={brow.l} stroke="var(--hair)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d={brow.r} stroke="var(--hair)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <g className="animate-blink">
              <path d="M145 211 Q164 191 187 209 Q166 226 145 211Z" fill="var(--card)" />
              <path d="M213 209 Q236 191 255 211 Q234 226 213 209Z" fill="var(--card)" />
              <g style={{ transform: `translate(${gaze.x}px, ${gaze.y}px)`, transition: "transform .45s ease" }}>
                <ellipse cx="167" cy="210" rx="10" ry="13" fill="url(#iris)" />
                <ellipse cx="233" cy="210" rx="10" ry="13" fill="url(#iris)" />
                <circle cx="167" cy="211" r="5" fill="var(--hair)" /><circle cx="233" cy="211" r="5" fill="var(--hair)" />
                <circle cx="163" cy="205" r="3" fill="var(--card)" /><circle cx="229" cy="205" r="3" fill="var(--card)" />
                <circle cx="170" cy="214" r="1.5" fill="var(--card)" /><circle cx="236" cy="214" r="1.5" fill="var(--card)" />
              </g>
              <path d="M145 211 Q164 190 187 209" stroke="var(--hair)" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M213 209 Q236 190 255 211" stroke="var(--hair)" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
            <path d="M200 214 Q193 241 202 244 Q208 244 212 240" stroke="var(--skin-shade)" strokeWidth="2.5" opacity=".65" fill="none" strokeLinecap="round" />
            <ellipse cx="156" cy="246" rx="24" ry="14" fill="url(#cheek)" /><ellipse cx="244" cy="246" rx="24" ry="14" fill="url(#cheek)" />
            {talking ? (
              <g className="animate-talk"><ellipse cx="200" cy="266" rx="14" ry="10" fill="var(--lip)" /><path d="M191 266 Q200 261 209 266" stroke="var(--card)" strokeWidth="2" opacity=".75" /></g>
            ) : <path d={mouth} stroke="var(--lip)" strokeWidth="4" fill={greeting || celebrating ? "color-mix(in oklab, var(--lip) 22%, transparent)" : "none"} strokeLinecap="round" strokeLinejoin="round" />}
            <circle cx="132" cy="240" r="4" fill="var(--saffron)" /><path d="M132 244 l-5 12 5 6 5-6Z" fill="var(--saffron)" />
            <circle cx="268" cy="240" r="4" fill="var(--saffron)" /><path d="M268 244 l-5 12 5 6 5-6Z" fill="var(--saffron)" />
          </g>
        </g>

        {celebrating && <g fill="var(--saffron)" className="animate-sparkle"><path d="M70 130 l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" /><path d="M323 174 l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" /></g>}
      </svg>
      {thinking && <div className="glass absolute right-[10%] top-[8%] flex gap-1.5 rounded-full px-4 py-3">{[0, 1, 2].map((i) => <span key={i} className="animate-think-dot block size-2 rounded-full bg-primary" style={{ animationDelay: `${i * .18}s` }} />)}</div>}
    </div>
  );
}
