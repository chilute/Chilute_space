// Supabase хүснэгтүүдийн TypeScript төрлүүд.
// Schema өөрчлөгдвөл энд гар аргаар, эсвэл `supabase gen types` командаар шинэчилнэ.

export interface Essay {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  published: boolean;
  published_at: string;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  content: string;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string | null;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

// Шинээр оруулах/засах үед id болон auto талбаруудыг хасна
export type EssayInput = Partial<
  Pick<Essay, "title" | "excerpt" | "content" | "published" | "published_at">
>;
export type NoteInput = Partial<
  Pick<Note, "content" | "published" | "published_at">
>;
export type GalleryImageInput = Partial<
  Pick<GalleryImage, "src" | "alt" | "caption" | "sort_order">
>;
