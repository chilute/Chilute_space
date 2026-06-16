import { useState } from "react";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const { signIn, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from
    ?.pathname ?? "/admin";

  // Аль хэдийн нэвтэрсэн бол шууд админ руу
  if (session) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Тавтай морил");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Нэвтрэхэд алдаа гарлаа",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 fade-in">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="block text-2xl font-light tracking-tight opacity-70 hover:opacity-100 transition-opacity mb-10 text-center"
        >
          Chilute.
        </Link>
        <h1 className="text-2xl font-light mb-8 text-center">Админ нэвтрэх</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Имэйл</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Нууц үг</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Түр хүлээнэ үү…" : "Нэвтрэх"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
