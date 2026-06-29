import { Link } from "react-router-dom";
import { firstImage } from "@/lib/content";
import type { Essay } from "@/lib/database.types";

interface EssayCardProps {
  essay: Essay;
  index?: number;
}

// Substack archive маягийн нийтлэлийн мөр: зүүн талд гарчиг + товч, баруун талд thumbnail.
const EssayCard = ({ essay, index = 0 }: EssayCardProps) => {
  const thumb = firstImage(essay.content);
  return (
    <article
      className="fade-in group border-b border-border/50 pb-8"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link to={`/essays/${essay.id}`} className="flex items-start gap-5">
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-sm text-muted-foreground">
            Бичвэр · {essay.published_at.slice(0, 10)}
          </div>
          <h3 className="text-2xl font-medium leading-snug tracking-tight group-hover:text-accent transition-colors">
            {essay.title}
          </h3>
          {essay.excerpt && (
            <p className="mt-2 text-muted-foreground leading-relaxed line-clamp-2">
              {essay.excerpt}
            </p>
          )}
        </div>
        {thumb && (
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="h-28 w-28 flex-shrink-0 rounded-md object-cover sm:h-32 sm:w-32"
          />
        )}
      </Link>
    </article>
  );
};

export default EssayCard;
