import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { essaysApi } from "@/lib/api";

const Essays = () => {
  const {
    data: essays,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["essays", "published"],
    queryFn: essaysApi.listPublished,
  });

  return (
    <Layout>
      <div className="fade-in">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-6">Бичвэр</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Технологи, гүн ухаан, ухамсартай амьдралын тухай уртын эргэцүүлэл.
          </p>
        </div>

        {isLoading && (
          <p className="text-muted-foreground">Уншиж байна…</p>
        )}
        {isError && (
          <p className="text-destructive">Алдаа гарлаа. Дахин оролдоно уу.</p>
        )}
        {!isLoading && !isError && essays?.length === 0 && (
          <p className="text-muted-foreground">Одоогоор бичвэр алга байна.</p>
        )}

        <div className="space-y-12">
          {essays?.map((essay, index) => (
            <article
              key={essay.id}
              className="fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/essays/${essay.id}`} className="block">
                <time className="text-sm text-muted-foreground mb-2 block">
                  {essay.published_at.slice(0, 10)}
                </time>
                <h2 className="text-2xl font-normal mb-3 group-hover:text-accent transition-colors ambient-glow">
                  {essay.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {essay.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Essays;
