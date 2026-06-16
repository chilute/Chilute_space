# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3dea526b-6a99-4fc9-a355-86e018bac5fb

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3dea526b-6a99-4fc9-a355-86e018bac5fb) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

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

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Postgres, Auth, Storage)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3dea526b-6a99-4fc9-a355-86e018bac5fb) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
