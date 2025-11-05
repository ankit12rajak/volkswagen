import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, Search, Filter, Shield, UserCheck, UserX, TrendingUp, Building2, DollarSign, Star, Plus, Edit2, Trash2, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const UserManagement = () => {
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [activeMainTab, setActiveMainTab] = useState("users");

  // Dealership data with performance metrics
  const dealerships = [
    { 
      id: 1, 
      name: "VW Mumbai Central", 
      location: "Mumbai, Maharashtra",
      manager: "Rajesh Kumar",
      totalStaff: 24,
      activeStaff: 22,
      revenue: "₹45.2L",
      revenueGrowth: "+12%",
      customerSatisfaction: 4.8,
      servicesCompleted: 342,
      avgResponseTime: "2.3 hrs",
      status: "Active",
      performance: 92
    },
    { 
      id: 2, 
      name: "VW Delhi Showroom", 
      location: "New Delhi, Delhi",
      manager: "Priya Sharma",
      totalStaff: 18,
      activeStaff: 18,
      revenue: "₹38.7L",
      revenueGrowth: "+8%",
      customerSatisfaction: 4.6,
      servicesCompleted: 289,
      avgResponseTime: "3.1 hrs",
      status: "Active",
      performance: 87
    },
    { 
      id: 3, 
      name: "VW Bangalore Tech", 
      location: "Bangalore, Karnataka",
      manager: "Anita Patel",
      totalStaff: 32,
      activeStaff: 30,
      revenue: "₹52.3L",
      revenueGrowth: "+15%",
      customerSatisfaction: 4.9,
      servicesCompleted: 412,
      avgResponseTime: "1.8 hrs",
      status: "Active",
      performance: 95
    },
    { 
      id: 4, 
      name: "VW Pune Service Center", 
      location: "Pune, Maharashtra",
      manager: "Vikram Joshi",
      totalStaff: 15,
      activeStaff: 13,
      revenue: "₹28.4L",
      revenueGrowth: "+5%",
      customerSatisfaction: 4.4,
      servicesCompleted: 198,
      avgResponseTime: "4.2 hrs",
      status: "Active",
      performance: 78
    },
    { 
      id: 5, 
      name: "VW Hyderabad Hub", 
      location: "Hyderabad, Telangana",
      manager: "Deepika Singh",
      totalStaff: 21,
      activeStaff: 19,
      revenue: "₹41.8L",
      revenueGrowth: "+10%",
      customerSatisfaction: 4.7,
      servicesCompleted: 315,
      avgResponseTime: "2.7 hrs",
      status: "Active",
      performance: 89
    }
  ];

  // Performance trend data for dealerships
  const dealershipTrends = [
    { month: "Jul", mumbai: 85, delhi: 82, bangalore: 90, pune: 75, hyderabad: 84 },
    { month: "Aug", mumbai: 88, delhi: 84, bangalore: 92, pune: 76, hyderabad: 86 },
    { month: "Sep", mumbai: 90, delhi: 86, bangalore: 93, pune: 77, hyderabad: 87 },
    { month: "Oct", mumbai: 91, delhi: 87, bangalore: 94, pune: 78, hyderabad: 88 },
    { month: "Nov", mumbai: 92, delhi: 87, bangalore: 95, pune: 78, hyderabad: 89 }
  ];

  // Dealership Managers - only one role type
  const [dealershipManagers, setDealershipManagers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.k@vw.com",
      phone: "+91 98765 43210",
      dealership: "VW Mumbai Central",
      dealershipId: 1,
      assignedDate: "2024-01-15",
      status: "Active",
      performance: 92
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.s@vw.com",
      phone: "+91 98765 43211",
      dealership: "VW Delhi Showroom",
      dealershipId: 2,
      assignedDate: "2024-02-20",
      status: "Active",
      performance: 87
    },
    {
      id: 3,
      name: "Anita Patel",
      email: "anita.p@vw.com",
      phone: "+91 98765 43212",
      dealership: "VW Bangalore Tech",
      dealershipId: 3,
      assignedDate: "2023-11-10",
      status: "Active",
      performance: 95
    },
    {
      id: 4,
      name: "Vikram Joshi",
      email: "vikram.j@vw.com",
      phone: "+91 98765 43213",
      dealership: "VW Pune Service Center",
      dealershipId: 4,
      assignedDate: "2024-03-05",
      status: "Active",
      performance: 78
    },
    {
      id: 5,
      name: "Deepika Singh",
      email: "deepika.s@vw.com",
      phone: "+91 98765 43214",
      dealership: "VW Hyderabad Hub",
      dealershipId: 5,
      assignedDate: "2024-01-28",
      status: "Active",
      performance: 89
    }
  ]);

  const users = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@vw.com", role: "Staff", dealership: "VW Mumbai Central", status: "Active", calls: 234, satisfaction: 4.9, lastActive: "2 mins ago" },
    { id: 2, name: "Michael Chen", email: "m.chen@vw.com", role: "Staff", dealership: "VW Delhi Showroom", status: "Active", calls: 189, satisfaction: 4.7, lastActive: "5 mins ago" },
    { id: 3, name: "Emma Wilson", email: "e.wilson@vw.com", role: "Staff", dealership: "VW Bangalore Tech", status: "Active", calls: 156, satisfaction: 4.8, lastActive: "1 hour ago" },
    { id: 4, name: "James Brown", email: "j.brown@vw.com", role: "Staff", dealership: "VW Pune Service Center", status: "Active", calls: 98, satisfaction: 4.6, lastActive: "3 hours ago" },
    { id: 5, name: "Lisa Garcia", email: "l.garcia@vw.com", role: "Staff", dealership: "VW Hyderabad Hub", status: "Inactive", calls: 45, satisfaction: 4.4, lastActive: "2 days ago" },
    { id: 6, name: "David Lee", email: "d.lee@vw.com", role: "Staff", dealership: "VW Mumbai Central", status: "Active", calls: 167, satisfaction: 4.5, lastActive: "30 mins ago" },
  ];

  const userStats = [
    { label: "Total Dealerships", value: "5", change: "+1 this quarter", icon: Building2, color: "primary" },
    { label: "Assigned Managers", value: "5", change: "All locations covered", icon: Shield, color: "success" },
    { label: "Avg Performance", value: "88%", change: "+5% this month", icon: TrendingUp, color: "accent" },
    { label: "Total Revenue", value: "₹206.4L", change: "+10% growth", icon: DollarSign, color: "warning" },
  ];



  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-success";
    if (performance >= 80) return "text-primary";
    if (performance >= 70) return "text-warning";
    return "text-destructive";
  };

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 90) return "bg-success/20 text-success";
    if (performance >= 80) return "bg-primary/20 text-primary";
    if (performance >= 70) return "bg-warning/20 text-warning";
    return "bg-destructive/20 text-destructive";
  };

  return (
    <DashboardLayout 
      title="User & Dealership Management" 
      description="Monitor dealership performance, manage staff, and configure roles"
    >
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userStats.map((stat, i) => (
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

        {/* Main Tabs */}
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="dealerships" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Dealership Performance
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Manager Assignment
            </TabsTrigger>
          </TabsList>

          {/* Dealership Performance Tab */}
          <TabsContent value="dealerships" className="mt-6 space-y-6">
            {/* Performance Trend Chart */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Dealership Performance Trends</CardTitle>
                <CardDescription>Monthly performance comparison across all dealerships</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={dealershipTrends}>
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
                    <Line type="monotone" dataKey="mumbai" stroke="hsl(199, 89%, 48%)" name="Mumbai" strokeWidth={2} />
                    <Line type="monotone" dataKey="delhi" stroke="hsl(142, 76%, 36%)" name="Delhi" strokeWidth={2} />
                    <Line type="monotone" dataKey="bangalore" stroke="hsl(38, 92%, 50%)" name="Bangalore" strokeWidth={2} />
                    <Line type="monotone" dataKey="pune" stroke="hsl(0, 72%, 51%)" name="Pune" strokeWidth={2} />
                    <Line type="monotone" dataKey="hyderabad" stroke="hsl(280, 65%, 60%)" name="Hyderabad" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Dealership Cards */}
            <div className="grid lg:grid-cols-2 gap-6">
              {dealerships.map((dealership) => (
                <Card key={dealership.id} className="glass border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{dealership.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            {dealership.location}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getPerformanceBadge(dealership.performance)}>
                        {dealership.performance}% Performance
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Manager Info */}
                    <div className="flex items-center gap-2 text-sm">
                      <UserCheck className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Manager:</span>
                      <span className="font-semibold">{dealership.manager}</span>
                    </div>

                    <Separator />

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Total Staff</p>
                        <p className="text-lg font-bold">{dealership.totalStaff}</p>
                        <p className="text-xs text-success">{dealership.activeStaff} active</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Revenue</p>
                        <p className="text-lg font-bold">{dealership.revenue}</p>
                        <p className="text-xs text-success">{dealership.revenueGrowth}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Services</p>
                        <p className="text-lg font-bold">{dealership.servicesCompleted}</p>
                        <p className="text-xs text-muted-foreground">completed</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Avg Response</p>
                        <p className="text-lg font-bold">{dealership.avgResponseTime}</p>
                        <p className="text-xs text-muted-foreground">response time</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Customer Satisfaction */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                      </div>
                      <span className="text-lg font-bold text-warning">{dealership.customerSatisfaction}/5.0</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Manage Staff
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="mt-6 space-y-6">

            {/* User List */}
            <Card className="glass border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Team Members
                    </CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Search users..." className="pl-9 w-64" />
                    </div>
                    <Button size="icon" variant="outline">
                      <Filter className="w-4 h-4" />
                    </Button>
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Dealership</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Calls</TableHead>
                      <TableHead>Satisfaction</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-primary/50">
                            {user.role.includes("Admin") && <Shield className="w-3 h-3 mr-1" />}
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{user.dealership}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                            {user.status === "Active" ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{user.calls}</TableCell>
                        <TableCell>
                          <span className="text-success font-semibold">{user.satisfaction}</span>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost">Edit</Button>
                            <Button size="sm" variant="ghost">View</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dealership Managers Tab */}
          <TabsContent value="roles" className="mt-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Dealership Manager Assignment</h3>
                <p className="text-sm text-muted-foreground">Assign managers to different dealership locations</p>
              </div>
              <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedRole(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Assign New Manager
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{selectedRole ? "Edit Manager Assignment" : "Assign Dealership Manager"}</DialogTitle>
                    <DialogDescription>
                      Assign a manager to a specific dealership location
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="manager-name">Manager Name</Label>
                      <Input id="manager-name" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager-email">Email Address</Label>
                      <Input id="manager-email" type="email" placeholder="manager@vw.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager-phone">Phone Number</Label>
                      <Input id="manager-phone" placeholder="+91 98765 43210" />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="dealership-location">Dealership Location</Label>
                      <Select>
                        <SelectTrigger id="dealership-location">
                          <SelectValue placeholder="Select dealership" />
                        </SelectTrigger>
                        <SelectContent>
                          {dealerships.map((dealership) => (
                            <SelectItem key={dealership.id} value={dealership.id.toString()}>
                              {dealership.name} - {dealership.location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Each dealership can have only one manager
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowRoleDialog(false)}>Cancel</Button>
                    <Button onClick={() => setShowRoleDialog(false)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {selectedRole ? "Update Assignment" : "Assign Manager"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Managers Table */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Dealership Managers
                </CardTitle>
                <CardDescription>All managers assigned to dealership locations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Manager</TableHead>
                      <TableHead>Dealership Location</TableHead>
                      <TableHead>Assigned Date</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dealershipManagers.map((manager) => (
                      <TableRow key={manager.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {manager.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{manager.name}</p>
                              <p className="text-xs text-muted-foreground">{manager.email}</p>
                              <p className="text-xs text-muted-foreground">{manager.phone}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-primary" />
                            <div>
                              <p className="font-medium">{manager.dealership}</p>
                              <p className="text-xs text-muted-foreground">
                                {dealerships.find(d => d.id === manager.dealershipId)?.location}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(manager.assignedDate).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={getPerformanceBadge(manager.performance)}>
                              {manager.performance}%
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={manager.status === "Active" ? "default" : "secondary"}>
                            {manager.status === "Active" ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
                            {manager.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => {
                                setSelectedRole(manager);
                                setShowRoleDialog(true);
                              }}
                            >
                              <Edit2 className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-3 h-3 mr-1 text-destructive" />
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Manager Role Info Card */}
            <Card className="glass border-border/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Dealership Manager Role
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  All dealership managers have the same set of permissions and access to manage their assigned location.
                </p>
                <Separator />
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Standard Permissions</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Manage Staff</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">View Analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Service Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Customer Communication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Inventory Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Performance Reports</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
