import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, Search, Filter, Shield, UserCheck, UserX, TrendingUp, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserManagement = () => {
  const users = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@vw.com", role: "Admin", status: "Active", calls: 234, satisfaction: 4.9, lastActive: "2 mins ago" },
    { id: 2, name: "Michael Chen", email: "m.chen@vw.com", role: "Support Agent", status: "Active", calls: 189, satisfaction: 4.7, lastActive: "5 mins ago" },
    { id: 3, name: "Emma Wilson", email: "e.wilson@vw.com", role: "Support Agent", status: "Active", calls: 156, satisfaction: 4.8, lastActive: "1 hour ago" },
    { id: 4, name: "James Brown", email: "j.brown@vw.com", role: "Supervisor", status: "Active", calls: 98, satisfaction: 4.6, lastActive: "3 hours ago" },
    { id: 5, name: "Lisa Garcia", email: "l.garcia@vw.com", role: "Support Agent", status: "Inactive", calls: 45, satisfaction: 4.4, lastActive: "2 days ago" },
    { id: 6, name: "David Lee", email: "d.lee@vw.com", role: "Support Agent", status: "Active", calls: 167, satisfaction: 4.5, lastActive: "30 mins ago" },
  ];

  const userStats = [
    { label: "Total Users", value: "24", change: "+3 this month", icon: Users, color: "primary" },
    { label: "Active Now", value: "18", change: "75% online rate", icon: Activity, color: "success" },
    { label: "Avg Performance", value: "4.7/5", change: "+0.3 improvement", icon: TrendingUp, color: "accent" },
    { label: "New This Week", value: "3", change: "Onboarding", icon: UserPlus, color: "warning" },
  ];

  const performanceData = [
    { name: "Sarah J.", calls: 234, resolved: 228, escalated: 6 },
    { name: "Michael C.", calls: 189, resolved: 182, escalated: 7 },
    { name: "Emma W.", calls: 156, resolved: 151, escalated: 5 },
    { name: "David L.", calls: 167, resolved: 160, escalated: 7 },
    { name: "James B.", calls: 98, resolved: 94, escalated: 4 },
  ];

  const roleDistribution = [
    { name: "Support Agents", value: 15, color: "hsl(199, 89%, 48%)" },
    { name: "Supervisors", value: 5, color: "hsl(142, 76%, 36%)" },
    { name: "Admins", value: 4, color: "hsl(38, 92%, 50%)" },
  ];

  return (
    <DashboardLayout 
      title="User Management" 
      description="Manage team members, roles, and permissions"
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

        {/* Analytics */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Top performers by call volume and resolution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 25%, 20%)" />
                  <XAxis dataKey="name" stroke="hsl(215, 20%, 65%)" />
                  <YAxis stroke="hsl(215, 20%, 65%)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(220, 28%, 10%)', 
                      border: '1px solid hsl(220, 25%, 20%)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="resolved" fill="hsl(142, 76%, 36%)" name="Resolved" />
                  <Bar dataKey="escalated" fill="hsl(0, 72%, 51%)" name="Escalated" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Role Distribution</CardTitle>
              <CardDescription>Team composition by role</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleDistribution.map((entry, index) => (
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
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

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
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
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
                            {user.role === "Admin" && <Shield className="w-3 h-3 mr-1" />}
                            {user.role}
                          </Badge>
                        </TableCell>
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
              </TabsContent>

              <TabsContent value="active" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Calls</TableHead>
                      <TableHead>Satisfaction</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.filter(u => u.status === "Active").map((user) => (
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
                          <Badge variant="outline" className="border-primary/50">{user.role}</Badge>
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
              </TabsContent>

              <TabsContent value="inactive" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.filter(u => u.status === "Inactive").map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-muted text-muted-foreground">
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
                          <Badge variant="outline" className="border-muted">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">Reactivate</Button>
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

export default UserManagement;
