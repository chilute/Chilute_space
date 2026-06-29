import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import EssayCard from "@/components/EssayCard";
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
            Магад ирээдүйн надад хэрэг болж мэдэх агуулгууд.
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

        <div className="space-y-8">
          {essays?.map((essay, index) => (
            <EssayCard key={essay.id} essay={essay} index={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Essays;
