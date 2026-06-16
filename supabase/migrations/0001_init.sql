-- ============================================================
-- Chilute personal site — Supabase schema
-- Supabase Dashboard → SQL Editor дотор бүхэлд нь ажиллуулна.
-- ============================================================

-- updated_at-г автоматаар шинэчлэх trigger функц
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ------------------------------------------------------------
-- Essays (Бичвэр)
-- ------------------------------------------------------------
create table if not exists public.essays (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  excerpt      text,
  content      text,
  published    boolean not null default true,
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger essays_set_updated_at
  before update on public.essays
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Notes (Тэмдэглэл)
-- ------------------------------------------------------------
create table if not exists public.notes (
  id           uuid primary key default gen_random_uuid(),
  content      text not null,
  published    boolean not null default true,
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger notes_set_updated_at
  before update on public.notes
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Gallery images (Зураг)
-- ------------------------------------------------------------
create table if not exists public.gallery_images (
  id          uuid primary key default gen_random_uuid(),
  src         text not null,
  alt         text,
  caption     text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- Нийтэд: зөвхөн published мөрүүдийг унших.
-- Нэвтэрсэн хэрэглэгч (админ): бүх үйлдэл.
-- ============================================================
alter table public.essays         enable row level security;
alter table public.notes          enable row level security;
alter table public.gallery_images enable row level security;

-- Essays
create policy "essays_public_read"
  on public.essays for select
  using (published = true);

create policy "essays_auth_all"
  on public.essays for all
  to authenticated
  using (true)
  with check (true);

-- Notes
create policy "notes_public_read"
  on public.notes for select
  using (published = true);

create policy "notes_auth_all"
  on public.notes for all
  to authenticated
  using (true)
  with check (true);

-- Gallery (бүх зураг нийтэд харагдана)
create policy "gallery_public_read"
  on public.gallery_images for select
  using (true);

create policy "gallery_auth_all"
  on public.gallery_images for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- Storage bucket — gallery зургууд
-- ============================================================
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- Нийтэд унших
create policy "gallery_storage_public_read"
  on storage.objects for select
  using (bucket_id = 'gallery');

-- Нэвтэрсэн хэрэглэгч upload/update/delete
create policy "gallery_storage_auth_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery');

create policy "gallery_storage_auth_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gallery');

create policy "gallery_storage_auth_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery');

-- ============================================================
-- Seed data — одоо байгаа контент
-- ============================================================
insert into public.essays (title, excerpt, content, published_at) values
('Чимээгүй байдал ба нам гүм байдлын тухай',
 'Тасралтгүй чимээ шуугианы энэ эрин үед бид мартчихсан чимээгүй байдлын нэгэн онцгой чанар бий. Энэ нь дуу авианы үгүйрэл биш, харин орон зайн оршихуй юм...',
 E'Тасралтгүй чимээ шуугианы энэ эрин үед бид мартчихсан чимээгүй байдлын нэгэн онцгой чанар бий. Энэ нь дуу авианы үгүйрэл биш, харин орон зайн оршихуй юм.\n\n(Энд эссений бүрэн агуулгыг бичнэ үү.)',
 '2024-03-15'),
('Технологи бол толь',
 'Бидний бүтээдэг хэрэгслүүд бид хэн болохыг тусгадаг. Тэдгээр нь төвийг сахисан зүйл биш — бидний үнэт зүйлс, таамаглал, итгэл найдвар, айдсыг агуулдаг...',
 E'Бидний бүтээдэг хэрэгслүүд бид хэн болохыг тусгадаг. Тэдгээр нь төвийг сахисан зүйл биш — бидний үнэт зүйлс, таамаглал, итгэл найдвар, айдсыг агуулдаг.\n\n(Энд эссений бүрэн агуулгыг бичнэ үү.)',
 '2024-03-05'),
('Анхаарлын жин',
 'Бид анхаарлаа хаашаа чиглүүлж байгаа нь бидний бодит байдлыг төлөвшүүлдэг. Анхаарлыг минь хуваах зорилготой ертөнцөд юунд анхаарал хандуулахаа сонгох нь радикал үйлдэл юм...',
 E'Бид анхаарлаа хаашаа чиглүүлж байгаа нь бидний бодит байдлыг төлөвшүүлдэг.\n\n(Энд эссений бүрэн агуулгыг бичнэ үү.)',
 '2024-02-28'),
('Алхах нь бясалгал',
 'Ертөнцөөр аажуухан хөдлөхөд, алхааныхаа хэмнэлээр оюун ухаанаа тайвшруулахад мэргэн ухаан оршдог...',
 E'Ертөнцөөр аажуухан хөдлөхөд, алхааныхаа хэмнэлээр оюун ухаанаа тайвшруулахад мэргэн ухаан оршдог.\n\n(Энд эссений бүрэн агуулгыг бичнэ үү.)',
 '2024-02-20');

insert into public.notes (content, published_at) values
('Хамгийн сайн санаанууд бодохыг хичээж байх үед биш, харин огт өөр зүйл хийж байх үед төрдөг. Алхах, аяга таваг угаах, бороо ширтэх. Оюун ухаанд тэнүүчлэх орон зай хэрэгтэй.', '2024-03-16'),
('Цонхоор тусах гэрэл нь өдөр бүр бол бидний аажуухан задлах бэлэг гэдгийг сануулдаг.', '2024-03-10'),
('Бид арван жилд юу хийж чадахаа дутуу үнэлж, нэг жилд юу хийж чадахаа хэт үнэлдэг тухай өнөөдөр нэг зүйл уншлаа. Хийх үнэ цэнэтэй бараг бүх зүйлд энэ үнэн санагддаг.', '2024-03-08'),
('Заримдаа хийж чадах хамгийн үр бүтээлтэй зүйл бол амрах явдал.', '2024-03-03'),
('Бидний асуудаг асуултын чанар амьдралын минь чанарыг тодорхойлдгийг анзаарлаа. Бүтээмжийн заль мэхээр биш, харин жинхэнэ сониуч зангаар.', '2024-02-27'),
('Яаралгүй байх үед кофе илүү амттай байдаг. Энэ нь бүх зүйлийн зүйрлэл байж магадгүй.', '2024-02-22');

insert into public.gallery_images (src, alt, caption, sort_order) values
('https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'Үүрийн гэгээний уулын байгаль', 'Чимээгүй байдал ярьдаг', 1),
('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', 'Манантай ойн зам', 'Бодлууд тэнүүчлэх газар', 2),
('https://images.unsplash.com/photo-1441974231531-c6227db76b6e', 'Ойн навчит халхавч', 'Ногоон дор', 3),
('https://images.unsplash.com/photo-1426604966848-d7adac402bff', 'Цөлийн нар жаргах', 'Алтан цаг', 4),
('https://images.unsplash.com/photo-1501594907352-04cda38ebc29', 'Далайн давхрага', 'Эцэс төгсгөлгүй цэнхэр', 5),
('https://images.unsplash.com/photo-1472214103451-9374bd1c798e', 'Минимал өвлийн дүр зураг', 'Өвлийн шивнээ', 6);
