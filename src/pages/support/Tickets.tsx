import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DollarSign, Search, Filter, TrendingUp, Clock, CheckCircle, AlertTriangle, Wrench, Car, Phone } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Tickets = () => {
  // Cost Breakdown Cases
  const costBreakdownCases = [
    {
      id: "CB-2045",
      customer: "Rajesh Kumar",
      vin: "WVWZZZ1JZ3W386752",
      phone: "+91 98765 43210",
      issue: "Engine oil leak + brake pad replacement",
      originalCost: "₹15,400",
      additionalWork: "Timing belt replacement needed",
      additionalCost: "₹8,200",
      totalCost: "₹23,600",
      status: "Pending Approval",
      priority: "High",
      language: "Hindi",
      aiCallTime: "2m 15s",
      createdAt: "10 mins ago"
    },
    {
      id: "CB-2044",
      customer: "Priya Sharma",
      vin: "WVWZZZ1JZ3W386753",
      phone: "+91 98765 43211",
      issue: "AC compressor replacement",
      originalCost: "₹22,800",
      additionalWork: "Cabin filter + condenser cleaning",
      additionalCost: "₹2,400",
      totalCost: "₹25,200",
      status: "Approved",
      priority: "Medium",
      language: "English",
      aiCallTime: "1m 45s",
      createdAt: "25 mins ago"
    },
    {
      id: "CB-2043",
      customer: "Mohammed Ali",
      vin: "WVWZZZ1JZ3W386754",
      phone: "+91 98765 43212",
      issue: "Transmission service + clutch adjustment",
      originalCost: "₹18,600",
      additionalWork: "Flywheel resurfacing required",
      additionalCost: "₹12,500",
      totalCost: "₹31,100",
      status: "Customer Reviewing",
      priority: "High",
      language: "Urdu",
      aiCallTime: "3m 20s",
      createdAt: "45 mins ago"
    },
  ];

  // Predictive Maintenance Cases
  const predictiveMaintenanceCases = [
    {
      id: "PM-2045",
      customer: "Suresh Reddy",
      vin: "WVWZZZ1JZ3W386756",
      phone: "+91 98765 43213",
      issue: "Service due in 500km - Oil change + filter",
      predictedFailure: "Engine oil degradation",
      riskLevel: "Medium",
      estimatedCost: "₹3,500",
      scheduledDate: "2024-11-12",
      status: "Appointment Booked",
      priority: "Medium",
      language: "Telugu",
      aiCallTime: "1m 30s",
      mileage: "47,500 km",
      createdAt: "1 hour ago"
    },
    {
      id: "PM-2044",
      customer: "Deepika Singh",
      vin: "WVWZZZ1JZ3W386757",
      phone: "+91 98765 43214",
      issue: "Brake pads wear detected",
      predictedFailure: "Brake pad failure in 2 weeks",
      riskLevel: "High",
      estimatedCost: "₹8,200",
      scheduledDate: "2024-11-08",
      status: "Urgent - Called 3x",
      priority: "Critical",
      language: "Hindi",
      aiCallTime: "2m 45s",
      mileage: "62,300 km",
      createdAt: "2 hours ago"
    },
    {
      id: "PM-2043",
      customer: "Vikram Joshi",
      vin: "WVWZZZ1JZ3W386758",
      phone: "+91 98765 43215",
      issue: "Timing belt replacement due",
      predictedFailure: "Belt failure risk in 1 month",
      riskLevel: "High",
      estimatedCost: "₹15,400",
      scheduledDate: "2024-11-15",
      status: "Customer Declined",
      priority: "High",
      language: "Marathi",
      aiCallTime: "4m 10s",
      mileage: "89,200 km",
      createdAt: "3 hours ago"
    },
  ];

  // General Service Cases
  const generalServiceCases = [
    {
      id: "GS-2045",
      customer: "Amit Agarwal",
      vin: "WVWZZZ1JZ3W386764",
      phone: "+91 98765 43216",
      issue: "Routine service + inspection",
      serviceType: "Scheduled Maintenance",
      estimatedCost: "₹5,800",
      appointmentDate: "2024-11-08",
      status: "Confirmed",
      priority: "Low",
      language: "English",
      aiCallTime: "1m 15s",
      estimatedDuration: "2 hours",
      createdAt: "30 mins ago"
    },
    {
      id: "GS-2044",
      customer: "Neha Kapoor",
      vin: "WVWZZZ1JZ3W386765",
      phone: "+91 98765 43217",
      issue: "Strange noise from engine",
      serviceType: "Diagnostic",
      estimatedCost: "₹2,500",
      appointmentDate: "2024-11-06",
      status: "Urgent - Same Day",
      priority: "High",
      language: "Hindi",
      aiCallTime: "2m 30s",
      estimatedDuration: "1 hour",
      createdAt: "15 mins ago"
    },
    {
      id: "GS-2043",
      customer: "Rahul Verma",
      vin: "WVWZZZ1JZ3W386766",
      phone: "+91 98765 43218",
      issue: "Recall service - airbag module",
      serviceType: "Recall Service",
      estimatedCost: "₹0 (Covered)",
      appointmentDate: "2024-11-10",
      status: "Scheduled",
      priority: "High",
      language: "English",
      aiCallTime: "1m 50s",
      estimatedDuration: "3 hours",
      createdAt: "1 hour ago"
    },
  ];

  const stats = [
    { label: "Total Active Cases", value: "47", change: "+8 today", icon: Car, color: "primary" },
    { label: "Pending Approvals", value: "12", change: "Cost breakdowns", icon: DollarSign, color: "warning" },
    { label: "Appointments Today", value: "18", change: "6 completed", icon: CheckCircle, color: "success" },
    { label: "Urgent Cases", value: "5", change: "Require attention", icon: AlertTriangle, color: "destructive" },
  ];

  const casesTrend = [
    { day: "Mon", costBreakdown: 8, predictive: 6, general: 10 },
    { day: "Tue", costBreakdown: 10, predictive: 8, general: 12 },
    { day: "Wed", costBreakdown: 9, predictive: 7, general: 11 },
    { day: "Thu", costBreakdown: 12, predictive: 9, general: 14 },
    { day: "Fri", costBreakdown: 11, predictive: 8, general: 13 },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending approval": return "bg-warning/20 text-warning";
      case "approved": return "bg-success/20 text-success";
      case "customer reviewing": return "bg-primary/20 text-primary";
      case "appointment booked": return "bg-success/20 text-success";
      case "urgent - called 3x": return "bg-destructive/20 text-destructive";
      case "customer declined": return "bg-destructive/20 text-destructive";
      case "confirmed": return "bg-success/20 text-success";
      case "urgent - same day": return "bg-destructive/20 text-destructive";
      case "scheduled": return "bg-primary/20 text-primary";
      default: return "bg-muted/50 text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-destructive/80 text-destructive-foreground";
      case "medium": return "bg-warning/80 text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout title="Customer Cases" description="Manage AI voice assistant interactions and service cases">
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="glass border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className={`text-xs mt-1 text-${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 text-${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cases Trend */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>Weekly Case Trends</CardTitle>
            <CardDescription>AI voice assistant interactions by use case</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={casesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 25%, 20%)" />
                <XAxis dataKey="day" stroke="hsl(215, 20%, 65%)" />
                <YAxis stroke="hsl(215, 20%, 65%)" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 28%, 10%)', border: '1px solid hsl(220, 25%, 20%)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="costBreakdown" stroke="hsl(38, 92%, 50%)" strokeWidth={2} name="Cost Breakdown" />
                <Line type="monotone" dataKey="predictive" stroke="hsl(142, 76%, 36%)" strokeWidth={2} name="Predictive Maintenance" />
                <Line type="monotone" dataKey="general" stroke="hsl(199, 89%, 48%)" strokeWidth={2} name="General Service" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cases by Use Case */}
        <Card className="glass border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Customer Service Cases</CardTitle>
                <CardDescription>Organized by AI voice assistant use case</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search cases..." className="pl-9 w-64" />
                </div>
                <Button size="icon" variant="outline">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cost_breakdown" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                <TabsTrigger value="cost_breakdown" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Cost Breakdown
                </TabsTrigger>
                <TabsTrigger value="predictive" className="flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  Predictive Maintenance
                </TabsTrigger>
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  General Service
                </TabsTrigger>
              </TabsList>

              {/* Cost Breakdown Tab */}
              <TabsContent value="cost_breakdown" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Original Cost</TableHead>
                      <TableHead>Additional Work</TableHead>
                      <TableHead>Total Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {costBreakdownCases.map((case_) => (
                      <TableRow key={case_.id}>
                        <TableCell className="font-mono text-sm">{case_.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{case_.customer}</p>
                            <p className="text-xs text-muted-foreground">{case_.phone}</p>
                            <p className="text-xs text-muted-foreground">VIN: {case_.vin}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm">{case_.issue}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{case_.language}</Badge>
                            <span className="text-xs text-muted-foreground">Call: {case_.aiCallTime}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{case_.originalCost}</TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm">{case_.additionalWork}</p>
                          <p className="text-sm font-semibold text-warning mt-1">{case_.additionalCost}</p>
                        </TableCell>
                        <TableCell className="font-bold text-lg">{case_.totalCost}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(case_.status)}>
                            {case_.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(case_.priority)}>
                            {case_.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">View</Button>
                            {case_.status === "Pending Approval" && (
                              <Button size="sm">Approve</Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              {/* Predictive Maintenance Tab */}
              <TabsContent value="predictive" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Predicted Failure</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Est. Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {predictiveMaintenanceCases.map((case_) => (
                      <TableRow key={case_.id}>
                        <TableCell className="font-mono text-sm">{case_.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{case_.customer}</p>
                            <p className="text-xs text-muted-foreground">{case_.phone}</p>
                            <p className="text-xs text-muted-foreground">Mileage: {case_.mileage}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm">{case_.issue}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{case_.language}</Badge>
                            <span className="text-xs text-muted-foreground">Call: {case_.aiCallTime}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs text-sm text-muted-foreground">
                          {case_.predictedFailure}
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            case_.riskLevel === "High" ? "bg-destructive/20 text-destructive" :
                              case_.riskLevel === "Medium" ? "bg-warning/20 text-warning" :
                                "bg-success/20 text-success"
                          }>
                            {case_.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{case_.scheduledDate}</TableCell>
                        <TableCell className="font-semibold">{case_.estimatedCost}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(case_.status)}>
                            {case_.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">View</Button>
                            {case_.status === "Customer Declined" && (
                              <Button size="sm" variant="outline">
                                <Phone className="w-3 h-3 mr-1" />
                                Call Again
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              {/* General Service Tab */}
              <TabsContent value="general" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Appointment Date</TableHead>
                      <TableHead>Est. Duration</TableHead>
                      <TableHead>Est. Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generalServiceCases.map((case_) => (
                      <TableRow key={case_.id}>
                        <TableCell className="font-mono text-sm">{case_.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{case_.customer}</p>
                            <p className="text-xs text-muted-foreground">{case_.phone}</p>
                            <p className="text-xs text-muted-foreground">VIN: {case_.vin}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm">{case_.issue}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{case_.language}</Badge>
                            <span className="text-xs text-muted-foreground">Call: {case_.aiCallTime}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{case_.serviceType}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{case_.appointmentDate}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{case_.estimatedDuration}</TableCell>
                        <TableCell className="font-semibold">{case_.estimatedCost}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(case_.status)}>
                            {case_.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm">Manage</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Tickets;
