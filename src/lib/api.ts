import { supabase } from "./supabase";
import type { Essay, EssayInput, Note, NoteInput } from "./database.types";

// ============================================================
// Essays
// ============================================================
export const essaysApi = {
  // Нийтэд харагдах эссэгүүд (published)
  async listPublished(): Promise<Essay[]> {
    const { data, error } = await supabase
      .from("essays")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  // Админд бүх эссэ (ноорог орно)
  async listAll(): Promise<Essay[]> {
    const { data, error } = await supabase
      .from("essays")
      .select("*")
      .order("published_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async getById(id: string): Promise<Essay | null> {
    const { data, error } = await supabase
      .from("essays")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async create(input: EssayInput): Promise<Essay> {
    const { data, error } = await supabase
      .from("essays")
      .insert(input)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, input: EssayInput): Promise<Essay> {
    const { data, error } = await supabase
      .from("essays")
      .update(input)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from("essays").delete().eq("id", id);
    if (error) throw error;
  },
};

// ============================================================
// Notes
// ============================================================
export const notesApi = {
  async listPublished(): Promise<Note[]> {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async listAll(): Promise<Note[]> {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("published_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async create(input: NoteInput): Promise<Note> {
    const { data, error } = await supabase
      .from("notes")
      .insert(input)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, input: NoteInput): Promise<Note> {
    const { data, error } = await supabase
      .from("notes")
      .update(input)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) throw error;
  },
};

// ============================================================
// Media (зургийн storage)
// ============================================================
const GALLERY_BUCKET = "gallery";

export const galleryApi = {
  // Storage руу зураг хуулж, нийтийн URL буцаана.
  // Нийтлэл, тэмдэглэлд шууд оруулах зурагт ашиглана.
  async uploadImage(file: File): Promise<string> {
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from(GALLERY_BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  },
};
