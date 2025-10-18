import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Filter, TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const Tickets = () => {
  const tickets = [
    { id: "TKT-2045", customer: "Emily White", issue: "Battery replacement query", priority: "High", status: "In Progress", assignedTo: "AI Agent 2", createdAt: "10 mins ago", category: "Technical", responseTime: "2m 15s" },
    { id: "TKT-2044", customer: "James Miller", issue: "Oil change scheduling", priority: "Medium", status: "Pending", assignedTo: "AI Agent 1", createdAt: "25 mins ago", category: "Service", responseTime: "1m 30s" },
    { id: "TKT-2043", customer: "Anna Taylor", issue: "Brake system check", priority: "Critical", status: "Assigned", assignedTo: "Human Agent 1", createdAt: "45 mins ago", category: "Safety", responseTime: "45s" },
    { id: "TKT-2042", customer: "Tom Wilson", issue: "Tire rotation request", priority: "Low", status: "Resolved", assignedTo: "AI Agent 3", createdAt: "1 hour ago", category: "Service", responseTime: "3m 20s" },
  ];

  const ticketTrends = [
    { day: "Mon", created: 34, resolved: 32, pending: 2 },
    { day: "Tue", created: 42, resolved: 38, pending: 4 },
    { day: "Wed", created: 38, resolved: 36, pending: 2 },
    { day: "Thu", created: 45, resolved: 43, pending: 2 },
    { day: "Fri", created: 41, resolved: 39, pending: 2 },
  ];

  return (
    <DashboardLayout title="Tickets" description="Manage and track customer support tickets">
      <div className="space-y-8">
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="glass border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Open Tickets</p>
                  <p className="text-3xl font-bold">8</p>
                  <p className="text-xs text-warning mt-1">2 critical</p>
                </div>
                <MessageSquare className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Resolved Today</p>
                  <p className="text-3xl font-bold">39</p>
                  <p className="text-xs text-success mt-1">+12% from yesterday</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Resolution</p>
                  <p className="text-3xl font-bold">2.4h</p>
                  <p className="text-xs text-success mt-1">-0.5h improvement</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">SLA Compliance</p>
                  <p className="text-3xl font-bold">96%</p>
                  <p className="text-xs text-success mt-1">Above target</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>Ticket Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ticketTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 25%, 20%)" />
                <XAxis dataKey="day" stroke="hsl(215, 20%, 65%)" />
                <YAxis stroke="hsl(215, 20%, 65%)" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 28%, 10%)', border: '1px solid hsl(220, 25%, 20%)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="created" stroke="hsl(199, 89%, 48%)" strokeWidth={2} name="Created" />
                <Line type="monotone" dataKey="resolved" stroke="hsl(142, 76%, 36%)" strokeWidth={2} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Tickets</CardTitle>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Search..." className="w-64" />
                <Button size="icon" variant="outline"><Filter className="w-4 h-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                    <TableCell>{ticket.customer}</TableCell>
                    <TableCell className="max-w-xs truncate">{ticket.issue}</TableCell>
                    <TableCell>
                      <Badge variant={ticket.priority === "Critical" ? "destructive" : ticket.priority === "High" ? "default" : "secondary"}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{ticket.responseTime}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Tickets;
