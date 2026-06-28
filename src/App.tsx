import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Essays from "./pages/Essays";
import EssayDetail from "./pages/EssayDetail";
import Notes from "./pages/Notes";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import EssaysAdmin from "./pages/admin/EssaysAdmin";
import NotesAdmin from "./pages/admin/NotesAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Нийтийн хуудсууд */}
            <Route path="/" element={<Home />} />
            <Route path="/essays" element={<Essays />} />
            <Route path="/essays/:id" element={<EssayDetail />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/about" element={<About />} />

            {/* Админ хэсэг */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/essays"
              element={
                <ProtectedRoute>
                  <EssaysAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notes"
              element={
                <ProtectedRoute>
                  <NotesAdmin />
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
