import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Sliders, MessageSquare, Database, Zap, Settings2, TrendingUp, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const AIConfiguration = () => {
  const [confidence, setConfidence] = useState([85]);
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);

  const performanceData = [
    { time: "00:00", accuracy: 94, speed: 1.2 },
    { time: "04:00", accuracy: 95, speed: 1.1 },
    { time: "08:00", accuracy: 96, speed: 1.3 },
    { time: "12:00", accuracy: 94, speed: 1.4 },
    { time: "16:00", accuracy: 97, speed: 1.2 },
    { time: "20:00", accuracy: 95, speed: 1.1 },
  ];

  const models = [
    { name: "VW-GPT-4", status: "active", accuracy: 96.2, requests: "12.4K", avgResponse: "1.2s" },
    { name: "VW-Assistant-Pro", status: "active", accuracy: 94.8, requests: "8.3K", avgResponse: "0.9s" },
    { name: "VW-Sentiment-Analyzer", status: "active", accuracy: 92.1, requests: "15.1K", avgResponse: "0.3s" },
    { name: "VW-Intent-Classifier", status: "standby", accuracy: 89.5, requests: "5.2K", avgResponse: "0.5s" },
  ];

  return (
    <DashboardLayout 
      title="AI Configuration" 
      description="Configure and optimize AI models for customer support"
    >
      <div className="space-y-8">
        {/* Model Status Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Models</p>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-xs text-success mt-1">All operational</p>
                </div>
                <Brain className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Accuracy</p>
                  <p className="text-3xl font-bold">94.3%</p>
                  <p className="text-xs text-success mt-1">+2.1% this week</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Requests</p>
                  <p className="text-3xl font-bold">41.0K</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
                </div>
                <Zap className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Response</p>
                  <p className="text-3xl font-bold">0.98s</p>
                  <p className="text-xs text-success mt-1">-0.2s improvement</p>
                </div>
                <Settings2 className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Models Management */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Models
            </CardTitle>
            <CardDescription>Manage and monitor your AI model fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {models.map((model, i) => (
                <div key={i} className="p-4 rounded-lg border border-border/50 bg-card/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{model.name}</h3>
                        <Badge variant={model.status === "active" ? "default" : "secondary"}>
                          {model.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Accuracy</p>
                          <p className="font-semibold text-primary">{model.accuracy}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Requests/day</p>
                          <p className="font-semibold">{model.requests}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Avg Response</p>
                          <p className="font-semibold">{model.avgResponse}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Configure</Button>
                      <Button size="sm" variant="ghost">View Logs</Button>
                    </div>
                  </div>
                  <Progress value={model.accuracy} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Configuration Tabs */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-primary" />
              Model Parameters
            </CardTitle>
            <CardDescription>Fine-tune AI behavior and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Language Model</Label>
                    <Select defaultValue="gpt4">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt4">GPT-4 Turbo</SelectItem>
                        <SelectItem value="gpt35">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude">Claude 3.5 Sonnet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Confidence Threshold: {confidence}%</Label>
                      <span className="text-sm text-muted-foreground">Min accuracy to auto-respond</span>
                    </div>
                    <Slider 
                      value={confidence} 
                      onValueChange={setConfidence}
                      max={100} 
                      step={1} 
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Temperature: {temperature[0]}</Label>
                      <span className="text-sm text-muted-foreground">Response creativity</span>
                    </div>
                    <Slider 
                      value={temperature} 
                      onValueChange={setTemperature}
                      max={2} 
                      step={0.1} 
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Max Tokens: {maxTokens}</Label>
                      <span className="text-sm text-muted-foreground">Response length limit</span>
                    </div>
                    <Slider 
                      value={maxTokens} 
                      onValueChange={setMaxTokens}
                      min={512}
                      max={4096} 
                      step={256} 
                      className="w-full"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="response" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>Auto-escalation</Label>
                      <p className="text-sm text-muted-foreground mt-1">Automatically escalate to human when confidence is low</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>Sentiment Analysis</Label>
                      <p className="text-sm text-muted-foreground mt-1">Analyze customer emotions in real-time</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>Intent Recognition</Label>
                      <p className="text-sm text-muted-foreground mt-1">Identify customer intent from conversation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label>Response Style</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="concise">Concise</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="training" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border/50 bg-card/30">
                    <div className="flex items-start gap-3">
                      <Database className="w-5 h-5 text-primary mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">Training Data</h4>
                        <p className="text-sm text-muted-foreground mb-3">Upload custom training data to improve model accuracy</p>
                        <Button size="sm">Upload Dataset</Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border/50 bg-card/30">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-accent mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">Conversation History</h4>
                        <p className="text-sm text-muted-foreground mb-3">Total conversations used for training: 45,234</p>
                        <Progress value={78} className="h-2 mb-2" />
                        <p className="text-xs text-muted-foreground">78% processing complete</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div>
                      <Label>Continuous Learning</Label>
                      <p className="text-sm text-muted-foreground mt-1">Automatically learn from successful interactions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-4">24-Hour Performance Trends</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 25%, 20%)" />
                        <XAxis dataKey="time" stroke="hsl(215, 20%, 65%)" />
                        <YAxis yAxisId="left" stroke="hsl(215, 20%, 65%)" />
                        <YAxis yAxisId="right" orientation="right" stroke="hsl(215, 20%, 65%)" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(220, 28%, 10%)', 
                            border: '1px solid hsl(220, 25%, 20%)',
                            borderRadius: '8px'
                          }}
                        />
                        <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="hsl(142, 76%, 36%)" strokeWidth={2} name="Accuracy %" />
                        <Line yAxisId="right" type="monotone" dataKey="speed" stroke="hsl(199, 89%, 48%)" strokeWidth={2} name="Response Time (s)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-success/30 bg-success/10">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm font-semibold text-success">Performing Well</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Response accuracy is 4.2% above target with consistent performance across all hours
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border border-warning/30 bg-warning/10">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-warning" />
                        <span className="text-sm font-semibold text-warning">Recommendation</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Consider increasing temperature slightly during peak hours for more natural responses
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border/50">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Configuration</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIConfiguration;
