import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { essaysApi, notesApi } from "@/lib/api";

interface FeedItem {
  key: string;
  to: string;
  typeLabel: string;
  title: string;
  date: string;
  excerpt: string;
}

const Home = () => {
  const { data: essays } = useQuery({
    queryKey: ["essays", "published"],
    queryFn: essaysApi.listPublished,
  });
  const { data: notes } = useQuery({
    queryKey: ["notes", "published"],
    queryFn: notesApi.listPublished,
  });

  const feed: FeedItem[] = [
    ...(essays ?? []).map((e) => ({
      key: `essay-${e.id}`,
      to: `/essays/${e.id}`,
      typeLabel: "Бичвэр",
      title: e.title,
      date: e.published_at,
      excerpt: e.excerpt ?? "",
    })),
    ...(notes ?? []).map((n) => ({
      key: `note-${n.id}`,
      to: "/notes",
      typeLabel: "Тэмдэглэл",
      title: n.content.length > 60 ? `${n.content.slice(0, 60)}…` : n.content,
      date: n.published_at,
      excerpt: n.content,
    })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <Layout>
      <div className="fade-in">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-6 text-balance">
            Сайн уу, надтай хамт мөчүүдийг мэдэрцгээе
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Энэ бол интернэтийн нэгэн нам гүм булан — технологи, гүн ухаан,
            мөн тасралтгүй сатааралтай ертөнцөд ухамсартай амьдрах гэж юу болох тухай би энд дуу хоолойгоо чанга гарган боддог.
          </p>
        </div>

        <div className="space-y-12">
          <h2 className="text-2xl font-light text-muted-foreground">Сүүлийн бичлэгүүд</h2>

          {feed.map((post, index) => (
            <article
              key={post.key}
              className="fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={post.to} className="block">
                <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
                  <time>{post.date.slice(0, 10)}</time>
                  <span>·</span>
                  <span>{post.typeLabel}</span>
                </div>
                <h3 className="text-xl font-normal mb-3 group-hover:text-accent transition-colors ambient-glow">
                  {post.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}

          <div className="pt-8">
            <Link
              to="/essays"
              className="ambient-glow text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Бүх бичлэгийг үзэх →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
