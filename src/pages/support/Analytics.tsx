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
  AlertCircle,
  Star,
  MessageSquare,
  Zap,
  Award
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
  // Key Performance Indicators
  const kpiStats = [
    {
      title: "Total Tickets",
      value: "2,847",
      change: "+12.3% from last month",
      changeType: "positive" as const,
      icon: MessageSquare,
    },
    {
      title: "Resolution Rate",
      value: "94.2%",
      change: "+2.1% improvement",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
    {
      title: "Avg Response Time",
      value: "28s",
      change: "-8s faster",
      changeType: "positive" as const,
      icon: Clock,
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.3 from last month",
      changeType: "positive" as const,
      icon: Star,
    },
    {
      title: "Active Agents",
      value: "23",
      change: "18 AI, 5 Human",
      changeType: "neutral" as const,
      icon: Users,
    },
    {
      title: "Peak Volume",
      value: "386",
      change: "Today at 11 AM",
      changeType: "neutral" as const,
      icon: Activity,
    },
    {
      title: "Escalation Rate",
      value: "4.8%",
      change: "-1.2% improvement",
      changeType: "positive" as const,
      icon: AlertCircle,
    },
    {
      title: "First Contact Resolution",
      value: "89.5%",
      change: "+4.2% this week",
      changeType: "positive" as const,
      icon: Target,
    },
  ];

  // Trend data for the last 30 days
  const trendData = [
    { date: "Day 1", tickets: 82, resolved: 78, satisfaction: 4.6 },
    { date: "Day 3", tickets: 95, resolved: 89, satisfaction: 4.7 },
    { date: "Day 5", tickets: 88, resolved: 84, satisfaction: 4.5 },
    { date: "Day 7", tickets: 103, resolved: 97, satisfaction: 4.8 },
    { date: "Day 9", tickets: 96, resolved: 91, satisfaction: 4.7 },
    { date: "Day 11", tickets: 110, resolved: 104, satisfaction: 4.9 },
    { date: "Day 13", tickets: 98, resolved: 93, satisfaction: 4.6 },
    { date: "Day 15", tickets: 105, resolved: 99, satisfaction: 4.8 },
    { date: "Day 17", tickets: 92, resolved: 88, satisfaction: 4.7 },
    { date: "Day 19", tickets: 108, resolved: 102, satisfaction: 4.9 },
    { date: "Day 21", tickets: 99, resolved: 94, satisfaction: 4.8 },
    { date: "Day 23", tickets: 112, resolved: 106, satisfaction: 4.9 },
    { date: "Day 25", tickets: 101, resolved: 96, satisfaction: 4.7 },
    { date: "Day 27", tickets: 115, resolved: 109, satisfaction: 4.8 },
    { date: "Day 29", tickets: 107, resolved: 102, satisfaction: 4.9 },
    { date: "Day 30", tickets: 118, resolved: 112, satisfaction: 4.8 },
  ];

  // Ticket category distribution
  const categoryData = [
    { name: "Technical Support", value: 847, color: "hsl(199, 89%, 48%)" },
    { name: "Service Booking", value: 652, color: "hsl(142, 76%, 36%)" },
    { name: "Parts Inquiry", value: 483, color: "hsl(38, 92%, 50%)" },
    { name: "Warranty Claims", value: 391, color: "hsl(271, 76%, 53%)" },
    { name: "General Questions", value: 474, color: "hsl(217, 91%, 60%)" },
  ];

  // Response time distribution by hour
  const responseTimeByHour = [
    { hour: "6 AM", avgTime: 18, target: 30 },
    { hour: "7 AM", avgTime: 22, target: 30 },
    { hour: "8 AM", avgTime: 25, target: 30 },
    { hour: "9 AM", avgTime: 28, target: 30 },
    { hour: "10 AM", avgTime: 32, target: 30 },
    { hour: "11 AM", avgTime: 35, target: 30 },
    { hour: "12 PM", avgTime: 31, target: 30 },
    { hour: "1 PM", avgTime: 27, target: 30 },
    { hour: "2 PM", avgTime: 24, target: 30 },
    { hour: "3 PM", avgTime: 26, target: 30 },
    { hour: "4 PM", avgTime: 29, target: 30 },
    { hour: "5 PM", avgTime: 33, target: 30 },
    { hour: "6 PM", avgTime: 28, target: 30 },
  ];

  // Agent performance comparison
  const agentPerformanceData = [
    { 
      metric: "Speed", 
      ai: 95, 
      human: 78,
      target: 85
    },
    { 
      metric: "Accuracy", 
      ai: 92, 
      human: 94,
      target: 90
    },
    { 
      metric: "Satisfaction", 
      ai: 88, 
      human: 92,
      target: 85
    },
    { 
      metric: "Volume", 
      ai: 96, 
      human: 65,
      target: 80
    },
    { 
      metric: "Complexity", 
      ai: 75, 
      human: 95,
      target: 80
    },
  ];

  // Weekly volume comparison
  const weeklyComparison = [
    { week: "Week 1", thisMonth: 586, lastMonth: 523 },
    { week: "Week 2", thisMonth: 612, lastMonth: 548 },
    { week: "Week 3", thisMonth: 645, lastMonth: 571 },
    { week: "Week 4", thisMonth: 678, lastMonth: 598 },
  ];

  // Top issues by count
  const topIssues = [
    { issue: "Service Appointment Scheduling", count: 342, trend: "up", change: "+12%" },
    { issue: "Warranty Information", count: 298, trend: "down", change: "-5%" },
    { issue: "Technical Diagnostics", count: 276, trend: "up", change: "+8%" },
    { issue: "Parts Availability", count: 234, trend: "neutral", change: "0%" },
    { issue: "Billing Questions", count: 187, trend: "down", change: "-3%" },
  ];

  // Resolution time breakdown
  const resolutionTimeData = [
    { range: "< 1 min", count: 1247, percentage: 43.8 },
    { range: "1-5 min", count: 986, percentage: 34.6 },
    { range: "5-15 min", count: 412, percentage: 14.5 },
    { range: "15-30 min", count: 143, percentage: 5.0 },
    { range: "> 30 min", count: 59, percentage: 2.1 },
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
      title="Support Analytics" 
      description="Comprehensive performance metrics and insights"
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
            <CardDescription>Detailed insights across different metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="trends" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-muted/50">
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="response">Response Time</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>

              {/* Trends Tab */}
              <TabsContent value="trends" className="mt-6">
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={trendData}>
                    <defs>
                      <linearGradient id="ticketsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                    <XAxis dataKey="date" stroke="hsl(0, 0%, 60%)" />
                    <YAxis yAxisId="left" stroke="hsl(0, 0%, 60%)" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(0, 0%, 60%)" domain={[4, 5]} />
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
                      dataKey="tickets" 
                      stroke="hsl(199, 89%, 48%)" 
                      fillOpacity={1} 
                      fill="url(#ticketsGradient)" 
                      name="Total Tickets"
                    />
                    <Bar 
                      yAxisId="left"
                      dataKey="resolved" 
                      fill="hsl(142, 76%, 36%)" 
                      name="Resolved Tickets"
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

              {/* Categories Tab */}
              <TabsContent value="categories" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
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
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg mb-4">Category Breakdown</h3>
                    {categoryData.map((category, i) => (
                      <div key={i} className="p-4 rounded-lg border border-border/50 bg-card/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-lg font-bold text-primary">{category.value}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-muted/50 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all" 
                              style={{ 
                                width: `${(category.value / categoryData.reduce((sum, c) => sum + c.value, 0)) * 100}%`,
                                backgroundColor: category.color
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground min-w-[50px] text-right">
                            {((category.value / categoryData.reduce((sum, c) => sum + c.value, 0)) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="mt-6">
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={agentPerformanceData}>
                    <PolarGrid stroke="hsl(0, 0%, 18%)" />
                    <PolarAngleAxis dataKey="metric" stroke="hsl(0, 0%, 60%)" />
                    <PolarRadiusAxis stroke="hsl(0, 0%, 60%)" />
                    <Radar 
                      name="AI Agents" 
                      dataKey="ai" 
                      stroke="hsl(199, 89%, 48%)" 
                      fill="hsl(199, 89%, 48%)" 
                      fillOpacity={0.6} 
                    />
                    <Radar 
                      name="Human Agents" 
                      dataKey="human" 
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
              </TabsContent>

              {/* Response Time Tab */}
              <TabsContent value="response" className="mt-6">
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={responseTimeByHour}>
                    <defs>
                      <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                    <XAxis dataKey="hour" stroke="hsl(0, 0%, 60%)" />
                    <YAxis stroke="hsl(0, 0%, 60%)" label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 6%)', 
                        border: '1px solid hsl(0, 0%, 18%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="avgTime" 
                      stroke="hsl(199, 89%, 48%)" 
                      fillOpacity={1} 
                      fill="url(#responseGradient)" 
                      name="Avg Response Time"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="hsl(0, 72%, 51%)" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Target (30s)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>

              {/* Comparison Tab */}
              <TabsContent value="comparison" className="mt-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={weeklyComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                    <XAxis dataKey="week" stroke="hsl(0, 0%, 60%)" />
                    <YAxis stroke="hsl(0, 0%, 60%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 6%)', 
                        border: '1px solid hsl(0, 0%, 18%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="lastMonth" 
                      fill="hsl(0, 0%, 60%)" 
                      name="Last Month"
                      radius={[8, 8, 0, 0]}
                      opacity={0.6}
                    />
                    <Bar 
                      dataKey="thisMonth" 
                      fill="hsl(199, 89%, 48%)" 
                      name="This Month"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Bottom Row: Top Issues and Resolution Time */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Issues */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Top Issues
              </CardTitle>
              <CardDescription>Most common customer concerns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topIssues.map((issue, i) => (
                  <div key={i} className="p-4 rounded-lg border border-border/50 bg-card/30">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{issue.issue}</span>
                          {issue.trend === "up" && <TrendingUp className="w-4 h-4 text-success" />}
                          {issue.trend === "down" && <TrendingDown className="w-4 h-4 text-muted-foreground" />}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {issue.count} tickets
                        </p>
                      </div>
                      <Badge 
                        variant="outline"
                        className={
                          issue.trend === "up" ? "border-success text-success" :
                          issue.trend === "down" ? "border-muted text-muted-foreground" :
                          "border-border text-foreground"
                        }
                      >
                        {issue.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resolution Time Breakdown */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Resolution Time Distribution
              </CardTitle>
              <CardDescription>Ticket resolution time ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resolutionTimeData.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.range}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{item.count} tickets</span>
                        <span className="font-semibold text-primary min-w-[50px] text-right">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full transition-all bg-primary" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Performance Highlight</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  78.4% of tickets are resolved within 5 minutes, exceeding the industry average of 65%.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;