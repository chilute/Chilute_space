import EssayCard from "@/components/EssayCard";
import NoteCard from "@/components/NoteCard";
import type { Essay, Note } from "@/lib/database.types";

type FeedItem =
  | { kind: "essay"; key: string; date: string; essay: Essay }
  | { kind: "note"; key: string; date: string; note: Note };

interface FeedProps {
  essays?: Essay[];
  notes?: Note[];
  limit?: number;
}

// Нүүр болон админ самбарт хэрэглэгддэг эссэ + тэмдэглэлийн нэгдсэн урсгал.
const Feed = ({ essays, notes, limit }: FeedProps) => {
  const items: FeedItem[] = [
    ...(essays ?? []).map(
      (e): FeedItem => ({
        kind: "essay",
        key: `essay-${e.id}`,
        date: e.published_at,
        essay: e,
      }),
    ),
    ...(notes ?? []).map(
      (n): FeedItem => ({
        kind: "note",
        key: `note-${n.id}`,
        date: n.published_at,
        note: n,
      }),
    ),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const visible = limit ? items.slice(0, limit) : items;

  return (
    <div className="space-y-8">
      {visible.map((item, index) =>
        item.kind === "essay" ? (
          <EssayCard key={item.key} essay={item.essay} index={index} />
        ) : (
          <NoteCard
            key={item.key}
            content={item.note.content}
            date={item.note.published_at}
            index={index}
          />
        ),
      )}
    </div>
  );
};

export default Feed;
