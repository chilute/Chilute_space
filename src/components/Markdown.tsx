import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  children: string;
  className?: string;
}

// Нийтлэл, тэмдэглэлийн агуулгыг Markdown-оор харуулна.
// react-markdown нь анхдагчаар түүхий HTML-ийг таних тул XSS эрсдэлгүй.
const Markdown = ({ children, className }: MarkdownProps) => (
  <div
    className={cn(
      "prose prose-neutral dark:prose-invert max-w-none font-serif text-foreground/90",
      // Гарчиг — серииф, нимгэн
      "prose-headings:font-serif prose-headings:font-light prose-headings:tracking-tight",
      "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
      // Догол мөр, холбоос
      "prose-p:leading-relaxed prose-a:text-foreground prose-a:underline-offset-4",
      // Зураг
      "prose-img:rounded-lg prose-img:mx-auto",
      // Код — JetBrains Mono, зөөлөн дэвсгэр
      "prose-code:font-mono prose-code:before:content-none prose-code:after:content-none",
      "prose-pre:font-mono prose-pre:bg-foreground/[0.05] prose-pre:text-foreground dark:prose-pre:bg-white/[0.05]",
      // Иш татсан мөр
      "prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-foreground/80",
      className,
    )}
  >
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
  </div>
);

export default Markdown;
