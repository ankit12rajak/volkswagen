import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, TrendingUp, Clock, Users, Activity, AlertCircle, DollarSign, Target, Zap, Brain, HeadphonesIcon, Timer, BarChart3, PieChart, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  getDailyStatistics,
  getHourlyCallVolume,
  getCategoryStatistics,
  getAgentPerformance,
  getAIPerformanceMetrics,
  getRecentCallRecords,
  getSystemAlerts,
  getWeeklyTrends,
  getCostAnalysis,
  type DailyStats,
  type HourlyCallVolume,
  type CategoryStats,
  type AgentPerformance,
  type AIPerformanceMetrics,
  type CallRecord,
  type SystemAlert,
  type WeeklyTrend,
  type CostAnalysis
} from "@/services/adminDashboardService";

const AdminDashboard = () => {
  const [dailyStats, setDailyStats] = useState<DailyStats | null>(null);
  const [hourlyVolume, setHourlyVolume] = useState<HourlyCallVolume[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [agentPerformance, setAgentPerformance] = useState<AgentPerformance[]>([]);
  const [aiMetrics, setAiMetrics] = useState<AIPerformanceMetrics | null>(null);
  const [recentCalls, setRecentCalls] = useState<CallRecord[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [weeklyTrends, setWeeklyTrends] = useState<WeeklyTrend[]>([]);
  const [costAnalysis, setCostAnalysis] = useState<CostAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [
          stats,
          hourly,
          categories,
          agents,
          ai,
          calls,
          systemAlerts,
          trends,
          costs
        ] = await Promise.all([
          getDailyStatistics(),
          getHourlyCallVolume(),
          getCategoryStatistics(),
          getAgentPerformance(),
          getAIPerformanceMetrics(),
          getRecentCallRecords(6),
          getSystemAlerts(5),
          getWeeklyTrends(),
          getCostAnalysis()
        ]);

        setDailyStats(stats);
        setHourlyVolume(hourly);
        setCategoryStats(categories);
        setAgentPerformance(agents);
        setAiMetrics(ai);
        setRecentCalls(calls);
        setAlerts(systemAlerts);
        setWeeklyTrends(trends);
        setCostAnalysis(costs);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Format seconds to minutes
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Format time from seconds to minutes with decimal
  const formatMinutes = (seconds: number): string => {
    return (seconds / 60).toFixed(1);
  };
  const stats = [
    {
      title: "Total Calls Today",
      value: dailyStats?.total_calls.toString() || "0",
      change: `${dailyStats?.ai_calls || 0} AI, ${dailyStats?.human_calls || 0} Human`,
      changeType: "neutral" as const,
      icon: Phone,
    },
    {
      title: "Resolution Rate",
      value: `${dailyStats?.resolution_rate.toFixed(1) || "0"}%`,
      change: `${dailyStats?.resolved_calls || 0} resolved`,
      changeType: dailyStats && dailyStats.resolution_rate >= 90 ? "positive" as const : "neutral" as const,
      icon: Target,
    },
    {
      title: "Avg. Handle Time",
      value: `${formatMinutes(dailyStats?.avg_handle_time_seconds || 0)} min`,
      change: dailyStats?.total_calls ? `${dailyStats.total_calls} total calls` : "No calls yet",
      changeType: "neutral" as const,
      icon: Clock,
    },
    {
      title: "Active Agents",
      value: agentPerformance.length.toString(),
      change: `${agentPerformance.filter(a => a.agent_type === 'AI').length} AI, ${agentPerformance.filter(a => a.agent_type === 'Human').length} Human`,
      changeType: "neutral" as const,
      icon: Users,
    },
    {
      title: "Cost Savings",
      value: `€${dailyStats?.cost_savings_euros.toFixed(0) || "0"}`,
      change: "Today's savings",
      changeType: dailyStats && dailyStats.cost_savings_euros > 0 ? "positive" as const : "neutral" as const,
      icon: DollarSign,
    },
    {
      title: "Customer Satisfaction",
      value: `${dailyStats?.avg_rating.toFixed(1) || "0"}/5`,
      change: dailyStats?.total_calls ? `Based on ${dailyStats.total_calls} calls` : "No ratings yet",
      changeType: dailyStats && dailyStats.avg_rating >= 4 ? "positive" as const : "neutral" as const,
      icon: TrendingUp,
    },
    {
      title: "AI Accuracy",
      value: `${aiMetrics?.overall_health_score.toFixed(1) || "0"}%`,
      change: "Overall health score",
      changeType: aiMetrics && aiMetrics.overall_health_score >= 90 ? "positive" as const : "neutral" as const,
      icon: Brain,
    },
    {
      title: "First Call Resolution",
      value: `${dailyStats?.first_call_resolution || 0}`,
      change: "Resolved on first contact",
      changeType: "neutral" as const,
      icon: Zap,
    },
  ];

  // Transform hourly volume data for chart (show every 3 hours)
  const callVolumeData = hourlyVolume
    .filter((_, index) => index % 3 === 0)
    .map(h => ({
      time: `${h.hour.toString().padStart(2, '0')}:00`,
      calls: h.total_calls,
      resolved: h.resolved_calls,
      escalated: h.escalated_calls
    }));

  const weeklyTrendsData = weeklyTrends;

  const categoryColors: Record<string, string> = {
    "Service Booking": "hsl(199, 89%, 48%)",
    "Technical Support": "hsl(187, 85%, 53%)",
    "Warranty Inquiry": "hsl(142, 76%, 36%)",
    "Parts Information": "hsl(38, 92%, 50%)",
    "Billing Questions": "hsl(0, 72%, 51%)",
    "General Inquiry": "hsl(220, 25%, 50%)"
  };

  const categoryBreakdown = categoryStats.map(cat => ({
    name: cat.category,
    value: cat.total_calls,
    color: categoryColors[cat.category] || "hsl(220, 25%, 50%)"
  }));

  const agentPerformanceData = agentPerformance.map(agent => ({
    name: agent.agent_name,
    calls: agent.total_calls,
    resolution: agent.resolution_rate,
    avgTime: parseFloat(formatMinutes(agent.avg_handle_time_seconds)),
    satisfaction: agent.avg_rating
  }));

  // Calculate response time distribution from recent calls
  const calculateResponseTimeDistribution = () => {
    const ranges = [
      { range: "0-30s", min: 0, max: 30, count: 0 },
      { range: "31-60s", min: 31, max: 60, count: 0 },
      { range: "1-2m", min: 61, max: 120, count: 0 },
      { range: "2-3m", min: 121, max: 180, count: 0 },
      { range: "3-5m", min: 181, max: 300, count: 0 },
      { range: "5m+", min: 301, max: Infinity, count: 0 },
    ];

    recentCalls.forEach(call => {
      const duration = call.duration_seconds;
      const range = ranges.find(r => duration >= r.min && duration <= r.max);
      if (range) range.count++;
    });

    const total = recentCalls.length || 1;
    return ranges.map(r => ({
      range: r.range,
      count: r.count,
      percentage: (r.count / total) * 100
    }));
  };

  const responseTimeDistribution = calculateResponseTimeDistribution();

  const costAnalysisData = costAnalysis;

  const aiPerformance = [
    { label: "Voice Recognition", value: aiMetrics?.voice_recognition_accuracy || 0, trend: "N/A" },
    { label: "Sentiment Accuracy", value: aiMetrics?.sentiment_accuracy || 0, trend: "N/A" },
    { label: "Intent Classification", value: aiMetrics?.intent_classification_accuracy || 0, trend: "N/A" },
    { label: "Response Quality", value: aiMetrics?.response_quality_score || 0, trend: "N/A" },
    { label: "Context Understanding", value: aiMetrics?.context_understanding_score || 0, trend: "N/A" },
    { label: "Language Processing", value: aiMetrics?.language_processing_score || 0, trend: "N/A" },
  ];

  // Format time ago
  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const recentAlerts = alerts.map(alert => ({
    type: alert.alert_type,
    message: alert.message,
    time: formatTimeAgo(alert.created_at),
    priority: alert.priority
  }));

  // Calculate peak hours load (8 AM to 5 PM)
  const peakHoursData = hourlyVolume
    .filter(h => h.hour >= 8 && h.hour <= 17)
    .map(h => {
      const maxCalls = Math.max(...hourlyVolume.map(hv => hv.total_calls), 1);
      return {
        hour: h.hour === 12 ? "12 PM" : h.hour > 12 ? `${h.hour - 12} PM` : `${h.hour} AM`,
        load: maxCalls > 0 ? Math.round((h.total_calls / maxCalls) * 100) : 0
      };
    });

  if (loading) {
    return (
      <DashboardLayout 
        title="Admin Dashboard" 
        description="Comprehensive analytics and system performance monitoring"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
                {costAnalysisData.length > 0 && (
                  <div className="mt-4 p-4 rounded-lg bg-success/10 border border-success/30">
                    <p className="text-sm text-success">
                      <strong>Total Savings:</strong> €{costAnalysisData.reduce((sum, c) => sum + c.savings, 0).toFixed(0)} | 
                      <strong> Average Monthly Savings:</strong> €{(costAnalysisData.reduce((sum, c) => sum + c.savings, 0) / costAnalysisData.length).toFixed(0)}
                    </p>
                  </div>
                )}
                {costAnalysisData.length === 0 && (
                  <div className="mt-4 p-4 rounded-lg bg-muted/10 border border-muted/30">
                    <p className="text-sm text-muted-foreground">
                      No cost analysis data available yet. Data will be calculated as calls are processed.
                    </p>
                  </div>
                )}
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
                {peakHoursData.length > 0 && (
                  <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <p className="text-sm text-primary">
                      <strong>Peak Hours:</strong> {peakHoursData.reduce((max, curr) => curr.load > max.load ? curr : max, peakHoursData[0]).hour} | 
                      <strong> Recommendation:</strong> Monitor call volume and adjust agent allocation as needed
                    </p>
                  </div>
                )}
                {peakHoursData.length === 0 && (
                  <div className="mt-4 p-4 rounded-lg bg-muted/10 border border-muted/30">
                    <p className="text-sm text-muted-foreground">
                      No peak hours data available yet. Data will appear as calls are received throughout the day.
                    </p>
                  </div>
                )}
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
                  <div className="text-3xl font-bold text-primary">{aiMetrics?.overall_health_score.toFixed(1) || "0"}%</div>
                  <div className="flex-1">
                    <Progress value={aiMetrics?.overall_health_score || 0} className="h-3" />
                  </div>
                  <span className={`text-sm ${
                    (aiMetrics?.overall_health_score || 0) >= 90 ? "text-success" :
                    (aiMetrics?.overall_health_score || 0) >= 70 ? "text-warning" :
                    (aiMetrics?.overall_health_score || 0) > 0 ? "text-destructive" :
                    "text-muted-foreground"
                  }`}>
                    {(aiMetrics?.overall_health_score || 0) >= 90 ? "Excellent" :
                     (aiMetrics?.overall_health_score || 0) >= 70 ? "Good" :
                     (aiMetrics?.overall_health_score || 0) > 0 ? "Needs Improvement" :
                     "No Data"}
                  </span>
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
                  {agentPerformanceData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        No agent performance data yet. Data will appear here once agents handle calls.
                      </td>
                    </tr>
                  ) : (
                    agentPerformanceData.map((agent, i) => (
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
                            <span className="text-sm font-semibold">{agent.resolution.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-muted-foreground">{agent.avgTime.toFixed(1)} min</td>
                        <td className="py-4">
                          <span className="text-sm font-semibold text-warning">{agent.satisfaction.toFixed(1)}/5.0</span>
                        </td>
                        <td className="py-4">
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            agent.resolution >= 95 ? "bg-success/20 text-success" :
                            agent.resolution >= 90 ? "bg-primary/20 text-primary" :
                            agent.resolution > 0 ? "bg-warning/20 text-warning" :
                            "bg-muted/50 text-muted-foreground"
                          }`}>
                            {agent.resolution >= 95 ? "Excellent" : agent.resolution >= 90 ? "Good" : agent.resolution > 0 ? "Fair" : "No Data"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
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
                  {recentCalls.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-muted-foreground">
                        No call records yet. Data will appear here once calls are made.
                      </td>
                    </tr>
                  ) : (
                    recentCalls.map((call, i) => (
                      <tr key={i} className="hover:bg-card/30 transition-colors">
                        <td className="py-3 text-sm font-medium text-primary">{call.call_id}</td>
                        <td className="py-3 text-sm">{call.customer_name}</td>
                        <td className="py-3 text-xs text-muted-foreground">{call.category}</td>
                        <td className="py-3 text-sm text-muted-foreground">{formatDuration(call.duration_seconds)}</td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            call.agent_type === 'AI' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                          }`}>
                            {call.agent_name}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            call.sentiment === "Positive" ? "bg-success/20 text-success" :
                            call.sentiment === "Negative" ? "bg-destructive/20 text-destructive" :
                            "bg-muted/50 text-muted-foreground"
                          }`}>
                            {call.sentiment || "N/A"}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            call.status === "Resolved" ? "bg-success/20 text-success" :
                            call.status === "Escalated" ? "bg-warning/20 text-warning" :
                            "bg-muted/50 text-muted-foreground"
                          }`}>
                            {call.status}
                          </span>
                        </td>
                        <td className="py-3">
                          {call.rating ? (
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
                          ) : (
                            <span className="text-xs text-muted-foreground">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
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
