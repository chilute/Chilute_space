import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import Markdown from "@/components/Markdown";
import { notesApi } from "@/lib/api";

const Notes = () => {
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", "published"],
    queryFn: notesApi.listPublished,
  });

  return (
    <Layout>
      <div className="fade-in">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-6">Тэмдэглэл</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Түүхий бодролууд
          </p>
        </div>

        {isLoading && <p className="text-muted-foreground">Уншиж байна…</p>}
        {isError && (
          <p className="text-destructive">Алдаа гарлаа. Дахин оролдоно уу.</p>
        )}
        {!isLoading && !isError && notes?.length === 0 && (
          <p className="text-muted-foreground">Одоогоор тэмдэглэл алга байна.</p>
        )}

        <div className="space-y-10">
          {notes?.map((note, index) => (
            <article
              key={note.id}
              className="fade-in border-l-2 border-border pl-6 py-2"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <time className="text-sm text-muted-foreground block mb-3">
                {note.published_at.slice(0, 10)}
              </time>
              <Markdown className="prose-sm">{note.content}</Markdown>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notes;
