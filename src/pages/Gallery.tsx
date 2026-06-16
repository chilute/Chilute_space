import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { galleryApi } from "@/lib/api";
import type { GalleryImage } from "@/lib/database.types";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const {
    data: images,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["gallery"],
    queryFn: galleryApi.list,
  });

  return (
    <Layout>
      <div className="fade-in">
        <h1 className="text-4xl mb-4 opacity-90">Зураг</h1>
        <p className="text-muted-foreground mb-16 text-lg leading-relaxed">
          Мөчүүдийн нам гүм музей
        </p>

        {isLoading && <p className="text-muted-foreground">Уншиж байна…</p>}
        {isError && (
          <p className="text-destructive">Алдаа гарлаа. Дахин оролдоно уу.</p>
        )}
        {!isLoading && !isError && images?.length === 0 && (
          <p className="text-muted-foreground">Одоогоор зураг алга байна.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images?.map((image, index) => (
            <div
              key={image.id}
              className="group cursor-pointer fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-muted/30">
                <img
                  src={image.src}
                  alt={image.alt ?? ""}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
              {image.caption && (
                <p className="mt-3 text-sm text-muted-foreground italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox for full image view */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-pointer fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl max-h-[90vh] w-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt ?? ""}
                className="w-full h-full object-contain rounded-lg"
              />
              {selectedImage.caption && (
                <p className="mt-6 text-center text-muted-foreground italic text-lg">
                  {selectedImage.caption}
                </p>
              )}
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
