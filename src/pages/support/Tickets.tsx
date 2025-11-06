import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DollarSign, Search, Filter, CheckCircle, AlertTriangle, Wrench, Car, Phone } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { SupportCase } from "@/lib/supabase";

const Tickets = () => {
  const [costBreakdownCases, setCostBreakdownCases] = useState<SupportCase[]>([]);
  const [predictiveMaintenanceCases, setPredictiveMaintenanceCases] = useState<SupportCase[]>([]);
  const [generalServiceCases, setGeneralServiceCases] = useState<SupportCase[]>([]);
  const [stats, setStats] = useState({
    totalActiveCases: 0,
    pendingApprovals: 0,
    appointmentsToday: 0,
    urgentCases: 0,
  });
  const [casesTrend, setCasesTrend] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTicketsData();
  }, []);

  const fetchTicketsData = async () => {
    try {
      setLoading(true);

      // Use optimized views for better performance
      const { data: costCases } = await supabase
        .from('cost_breakdown_cases')
        .select('*');

      const { data: predictiveCases } = await supabase
        .from('predictive_maintenance_cases')
        .select('*');

      const { data: generalCases } = await supabase
        .from('general_service_cases')
        .select('*');

      // Use the optimized stats function
      const { data: statsData } = await supabase
        .rpc('get_ticket_stats');

      if (statsData && statsData.length > 0) {
        const stat = statsData[0];
        setStats({
          totalActiveCases: Number(stat.total_active_cases) || 0,
          pendingApprovals: Number(stat.pending_approvals) || 0,
          appointmentsToday: Number(stat.appointments_today) || 0,
          urgentCases: Number(stat.urgent_cases) || 0,
        });
      }

      // Use the optimized weekly trends function
      const { data: trendData } = await supabase
        .rpc('get_weekly_case_trends');

      if (trendData && trendData.length > 0) {
        const trends = trendData.map((item: any) => ({
          day: item.day,
          costBreakdown: Number(item.cost_breakdown) || 0,
          predictive: Number(item.predictive) || 0,
          general: Number(item.general) || 0,
        }));
        setCasesTrend(trends);
      } else {
        // Default empty data
        setCasesTrend([
          { day: "Mon", costBreakdown: 0, predictive: 0, general: 0 },
          { day: "Tue", costBreakdown: 0, predictive: 0, general: 0 },
          { day: "Wed", costBreakdown: 0, predictive: 0, general: 0 },
          { day: "Thu", costBreakdown: 0, predictive: 0, general: 0 },
          { day: "Fri", costBreakdown: 0, predictive: 0, general: 0 },
        ]);
      }

      setCostBreakdownCases(costCases || []);
      setPredictiveMaintenanceCases(predictiveCases || []);
      setGeneralServiceCases(generalCases || []);

    } catch (error) {
      console.error('Error fetching tickets data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };



  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filterCases = (cases: SupportCase[]) => {
    if (!searchQuery) return cases;
    const query = searchQuery.toLowerCase();
    return cases.filter(c => 
      c.case_id.toLowerCase().includes(query) ||
      c.customer_name.toLowerCase().includes(query) ||
      c.issue.toLowerCase().includes(query) ||
      (c.vin && c.vin.toLowerCase().includes(query))
    );
  };

  if (loading) {
    return (
      <DashboardLayout title="Customer Cases" description="Manage AI voice assistant interactions and service cases">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading tickets data...</div>
        </div>
      </DashboardLayout>
    );
  }

  const statsCards = [
    { label: "Total Active Cases", value: stats.totalActiveCases.toString(), change: "Active", icon: Car, color: "primary" },
    { label: "Pending Approvals", value: stats.pendingApprovals.toString(), change: "Cost breakdowns", icon: DollarSign, color: "warning" },
    { label: "Appointments Today", value: stats.appointmentsToday.toString(), change: "Scheduled", icon: CheckCircle, color: "success" },
    { label: "Urgent Cases", value: stats.urgentCases.toString(), change: "Require attention", icon: AlertTriangle, color: "destructive" },
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
          {statsCards.map((stat, i) => (
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
                  <Input 
                    placeholder="Search cases..." 
                    className="pl-9 w-64" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
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
                    {filterCases(costBreakdownCases).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                          No cost breakdown cases found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filterCases(costBreakdownCases).map((case_) => (
                        <TableRow key={case_.id}>
                          <TableCell className="font-mono text-sm">{case_.case_id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-semibold">{case_.customer_name}</p>
                              <p className="text-xs text-muted-foreground">{case_.customer_phone}</p>
                              <p className="text-xs text-muted-foreground">VIN: {case_.vin}</p>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p className="text-sm">{case_.issue}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{case_.language || 'English'}</Badge>
                              <span className="text-xs text-muted-foreground">
                                Call: {formatDuration(case_.ai_call_duration_seconds || 0)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">{formatCurrency(case_.original_cost_inr || 0)}</TableCell>
                          <TableCell className="max-w-xs">
                            <p className="text-sm">{case_.additional_work || 'N/A'}</p>
                            <p className="text-sm font-semibold text-warning mt-1">
                              {formatCurrency(case_.additional_cost_inr || 0)}
                            </p>
                          </TableCell>
                          <TableCell className="font-bold text-lg">{formatCurrency(case_.total_cost_inr || 0)}</TableCell>
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
                      ))
                    )}
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
                    {filterCases(predictiveMaintenanceCases).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                          No predictive maintenance cases found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filterCases(predictiveMaintenanceCases).map((case_) => (
                        <TableRow key={case_.id}>
                          <TableCell className="font-mono text-sm">{case_.case_id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-semibold">{case_.customer_name}</p>
                              <p className="text-xs text-muted-foreground">{case_.customer_phone}</p>
                              <p className="text-xs text-muted-foreground">Mileage: {case_.mileage || 'N/A'}</p>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p className="text-sm">{case_.issue}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{case_.language || 'English'}</Badge>
                              <span className="text-xs text-muted-foreground">
                                Call: {formatDuration(case_.ai_call_duration_seconds || 0)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs text-sm text-muted-foreground">
                            {case_.predicted_failure || 'N/A'}
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              case_.risk_level === "High" ? "bg-destructive/20 text-destructive" :
                                case_.risk_level === "Medium" ? "bg-warning/20 text-warning" :
                                  "bg-success/20 text-success"
                            }>
                              {case_.risk_level || 'N/A'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{formatDate(case_.scheduled_date)}</TableCell>
                          <TableCell className="font-semibold">{formatCurrency(case_.estimated_cost_inr)}</TableCell>
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
                      ))
                    )}
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
                    {filterCases(generalServiceCases).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                          No general service cases found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filterCases(generalServiceCases).map((case_) => (
                        <TableRow key={case_.id}>
                          <TableCell className="font-mono text-sm">{case_.case_id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-semibold">{case_.customer_name}</p>
                              <p className="text-xs text-muted-foreground">{case_.customer_phone}</p>
                              <p className="text-xs text-muted-foreground">VIN: {case_.vin}</p>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p className="text-sm">{case_.issue}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{case_.language || 'English'}</Badge>
                              <span className="text-xs text-muted-foreground">
                                Call: {formatDuration(case_.ai_call_duration_seconds || 0)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{case_.service_type || 'N/A'}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{formatDate(case_.appointment_date)}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{case_.estimated_duration || 'N/A'}</TableCell>
                          <TableCell className="font-semibold">{formatCurrency(case_.estimated_cost_inr)}</TableCell>
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
                      ))
                    )}
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
