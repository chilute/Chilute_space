import { useState } from "react";
import Layout from "@/components/Layout";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Placeholder images - replace with actual images
  const images: GalleryImage[] = [
    { id: 1, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", alt: "Mountain landscape at dawn", caption: "Silence speaks" },
    { id: 2, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", alt: "Misty forest path", caption: "Where thoughts wander" },
    { id: 3, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", alt: "Forest canopy", caption: "Beneath the green" },
    { id: 4, src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff", alt: "Desert sunset", caption: "Golden hour" },
    { id: 5, src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29", alt: "Ocean horizon", caption: "Endless blue" },
    { id: 6, src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e", alt: "Minimal winter scene", caption: "Winter whispers" },
  ];

  return (
    <Layout>
      <div className="fade-in">
        <h1 className="text-4xl mb-4 opacity-90">Gallery</h1>
        <p className="text-muted-foreground mb-16 text-lg leading-relaxed">
          A quiet museum of moments
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group cursor-pointer fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-muted/30">
                <img
                  src={image.src}
                  alt={image.alt}
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
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-8 cursor-pointer fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl max-h-[90vh] w-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
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
