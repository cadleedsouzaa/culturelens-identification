import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- IMPORT PAGES ---
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Result from "./pages/Result"; // The AR Page
import Archive from "./pages/Archive"; // The Gallery Page (NEW)

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* 1. HOME / CAMERA */}
            <Route path="/" element={<Index />} />
            
            {/* 2. AR RESULT (The Redirection Target) */}
            <Route path="/result/:id" element={<Result />} />

            {/* 3. ARCHIVE GALLERY (The "View Full Archive" Target) */}
            <Route path="/archive" element={<Archive />} />
            
            {/* 4. 404 PAGE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}