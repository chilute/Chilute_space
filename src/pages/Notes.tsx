import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import NoteCard from "@/components/NoteCard";
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

        <div className="space-y-8">
          {notes?.map((note, index) => (
            <NoteCard
              key={note.id}
              content={note.content}
              date={note.published_at}
              index={index}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notes;
