import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import SupportDashboard from "./pages/SupportDashboard";
import AIConfiguration from "./pages/admin/AIConfiguration";
import UserManagement from "./pages/admin/UserManagement";
import Settings from "./pages/admin/Settings";
import Tickets from "./pages/support/Tickets";
import Analytics from "./pages/support/Analytics";
import CarMonitor from "./pages/CarMonitor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/car-monitor" element={<CarMonitor />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/config" element={
              <ProtectedRoute requiredRole="admin">
                <AIConfiguration />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute requiredRole="admin">
                <Settings />
              </ProtectedRoute>
            } />
            
            {/* Support Routes */}
            <Route path="/support" element={
              <ProtectedRoute requiredRole="support">
                <SupportDashboard />
              </ProtectedRoute>
            } />
            <Route path="/support/tickets" element={
              <ProtectedRoute requiredRole="support">
                <Tickets />
              </ProtectedRoute>
            } />
            <Route path="/support/analytics" element={
              <ProtectedRoute requiredRole="support">
                <Analytics />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
