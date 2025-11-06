import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Nominations from "./pages/Nominations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [is360View, setIs360View] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full relative">
              <div className="relative z-50">
                <AppSidebar />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 flex items-center gap-4 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6 sticky top-0 z-40">
                  <SidebarTrigger />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-foreground">
                      360° Feedback Platform
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-accent"
                  >
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground border-0">
                      3
                    </Badge>
                  </Button>
                  <Button
                    variant={is360View ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIs360View(!is360View)}
                    className="gap-2"
                  >
                    {is360View ? "360° View" : "Summary View"}
                  </Button>
                </header>
                <main className="flex-1 overflow-x-hidden">
                  <Routes>
                    <Route path="/" element={<Nominations />} />
                    <Route path="/feedback" element={<Index is360View={is360View} />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/admin" element={<Admin />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
