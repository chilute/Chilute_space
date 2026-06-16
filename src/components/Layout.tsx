import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: "/", label: "Нүүр" },
  { to: "/essays", label: "Бичвэр" },
  { to: "/notes", label: "Тэмдэглэл" },
  { to: "/gallery", label: "Зураг" },
  { to: "/about", label: "Тухай" },
];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/50">
        <nav className="container max-w-3xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-light tracking-tight opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            Chilute.
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`ambient-glow text-sm transition-colors ${
                  isActive(item.to)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Цэс хаах" : "Цэс нээх"}
              aria-expanded={menuOpen}
              className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border/50 fade-in">
            <div className="container max-w-3xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`ambient-glow text-base py-2 transition-colors ${
                    isActive(item.to)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="container max-w-3xl mx-auto px-6 py-10 sm:py-12">
        {children}
      </main>

      <footer className="border-t border-border/50 mt-20 sm:mt-24">
        <div className="container max-w-3xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          <p>Технологи бодолтой уулзах нам гүм орон зай</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
