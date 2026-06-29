import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import Feed from "@/components/Feed";
import { essaysApi, notesApi } from "@/lib/api";

const Home = () => {
  const { data: essays } = useQuery({
    queryKey: ["essays", "published"],
    queryFn: essaysApi.listPublished,
  });
  const { data: notes } = useQuery({
    queryKey: ["notes", "published"],
    queryFn: notesApi.listPublished,
  });

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

          <Feed essays={essays} notes={notes} limit={4} />

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
