import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Clock, CheckCircle, Activity,  AlertTriangle, TrendingUp, UserCheck, Target, BarChart3, Zap, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, PieChart as RePieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { 
  SupportCase, 
  AIVoiceCall, 
  DealershipDailyStats, 
  DailyRevenue, 
  ServiceBay, 
  StaffAttendance,
  PendingApproval,
  HourlyCallVolume,
  CallRecord
} from "@/lib/supabase";

const SupportDashboard = () => {
  // State for real data
  const [stats, setStats] = useState({
    todayAppointments: 0,
    pendingArrival: 0,
    aiCallsHandled: 0,
    customerSatisfaction: 0,
    revenueToday: 0,
    activeStaff: 0,
    totalStaff: 0,
    occupiedBays: 0,
    totalBays: 0,
    avgResponseTime: 0,
    pendingApprovals: 0,
  });
  
  const [activeCalls, setActiveCalls] = useState<AIVoiceCall[]>([]);
  const [recentTickets, setRecentTickets] = useState<SupportCase[]>([]);
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [useCaseData, setUseCaseData] = useState<any[]>([]);
  const [weeklyRevenueData, setWeeklyRevenueData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch today's stats
      const { data: dailyStats } = await supabase
        .from('dealership_daily_stats')
        .select('*')
        .eq('date', new Date().toISOString().split('T')[0])
        .single();

      // Fetch today's revenue
      const { data: revenue } = await supabase
        .from('daily_revenue')
        .select('*')
        .eq('date', new Date().toISOString().split('T')[0])
        .single();

      // Fetch service bays
      const { data: bays } = await supabase
        .from('service_bays')
        .select('*');

      // Fetch staff attendance for today
      const { data: staff } = await supabase
        .from('staff_attendance')
        .select('*')
        .eq('date', new Date().toISOString().split('T')[0]);

      // Fetch pending approvals
      const { data: approvals } = await supabase
        .from('pending_approvals')
        .select('*')
        .eq('status', 'Pending');

      // Fetch active AI calls
      const { data: calls } = await supabase
        .from('ai_voice_calls')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch recent support cases
      const { data: cases } = await supabase
        .from('support_cases')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch hourly call volume for today
      const { data: hourlyVolume } = await supabase
        .from('hourly_call_volume')
        .select('*')
        .eq('date', new Date().toISOString().split('T')[0])
        .order('hour', { ascending: true });

      // Fetch call records for use case distribution
      const { data: callRecords } = await supabase
        .from('call_records')
        .select('category')
        .gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString());

      // Fetch last 5 days revenue
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 4);
      const { data: weeklyRevenue } = await supabase
        .from('daily_revenue')
        .select('*')
        .gte('date', fiveDaysAgo.toISOString().split('T')[0])
        .order('date', { ascending: true });

      // Update stats
      const occupiedBays = bays?.filter(b => b.status === 'Occupied').length || 0;
      const presentStaff = staff?.filter(s => s.status === 'Present').length || 0;

      setStats({
        todayAppointments: dailyStats?.total_appointments || 0,
        pendingArrival: dailyStats?.pending_arrival || 0,
        aiCallsHandled: dailyStats?.ai_calls_handled || 0,
        customerSatisfaction: dailyStats?.customer_satisfaction_avg || 0,
        revenueToday: revenue?.total_revenue_inr || 0,
        activeStaff: presentStaff,
        totalStaff: staff?.length || 0,
        occupiedBays: occupiedBays,
        totalBays: bays?.length || 0,
        avgResponseTime: dailyStats?.avg_response_time_hours || 0,
        pendingApprovals: approvals?.length || 0,
      });

      setActiveCalls(calls || []);
      setRecentTickets(cases || []);

      // Process hourly data
      if (hourlyVolume && hourlyVolume.length > 0) {
        const processedHourly = hourlyVolume.map(h => ({
          hour: `${h.hour}:00`,
          aiCalls: h.total_calls,
          appointments: h.resolved_calls,
        }));
        setHourlyData(processedHourly);
      } else {
        // Default empty data
        setHourlyData([
          { hour: "8:00", aiCalls: 0, appointments: 0 },
          { hour: "9:00", aiCalls: 0, appointments: 0 },
          { hour: "10:00", aiCalls: 0, appointments: 0 },
          { hour: "11:00", aiCalls: 0, appointments: 0 },
          { hour: "12:00", aiCalls: 0, appointments: 0 },
          { hour: "13:00", aiCalls: 0, appointments: 0 },
          { hour: "14:00", aiCalls: 0, appointments: 0 },
          { hour: "15:00", aiCalls: 0, appointments: 0 },
        ]);
      }

      // Process use case data from call records
      if (callRecords && callRecords.length > 0) {
        const categoryCounts: Record<string, number> = {};
        callRecords.forEach(record => {
          categoryCounts[record.category] = (categoryCounts[record.category] || 0) + 1;
        });
        
        const useCases = [
          { name: "Service Booking", value: categoryCounts['Service Booking'] || 0, color: "hsl(38, 92%, 50%)" },
          { name: "Technical Support", value: categoryCounts['Technical Support'] || 0, color: "hsl(142, 76%, 36%)" },
          { name: "General Inquiry", value: categoryCounts['General Inquiry'] || 0, color: "hsl(199, 89%, 48%)" },
        ];
        setUseCaseData(useCases);
      } else {
        setUseCaseData([
          { name: "Service Booking", value: 0, color: "hsl(38, 92%, 50%)" },
          { name: "Technical Support", value: 0, color: "hsl(142, 76%, 36%)" },
          { name: "General Inquiry", value: 0, color: "hsl(199, 89%, 48%)" },
        ]);
      }

      // Process weekly revenue data
      if (weeklyRevenue && weeklyRevenue.length > 0) {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const processedRevenue = weeklyRevenue.slice(-5).map((r, idx) => ({
          day: days[idx] || new Date(r.date).toLocaleDateString('en-US', { weekday: 'short' }),
          revenue: r.total_revenue_inr,
          services: r.services_completed,
        }));
        setWeeklyRevenueData(processedRevenue);
      } else {
        setWeeklyRevenueData([
          { day: "Mon", revenue: 0, services: 0 },
          { day: "Tue", revenue: 0, services: 0 },
          { day: "Wed", revenue: 0, services: 0 },
          { day: "Thu", revenue: 0, services: 0 },
          { day: "Fri", revenue: 0, services: 0 },
        ]);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Format duration from seconds
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <DashboardLayout 
        title="Dealership Dashboard" 
        description="VW Mumbai Central - Monitor operations, AI interactions, and performance"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading dashboard data...</div>
        </div>
      </DashboardLayout>
    );
  }

  const statsCards = [
    {
      title: "Today's Appointments",
      value: stats.todayAppointments.toString(),
      change: `${stats.pendingArrival} pending arrival`,
      changeType: "neutral" as const,
      icon: Target,
    },
    {
      title: "AI Calls Handled",
      value: stats.aiCallsHandled.toString(),
      change: "Today",
      changeType: "positive" as const,
      icon: Phone,
    },
    {
      title: "Customer Satisfaction",
      value: stats.customerSatisfaction > 0 ? `${stats.customerSatisfaction.toFixed(1)}/5` : "N/A",
      change: "Average rating",
      changeType: stats.customerSatisfaction >= 4.5 ? "positive" as const : "neutral" as const,
      icon: CheckCircle,
    },
    {
      title: "Revenue Today",
      value: formatCurrency(stats.revenueToday),
      change: "Total earnings",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "Active Staff",
      value: `${stats.activeStaff}/${stats.totalStaff}`,
      change: stats.totalStaff > 0 ? `${Math.round((stats.activeStaff / stats.totalStaff) * 100)}% attendance` : "No data",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Service Bays",
      value: `${stats.occupiedBays}/${stats.totalBays}`,
      change: `${stats.totalBays - stats.occupiedBays} available`,
      changeType: "neutral" as const,
      icon: Activity,
    },
    {
      title: "Avg Response Time",
      value: stats.avgResponseTime > 0 ? `${stats.avgResponseTime.toFixed(1)} hrs` : "N/A",
      change: "Average",
      changeType: "positive" as const,
      icon: Clock,
    },
    {
      title: "Pending Approvals",
      value: stats.pendingApprovals.toString(),
      change: "Require action",
      changeType: stats.pendingApprovals > 5 ? "negative" as const : "neutral" as const,
      icon: AlertTriangle,
    },
  ];

  // Dealership Performance Metrics (static for now)
  const responseTimeMetrics = [
    { metric: "Customer Satisfaction", value: stats.customerSatisfaction > 0 ? stats.customerSatisfaction * 20 : 0 },
    { metric: "Service Quality", value: 88 },
    { metric: "Response Time", value: stats.avgResponseTime > 0 ? Math.max(0, 100 - stats.avgResponseTime * 10) : 0 },
    { metric: "Revenue Target", value: 91 },
    { metric: "Staff Efficiency", value: stats.totalStaff > 0 ? (stats.activeStaff / stats.totalStaff) * 100 : 0 },
  ];

  return (
    <DashboardLayout 
      title="Dealership Dashboard" 
      description="VW Mumbai Central - Monitor operations, AI interactions, and performance"
    >
      <div className="space-y-8">
        {/* Enhanced Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Queue Management & Active Calls */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Call Queue */}
          {/* <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-warning animate-pulse" />
                Call Queue
              </CardTitle>
              <CardDescription>Customers waiting for support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queueData.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg border border-border/50 bg-card/30">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">#{item.position}</span>
                          <span className="text-sm font-semibold">{item.customer}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.topic}</p>
                      </div>
                      <Badge variant="outline" className={
                        item.priority === "High" ? "border-destructive text-destructive" :
                        item.priority === "Medium" ? "border-warning text-warning" :
                        "border-muted text-muted-foreground"
                      }>
                        {item.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Wait: {item.waitTime}</span>
                    </div>
                  </div>
                ))}
                {queueData.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-success" />
                    <p className="text-sm">No customers in queue</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card> */}

          {/* Live Call Monitoring - Spans 2 columns */}
          <Card className="glass border-border/50 lg:col-span-5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary ai-pulse" />
                    Live AI Voice Assistant Interactions
                  </CardTitle>
                  <CardDescription>Real-time customer conversations across all use cases</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-primary/50">
                    Export Records
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCalls.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No active AI calls at the moment</p>
                  </div>
                ) : (
                  activeCalls.map((call, i) => (
                    <div 
                      key={i} 
                      className="p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{call.customer_name}</span>
                            <Badge variant="outline" className="text-xs">
                              {call.call_id}
                            </Badge>
                            <Badge 
                              variant="outline"
                              className="border-primary text-primary text-xs"
                            >
                              {call.use_case}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{call.topic}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{call.customer_phone}</span>
                            {call.vin && (
                              <>
                                <span>•</span>
                                <span>VIN: {call.vin}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="font-medium">{formatDuration(call.duration_seconds)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Sentiment</p>
                            <Badge 
                              variant="outline"
                              className={
                                call.sentiment === "Positive" ? "border-success text-success" :
                                call.sentiment === "Negative" ? "border-destructive text-destructive" :
                                "border-muted text-muted-foreground"
                              }
                            >
                              {call.sentiment || 'N/A'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">AI Confidence</p>
                            <p className="font-medium text-primary">{call.ai_confidence || 0}%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Language</p>
                            <p className="font-medium text-xs">{call.language}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Status</p>
                            <Badge variant="outline" className="text-xs">{call.status}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={call.ai_confidence || 0} className="h-2 flex-1" />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Analytics */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Dealership Performance Analytics
            </CardTitle>
            <CardDescription>AI voice assistant activity, revenue, and service metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="volume" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                <TabsTrigger value="volume">AI Activity</TabsTrigger>
                <TabsTrigger value="outcomes">Use Cases</TabsTrigger>
                <TabsTrigger value="workload">Revenue & Services</TabsTrigger>
                <TabsTrigger value="quality">Performance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="volume" className="mt-6">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={hourlyData}>
                    <defs>
                      <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorHandled" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 25%, 20%)" />
                    <XAxis dataKey="hour" stroke="hsl(215, 20%, 65%)" />
                    <YAxis stroke="hsl(215, 20%, 65%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(220, 28%, 10%)', 
                        border: '1px solid hsl(220, 25%, 20%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="aiCalls" stroke="hsl(199, 89%, 48%)" fillOpacity={1} fill="url(#colorIncoming)" name="AI Voice Calls" />
                    <Area type="monotone" dataKey="appointments" stroke="hsl(142, 76%, 36%)" fillOpacity={1} fill="url(#colorHandled)" name="Appointments Booked" />
                    
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="outcomes" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={useCaseData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
                          backgroundColor: 'hsl(220, 28%, 10%)', 
                          border: '1px solid hsl(220, 25%, 20%)',
                          borderRadius: '8px'
                        }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="space-y-4">
                    {useCaseData.map((useCase, idx) => {
                      const total = useCaseData.reduce((sum, uc) => sum + uc.value, 0);
                      const percentage = total > 0 ? (useCase.value / total) * 100 : 0;
                      const colorClass = idx === 0 ? 'warning' : idx === 1 ? 'success' : 'primary';
                      
                      return (
                        <div key={idx} className={`p-4 rounded-lg bg-${colorClass}/10 border border-${colorClass}/30`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm text-${colorClass}`}>{useCase.name}</span>
                            <span className={`text-2xl font-bold text-${colorClass}`}>{percentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-2">{useCase.value} cases</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="workload" className="mt-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={weeklyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 25%, 20%)" />
                    <XAxis dataKey="day" stroke="hsl(215, 20%, 65%)" />
                    <YAxis stroke="hsl(215, 20%, 65%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(220, 28%, 10%)', 
                        border: '1px solid hsl(220, 25%, 20%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="hsl(142, 76%, 36%)" name="Revenue (₹)" />
                    <Bar dataKey="services" fill="hsl(199, 89%, 48%)" name="Services Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="quality" className="mt-6">
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={responseTimeMetrics}>
                    <PolarGrid stroke="hsl(220, 25%, 20%)" />
                    <PolarAngleAxis dataKey="metric" stroke="hsl(215, 20%, 65%)" />
                    <PolarRadiusAxis stroke="hsl(215, 20%, 65%)" />
                    <Radar name="Performance" dataKey="value" stroke="hsl(199, 89%, 48%)" fill="hsl(199, 89%, 48%)" fillOpacity={0.6} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(220, 28%, 10%)', 
                        border: '1px solid hsl(220, 25%, 20%)',
                        borderRadius: '8px'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        
        {/* Support Tickets (Enhanced) */}
        <Card className="glass border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Customer Service Cases</CardTitle>
                <CardDescription>Active cases requiring attention or approval</CardDescription>
              </div>
              
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Case ID</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Issue</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Use Case</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Priority</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Est. Cost</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Created</th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {recentTickets.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-muted-foreground">
                        <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No support cases at the moment</p>
                      </td>
                    </tr>
                  ) : (
                    recentTickets.map((ticket, i) => (
                      <tr key={i} className="hover:bg-card/30 transition-colors">
                        <td className="py-3 text-sm font-medium text-primary">{ticket.case_id}</td>
                        <td className="py-3 text-sm">{ticket.customer_name}</td>
                        <td className="py-3 text-sm text-muted-foreground max-w-xs">
                          {ticket.issue}
                        </td>
                        <td className="py-3">
                          <Badge variant="outline" className="border-accent text-accent">
                            {ticket.category}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Badge 
                            variant="outline"
                            className={
                              ticket.priority === "Critical" ? "border-destructive text-destructive bg-destructive/10" :
                              ticket.priority === "High" ? "border-destructive text-destructive" :
                              ticket.priority === "Medium" ? "border-warning text-warning" :
                              "border-muted text-muted-foreground"
                            }
                          >
                            {ticket.priority}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Badge 
                            variant="outline"
                            className={
                              ticket.status === "Completed" ? "border-success text-success" :
                              ticket.status === "In Progress" ? "border-primary text-primary" :
                              "border-muted text-muted-foreground"
                            }
                          >
                            {ticket.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm">{formatCurrency(ticket.estimated_cost_inr)}</td>
                        <td className="py-3 text-xs text-muted-foreground">{formatTimeAgo(ticket.created_at)}</td>
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

export default SupportDashboard;
