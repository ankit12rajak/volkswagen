import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, UserPlus, Trash2, Shield, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface DealershipUser {
  id: string;
  email: string;
  password: string;
  dealership_name: string;
  created_at: string;
  created_by: string;
}

const UserManagement = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dealershipUsers, setDealershipUsers] = useState<DealershipUser[]>([]);
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dealershipName, setDealershipName] = useState("");

  // Fetch dealership users
  const fetchDealershipUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('dealership_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDealershipUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchDealershipUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('dealership_users')
        .insert([
          {
            email,
            password,
            dealership_name: dealershipName,
            created_by: user?.email || 'admin@volkswagen.com'
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Dealership user created successfully",
      });

      // Reset form
      setEmail("");
      setPassword("");
      setDealershipName("");
      setShowDialog(false);
      
      // Refresh list
      fetchDealershipUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const { error } = await supabase
        .from('dealership_users')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });

      fetchDealershipUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout 
      title="User Management" 
      description="Create and manage dealership support credentials"
    >
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Dealerships</p>
                  <p className="text-3xl font-bold">{dealershipUsers.length}</p>
                </div>
                <Building2 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Users</p>
                  <p className="text-3xl font-bold">{dealershipUsers.length}</p>
                </div>
                <Users className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Admin Access</p>
                  <p className="text-3xl font-bold">1</p>
                </div>
                <Shield className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dealership Users Table */}
        <Card className="glass border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Dealership Support Users
                </CardTitle>
                <CardDescription>Manage dealership login credentials</CardDescription>
              </div>
              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create User
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Create Dealership User</DialogTitle>
                    <DialogDescription>
                      Create login credentials for a dealership support user
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateUser}>
                    <div className="space-y-6 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="dealer@volkswagen.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="text"
                          placeholder="Create a secure password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          This password will be shared with the dealership
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dealership">Dealership Name</Label>
                        <Input
                          id="dealership"
                          placeholder="VW Mumbai Central"
                          value={dealershipName}
                          onChange={(e) => setDealershipName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowDialog(false)}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create User"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {dealershipUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No dealership users created yet</p>
                <Button onClick={() => setShowDialog(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create First User
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Dealership</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dealershipUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>
                        <code className="px-2 py-1 rounded bg-muted text-sm">
                          {user.password}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          {user.dealership_name}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.created_by}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Admin Credentials Info */}
        <Card className="glass border-border/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Admin Credentials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-card/50">
                <span className="text-sm text-muted-foreground">Email:</span>
                <code className="text-sm font-semibold">admin@volkswagen.com</code>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-card/50">
                <span className="text-sm text-muted-foreground">Password:</span>
                <code className="text-sm font-semibold">Volkswagen@2025</code>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Admin credentials are fixed and cannot be modified. Only admin can create dealership user credentials.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
