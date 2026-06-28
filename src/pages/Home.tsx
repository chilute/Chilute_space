import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import Markdown from "@/components/Markdown";
import { essaysApi, notesApi } from "@/lib/api";

type FeedItem =
  | {
      kind: "essay";
      key: string;
      to: string;
      title: string;
      date: string;
      excerpt: string;
    }
  | {
      kind: "note";
      key: string;
      date: string;
      content: string;
    };

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
    ...(essays ?? []).map(
      (e): FeedItem => ({
        kind: "essay",
        key: `essay-${e.id}`,
        to: `/essays/${e.id}`,
        title: e.title,
        date: e.published_at,
        excerpt: e.excerpt ?? "",
      }),
    ),
    ...(notes ?? []).map(
      (n): FeedItem => ({
        kind: "note",
        key: `note-${n.id}`,
        date: n.published_at,
        content: n.content,
      }),
    ),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <Layout>
      <div className="fade-in">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-6 text-balance">
            Чөлөөт тэмдэглэл
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Дасал болсон шуугианаас алсрахыг хүссэн орон зай.
          </p>
        </div>

        <div className="space-y-12">
          <h2 className="text-2xl font-light text-muted-foreground">Сүүлийн бичвэрүүд</h2>

          {feed.map((post, index) =>
            post.kind === "essay" ? (
              <article
                key={post.key}
                className="fade-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={post.to} className="block">
                  <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
                    <time>{post.date.slice(0, 10)}</time>
                    <span>·</span>
                    <span>Бичвэр</span>
                  </div>
                  <h3 className="text-xl font-normal mb-3 group-hover:text-accent transition-colors ambient-glow">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ) : (
              <article
                key={post.key}
                className="fade-in border-l-2 border-border pl-6 py-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
                  <time>{post.date.slice(0, 10)}</time>
                  <span>·</span>
                  <span>Тэмдэглэл</span>
                </div>
                <Markdown className="prose-sm">{post.content}</Markdown>
              </article>
            ),
          )}

          <div className="pt-8">
            <Link
              to="/essays"
              className="ambient-glow text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Бүх бичвэрийг үзэх →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
