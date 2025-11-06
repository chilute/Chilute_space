import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/50">
        <nav className="container max-w-3xl mx-auto px-6 py-8 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-light tracking-tight opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            tsogi.
          </Link>
          
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`ambient-glow text-sm transition-colors ${
                isActive("/") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/essays"
              className={`ambient-glow text-sm transition-colors ${
                isActive("/essays") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Essays
            </Link>
            <Link
              to="/notes"
              className={`ambient-glow text-sm transition-colors ${
                isActive("/notes") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Notes
            </Link>
            <Link
              to="/about"
              className={`ambient-glow text-sm transition-colors ${
                isActive("/about") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              About
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="container max-w-3xl mx-auto px-6 py-12">
        {children}
      </main>

      <footer className="border-t border-border/50 mt-24">
        <div className="container max-w-3xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          <p>A quiet space where technology meets thought</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
