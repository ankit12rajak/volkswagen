import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, TrendingUp, Clock, Users, Activity, AlertCircle, DollarSign, Target, Zap, Brain, HeadphonesIcon, Timer, BarChart3, PieChart, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Calls Today",
      value: "1,247",
      change: "+12.5% from yesterday",
      changeType: "positive" as const,
      icon: Phone,
    },
    {
      title: "Resolution Rate",
      value: "94.8%",
      change: "+2.3% this week",
      changeType: "positive" as const,
      icon: Target,
    },
    {
      title: "Avg. Handle Time",
      value: "3.2 min",
      change: "-0.8 min improvement",
      changeType: "positive" as const,
      icon: Clock,
    },
    {
      title: "Active Agents",
      value: "24",
      change: "18 AI, 6 Human",
      changeType: "neutral" as const,
      icon: Users,
    },
    {
      title: "Cost Savings",
      value: "€12,480",
      change: "+€1,850 this week",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Customer Satisfaction",
      value: "4.7/5",
      change: "+0.3 improvement",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "AI Accuracy",
      value: "96.2%",
      change: "+1.8% this month",
      changeType: "positive" as const,
      icon: Brain,
    },
    {
      title: "First Call Resolution",
      value: "89.3%",
      change: "+4.2% this week",
      changeType: "positive" as const,
      icon: Zap,
    },
  ];

  const callVolumeData = [
    { time: "00:00", calls: 45, resolved: 42, escalated: 3 },
    { time: "03:00", calls: 32, resolved: 30, escalated: 2 },
    { time: "06:00", calls: 78, resolved: 74, escalated: 4 },
    { time: "09:00", calls: 156, resolved: 148, escalated: 8 },
    { time: "12:00", calls: 198, resolved: 186, escalated: 12 },
    { time: "15:00", calls: 165, resolved: 158, escalated: 7 },
    { time: "18:00", calls: 142, resolved: 135, escalated: 7 },
    { time: "21:00", calls: 89, resolved: 84, escalated: 5 },
  ];

  const weeklyTrendsData = [
    { day: "Mon", calls: 1089, resolution: 94.2, satisfaction: 4.6, avgTime: 3.4 },
    { day: "Tue", calls: 1156, resolution: 93.8, satisfaction: 4.5, avgTime: 3.5 },
    { day: "Wed", calls: 1234, resolution: 94.5, satisfaction: 4.7, avgTime: 3.3 },
    { day: "Thu", calls: 1198, resolution: 95.1, satisfaction: 4.8, avgTime: 3.2 },
    { day: "Fri", calls: 1247, resolution: 94.8, satisfaction: 4.7, avgTime: 3.2 },
    { day: "Sat", calls: 856, resolution: 96.2, satisfaction: 4.9, avgTime: 2.9 },
    { day: "Sun", calls: 723, resolution: 95.8, satisfaction: 4.8, avgTime: 3.0 },
  ];

  const categoryBreakdown = [
    { name: "Service Booking", value: 312, color: "hsl(199, 89%, 48%)" },
    { name: "Technical Support", value: 245, color: "hsl(187, 85%, 53%)" },
    { name: "Warranty Inquiry", value: 189, color: "hsl(142, 76%, 36%)" },
    { name: "Parts Information", value: 156, color: "hsl(38, 92%, 50%)" },
    { name: "Billing Questions", value: 134, color: "hsl(0, 72%, 51%)" },
    { name: "General Inquiry", value: 211, color: "hsl(220, 25%, 50%)" },
  ];

  const agentPerformanceData = [
    { name: "AI Agent 1", calls: 234, resolution: 97, avgTime: 2.8, satisfaction: 4.9 },
    { name: "AI Agent 2", calls: 228, resolution: 96, avgTime: 2.9, satisfaction: 4.8 },
    { name: "AI Agent 3", calls: 221, resolution: 95, avgTime: 3.1, satisfaction: 4.7 },
    { name: "Human Agent 1", calls: 89, resolution: 92, avgTime: 4.2, satisfaction: 4.6 },
    { name: "Human Agent 2", calls: 76, resolution: 91, avgTime: 4.5, satisfaction: 4.5 },
  ];

  const responseTimeDistribution = [
    { range: "0-30s", count: 456, percentage: 36.6 },
    { range: "31-60s", count: 387, percentage: 31.0 },
    { range: "1-2m", count: 245, percentage: 19.6 },
    { range: "2-3m", count: 98, percentage: 7.9 },
    { range: "3-5m", count: 41, percentage: 3.3 },
    { range: "5m+", count: 20, percentage: 1.6 },
  ];

  const costAnalysisData = [
    { month: "Jan", aiCost: 3200, humanCost: 18500, savings: 15300 },
    { month: "Feb", aiCost: 3400, humanCost: 19200, savings: 15800 },
    { month: "Mar", aiCost: 3600, humanCost: 19800, savings: 16200 },
    { month: "Apr", aiCost: 3500, humanCost: 20100, savings: 16600 },
    { month: "May", aiCost: 3700, humanCost: 20500, savings: 16800 },
    { month: "Jun", aiCost: 3900, humanCost: 21000, savings: 17100 },
  ];

  const aiPerformance = [
    { label: "Voice Recognition", value: 96, trend: "+2%" },
    { label: "Sentiment Accuracy", value: 92, trend: "+3%" },
    { label: "Intent Classification", value: 94, trend: "+1%" },
    { label: "Response Quality", value: 89, trend: "+4%" },
    { label: "Context Understanding", value: 91, trend: "+2%" },
    { label: "Language Processing", value: 95, trend: "+1%" },
  ];

  const recentAlerts = [
    { type: "warning", message: "High call volume detected - 15% above average", time: "5 min ago", priority: "High" },
    { type: "success", message: "CRM integration successfully updated", time: "1 hour ago", priority: "Low" },
    { type: "info", message: "Weekly performance report available", time: "2 hours ago", priority: "Medium" },
    { type: "warning", message: "AI model confidence dropped to 78% for technical queries", time: "3 hours ago", priority: "High" },
    { type: "success", message: "Resolution rate exceeded target by 5%", time: "4 hours ago", priority: "Low" },
  ];

  const peakHoursData = [
    { hour: "8 AM", load: 45 },
    { hour: "9 AM", load: 72 },
    { hour: "10 AM", load: 88 },
    { hour: "11 AM", load: 95 },
    { hour: "12 PM", load: 100 },
    { hour: "1 PM", load: 92 },
    { hour: "2 PM", load: 85 },
    { hour: "3 PM", load: 78 },
    { hour: "4 PM", load: 82 },
    { hour: "5 PM", load: 75 },
  ];

  return (
    <DashboardLayout 
      title="Admin Dashboard" 
      description="Comprehensive analytics and system performance monitoring"
    >
      <div className="space-y-8">
        {/* Enhanced Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* KPI Overview Section */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Key Performance Indicators
            </CardTitle>
            <CardDescription>Real-time business metrics and operational efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="volume" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                <TabsTrigger value="volume">Call Volume</TabsTrigger>
                <TabsTrigger value="trends">Weekly Trends</TabsTrigger>
                <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
                <TabsTrigger value="peak">Peak Hours</TabsTrigger>
              </TabsList>
              
              <TabsContent value="volume" className="mt-6">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={callVolumeData}>
                    <defs>
                      <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 25%, 20%)" />
                    <XAxis dataKey="time" stroke="hsl(215, 20%, 65%)" />
                    <YAxis stroke="hsl(215, 20%, 65%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(220, 28%, 10%)', 
                        border: '1px solid hsl(220, 25%, 20%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="calls" stroke="hsl(199, 89%, 48%)" fillOpacity={1} fill="url(#colorCalls)" name="Total Calls" />
                    <Area type="monotone" dataKey="resolved" stroke="hsl(142, 76%, 36%)" fillOpacity={1} fill="url(#colorResolved)" name="Resolved" />
                    <Area type="monotone" dataKey="escalated" stroke="hsl(0, 72%, 51%)" fill="hsl(0, 72%, 51%)" fillOpacity={0.3} name="Escalated" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="trends" className="mt-6">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={weeklyTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 25%, 20%)" />
                    <XAxis dataKey="day" stroke="hsl(215, 20%, 65%)" />
                    <YAxis yAxisId="left" stroke="hsl(215, 20%, 65%)" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(215, 20%, 65%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(220, 28%, 10%)', 
                        border: '1px solid hsl(220, 25%, 20%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="calls" stroke="hsl(199, 89%, 48%)" strokeWidth={2} name="Total Calls" />
                    <Line yAxisId="right" type="monotone" dataKey="resolution" stroke="hsl(142, 76%, 36%)" strokeWidth={2} name="Resolution %" />
                    <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="hsl(38, 92%, 50%)" strokeWidth={2} name="Satisfaction" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="costs" className="mt-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={costAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 25%, 20%)" />
                    <XAxis dataKey="month" stroke="hsl(215, 20%, 65%)" />
                    <YAxis stroke="hsl(215, 20%, 65%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(220, 28%, 10%)', 
                        border: '1px solid hsl(220, 25%, 20%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="aiCost" fill="hsl(199, 89%, 48%)" name="AI Cost (€)" />
                    <Bar dataKey="humanCost" fill="hsl(0, 72%, 51%)" name="Human Cost (€)" />
                    <Bar dataKey="savings" fill="hsl(142, 76%, 36%)" name="Savings (€)" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 rounded-lg bg-success/10 border border-success/30">
                  <p className="text-sm text-success">
                    <strong>Total Savings YTD:</strong> €98,800 | <strong>ROI:</strong> 485% | <strong>Average Monthly Savings:</strong> €16,467
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="peak" className="mt-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={peakHoursData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 25%, 20%)" />
                    <XAxis dataKey="hour" stroke="hsl(215, 20%, 65%)" />
                    <YAxis stroke="hsl(215, 20%, 65%)" label={{ value: 'Load %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(220, 28%, 10%)', 
                        border: '1px solid hsl(220, 25%, 20%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="load" fill="hsl(187, 85%, 53%)" name="System Load %" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <p className="text-sm text-primary">
                    <strong>Peak Hours:</strong> 11 AM - 1 PM | <strong>Recommendation:</strong> Deploy 2 additional AI agents during peak hours for optimal performance
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Call Category Distribution */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Call Category Distribution
              </CardTitle>
              <CardDescription>Breakdown of customer inquiry types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(220, 28%, 10%)', 
                      border: '1px solid hsl(220, 25%, 20%)',
                      borderRadius: '8px'
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryBreakdown.map((cat, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span>{cat.name}</span>
                    </div>
                    <span className="font-semibold">{cat.value} calls</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Response Time Distribution */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary" />
                Response Time Distribution
              </CardTitle>
              <CardDescription>How quickly calls are being answered</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={responseTimeDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 25%, 20%)" />
                  <XAxis type="number" stroke="hsl(215, 20%, 65%)" />
                  <YAxis dataKey="range" type="category" stroke="hsl(215, 20%, 65%)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(220, 28%, 10%)', 
                      border: '1px solid hsl(220, 25%, 20%)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(187, 85%, 53%)" name="Calls" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-success/10 border border-success/30">
                  <p className="text-2xl font-bold text-success">67.6%</p>
                  <p className="text-xs text-muted-foreground mt-1">Under 1 minute</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <p className="text-2xl font-bold text-primary">19.6%</p>
                  <p className="text-xs text-muted-foreground mt-1">1-2 minutes</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-warning/10 border border-warning/30">
                  <p className="text-2xl font-bold text-warning">12.8%</p>
                  <p className="text-xs text-muted-foreground mt-1">Over 2 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* AI Performance Metrics */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary ai-pulse" />
                AI Performance Metrics
              </CardTitle>
              <CardDescription>Real-time accuracy and quality scores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {aiPerformance.map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">{metric.value}%</span>
                      <span className="text-xs text-success">{metric.trend}</span>
                    </div>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
              <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">Overall AI Health Score</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary">93.2%</div>
                  <div className="flex-1">
                    <Progress value={93.2} className="h-3" />
                  </div>
                  <span className="text-sm text-success">Excellent</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                System Alerts & Notifications
              </CardTitle>
              <CardDescription>Recent notifications and system updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAlerts.map((alert, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg bg-card/50 border border-border/30 hover:border-primary/30 transition-all">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      alert.type === "warning" ? "bg-warning" :
                      alert.type === "success" ? "bg-success" :
                      "bg-primary"
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm">{alert.message}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          alert.priority === "High" ? "bg-destructive/20 text-destructive" :
                          alert.priority === "Medium" ? "bg-warning/20 text-warning" :
                          "bg-muted/50 text-muted-foreground"
                        }`}>
                          {alert.priority}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Performance Comparison */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Agent Performance Comparison
            </CardTitle>
            <CardDescription>Individual agent statistics and efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Agent</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Total Calls</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Resolution Rate</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Avg. Handle Time</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Satisfaction</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {agentPerformanceData.map((agent, i) => (
                    <tr key={i} className="hover:bg-card/30 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${agent.name.includes('AI') ? 'bg-primary' : 'bg-accent'}`} />
                          <span className="text-sm font-medium">{agent.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm">{agent.calls}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Progress value={agent.resolution} className="h-2 w-20" />
                          <span className="text-sm font-semibold">{agent.resolution}%</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">{agent.avgTime} min</td>
                      <td className="py-4">
                        <span className="text-sm font-semibold text-warning">{agent.satisfaction}/5.0</span>
                      </td>
                      <td className="py-4">
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          agent.resolution >= 95 ? "bg-success/20 text-success" :
                          agent.resolution >= 90 ? "bg-primary/20 text-primary" :
                          "bg-warning/20 text-warning"
                        }`}>
                          {agent.resolution >= 95 ? "Excellent" : agent.resolution >= 90 ? "Good" : "Fair"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Call Activity (Enhanced) */}
        <Card className="glass border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Call Activity</CardTitle>
                <CardDescription>Latest customer interactions with detailed metrics</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Live updates</span>
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Call ID</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Category</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Duration</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Agent</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Sentiment</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    { id: "#10234", customer: "John Smith", category: "Service Booking", duration: "2m 45s", agent: "AI-1", sentiment: "Positive", status: "Resolved", rating: 5 },
                    { id: "#10233", customer: "Sarah Johnson", category: "Technical Support", duration: "4m 12s", agent: "AI-2", sentiment: "Neutral", status: "Resolved", rating: 4 },
                    { id: "#10232", customer: "Mike Davis", category: "Warranty", duration: "1m 58s", agent: "AI-1", sentiment: "Positive", status: "Resolved", rating: 5 },
                    { id: "#10231", customer: "Emma Wilson", category: "Technical Support", duration: "3m 30s", agent: "Human-1", sentiment: "Negative", status: "Escalated", rating: 2 },
                    { id: "#10230", customer: "Chris Brown", category: "Parts Info", duration: "2m 15s", agent: "AI-3", sentiment: "Positive", status: "Resolved", rating: 5 },
                    { id: "#10229", customer: "Lisa Anderson", category: "Billing", duration: "5m 22s", agent: "AI-2", sentiment: "Neutral", status: "Resolved", rating: 4 },
                  ].map((call, i) => (
                    <tr key={i} className="hover:bg-card/30 transition-colors">
                      <td className="py-3 text-sm font-medium text-primary">{call.id}</td>
                      <td className="py-3 text-sm">{call.customer}</td>
                      <td className="py-3 text-xs text-muted-foreground">{call.category}</td>
                      <td className="py-3 text-sm text-muted-foreground">{call.duration}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          call.agent.includes('AI') ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                        }`}>
                          {call.agent}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          call.sentiment === "Positive" ? "bg-success/20 text-success" :
                          call.sentiment === "Negative" ? "bg-destructive/20 text-destructive" :
                          "bg-muted/50 text-muted-foreground"
                        }`}>
                          {call.sentiment}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          call.status === "Resolved" ? "bg-success/20 text-success" :
                          "bg-warning/20 text-warning"
                        }`}>
                          {call.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full ${
                                idx < call.rating ? 'bg-warning' : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
