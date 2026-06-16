# Chilute

Технологи бодолтой уулздаг, чимээгүй байдал ярьдаг нам гүм орон зай.

## Хөгжүүлэлт

Node.js & npm шаардлагатай ([nvm-ээр суулгах](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# 1. Repo-г clone хийх
git clone <YOUR_GIT_URL>

# 2. Төслийн хавтас руу шилжих
cd Chilute_space

# 3. Хамаарлуудыг суулгах
npm i

# 4. Хөгжүүлэлтийн серверийг ажиллуулах
npm run dev
```

## Технологи

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Postgres, Auth, Storage)

## Supabase backend (fullstack тохиргоо)

Энэ төсөл нь Supabase-тэй холбогдсон fullstack сайт болсон: Бичвэр, Тэмдэглэл,
Зураг бүгд Supabase DB-ээс динамикаар татагдаж, `/admin` хэсэгт нэвтэрч CRUD хийнэ.

### 1. Орчны хувьсагч

`.env.example`-г хуулж `.env` болгон Supabase-ийн утгаа оруулна
(Supabase Dashboard → Project Settings → API):

```sh
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon public key>
```

### 2. Өгөгдлийн сан үүсгэх

Supabase Dashboard → **SQL Editor** дотор `supabase/migrations/0001_init.sql`-ийн
агуулгыг бүхэлд нь хуулж ажиллуулна. Энэ нь хүснэгт, RLS бодлого, `gallery`
storage bucket, болон seed контентыг үүсгэнэ.

### 3. Админ хэрэглэгч үүсгэх

Supabase Dashboard → **Authentication → Users → Add user** дээр имэйл/нууц үгээ
оруулна (имэйл баталгаажуулалтыг асаалттай бол unconfirmed хэрэглэгчийг
"Auto Confirm" болгоно). Дараа нь `/admin/login` дээр нэвтэрнэ.

> RLS: нийтэд зөвхөн `published = true` мөрүүд харагдана; нэвтэрсэн хэрэглэгч бүх
> үйлдэл хийх эрхтэй (нэг админтай сайтад тохирсон).

### Маршрутууд

- Нийтийн: `/`, `/essays`, `/essays/:id`, `/notes`, `/gallery`, `/about`
- Админ: `/admin/login`, `/admin`, `/admin/essays`, `/admin/notes`, `/admin/gallery`
