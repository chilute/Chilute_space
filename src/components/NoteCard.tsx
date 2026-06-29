import Markdown from "@/components/Markdown";

interface NoteCardProps {
  content: string;
  date: string;
  index?: number;
}

// Threads маягийн тэмдэглэл: нэр · огноо толгой, дараа нь агуулга + бөөрөнхий зураг.
const NoteCard = ({ content, date, index = 0 }: NoteCardProps) => (
  <article
    className="fade-in border-b border-border/50 pb-8"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    <div className="mb-2 flex items-center gap-2 text-sm">
      <span className="font-medium text-foreground/90">Тэмдэглэл</span>
      <span className="text-muted-foreground">·</span>
      <time className="text-muted-foreground">{date.slice(0, 10)}</time>
    </div>
    <Markdown variant="note" className="prose-sm prose-p:my-3 prose-p:first:mt-0">
      {content}
    </Markdown>
  </article>
);

export default NoteCard;
