import { useEffect, useRef, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

// Хажуу тийш гүйдэг зургийн эгнээ. Хулганы дугуй (босоо) болон чирэхэд
// хэвтээ гүйлгээ хийнэ — trackpad-аас гадна энгийн хулгана ажиллана.
const ImageRow = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    let down = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = () => {
      down = false;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <span
      ref={ref}
      className="my-4 flex cursor-grab gap-2 overflow-x-auto pb-1 select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>img]:my-0 [&>img]:h-72 [&>img]:w-auto [&>img]:max-h-none [&>img]:flex-none [&>img]:pointer-events-none md:[&>img]:h-[26rem]"
    >
      {children}
    </span>
  );
};

interface MarkdownProps {
  children: string;
  className?: string;
  // "note" — Threads маягаар: зургийг жижиг, бөөрөнхий, хэт өндөр болгохгүй.
  variant?: "default" | "note";
}

// Зэрэгцсэн зөвхөн-зурагт догол мөрүүдийг нэг догол мөр болгон нэгтгэнэ.
const IMG_LINE = /^!\[[^\]]*\]\([^)]*\)$/;
const mergeImageRuns = (md: string): string => {
  const blocks = md.split(/\n{2,}/);
  const out: string[] = [];
  let imgs: string[] = [];
  const flush = () => {
    if (imgs.length) {
      out.push(imgs.join(""));
      imgs = [];
    }
  };
  for (const block of blocks) {
    const t = block.trim();
    if (IMG_LINE.test(t)) imgs.push(t);
    else {
      flush();
      out.push(block);
    }
  }
  flush();
  return out.join("\n\n");
};

// Threads маягийн зураг: бөөрөнхий, хүрээтэй, өндрийг хязгаарласан, зүүн талд.
const noteComponents: Components = {
  img: ({ node: _node, ...props }) => (
    <img
      {...props}
      loading="lazy"
      className="my-4 block max-h-[26rem] w-auto rounded-2xl border border-border"
    />
  ),
  // Зэрэгцсэн олон зургийг хажуу тийш гүйдэг эгнээ (carousel) болгоно.
  p: ({ node, children }) => {
    const kids = (node?.children ?? []).filter(
      (c) => !(c.type === "text" && !String(c.value ?? "").trim()),
    );
    const allImages =
      kids.length > 1 &&
      kids.every((c) => c.type === "element" && c.tagName === "img");
    if (allImages) {
      return <ImageRow>{children}</ImageRow>;
    }
    return <p>{children}</p>;
  },
};

// Нийтлэл, тэмдэглэлийн агуулгыг Markdown-оор харуулна.
// react-markdown нь анхдагчаар түүхий HTML-ийг таних тул XSS эрсдэлгүй.
const Markdown = ({ children, className, variant = "default" }: MarkdownProps) => {
  const isNote = variant === "note";
  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none font-serif text-foreground/90",
        // Гарчиг — серииф, нимгэн
        "prose-headings:font-serif prose-headings:font-light prose-headings:tracking-tight",
        "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
        // Догол мөр, холбоос
        "prose-p:leading-relaxed prose-a:text-foreground prose-a:underline-offset-4",
        // Зураг — note горимд зургийг img-renderer бүрэн удирдана
        isNote ? "prose-img:my-0" : "prose-img:rounded-lg prose-img:mx-auto",
        // Код — JetBrains Mono, зөөлөн дэвсгэр
        "prose-code:font-mono prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:font-mono prose-pre:bg-foreground/[0.05] prose-pre:text-foreground dark:prose-pre:bg-white/[0.05]",
        // Иш татсан мөр
        "prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-foreground/80",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={isNote ? noteComponents : undefined}
      >
        {isNote ? mergeImageRuns(children) : children}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
