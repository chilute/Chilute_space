import { lazy, Suspense, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { notesApi } from "@/lib/api";
import type { Note, NoteInput } from "@/lib/database.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const BlockEditor = lazy(() => import("@/components/BlockEditor"));
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type EditState =
  | { mode: "closed" }
  | { mode: "new" }
  | { mode: "edit"; note: Note };

const emptyForm: NoteInput = {
  content: "",
  published: true,
  published_at: new Date().toISOString().slice(0, 10),
};

const NotesAdmin = () => {
  const qc = useQueryClient();
  const [edit, setEdit] = useState<EditState>({ mode: "closed" });
  const [form, setForm] = useState<NoteInput>(emptyForm);

  const { data: notes, isLoading } = useQuery({
    queryKey: ["admin", "notes"],
    queryFn: notesApi.listAll,
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", "notes"] });
    qc.invalidateQueries({ queryKey: ["notes"] });
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (edit.mode === "edit") return notesApi.update(edit.note.id, form);
      return notesApi.create(form);
    },
    onSuccess: () => {
      invalidate();
      toast.success("Хадгаллаа");
      setEdit({ mode: "closed" });
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : "Хадгалахад алдаа гарлаа"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => notesApi.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success("Устгалаа");
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : "Устгахад алдаа гарлаа"),
  });

  const openNew = () => {
    setForm(emptyForm);
    setEdit({ mode: "new" });
  };

  const openEdit = (note: Note) => {
    setForm({
      content: note.content,
      published: note.published,
      published_at: note.published_at.slice(0, 10),
    });
    setEdit({ mode: "edit", note });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-light">Тэмдэглэл</h1>
        {edit.mode === "closed" && (
          <Button onClick={openNew}>
            <Plus className="h-4 w-4 mr-1" /> Шинэ
          </Button>
        )}
      </div>

      {edit.mode !== "closed" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
          }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label>Агуулга</Label>
            <Suspense
              fallback={
                <div className="flex h-48 items-center justify-center rounded-md border border-input bg-background text-sm text-muted-foreground">
                  Засварлагч ачааллаж байна…
                </div>
              }
            >
              <BlockEditor
                key={edit.mode === "edit" ? edit.note.id : "new"}
                initialMarkdown={form.content ?? ""}
                onChange={(content) => setForm({ ...form, content })}
              />
            </Suspense>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Огноо</Label>
            <Input
              id="date"
              type="date"
              value={(form.published_at ?? "").slice(0, 10)}
              onChange={(e) =>
                setForm({ ...form, published_at: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={!!form.published}
              onCheckedChange={(v) => setForm({ ...form, published: v })}
            />
            <Label htmlFor="published">Нийтлэх</Label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Хадгалж байна…" : "Хадгалах"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEdit({ mode: "closed" })}
            >
              Цуцлах
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {isLoading && <p className="text-muted-foreground">Уншиж байна…</p>}
          {notes?.length === 0 && (
            <p className="text-muted-foreground">Тэмдэглэл алга байна.</p>
          )}
          {notes?.map((note) => (
            <div
              key={note.id}
              className="flex items-start justify-between gap-4 border-b border-border/50 pb-4"
            >
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground mb-1">
                  {note.published_at.slice(0, 10)}
                  {!note.published && " · ноорог"}
                </p>
                <p className="text-foreground/90 line-clamp-2">
                  {note.content}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEdit(note)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Устгах уу?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Энэ тэмдэглэлийг бүрмөсөн устгана.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(note.id)}
                      >
                        Устгах
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default NotesAdmin;
