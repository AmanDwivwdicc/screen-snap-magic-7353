create table public.threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null default 'New conversation',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.threads to authenticated;
grant all on public.threads to service_role;
alter table public.threads enable row level security;
create policy "own threads select" on public.threads for select to authenticated using (auth.uid() = user_id);
create policy "own threads insert" on public.threads for insert to authenticated with check (auth.uid() = user_id);
create policy "own threads update" on public.threads for update to authenticated using (auth.uid() = user_id);
create policy "own threads delete" on public.threads for delete to authenticated using (auth.uid() = user_id);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads(id) on delete cascade,
  user_id uuid not null,
  sdk_id text not null,
  role text not null,
  parts jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  unique (thread_id, sdk_id)
);
create index messages_thread_idx on public.messages(thread_id, created_at);
grant select, insert, update, delete on public.messages to authenticated;
grant all on public.messages to service_role;
alter table public.messages enable row level security;
create policy "own messages select" on public.messages for select to authenticated using (auth.uid() = user_id);
create policy "own messages insert" on public.messages for insert to authenticated with check (auth.uid() = user_id and exists (select 1 from public.threads t where t.id = thread_id and t.user_id = auth.uid()));
create policy "own messages delete" on public.messages for delete to authenticated using (auth.uid() = user_id);