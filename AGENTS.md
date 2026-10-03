<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- AI chat streams through the `/api/chat` server route (`src/lib/ai/chat.server.ts`), which verifies the caller's bearer token and persists messages to `threads`/`messages` — keeps the AI key server-side and history per user.
- The mentor avatar is a self-contained component (`src/components/avatar/`) driven only by `state` + `mood` props — so it can be swapped for a real avatar provider later.
- Assistant replies start with a hidden `[[mood:x]]` tag parsed by `parseMood` — drives avatar emotion without a separate call.
- Career journey content uses shared typed data from `src/lib/career-data.ts` — keeps Discover and Compare facts consistent.
