import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Bot, LayoutDashboard, Settings, Users, LogOut, Home, MessageSquare, TrendingUp, FileText, Mail, Target } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const DashboardLayout = ({ children, title, description }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = location.pathname.includes("/admin");

  const adminNavigation = [
    { name: "Dashboard", icon: TrendingUp, path: "/admin" },
    { name: "AI Configuration", icon: Bot, path: "/admin/config" },
    { name: "User Management", icon: Users, path: "/admin/users" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const supportNavigation = [
    { name: "Dashboard", icon: TrendingUp, path: "/support" },
    { name: "Tickets", icon: MessageSquare, path: "/support/tickets" },
    { name: "Analytics", icon: LayoutDashboard, path: "/support/analytics" },
  ];

  const navigation = isAdmin ? adminNavigation : supportNavigation;

  const sidebarItems = [
    { icon: TrendingUp, path: isAdmin ? "/admin" : "/support" },
    { icon: isAdmin ? Bot : MessageSquare, path: isAdmin ? "/admin/config" : "/support/tickets" },
    { icon: isAdmin ? Users : LayoutDashboard, path: isAdmin ? "/admin/users" : "/support/analytics" },
    { icon: Settings, path: isAdmin ? "/admin/settings" : "/support" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Icon Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-20 bg-card border-r border-border/50 flex flex-col items-center py-6 z-50">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-10 shadow-lg">
          <span className="text-2xl font-bold text-primary-foreground">P</span>
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col gap-3 w-full px-3">
          {sidebarItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`
                  w-14 h-14 rounded-full flex items-center justify-center transition-all
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/30"
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={() => navigate("/auth")}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-muted/50 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all border border-border/30"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </aside>

      {/* Top Navbar */}
      <nav className="fixed top-0 left-20 right-0 h-16 bg-card border-b border-border/50 flex items-center px-8 z-40">
        <div className="flex items-center gap-8">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  text-sm font-medium transition-colors relative py-2
                  ${isActive 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-20 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
