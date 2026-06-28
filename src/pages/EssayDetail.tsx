import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import Markdown from "@/components/Markdown";
import { essaysApi } from "@/lib/api";

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
            <time className="text-sm text-muted-foreground mb-4 block">
              {essay.published_at.slice(0, 10)}
            </time>
            <h1 className="text-4xl md:text-5xl font-light mb-8">
              {essay.title}
            </h1>
            <Markdown>{essay.content || essay.excerpt || ""}</Markdown>
          </article>
        )}
      </div>
    </Layout>
  );
};

export default EssayDetail;
