import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import Markdown from "@/components/Markdown";
import { essaysApi } from "@/lib/api";
import { splitCover } from "@/lib/content";

const EssayDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: essay,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["essay", id],
    queryFn: () => essaysApi.getById(id!),
    enabled: !!id,
  });

  const { cover, body } = splitCover(essay?.content ?? essay?.excerpt ?? "");

  // Төхөөрөмж бүрт нэг л удаа үзэлтийг тоолно (localStorage-аар хамгаална).
  useEffect(() => {
    if (!id) return;
    const key = `viewed-essay-${id}`;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
    essaysApi.incrementViews(id).catch(() => localStorage.removeItem(key));
  }, [id]);

  return (
    <Layout>
      <div className="fade-in">
        <Link
          to="/essays"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Бүх бичвэр
        </Link>

        {isLoading && <p className="text-muted-foreground">Уншиж байна…</p>}
        {isError && (
          <p className="text-destructive">Алдаа гарлаа. Дахин оролдоно уу.</p>
        )}
        {!isLoading && !isError && !essay && (
          <p className="text-muted-foreground">Бичвэр олдсонгүй.</p>
        )}

        {essay && (
          <article>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-5">
              {essay.title}
            </h1>
            {essay.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {essay.excerpt}
              </p>
            )}

            <time className="block border-b border-border/50 pb-6 mb-10 text-sm text-muted-foreground">
              {essay.published_at.slice(0, 10)}
            </time>

            {cover && (
              <img
                src={cover}
                alt=""
                className="mb-10 max-h-[28rem] w-full rounded-xl object-cover"
              />
            )}

            <Markdown className="prose-lg">{body}</Markdown>
          </article>
        )}
      </div>
    </Layout>
  );
};

export default EssayDetail;
