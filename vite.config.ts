import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      // Шинэ хувилбар гармагц чимээгүйхэн өөрийгөө шинэчилнэ.
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "apple-touch-icon.png"],
      manifest: {
        name: "Chilute.",
        short_name: "Chilute",
        description: "Тууллын тэмдэглэл",
        lang: "mn",
        // Суусан апп шууд админ руу нээгдэнэ (standalone-д хаягийн мөр байхгүй,
        // нэвтрээгүй бол /admin/login руу автоматаар чиглүүлнэ).
        start_url: "/admin",
        scope: "/",
        display: "standalone",
        background_color: "#f5eede",
        theme_color: "#f5eede",
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            // maskable — Android-ийн дугуй/бусад хэлбэрийн icon-д тохирно.
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Зөвхөн build-ийн статик файлуудыг (JS/CSS/icon) кэшлэнэ.
        // Supabase контент API-г кэшлэхгүй тул нийтэлсэн бичвэр хуучрахгүй.
        globPatterns: ["**/*.{js,css,html,png,svg,woff,woff2}"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
