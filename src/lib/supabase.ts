import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // .env дотор VITE_SUPABASE_URL ба VITE_SUPABASE_ANON_KEY-г оруулсан эсэхээ шалгана уу
  throw new Error(
    "Supabase тохиргоо дутуу байна. .env файлд VITE_SUPABASE_URL ба VITE_SUPABASE_ANON_KEY-г оруулна уу.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
