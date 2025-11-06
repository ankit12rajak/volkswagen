import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Gauge, 
  Thermometer, 
  Battery, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  Phone, 
  Navigation, 
  Activity,
  Fuel,
  Wind,
  MapPin,
  ArrowLeft,
  Wrench,
  Clock,
  Settings,
  MessageSquare,
  Bot
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type ViewMode = "dashboard" | "maps" | "diagnostics" | "support";

interface PerformanceMetric {
  label: string;
  value: string;
  icon: any;
  status: "good" | "warning" | "critical";
}

interface Alert {
  id: string;
  type: "warning" | "critical" | "info";
  message: string;
  time: string;
}

const CarMonitor = () => {
  const navigate = useNavigate();
  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setSpeed(Math.floor(Math.random() * 120) + 30);
      setRpm(Math.floor(Math.random() * 4000) + 1000);
      
      // Occasionally add random alerts
      if (Math.random() > 0.95) {
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: Math.random() > 0.7 ? "warning" : "info",
          message: "Engine temperature slightly elevated",
          time: new Date().toLocaleTimeString()
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 3));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const metrics: PerformanceMetric[] = [
    { label: "Engine Temp", value: "87°C", icon: Thermometer, status: "good" },
    { label: "Battery", value: "12.8V", icon: Battery, status: "good" },
    { label: "Fuel Level", value: "68%", icon: Fuel, status: "good" },
    { label: "Tire Pressure", value: "32 PSI", icon: Wind, status: "good" },
    { label: "Oil Life", value: "45%", icon: Activity, status: "warning" },
    { label: "Range", value: "328 km", icon: Navigation, status: "good" },
  ];

  const serviceCenter = {
    name: "Volkswagen Service Center",
    phone: "+1 (800) 822-8987",
    distance: "2.3 km away"
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header with back button */}
      <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30 backdrop-blur-xl">
        <div className="flex items-center justify-between px-8 py-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">Vehicle Monitor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">Connected</span>
          </div>
        </div>
      </div>

      {/* Main Display */}
      <div className="pt-20 px-8 pb-24 max-w-[1600px] mx-auto">
        {viewMode === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Speedometer */}
          <div className="lg:col-span-1">
            <Card className="glass p-8 h-full border-border/30">
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                {/* Speed Display */}
                <div className="relative">
                  <div className="w-64 h-64 rounded-full border-8 border-muted/20 flex items-center justify-center relative overflow-hidden">
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(hsl(var(--primary)) ${speed * 3}deg, transparent ${speed * 3}deg)`
                      }}
                    />
                    <div className="absolute inset-4 rounded-full bg-card" />
                    <div className="relative z-10 text-center">
                      <Gauge className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <div className="text-6xl font-bold text-foreground">{speed}</div>
                      <div className="text-sm text-muted-foreground">km/h</div>
                    </div>
                  </div>
                </div>

                {/* RPM Display */}
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Engine RPM</span>
                    <span className="text-2xl font-bold text-foreground">{rpm}</span>
                  </div>
                  <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${(rpm / 7000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Center Panel - Performance Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Grid */}
            <Card className="glass p-6 border-border/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Vehicle Status</h2>
                <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  All Systems Normal
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {metrics.map((metric, i) => (
                  <div 
                    key={i}
                    className="glass p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <metric.icon className={`w-5 h-5 ${
                        metric.status === 'critical' ? 'text-destructive' :
                        metric.status === 'warning' ? 'text-warning' :
                        'text-success'
                      }`} />
                      <div className={`w-2 h-2 rounded-full ${
                        metric.status === 'critical' ? 'bg-destructive' :
                        metric.status === 'warning' ? 'bg-warning animate-pulse' :
                        'bg-success'
                      }`} />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Alerts Panel */}
            {alerts.length > 0 && (
              <Card className="glass p-6 border-border/30">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
                </div>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div 
                      key={alert.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/30"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'critical' ? 'bg-destructive animate-pulse' :
                        alert.type === 'warning' ? 'bg-warning animate-pulse' :
                        'bg-primary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Service Contact Card */}
            <Card className="glass p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">{serviceCenter.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{serviceCenter.distance}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => window.open(`tel:${serviceCenter.phone}`)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Service Center
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/10"
                      onClick={() => window.open(`tel:${serviceCenter.phone}`)}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      AI Agent Support
                    </Button>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end gap-2">
                  <div className="glass px-4 py-2 rounded-lg border border-border/30">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">{serviceCenter.phone}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        )}

        {/* Maps View */}
        {viewMode === "maps" && (
          <div className="space-y-6">
            <Card className="glass p-8 border-border/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">Navigation & Location</h2>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  <MapPin className="w-3 h-3 mr-1" />
                  GPS Active
                </Badge>
              </div>

              {/* Map Placeholder */}
              <div className="relative w-full h-[500px] bg-muted/20 rounded-xl border border-border/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="w-16 h-16 text-primary mx-auto" />
                    <div>
                      <p className="text-lg font-semibold text-foreground mb-2">Maps Integration</p>
                      <p className="text-sm text-muted-foreground">Connect your Mapbox account to enable real-time navigation</p>
                    </div>
                  </div>
                </div>
                {/* Simulated map grid */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-[10%] border-b border-foreground" />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="glass p-4 border-border/30 hover:border-primary/30 transition-all cursor-pointer">
                  <MapPin className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm font-semibold text-foreground">Nearest Service Center</p>
                  <p className="text-xs text-muted-foreground mt-1">2.3 km away</p>
                </Card>
                <Card className="glass p-4 border-border/30 hover:border-primary/30 transition-all cursor-pointer">
                  <Fuel className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm font-semibold text-foreground">Gas Stations</p>
                  <p className="text-xs text-muted-foreground mt-1">3 nearby options</p>
                </Card>
                <Card className="glass p-4 border-border/30 hover:border-primary/30 transition-all cursor-pointer">
                  <Navigation className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm font-semibold text-foreground">Recent Routes</p>
                  <p className="text-xs text-muted-foreground mt-1">View history</p>
                </Card>
              </div>
            </Card>
          </div>
        )}

        {/* Diagnostics View */}
        {viewMode === "diagnostics" && (
          <div className="space-y-6">
            <Card className="glass p-8 border-border/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">System Diagnostics</h2>
                <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                  <Activity className="w-3 h-3 mr-1" />
                  All Systems OK
                </Badge>
              </div>

              {/* Detailed Diagnostics */}
              <div className="space-y-4">
                {[
                  { system: "Engine Control Unit", status: "Optimal", health: 98, icon: Zap, lastCheck: "2 mins ago" },
                  { system: "Transmission", status: "Good", health: 95, icon: Settings, lastCheck: "5 mins ago" },
                  { system: "Brake System", status: "Optimal", health: 97, icon: Activity, lastCheck: "1 min ago" },
                  { system: "Electrical System", status: "Good", health: 92, icon: Battery, lastCheck: "3 mins ago" },
                  { system: "Cooling System", status: "Optimal", health: 96, icon: Thermometer, lastCheck: "4 mins ago" },
                  { system: "Exhaust System", status: "Good", health: 94, icon: Wind, lastCheck: "6 mins ago" },
                ].map((system, i) => (
                  <Card key={i} className="glass p-6 border-border/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <system.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-foreground">{system.system}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Last checked: {system.lastCheck}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-success">{system.status}</p>
                        <p className="text-2xl font-bold text-foreground">{system.health}%</p>
                      </div>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500"
                        style={{ width: `${system.health}%` }}
                      />
                    </div>
                  </Card>
                ))}
              </div>

              {/* Service History */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-primary" />
                  Recent Service History
                </h3>
                <div className="space-y-3">
                  {[
                    { date: "2025-09-15", service: "Oil Change & Filter", cost: "$89" },
                    { date: "2025-08-01", service: "Tire Rotation", cost: "$45" },
                    { date: "2025-06-20", service: "Brake Inspection", cost: "$120" },
                  ].map((service, i) => (
                    <div key={i} className="glass p-4 rounded-lg border border-border/30 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{service.service}</p>
                        <p className="text-xs text-muted-foreground">{service.date}</p>
                      </div>
                      <p className="text-sm font-bold text-primary">{service.cost}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Support View */}
        {viewMode === "support" && (
          <div className="space-y-6">
            <Card className="glass p-8 border-border/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">Support & Assistance</h2>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  24/7 Available
                </Badge>
              </div>

              {/* AI Agent Card */}
              <Card className="glass p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 mb-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center glow">
                    <Bot className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">AI Assistant</h3>
                    <p className="text-muted-foreground mb-4">
                      Get instant help with vehicle issues, maintenance questions, and troubleshooting guidance.
                    </p>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Start Chat
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Contact Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="glass p-6 border-border/30 hover:border-primary/30 transition-all cursor-pointer">
                  <Phone className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Emergency Hotline</h3>
                  <p className="text-2xl font-bold text-primary mb-2">+1 (800) 822-8987</p>
                  <p className="text-sm text-muted-foreground">24/7 Roadside Assistance</p>
                </Card>
                <Card className="glass p-6 border-border/30 hover:border-primary/30 transition-all cursor-pointer">
                  <MapPin className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Nearest Service Center</h3>
                  <p className="text-sm font-medium text-foreground mb-2">Volkswagen Service Center</p>
                  <p className="text-sm text-muted-foreground">2.3 km away • Open until 6 PM</p>
                </Card>
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Help Topics</h3>
                <div className="space-y-2">
                  {[
                    "How to reset the service indicator?",
                    "What does the tire pressure warning mean?",
                    "When should I schedule my next service?",
                    "How to connect my phone via Bluetooth?",
                  ].map((faq, i) => (
                    <button 
                      key={i}
                      className="w-full text-left glass p-4 rounded-lg border border-border/30 hover:border-primary/30 transition-all group"
                    >
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors">{faq}</p>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Bottom Navigation Bar - Car-style */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-8 py-4 rounded-full border border-border/30 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setViewMode("maps")}
              className={`flex flex-col items-center gap-1 hover:scale-110 transition-transform ${
                viewMode === "maps" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Navigation className="w-6 h-6" />
              <span className="text-xs">Maps</span>
            </button>
            <button 
              onClick={() => setViewMode("diagnostics")}
              className={`flex flex-col items-center gap-1 hover:scale-110 transition-transform ${
                viewMode === "diagnostics" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Activity className="w-6 h-6" />
              <span className="text-xs">Diagnostics</span>
            </button>
            <button 
              onClick={() => setViewMode("dashboard")}
              className={`flex flex-col items-center gap-1 hover:scale-110 transition-transform ${
                viewMode === "dashboard" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Gauge className="w-6 h-6" />
              <span className="text-xs">Dashboard</span>
            </button>
            <button 
              onClick={() => setViewMode("support")}
              className={`flex flex-col items-center gap-1 hover:scale-110 transition-transform ${
                viewMode === "support" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Phone className="w-6 h-6" />
              <span className="text-xs">Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarMonitor;
