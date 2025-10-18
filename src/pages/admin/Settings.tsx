import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings2, Bell, Shield, Database, Zap, Globe, Mail, Phone, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <DashboardLayout 
      title="Settings" 
      description="Configure system preferences and integrations"
    >
      <div className="space-y-8">
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" />
              System Configuration
            </CardTitle>
            <CardDescription>Manage global system settings and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-muted/50">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input defaultValue="Volkswagen AG" />
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="cet">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-primary" />
                      <div>
                        <Label>Multi-language Support</Label>
                        <p className="text-sm text-muted-foreground mt-1">Allow agents to switch languages during calls</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-accent" />
                      <div>
                        <Label>24/7 Operation Mode</Label>
                        <p className="text-sm text-muted-foreground mt-1">Enable AI agents to handle calls around the clock</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-primary" />
                      Alert Preferences
                    </h3>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>High Volume Alerts</Label>
                      <p className="text-sm text-muted-foreground mt-1">Notify when call volume exceeds threshold</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>Low AI Confidence Alerts</Label>
                      <p className="text-sm text-muted-foreground mt-1">Alert when AI confidence drops below 80%</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>Critical Escalations</Label>
                      <p className="text-sm text-muted-foreground mt-1">Immediate notification for urgent escalations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>Daily Performance Reports</Label>
                      <p className="text-sm text-muted-foreground mt-1">Receive daily summary at end of business day</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <Label>Email Notifications</Label>
                    <Input type="email" defaultValue="admin@vw.com" />
                  </div>

                  <div className="space-y-2">
                    <Label>SMS Notifications (Optional)</Label>
                    <Input type="tel" placeholder="+49 XXX XXXX XXX" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Security Settings
                    </h3>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground mt-1">Require 2FA for all admin users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-muted-foreground mt-1">Auto-logout after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>IP Whitelisting</Label>
                      <p className="text-sm text-muted-foreground mt-1">Restrict access to approved IP addresses</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-muted-foreground mt-1">Track all system changes and user actions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <Label>Password Policy</Label>
                    <Select defaultValue="strong">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                        <SelectItem value="medium">Medium (10+ with mixed case)</SelectItem>
                        <SelectItem value="strong">Strong (12+ with special chars)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 rounded-lg border border-warning/30 bg-warning/10">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-warning mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-warning mb-1">Security Recommendation</p>
                        <p className="text-xs text-muted-foreground">
                          Enable 2FA and IP whitelisting for enhanced security. Last security audit: 2 days ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Connected Services
                    </h3>
                  </div>

                  <div className="p-4 rounded-lg border border-border/50 bg-card/30">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Database className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">CRM Integration</h4>
                          <p className="text-sm text-muted-foreground mt-1">Connected to Salesforce</p>
                          <p className="text-xs text-success mt-2">✓ Active - Last sync: 2 mins ago</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Configure</Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border/50 bg-card/30">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <Mail className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Email Service</h4>
                          <p className="text-sm text-muted-foreground mt-1">SendGrid API</p>
                          <p className="text-xs text-success mt-2">✓ Active - 1,247 emails sent today</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Configure</Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border/50 bg-card/30">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-success/10">
                          <Phone className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <h4 className="font-semibold">VoIP Provider</h4>
                          <p className="text-sm text-muted-foreground mt-1">Twilio</p>
                          <p className="text-xs text-success mt-2">✓ Active - 234 calls today</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Configure</Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border/50 bg-card/30 opacity-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-muted/10">
                          <Zap className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Slack Notifications</h4>
                          <p className="text-sm text-muted-foreground mt-1">Not connected</p>
                          <p className="text-xs text-muted-foreground mt-2">Connect to receive alerts in Slack</p>
                        </div>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Advanced Options</h3>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>Debug Mode</Label>
                      <p className="text-sm text-muted-foreground mt-1">Enable detailed logging for troubleshooting</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>API Access</Label>
                      <p className="text-sm text-muted-foreground mt-1">Allow third-party API integrations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>Data Export</Label>
                      <p className="text-sm text-muted-foreground mt-1">Enable bulk data exports</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <Label>Data Retention Period</Label>
                    <Select defaultValue="12">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="0">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/10">
                    <h4 className="font-semibold text-destructive mb-2">Danger Zone</h4>
                    <p className="text-sm text-muted-foreground mb-4">Irreversible actions that affect your entire system</p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
                        Reset All Settings
                      </Button>
                      <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
                        Clear All Data
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border/50">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
