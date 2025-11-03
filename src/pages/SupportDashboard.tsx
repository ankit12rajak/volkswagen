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
  const stats = [
    {
      title: "Active Calls",
      value: "12",
      change: "3 in queue",
      changeType: "neutral" as const,
      icon: Phone,
    },
    {
      title: "Resolved Today",
      value: "186",
      change: "+18% from yesterday",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
    {
      title: "Avg. Response Time",
      value: "24s",
      change: "-6s improvement",
      changeType: "positive" as const,
      icon: Clock,
    },
    {
      title: "Open Tickets",
      value: "8",
      change: "2 critical",
      changeType: "negative" as const,
      icon: MessageSquare,
    },
    {
      title: "Queue Wait Time",
      value: "1m 15s",
      change: "Within target",
      changeType: "positive" as const,
      icon: Timer,
    },
    {
      title: "First Call Resolution",
      value: "91%",
      change: "+5% this week",
      changeType: "positive" as const,
      icon: Target,
    },
    {
      title: "Escalation Rate",
      value: "5.2%",
      change: "-1.3% improvement",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "Active Agents",
      value: "18",
      change: "15 AI, 3 Human",
      changeType: "neutral" as const,
      icon: Users,
    },
  ];

  const activeCalls = [
    { 
      id: "CALL-1034", 
      customer: "Robert Chen", 
      phone: "+49 176 2234 5678",
      topic: "Service appointment scheduling", 
      sentiment: "Positive",
      duration: "1m 23s",
      aiConfidence: 94,
      priority: "Normal",
      agent: "AI Agent 1"
    },
    { 
      id: "CALL-1033", 
      customer: "Lisa Anderson", 
      phone: "+49 151 8876 5432",
      topic: "Warranty inquiry - brake system", 
      sentiment: "Neutral",
      duration: "3m 45s",
      aiConfidence: 87,
      priority: "Medium",
      agent: "AI Agent 2"
    },
    { 
      id: "CALL-1032", 
      customer: "David Park", 
      phone: "+49 160 4455 7890",
      topic: "Technical issue - engine warning light", 
      sentiment: "Negative",
      duration: "5m 12s",
      aiConfidence: 78,
      priority: "High",
      agent: "Human Agent 1"
    },
    { 
      id: "CALL-1031", 
      customer: "Maria Schmidt", 
      phone: "+49 172 3344 6677",
      topic: "Parts availability check", 
      sentiment: "Positive",
      duration: "2m 05s",
      aiConfidence: 92,
      priority: "Normal",
      agent: "AI Agent 3"
    },
  ];

  const queueData = [
    { position: 1, customer: "Thomas Weber", topic: "Oil change booking", waitTime: "0m 35s", priority: "Normal" },
    { position: 2, customer: "Julia Becker", topic: "Recall information", waitTime: "1m 12s", priority: "Medium" },
    { position: 3, customer: "Michael Braun", topic: "Invoice question", waitTime: "1m 45s", priority: "Normal" },
  ];

  const recentTickets = [
    { 
      id: "TKT-2045", 
      customer: "Emily White", 
      issue: "Battery replacement query - needs follow-up", 
      priority: "High", 
      status: "In Progress",
      assignedTo: "AI Agent 2",
      createdAt: "10 mins ago",
      category: "Technical"
    },
    { 
      id: "TKT-2044", 
      customer: "James Miller", 
      issue: "Oil change scheduling - confirmed appointment", 
      priority: "Medium", 
      status: "Pending",
      assignedTo: "AI Agent 1",
      createdAt: "25 mins ago",
      category: "Service"
    },
    { 
      id: "TKT-2043", 
      customer: "Anna Taylor", 
      issue: "Brake system check - urgent safety concern", 
      priority: "Critical", 
      status: "Assigned",
      assignedTo: "Human Agent 1",
      createdAt: "45 mins ago",
      category: "Safety"
    },
    { 
      id: "TKT-2042", 
      customer: "Tom Wilson", 
      issue: "Tire rotation request - completed", 
      priority: "Low", 
      status: "Resolved",
      assignedTo: "AI Agent 3",
      createdAt: "1 hour ago",
      category: "Service"
    },
    { 
      id: "TKT-2041", 
      customer: "Sophie Meyer", 
      issue: "Warranty claim submission", 
      priority: "High", 
      status: "In Progress",
      assignedTo: "Human Agent 2",
      createdAt: "1.5 hours ago",
      category: "Warranty"
    },
  ];

  const callOutcomeData = [
    { name: "Resolved", value: 168, color: "hsl(142, 76%, 36%)" },
    { name: "Escalated", value: 12, color: "hsl(0, 72%, 51%)" },
    { name: "Callback Required", value: 6, color: "hsl(38, 92%, 50%)" },
  ];

  const hourlyVolumeData = [
    { hour: "8 AM", incoming: 12, handled: 12, waiting: 0 },
    { hour: "9 AM", incoming: 18, handled: 17, waiting: 1 },
    { hour: "10 AM", incoming: 24, handled: 22, waiting: 2 },
    { hour: "11 AM", incoming: 28, handled: 26, waiting: 2 },
    { hour: "12 PM", incoming: 32, handled: 30, waiting: 2 },
    { hour: "1 PM", incoming: 26, handled: 25, waiting: 1 },
    { hour: "2 PM", incoming: 22, handled: 22, waiting: 0 },
    { hour: "3 PM", incoming: 20, handled: 20, waiting: 0 },
  ];

  const agentWorkloadData = [
    { agent: "AI Agent 1", calls: 42, avgTime: 2.8, satisfaction: 4.8 },
    { agent: "AI Agent 2", calls: 39, avgTime: 3.1, satisfaction: 4.7 },
    { agent: "AI Agent 3", calls: 38, avgTime: 2.9, satisfaction: 4.9 },
    { agent: "Human Agent 1", calls: 18, avgTime: 4.2, satisfaction: 4.6 },
    { agent: "Human Agent 2", calls: 15, avgTime: 4.5, satisfaction: 4.5 },
  ];

  const responseTimeMetrics = [
    { metric: "Speed", value: 92 },
    { metric: "Accuracy", value: 88 },
    { metric: "Empathy", value: 85 },
    { metric: "Resolution", value: 91 },
    { metric: "Knowledge", value: 89 },
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

  const agentWorkloadComparisonData = [
    { day: "Day 1", aiAgents: 119, humanAgents: 33 }, // Aggregated: AI Agent 1+2+3, Human 1+2
    { day: "Day 2", aiAgents: 126, humanAgents: 37 },
    { day: "Day 3", aiAgents: 118, humanAgents: 35 },
    { day: "Day 4", aiAgents: 123, humanAgents: 39 },
    { day: "Day 5", aiAgents: 129, humanAgents: 41 },
  ];

  return (
    <DashboardLayout 
      title="Support Dashboard" 
      description="Real-time call monitoring and customer service analytics"
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
                    Live Call Monitoring
                  </CardTitle>
                  <CardDescription>Real-time AI agent conversations with detailed insights</CardDescription>
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
                            className={
                              call.priority === "High" ? "border-destructive text-destructive" :
                              call.priority === "Medium" ? "border-warning text-warning" :
                              "border-muted text-muted-foreground"
                            }
                          >
                            {call.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{call.topic}</p>
                        <p className="text-xs text-muted-foreground">{call.phone}</p>
                      </div>
                      {/* <Button size="sm" variant="ghost" className="h-8">
                        <ExternalLink className="w-4 h-4" />
                      </Button> */}
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 text-sm">
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
                        <UserCheck className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Agent</p>
                          <p className="font-medium text-xs">{call.agent}</p>
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
              Support Performance Analytics
            </CardTitle>
            <CardDescription>Comprehensive metrics and operational insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="volume" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                <TabsTrigger value="volume">Hourly Volume</TabsTrigger>
                <TabsTrigger value="outcomes">Call Outcomes</TabsTrigger>
                <TabsTrigger value="workload">Agent Workload</TabsTrigger>
                <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
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
                    <Area type="monotone" dataKey="incoming" stroke="hsl(199, 89%, 48%)" fillOpacity={1} fill="url(#colorIncoming)" name="Chatbot" />
                    <Area type="monotone" dataKey="handled" stroke="hsl(142, 76%, 36%)" fillOpacity={1} fill="url(#colorHandled)" name="Telephony" />
                    
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
                    <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-success">Successfully Resolved</span>
                        <span className="text-2xl font-bold text-success">90.3%</span>
                      </div>
                      <Progress value={90.3} className="h-2" />
                    </div>
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-destructive">Escalated</span>
                        <span className="text-2xl font-bold text-destructive">6.5%</span>
                      </div>
                      <Progress value={6.5} className="h-2" />
                    </div>
                    <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-warning">Callback Required</span>
                        <span className="text-2xl font-bold text-warning">3.2%</span>
                      </div>
                      <Progress value={3.2} className="h-2" />
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
                    <Bar dataKey="aiAgents" fill="hsl(199, 89%, 48%)" name="AI Agents" />
                    <Bar dataKey="humanAgents" fill="hsl(142, 76%, 36%)" name="Human Agents" />
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
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>Comprehensive ticket management and tracking</CardDescription>
              </div>
              
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Ticket ID</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Issue</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Category</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Priority</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Assigned To</th>
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
