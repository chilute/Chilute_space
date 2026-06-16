import { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { to: "/admin", label: "Хяналтын самбар", end: true },
  { to: "/admin/essays", label: "Бичвэр" },
  { to: "/admin/notes", label: "Тэмдэглэл" },
  { to: "/admin/gallery", label: "Зураг" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Гарлаа");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/50">
        <nav className="container max-w-4xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl font-light tracking-tight opacity-70 hover:opacity-100 transition-opacity"
            >
              Chilute.
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `text-sm transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-xs text-muted-foreground">
              {user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Гарах
            </button>
          </div>
        </nav>
        {/* Mobile nav */}
        <div className="sm:hidden border-t border-border/50">
          <div className="container max-w-4xl mx-auto px-6 py-3 flex gap-5 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
};

export default AdminLayout;
