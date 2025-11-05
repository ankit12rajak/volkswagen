import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  Phone, 
  CheckCircle, 
  Target, 
  BarChart3, 
  Activity,
  Star,
  DollarSign,
  Wrench,
  Car,
  Award,
  Languages
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Analytics = () => {
  // Dealership KPIs
  const kpiStats = [
    {
      title: "Monthly Revenue",
      value: "₹45.2L",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Services Completed",
      value: "342",
      change: "+28 this week",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.2 improvement",
      changeType: "positive" as const,
      icon: Star,
    },
    {
      title: "AI Call Success Rate",
      value: "94.2%",
      change: "+3.1% this month",
      changeType: "positive" as const,
      icon: Phone,
    },
    {
      title: "Avg Response Time",
      value: "2.3 hrs",
      change: "-0.5 hrs faster",
      changeType: "positive" as const,
      icon: Clock,
    },
    {
      title: "Active Staff",
      value: "22/24",
      change: "92% attendance",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Service Bay Utilization",
      value: "78%",
      change: "+5% this week",
      changeType: "positive" as const,
      icon: Activity,
    },
    {
      title: "Repeat Customers",
      value: "68%",
      change: "+4% loyalty",
      changeType: "positive" as const,
      icon: Award,
    },
  ];

  // Revenue and Services Trend
  const revenueTrend = [
    { date: "Week 1", revenue: 980000, services: 78, satisfaction: 4.6 },
    { date: "Week 2", revenue: 1050000, services: 85, satisfaction: 4.7 },
    { date: "Week 3", revenue: 1120000, services: 89, satisfaction: 4.7 },
    { date: "Week 4", revenue: 1370000, services: 90, satisfaction: 4.8 },
  ];

  // AI Use Case Distribution
  const useCaseData = [
    { name: "Cost Breakdown", value: 127, color: "hsl(38, 92%, 50%)", percentage: 37.1 },
    { name: "Predictive Maintenance", value: 108, color: "hsl(142, 76%, 36%)", percentage: 31.6 },
    { name: "General Service", value: 107, color: "hsl(199, 89%, 48%)", percentage: 31.3 },
  ];

  // Language Distribution
  const languageData = [
    { name: "Hindi", value: 142, color: "hsl(38, 92%, 50%)" },
    { name: "English", value: 98, color: "hsl(199, 89%, 48%)" },
    { name: "Gujarati", value: 56, color: "hsl(142, 76%, 36%)" },
    { name: "Urdu", value: 32, color: "hsl(271, 76%, 53%)" },
    { name: "Marathi", value: 14, color: "hsl(217, 91%, 60%)" },
  ];

  // Service completion time by type
  const serviceTimeData = [
    { service: "Oil Change", avgTime: 45, target: 60 },
    { service: "Brake Service", avgTime: 90, target: 120 },
    { service: "AC Repair", avgTime: 150, target: 180 },
    { service: "Transmission", avgTime: 240, target: 300 },
    { service: "Engine Diagnostic", avgTime: 120, target: 150 },
    { service: "Tire Service", avgTime: 30, target: 45 },
  ];

  // Staff Performance
  const staffPerformanceData = [
    { 
      metric: "Efficiency", 
      target: 85,
      current: 89
    },
    { 
      metric: "Quality", 
      target: 90,
      current: 92
    },
    { 
      metric: "Customer Service", 
      target: 85,
      current: 88
    },
    { 
      metric: "Punctuality", 
      target: 95,
      current: 94
    },
    { 
      metric: "Technical Skills", 
      target: 80,
      current: 87
    },
  ];

  // Daily AI Call Volume
  const aiCallVolumeData = [
    { day: "Mon", costBreakdown: 22, predictive: 18, general: 20 },
    { day: "Tue", costBreakdown: 25, predictive: 21, general: 23 },
    { day: "Wed", costBreakdown: 23, predictive: 19, general: 21 },
    { day: "Thu", costBreakdown: 28, predictive: 24, general: 26 },
    { day: "Fri", costBreakdown: 29, predictive: 26, general: 23 },
  ];

  // Top Services by Revenue
  const topServices = [
    { service: "AC Repair & Maintenance", count: 45, revenue: "₹10.2L", trend: "up", change: "+15%" },
    { service: "Brake System Service", count: 52, revenue: "₹8.7L", trend: "up", change: "+8%" },
    { service: "Engine Diagnostics", count: 38, revenue: "₹7.5L", trend: "neutral", change: "0%" },
    { service: "Transmission Service", count: 28, revenue: "₹6.8L", trend: "up", change: "+12%" },
    { service: "Routine Maintenance", count: 89, revenue: "₹5.2L", trend: "down", change: "-3%" },
  ];

  // Customer approval rates for cost breakdowns
  const approvalRateData = [
    { range: "< ₹5,000", approved: 95, declined: 5 },
    { range: "₹5,000-₹10,000", approved: 88, declined: 12 },
    { range: "₹10,000-₹20,000", approved: 72, declined: 28 },
    { range: "₹20,000-₹30,000", approved: 58, declined: 42 },
    { range: "> ₹30,000", approved: 45, declined: 55 },
  ];

  // Peak hours analysis
  const peakHoursData = [
    { hour: "8 AM", calls: 5, appointments: 3, revenue: 45000 },
    { hour: "9 AM", calls: 8, appointments: 5, revenue: 68000 },
    { hour: "10 AM", calls: 12, appointments: 7, revenue: 95000 },
    { hour: "11 AM", calls: 15, appointments: 9, revenue: 125000 },
    { hour: "12 PM", calls: 10, appointments: 6, revenue: 78000 },
    { hour: "1 PM", calls: 8, appointments: 4, revenue: 52000 },
    { hour: "2 PM", calls: 11, appointments: 7, revenue: 89000 },
    { hour: "3 PM", calls: 9, appointments: 5, revenue: 67000 },
    { hour: "4 PM", calls: 13, appointments: 8, revenue: 102000 },
    { hour: "5 PM", calls: 11, appointments: 6, revenue: 85000 },
  ];

  const COLORS = [
    "hsl(199, 89%, 48%)",
    "hsl(142, 76%, 36%)",
    "hsl(38, 92%, 50%)",
    "hsl(271, 76%, 53%)",
    "hsl(217, 91%, 60%)",
  ];

  return (
    <DashboardLayout 
      title="Dealership Analytics" 
      description="VW Mumbai Central - Comprehensive performance insights"
    >
      <div className="space-y-8">
        {/* KPI Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiStats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Main Analytics Tabs */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Performance Analytics
            </CardTitle>
            <CardDescription>Detailed insights across revenue, services, and AI interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-muted/50">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="ai_usage">AI Usage</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="peak_hours">Peak Hours</TabsTrigger>
              </TabsList>

              {/* Revenue Tab */}
              <TabsContent value="revenue" className="mt-6">
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={revenueTrend}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                    <XAxis dataKey="date" stroke="hsl(0, 0%, 60%)" />
                    <YAxis yAxisId="left" stroke="hsl(0, 0%, 60%)" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(0, 0%, 60%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 6%)', 
                        border: '1px solid hsl(0, 0%, 18%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(142, 76%, 36%)" 
                      fillOpacity={1} 
                      fill="url(#revenueGradient)" 
                      name="Revenue (₹)"
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="services" 
                      fill="hsl(199, 89%, 48%)" 
                      name="Services Completed"
                      radius={[8, 8, 0, 0]}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="satisfaction" 
                      stroke="hsl(38, 92%, 50%)" 
                      strokeWidth={3}
                      name="Satisfaction (1-5)"
                      dot={{ fill: "hsl(38, 92%, 50%)", r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </TabsContent>

              {/* AI Usage Tab */}
              <TabsContent value="ai_usage" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Use Case Distribution */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">AI Use Case Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={useCaseData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {useCaseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(0, 0%, 6%)', 
                            border: '1px solid hsl(0, 0%, 18%)',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2">
                      {useCaseData.map((useCase, i) => (
                        <div key={i} className="p-3 rounded-lg border border-border/50 bg-card/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{useCase.name}</span>
                            <span className="text-lg font-bold text-primary">{useCase.value}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted/50 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all" 
                                style={{ 
                                  width: `${useCase.percentage}%`,
                                  backgroundColor: useCase.color
                                }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground min-w-[50px] text-right">
                              {useCase.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Language Distribution */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Languages className="w-5 h-5 text-primary" />
                      Language Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={languageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {languageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(0, 0%, 6%)', 
                            border: '1px solid hsl(0, 0%, 18%)',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="font-semibold">Multilingual Success</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        AI voice assistant successfully handles 5 languages with 94% accuracy, serving diverse customer base.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Daily AI Call Volume */}
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-4">Daily AI Call Volume by Use Case</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={aiCallVolumeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                      <XAxis dataKey="day" stroke="hsl(0, 0%, 60%)" />
                      <YAxis stroke="hsl(0, 0%, 60%)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(0, 0%, 6%)', 
                          border: '1px solid hsl(0, 0%, 18%)',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="costBreakdown" stackId="a" fill="hsl(38, 92%, 50%)" name="Cost Breakdown" />
                      <Bar dataKey="predictive" stackId="a" fill="hsl(142, 76%, 36%)" name="Predictive Maintenance" />
                      <Bar dataKey="general" stackId="a" fill="hsl(199, 89%, 48%)" name="General Service" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Service Completion Time */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Service Completion Time</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={serviceTimeData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                        <XAxis type="number" stroke="hsl(0, 0%, 60%)" label={{ value: 'Minutes', position: 'insideBottom', offset: -5 }} />
                        <YAxis type="category" dataKey="service" stroke="hsl(0, 0%, 60%)" width={120} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(0, 0%, 6%)', 
                            border: '1px solid hsl(0, 0%, 18%)',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="avgTime" fill="hsl(142, 76%, 36%)" name="Avg Time" />
                        <Bar dataKey="target" fill="hsl(0, 0%, 40%)" name="Target" opacity={0.5} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Top Services by Revenue */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Top Services by Revenue</h3>
                    {topServices.map((service, i) => (
                      <div key={i} className="p-4 rounded-lg border border-border/50 bg-card/30">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{service.service}</span>
                              {service.trend === "up" && <TrendingUp className="w-4 h-4 text-success" />}
                              {service.trend === "down" && <TrendingDown className="w-4 h-4 text-muted-foreground" />}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {service.count} services completed
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-success">{service.revenue}</p>
                            <Badge 
                              variant="outline"
                              className={
                                service.trend === "up" ? "border-success text-success" :
                                service.trend === "down" ? "border-muted text-muted-foreground" :
                                "border-border text-foreground"
                              }
                            >
                              {service.change}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Approval Rates */}
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-4">Customer Approval Rates by Cost Range</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={approvalRateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                      <XAxis dataKey="range" stroke="hsl(0, 0%, 60%)" />
                      <YAxis stroke="hsl(0, 0%, 60%)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(0, 0%, 6%)', 
                          border: '1px solid hsl(0, 0%, 18%)',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="approved" stackId="a" fill="hsl(142, 76%, 36%)" name="Approved %" />
                      <Bar dataKey="declined" stackId="a" fill="hsl(0, 72%, 51%)" name="Declined %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              {/* Staff Tab */}
              <TabsContent value="staff" className="mt-6">
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={staffPerformanceData}>
                    <PolarGrid stroke="hsl(0, 0%, 18%)" />
                    <PolarAngleAxis dataKey="metric" stroke="hsl(0, 0%, 60%)" />
                    <PolarRadiusAxis stroke="hsl(0, 0%, 60%)" />
                    <Radar 
                      name="Current Performance" 
                      dataKey="current" 
                      stroke="hsl(142, 76%, 36%)" 
                      fill="hsl(142, 76%, 36%)" 
                      fillOpacity={0.6} 
                    />
                    <Radar 
                      name="Target" 
                      dataKey="target" 
                      stroke="hsl(0, 0%, 60%)" 
                      fill="hsl(0, 0%, 60%)" 
                      fillOpacity={0.2} 
                      strokeDasharray="5 5"
                    />
                    <Legend />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 6%)', 
                        border: '1px solid hsl(0, 0%, 18%)',
                        borderRadius: '8px'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-success" />
                    <span className="font-semibold">Staff Performance Highlight</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Team is exceeding targets across all metrics with 89% efficiency and 92% quality scores. Technical skills show 7% improvement over target.
                  </p>
                </div>
              </TabsContent>

              {/* Peak Hours Tab */}
              <TabsContent value="peak_hours" className="mt-6">
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={peakHoursData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                    <XAxis dataKey="hour" stroke="hsl(0, 0%, 60%)" />
                    <YAxis yAxisId="left" stroke="hsl(0, 0%, 60%)" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(0, 0%, 60%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 6%)', 
                        border: '1px solid hsl(0, 0%, 18%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="calls" fill="hsl(199, 89%, 48%)" name="AI Calls" />
                    <Bar yAxisId="left" dataKey="appointments" fill="hsl(142, 76%, 36%)" name="Appointments" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(38, 92%, 50%)" 
                      strokeWidth={3}
                      name="Revenue (₹)"
                      dot={{ fill: "hsl(38, 92%, 50%)", r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Peak Call Time</p>
                    <p className="text-2xl font-bold">11 AM</p>
                    <p className="text-xs text-muted-foreground mt-1">15 calls/hour</p>
                  </div>
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <p className="text-sm text-muted-foreground mb-1">Peak Revenue Time</p>
                    <p className="text-2xl font-bold">11 AM</p>
                    <p className="text-xs text-muted-foreground mt-1">₹1.25L/hour</p>
                  </div>
                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <p className="text-sm text-muted-foreground mb-1">Busiest Period</p>
                    <p className="text-2xl font-bold">10 AM - 12 PM</p>
                    <p className="text-xs text-muted-foreground mt-1">Optimize staffing</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
