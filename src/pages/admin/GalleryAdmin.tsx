import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, Plus, Upload } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { galleryApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const GalleryAdmin = () => {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");

  const { data: images, isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: galleryApi.list,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["gallery"] });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Зураг сонгоно уу");
      const src = await galleryApi.uploadImage(file);
      const nextOrder = (images?.length ?? 0) + 1;
      return galleryApi.create({
        src,
        alt: alt || null,
        caption: caption || null,
        sort_order: nextOrder,
      });
    },
    onSuccess: () => {
      invalidate();
      toast.success("Зураг нэмлээ");
      setShowForm(false);
      setFile(null);
      setAlt("");
      setCaption("");
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : "Нэмэхэд алдаа гарлаа"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => galleryApi.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success("Устгалаа");
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : "Устгахад алдаа гарлаа"),
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-light">Зураг</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-1" /> Шинэ
          </Button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            uploadMutation.mutate();
          }}
          className="space-y-5 mb-12 border-b border-border/50 pb-10"
        >
          <div className="space-y-2">
            <Label htmlFor="file">Зураг сонгох</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alt">Alt текст</Label>
            <Input
              id="alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Зургийн тайлбар (хүртээмж)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="caption">Тайлбар</Label>
            <Input
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Доор харагдах бичиг"
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={uploadMutation.isPending}>
              <Upload className="h-4 w-4 mr-1" />
              {uploadMutation.isPending ? "Хуулж байна…" : "Хуулах"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowForm(false)}
            >
              Цуцлах
            </Button>
          </div>
        </form>
      )}

      {isLoading && <p className="text-muted-foreground">Уншиж байна…</p>}
      {images?.length === 0 && (
        <p className="text-muted-foreground">Зураг алга байна.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images?.map((image) => (
          <div key={image.id} className="group relative">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted/30">
              <img
                src={image.src}
                alt={image.alt ?? ""}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {image.caption && (
              <p className="mt-2 text-xs text-muted-foreground truncate">
                {image.caption}
              </p>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="h-4 w-4" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Устгах уу?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Энэ зургийг жагсаалтаас устгана.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteMutation.mutate(image.id)}
                  >
                    Устгах
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default GalleryAdmin;
