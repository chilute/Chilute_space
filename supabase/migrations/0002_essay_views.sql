-- ============================================================
-- 0002 — Бичвэрийн үзэлтийн тоологч (essay view counter)
-- Supabase Dashboard → SQL Editor дотор бүхэлд нь ажиллуулна.
-- ============================================================

-- 1) views багана нэмнэ
alter table public.essays
  add column if not exists views integer not null default 0;

-- 2) updated_at trigger-г зөвхөн views өөрчлөгдөхөд хөдлөхгүй болгоно.
--    (Үзэлт нэмэгдэхэд "сүүлд зассан" огноо өөрчлөгдөхгүй.)
create or replace function public.essays_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  if to_jsonb(new) - 'views' - 'updated_at'
       is distinct from
     to_jsonb(old) - 'views' - 'updated_at' then
    new.updated_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists essays_set_updated_at on public.essays;
create trigger essays_set_updated_at
  before update on public.essays
  for each row execute function public.essays_set_updated_at();

-- 3) Нийтийн зочид үзэлтийг нэмэгдүүлэх RPC.
--    SECURITY DEFINER тул RLS-ийг тойрч, зөвхөн published бичвэрт +1 хийнэ.
create or replace function public.increment_essay_views(essay_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.essays
     set views = views + 1
   where id = essay_id
     and published = true;
$$;

grant execute on function public.increment_essay_views(uuid) to anon, authenticated;
