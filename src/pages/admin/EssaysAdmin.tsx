import { lazy, Suspense, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { essaysApi } from "@/lib/api";
import type { Essay, EssayInput } from "@/lib/database.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  | { mode: "edit"; essay: Essay };

const emptyForm: EssayInput = {
  title: "",
  excerpt: "",
  content: "",
  published: true,
  published_at: new Date().toISOString().slice(0, 10),
};

const EssaysAdmin = () => {
  const qc = useQueryClient();
  const [edit, setEdit] = useState<EditState>({ mode: "closed" });
  const [form, setForm] = useState<EssayInput>(emptyForm);

  const { data: essays, isLoading } = useQuery({
    queryKey: ["admin", "essays"],
    queryFn: essaysApi.listAll,
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", "essays"] });
    qc.invalidateQueries({ queryKey: ["essays"] });
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (edit.mode === "edit") {
        return essaysApi.update(edit.essay.id, form);
      }
      return essaysApi.create(form);
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
    mutationFn: (id: string) => essaysApi.remove(id),
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

  const openEdit = (essay: Essay) => {
    setForm({
      title: essay.title,
      excerpt: essay.excerpt ?? "",
      content: essay.content ?? "",
      published: essay.published,
      published_at: essay.published_at.slice(0, 10),
    });
    setEdit({ mode: "edit", essay });
  };

  return (
    <AdminLayout>
      {edit.mode === "closed" && (
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-light">Бичвэр</h1>
          <Button onClick={openNew}>
            <Plus className="h-4 w-4 mr-1" /> Шинэ
          </Button>
        </div>
      )}

      {edit.mode !== "closed" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
          }}
        >
          {/* Үйлдлийн мөр */}
          <div className="flex items-center justify-end gap-2 mb-8">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEdit({ mode: "closed" })}
            >
              Цуцлах
            </Button>
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Хадгалж байна…" : "Хадгалах"}
            </Button>
          </div>

          {/* Нэгдсэн засварлагч — гарчиг, дэд гарчиг, агуулга нэг гадаргуу дээр.
              Зүүн зайг BlockEditor доторх 54px-тэй тааруулж эгнүүлнэ. */}
          <div className="space-y-1">
            <input
              value={form.title ?? ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Гарчиг"
              required
              className="w-full bg-transparent px-[54px] font-serif text-4xl md:text-5xl font-light tracking-tight placeholder:text-muted-foreground/40 focus:outline-none"
            />
            <Textarea
              value={form.excerpt ?? ""}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Дэд гарчиг нэмэх…"
              rows={1}
              className="w-full resize-none border-0 bg-transparent px-[54px] font-serif text-xl text-muted-foreground shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Suspense
              fallback={
                <div className="flex h-64 items-center px-[54px] text-sm text-muted-foreground">
                  Засварлагч ачааллаж байна…
                </div>
              }
            >
              <BlockEditor
                key={edit.mode === "edit" ? edit.essay.id : "new"}
                initialMarkdown={form.content ?? ""}
                onChange={(content) => setForm({ ...form, content })}
              />
            </Suspense>
          </div>

          {/* Нэмэлт тохиргоо */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border/50 px-[54px] pt-6">
            <div className="flex items-center gap-3">
              <Label htmlFor="date" className="text-muted-foreground">
                Огноо
              </Label>
              <Input
                id="date"
                type="date"
                className="w-auto"
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
              <Label htmlFor="published" className="text-muted-foreground">
                Нийтлэх
              </Label>
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {isLoading && <p className="text-muted-foreground">Уншиж байна…</p>}
          {essays?.length === 0 && (
            <p className="text-muted-foreground">Бичвэр алга байна.</p>
          )}
          {essays?.map((essay) => (
            <div
              key={essay.id}
              className="flex items-center justify-between gap-4 border-b border-border/50 pb-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate font-normal">{essay.title}</span>
                  {!essay.published && (
                    <span className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">
                      ноорог
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {essay.published_at.slice(0, 10)}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEdit(essay)}
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
                        "{essay.title}" эссэг бүрмөсөн устгана.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(essay.id)}
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

export default EssaysAdmin;
