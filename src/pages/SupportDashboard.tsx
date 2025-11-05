import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Clock, CheckCircle, Activity,  AlertTriangle, TrendingUp, UserCheck, PhoneCall, Timer, Target, BarChart3, Zap, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SupportDashboard = () => {
  // Dealership Manager Dashboard Stats
  const stats = [
    {
      title: "Today's Appointments",
      value: "24",
      change: "6 pending arrival",
      changeType: "neutral" as const,
      icon: Target,
    },
    {
      title: "AI Calls Handled",
      value: "47",
      change: "+12 from yesterday",
      changeType: "positive" as const,
      icon: Phone,
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.2 this week",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
    {
      title: "Revenue Today",
      value: "₹1.8L",
      change: "+15% vs avg",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "Active Staff",
      value: "18/22",
      change: "82% attendance",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Service Bays",
      value: "7/10",
      change: "3 available",
      changeType: "neutral" as const,
      icon: Activity,
    },
    {
      title: "Avg Response Time",
      value: "2.3 hrs",
      change: "Within target",
      changeType: "positive" as const,
      icon: Clock,
    },
    {
      title: "Pending Approvals",
      value: "5",
      change: "2 cost breakdowns",
      changeType: "neutral" as const,
      icon: AlertTriangle,
    },
  ];

  // AI Voice Assistant Active Interactions
  const activeCalls = [
    { 
      id: "AI-1034", 
      customer: "Rajesh Sharma", 
      phone: "+91 98765 43210",
      vin: "WVWZZZ1JZ3W386752",
      topic: "Cost breakdown approval - Brake pad replacement", 
      useCase: "Cost Breakdown",
      sentiment: "Positive",
      duration: "2m 15s",
      aiConfidence: 94,
      priority: "High",
      language: "Hindi",
      status: "Awaiting Approval"
    },
    { 
      id: "AI-1033", 
      customer: "Priya Mehta", 
      phone: "+91 98765 43211",
      vin: "WVWZZZ1JZ3W386753",
      topic: "Predictive maintenance alert - Oil change due", 
      useCase: "Predictive Maintenance",
      sentiment: "Neutral",
      duration: "1m 45s",
      aiConfidence: 91,
      priority: "Medium",
      language: "English",
      status: "Scheduling"
    },
    { 
      id: "AI-1032", 
      customer: "Mohammed Ali", 
      phone: "+91 98765 43212",
      vin: "WVWZZZ1JZ3W386754",
      topic: "General inquiry - Service history", 
      useCase: "General Service",
      sentiment: "Positive",
      duration: "3m 20s",
      aiConfidence: 88,
      priority: "Normal",
      language: "Urdu",
      status: "In Progress"
    },
    { 
      id: "AI-1031", 
      customer: "Anita Desai", 
      phone: "+91 98765 43213",
      vin: "WVWZZZ1JZ3W386755",
      topic: "Additional work approval - Timing belt", 
      useCase: "Cost Breakdown",
      sentiment: "Neutral",
      duration: "4m 10s",
      aiConfidence: 85,
      priority: "High",
      language: "Gujarati",
      status: "Customer Reviewing"
    },
  ];

  const queueData = [
    { position: 1, customer: "Thomas Weber", topic: "Oil change booking", waitTime: "0m 35s", priority: "Normal" },
    { position: 2, customer: "Julia Becker", topic: "Recall information", waitTime: "1m 12s", priority: "Medium" },
    { position: 3, customer: "Michael Braun", topic: "Invoice question", waitTime: "1m 45s", priority: "Normal" },
  ];

  // Customer Service Cases
  const recentTickets = [
    { 
      id: "CASE-2045", 
      customer: "Suresh Reddy", 
      vin: "WVWZZZ1JZ3W386756",
      issue: "Additional work approval needed - ₹12,500", 
      priority: "High", 
      status: "Pending Approval",
      useCase: "Cost Breakdown",
      createdAt: "10 mins ago",
      category: "Cost Approval",
      estimatedCost: "₹12,500"
    },
    { 
      id: "CASE-2044", 
      customer: "Deepika Singh", 
      vin: "WVWZZZ1JZ3W386757",
      issue: "Brake pad wear detected - Urgent service needed", 
      priority: "Critical", 
      status: "Appointment Booked",
      useCase: "Predictive Maintenance",
      createdAt: "25 mins ago",
      category: "Preventive Service",
      estimatedCost: "₹8,200"
    },
    { 
      id: "CASE-2043", 
      customer: "Vikram Joshi", 
      vin: "WVWZZZ1JZ3W386758",
      issue: "Timing belt replacement due - Customer declined", 
      priority: "High", 
      status: "Follow-up Required",
      useCase: "Predictive Maintenance",
      createdAt: "45 mins ago",
      category: "Preventive Service",
      estimatedCost: "₹15,400"
    },
    { 
      id: "CASE-2042", 
      customer: "Kavita Nair", 
      vin: "WVWZZZ1JZ3W386759",
      issue: "Routine service completed successfully", 
      priority: "Low", 
      status: "Completed",
      useCase: "General Service",
      createdAt: "1 hour ago",
      category: "Service",
      estimatedCost: "₹3,500"
    },
    { 
      id: "CASE-2041", 
      customer: "Amit Agarwal", 
      vin: "WVWZZZ1JZ3W386764",
      issue: "Service appointment confirmed for tomorrow", 
      priority: "Medium", 
      status: "Scheduled",
      useCase: "General Service",
      createdAt: "1.5 hours ago",
      category: "Appointment",
      estimatedCost: "₹5,800"
    },
  ];

  // AI Use Case Distribution
  const callOutcomeData = [
    { name: "Cost Breakdown", value: 18, color: "hsl(38, 92%, 50%)" },
    { name: "Predictive Maintenance", value: 15, color: "hsl(142, 76%, 36%)" },
    { name: "General Service", value: 14, color: "hsl(199, 89%, 48%)" },
  ];

  // AI Voice Assistant Activity by Hour
  const hourlyVolumeData = [
    { hour: "8 AM", aiCalls: 5, appointments: 3 },
    { hour: "9 AM", aiCalls: 8, appointments: 5 },
    { hour: "10 AM", aiCalls: 12, appointments: 7 },
    { hour: "11 AM", aiCalls: 15, appointments: 9 },
    { hour: "12 PM", aiCalls: 10, appointments: 6 },
    { hour: "1 PM", aiCalls: 8, appointments: 4 },
    { hour: "2 PM", aiCalls: 11, appointments: 7 },
    { hour: "3 PM", aiCalls: 9, appointments: 5 },
  ];

  const agentWorkloadData = [
    { agent: "AI Agent 1", calls: 42, avgTime: 2.8, satisfaction: 4.8 },
    { agent: "AI Agent 2", calls: 39, avgTime: 3.1, satisfaction: 4.7 },
    { agent: "AI Agent 3", calls: 38, avgTime: 2.9, satisfaction: 4.9 },
    { agent: "Human Agent 1", calls: 18, avgTime: 4.2, satisfaction: 4.6 },
    { agent: "Human Agent 2", calls: 15, avgTime: 4.5, satisfaction: 4.5 },
  ];

  // Dealership Performance Metrics
  const responseTimeMetrics = [
    { metric: "Customer Satisfaction", value: 92 },
    { metric: "Service Quality", value: 88 },
    { metric: "Response Time", value: 85 },
    { metric: "Revenue Target", value: 91 },
    { metric: "Staff Efficiency", value: 89 },
  ];

  const customerJourneyStages = [
    { stage: "Initial Contact", count: 186, avgTime: "24s" },
    { stage: "Issue Identification", count: 186, avgTime: "45s" },
    { stage: "Solution Proposal", count: 178, avgTime: "1m 12s" },
    { stage: "Resolution", count: 168, avgTime: "35s" },
    { stage: "Follow-up", count: 156, avgTime: "20s" },
  ];

  const escalationReasons = [
    { reason: "Complex Technical Issue", count: 5 },
    { reason: "Customer Request", count: 3 },
    { reason: "Low AI Confidence", count: 2 },
    { reason: "Policy Exception Needed", count: 2 },
  ];

  // Daily Revenue and Service Comparison
  const agentWorkloadComparisonData = [
    { day: "Mon", revenue: 145000, services: 28 },
    { day: "Tue", revenue: 162000, services: 32 },
    { day: "Wed", revenue: 138000, services: 26 },
    { day: "Thu", revenue: 175000, services: 35 },
    { day: "Fri", revenue: 180000, services: 38 },
  ];

  return (
    <DashboardLayout 
      title="Dealership Dashboard" 
      description="VW Mumbai Central - Monitor operations, AI interactions, and performance"
    >
      <div className="space-y-8">
        {/* Enhanced Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
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
                {activeCalls.map((call, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{call.customer}</span>
                          <Badge variant="outline" className="text-xs">
                            {call.id}
                          </Badge>
                          <Badge 
                            variant="outline"
                            className="border-primary text-primary text-xs"
                          >
                            {call.useCase}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{call.topic}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{call.phone}</span>
                          <span>•</span>
                          <span>VIN: {call.vin}</span>
                        </div>
                      </div>
                      {/* <Button size="sm" variant="ghost" className="h-8">
                        <ExternalLink className="w-4 h-4" />
                      </Button> */}
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="font-medium">{call.duration}</p>
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
                            {call.sentiment}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">AI Confidence</p>
                          <p className="font-medium text-primary">{call.aiConfidence}%</p>
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
                        <Progress value={call.aiConfidence} className="h-2 flex-1" />
                      </div>
                    </div>
                  </div>
                ))}
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
                  <AreaChart data={hourlyVolumeData}>
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
                        data={callOutcomeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {callOutcomeData.map((entry, index) => (
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
                    <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-warning">Cost Breakdown Cases</span>
                        <span className="text-2xl font-bold text-warning">38.3%</span>
                      </div>
                      <Progress value={38.3} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">18 active cases requiring approval</p>
                    </div>
                    <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-success">Predictive Maintenance</span>
                        <span className="text-2xl font-bold text-success">31.9%</span>
                      </div>
                      <Progress value={31.9} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">15 proactive alerts sent</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-primary">General Service</span>
                        <span className="text-2xl font-bold text-primary">29.8%</span>
                      </div>
                      <Progress value={29.8} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">14 routine inquiries handled</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="workload" className="mt-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={agentWorkloadComparisonData}>
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
                  {recentTickets.map((ticket, i) => (
                    <tr key={i} className="hover:bg-card/30 transition-colors">
                      <td className="py-3 text-sm font-medium text-primary">{ticket.id}</td>
                      <td className="py-3 text-sm">{ticket.customer}</td>
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
                            ticket.status === "Resolved" ? "border-success text-success" :
                            ticket.status === "In Progress" ? "border-primary text-primary" :
                            "border-muted text-muted-foreground"
                          }
                        >
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-xs">{ticket.assignedTo}</td>
                      <td className="py-3 text-xs text-muted-foreground">{ticket.createdAt}</td>
                      
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

export default SupportDashboard;
