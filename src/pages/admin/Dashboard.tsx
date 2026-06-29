import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FileText, StickyNote } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Feed from "@/components/Feed";
import { essaysApi, notesApi } from "@/lib/api";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const { data: essays } = useQuery({
    queryKey: ["admin", "essays"],
    queryFn: essaysApi.listAll,
  });
  const { data: notes } = useQuery({
    queryKey: ["admin", "notes"],
    queryFn: notesApi.listAll,
  });

  const cards = [
    {
      to: "/admin/essays",
      label: "Бичвэр",
      count: essays?.length,
      icon: FileText,
    },
    {
      to: "/admin/notes",
      label: "Тэмдэглэл",
      count: notes?.length,
      icon: StickyNote,
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-light mb-10">Хяналтын самбар</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((c) => (
          <Link key={c.to} to={c.to}>
            <Card className="p-6 hover:border-foreground/30 transition-colors h-full">
              <c.icon className="h-6 w-6 text-muted-foreground mb-4" />
              <div className="text-3xl font-light">{c.count ?? "—"}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {c.label}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-16 space-y-8">
        <h2 className="text-xl font-light text-muted-foreground">Сүүлийн үед</h2>
        <Feed essays={essays} notes={notes} limit={6} />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
