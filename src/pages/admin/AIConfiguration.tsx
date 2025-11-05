import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Settings, Plus, Edit, CheckCircle, Timer, DollarSign, Wrench, Car, Target, Upload, Trash2, FileText, Brain, Mic, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";

interface CostBreakdownCase {
  id: string;
  vin: string;
  customer_name: string;
  issue: string;
  estimated_cost: string;
  additional_work: string;
  additional_cost: string;
  call_status: string;
  priority: string;
  language: string;
  last_contact: string;
}

interface MaintenanceAlert {
  id: string;
  vin: string;
  customer_name: string;
  issue: string;
  predicted_failure: string;
  risk_level: string;
  scheduled_date: string;
  call_status: string;
  priority: string;
  mileage: string;
  last_contact: string;
}

interface GeneralServiceCase {
  id: string;
  vin: string;
  customer_name: string;
  issue: string;
  service_type: string;
  appointment_date: string;
  call_status: string;
  priority: string;
  estimated_duration: string;
  service_advisor: string;
  last_contact: string;
}

interface UseCaseStatistics {
  cost_breakdown_cases: number;
  cost_breakdown_change: string;
  maintenance_alerts: number;
  maintenance_next_alert: string;
  general_service_cases: number;
  general_service_info: string;
  total_active_cases: number;
  total_cases_change: string;
}

interface PerformanceSummary {
  success_rate: number;
  success_rate_change: string;
  avg_call_duration_minutes: number;
  avg_call_duration_change: string;
  cost_breakdown_success: number;
  maintenance_alerts_success: number;
  general_service_success: number;
}

interface CostAnalytics {
  avg_cost_approval: string;
  avg_cost_info: string;
  preventive_success_rate: number;
  preventive_success_info: string;
  cost_breakdown_cases: number;
  cost_breakdown_percentage: number;
  maintenance_alert_cases: number;
  maintenance_alert_percentage: number;
  general_service_cases: number;
  general_service_percentage: number;
}

const AIConfiguration = () => {
  const [activeTab, setActiveTab] = useState("cost_breakdown");
  const [showModelSettings, setShowModelSettings] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ id: number; name: string; size: string; uploadDate: string }>>([
    { id: 1, name: "volkswagen_service_manual.pdf", size: "12.4 MB", uploadDate: "2024-11-01" },
    { id: 2, name: "parts_catalog_2024.pdf", size: "8.7 MB", uploadDate: "2024-11-02" },
    { id: 3, name: "warranty_policies.pdf", size: "3.2 MB", uploadDate: "2024-11-03" }
  ]);

  // State for database data
  const [costBreakdownCases, setCostBreakdownCases] = useState<CostBreakdownCase[]>([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState<MaintenanceAlert[]>([]);
  const [generalServiceCases, setGeneralServiceCases] = useState<GeneralServiceCase[]>([]);
  const [useCaseStats, setUseCaseStats] = useState<UseCaseStatistics | null>(null);
  const [performanceSummary, setPerformanceSummary] = useState<PerformanceSummary | null>(null);
  const [costAnalytics, setCostAnalytics] = useState<CostAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Fetch cost breakdown cases
      const { data: costData } = await supabase
        .from('cost_breakdown_cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (costData) setCostBreakdownCases(costData);

      // Fetch maintenance alerts
      const { data: maintenanceData } = await supabase
        .from('maintenance_alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (maintenanceData) setMaintenanceAlerts(maintenanceData);

      // Fetch general service cases
      const { data: serviceData } = await supabase
        .from('general_service_cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (serviceData) setGeneralServiceCases(serviceData);

      // Fetch use case statistics
      const { data: statsData } = await supabase
        .from('ai_use_case_statistics')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (statsData) setUseCaseStats(statsData);

      // Fetch performance summary
      const { data: perfData } = await supabase
        .from('ai_performance_summary')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (perfData) setPerformanceSummary(perfData);

      // Fetch cost analytics
      const { data: costAnalyticsData } = await supabase
        .from('service_cost_analytics')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (costAnalyticsData) setCostAnalytics(costAnalyticsData);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Model configurations for different languages and components
  const [modelConfigs, setModelConfigs] = useState({
    english: {
      stt: "whisper-large-v3",
      tts: "elevenlabs-multilingual",
      llm: "gpt-4-turbo"
    },
    hindi: {
      stt: "whisper-large-v3",
      tts: "google-wavenet-hi",
      llm: "gpt-4-turbo"
    },
    marathi: {
      stt: "whisper-large-v3",
      tts: "google-wavenet-mr",
      llm: "gpt-4-turbo"
    },
    bengali: {
      stt: "whisper-large-v3",
      tts: "google-wavenet-bn",
      llm: "gpt-4-turbo"
    }
  });

  // Available model options
  const sttModels = [
    { value: "whisper-large-v3", label: "Whisper Large V3 (OpenAI)" },
    { value: "whisper-medium", label: "Whisper Medium (OpenAI)" },
    { value: "google-chirp", label: "Google Chirp" },
    { value: "azure-speech", label: "Azure Speech Services" },
    { value: "deepgram-nova", label: "Deepgram Nova" }
  ];

  const ttsModels = [
    { value: "elevenlabs-multilingual", label: "ElevenLabs Multilingual" },
    { value: "google-wavenet-hi", label: "Google WaveNet Hindi" },
    { value: "google-wavenet-mr", label: "Google WaveNet Marathi" },
    { value: "google-wavenet-bn", label: "Google WaveNet Bengali" },
    { value: "azure-neural-voice", label: "Azure Neural Voice" },
    { value: "amazon-polly", label: "Amazon Polly" }
  ];

  const llmModels = [
    { value: "gpt-4-turbo", label: "GPT-4 Turbo (OpenAI)" },
    { value: "gpt-4", label: "GPT-4 (OpenAI)" },
    { value: "claude-3-opus", label: "Claude 3 Opus (Anthropic)" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet (Anthropic)" },
    { value: "gemini-pro", label: "Gemini Pro (Google)" },
    { value: "llama-3-70b", label: "Llama 3 70B (Meta)" }
  ];

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
    { value: "marathi", label: "Marathi" },
    { value: "bengali", label: "Bengali" }
  ];

  const taskStats = [
    {
      title: "Cost Breakdown Cases",
      value: useCaseStats?.cost_breakdown_cases?.toString() || "0",
      change: useCaseStats?.cost_breakdown_change || "+0 this week",
      icon: DollarSign
    },
    {
      title: "Maintenance Alerts",
      value: useCaseStats?.maintenance_alerts?.toString() || "0",
      change: useCaseStats?.maintenance_next_alert || "No alerts",
      icon: Wrench
    },
    {
      title: "General Service Cases",
      value: useCaseStats?.general_service_cases?.toString() || "0",
      change: useCaseStats?.general_service_info || "No active appointments",
      icon: Car
    },
    {
      title: "Total Active Cases",
      value: useCaseStats?.total_active_cases?.toString() || "0",
      change: useCaseStats?.total_cases_change || "+0 this month",
      icon: Target
    },
  ];





  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending approval": return "bg-warning/20 text-warning";
      case "approved": return "bg-success/20 text-success";
      case "customer reviewing": return "bg-primary/20 text-primary";
      case "work completed": return "bg-muted/50 text-muted-foreground";
      case "appointment booked": return "bg-success/20 text-success";
      case "urgent - called 3x": return "bg-destructive/20 text-destructive";
      case "customer declined": return "bg-destructive/20 text-destructive";
      case "scheduled": return "bg-primary/20 text-primary";
      case "successfully connected": return "bg-success/20 text-success";
      case "language barrier": return "bg-destructive/20 text-destructive";
      case "resolved": return "bg-success/20 text-success";
      case "follow-up required": return "bg-warning/20 text-warning";
      case "confirmed": return "bg-success/20 text-success";
      case "urgent - same day": return "bg-destructive/20 text-destructive";
      case "information provided": return "bg-muted/50 text-muted-foreground";
      default: return "bg-muted/50 text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/20 text-destructive";
      case "medium": return "bg-warning/20 text-warning";
      case "low": return "bg-success/20 text-success";
      default: return "bg-muted/50 text-muted-foreground";
    }
  };



  const handleModelChange = (language: string, component: string, model: string) => {
    setModelConfigs(prev => ({
      ...prev,
      [language]: {
        ...prev[language as keyof typeof prev],
        [component]: model
      }
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file, index) => ({
        id: uploadedFiles.length + index + 1,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadDate: new Date().toISOString().split('T')[0]
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDeleteFile = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <DashboardLayout
      title="AI Voice Assistant - Use Case Management"
      description="Manage customer cases across different AI voice assistant use cases"
    >
      <div className="space-y-8">
        {/* Use Case Statistics Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {taskStats.map((stat, i) => (
            <Card key={i} className="glass border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-xs text-success mt-1">{stat.change}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add New Case
            </Button>
            <Button variant="outline" onClick={() => setShowModelSettings(!showModelSettings)}>
              <Settings className="w-4 h-4 mr-2" />
              {showModelSettings ? "Hide" : "Show"} AI Model Settings
            </Button>
          </div>
        </div>

        {/* AI Model Settings Section */}
        {showModelSettings && (
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Model Configuration
              </CardTitle>
              <CardDescription>Configure AI models for Speech-to-Text, Text-to-Speech, and Language Models across different languages</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="model_selection" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                  <TabsTrigger value="model_selection">Model Selection</TabsTrigger>
                  <TabsTrigger value="rag_data">RAG Data Upload</TabsTrigger>
                </TabsList>

                <TabsContent value="model_selection" className="mt-6 space-y-6">
                  {languages.map((language) => (
                    <Card key={language.value} className="border-border/50">
                      <CardHeader>
                        <CardTitle className="text-lg">{language.label}</CardTitle>
                        <CardDescription>Configure AI models for {language.label} language support</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* STT Model Selection */}
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2 text-sm font-semibold">
                            <Mic className="w-4 h-4 text-primary" />
                            Speech-to-Text (STT) Model
                          </Label>
                          <Select
                            value={modelConfigs[language.value as keyof typeof modelConfigs].stt}
                            onValueChange={(value) => handleModelChange(language.value, 'stt', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select STT model" />
                            </SelectTrigger>
                            <SelectContent>
                              {sttModels.map((model) => (
                                <SelectItem key={model.value} value={model.value}>
                                  {model.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* TTS Model Selection */}
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2 text-sm font-semibold">
                            <Volume2 className="w-4 h-4 text-primary" />
                            Text-to-Speech (TTS) Model
                          </Label>
                          <Select
                            value={modelConfigs[language.value as keyof typeof modelConfigs].tts}
                            onValueChange={(value) => handleModelChange(language.value, 'tts', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select TTS model" />
                            </SelectTrigger>
                            <SelectContent>
                              {ttsModels.map((model) => (
                                <SelectItem key={model.value} value={model.value}>
                                  {model.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* LLM Model Selection */}
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2 text-sm font-semibold">
                            <Brain className="w-4 h-4 text-primary" />
                            Language Model (LLM)
                          </Label>
                          <Select
                            value={modelConfigs[language.value as keyof typeof modelConfigs].llm}
                            onValueChange={(value) => handleModelChange(language.value, 'llm', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select LLM model" />
                            </SelectTrigger>
                            <SelectContent>
                              {llmModels.map((model) => (
                                <SelectItem key={model.value} value={model.value}>
                                  {model.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Separator />

                        {/* Model Status Indicators */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-3 rounded-lg border border-border/50 bg-card/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Mic className="w-3 h-3 text-success" />
                              <span className="text-xs font-medium">STT Status</span>
                            </div>
                            <Badge variant="outline" className="bg-success/20 text-success text-xs">Active</Badge>
                          </div>
                          <div className="p-3 rounded-lg border border-border/50 bg-card/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Volume2 className="w-3 h-3 text-success" />
                              <span className="text-xs font-medium">TTS Status</span>
                            </div>
                            <Badge variant="outline" className="bg-success/20 text-success text-xs">Active</Badge>
                          </div>
                          <div className="p-3 rounded-lg border border-border/50 bg-card/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Brain className="w-3 h-3 text-success" />
                              <span className="text-xs font-medium">LLM Status</span>
                            </div>
                            <Badge variant="outline" className="bg-success/20 text-success text-xs">Active</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button className="bg-primary hover:bg-primary/90">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Save Configuration
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="rag_data" className="mt-6 space-y-6">
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Upload className="w-5 h-5 text-primary" />
                        Upload Company-Specific Data for RAG
                      </CardTitle>
                      <CardDescription>
                        Upload documents, manuals, and knowledge base files to enhance AI responses with company-specific information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* File Upload Area */}
                      <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Drag and drop files here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Supported formats: PDF, DOCX, TXT, CSV (Max 50MB per file)
                        </p>
                        <Input
                          type="file"
                          multiple
                          accept=".pdf,.docx,.txt,.csv"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <Button asChild variant="outline">
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <Upload className="w-4 h-4 mr-2" />
                            Select Files
                          </label>
                        </Button>
                      </div>

                      {/* Uploaded Files List */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">Uploaded Documents</h3>
                          <Badge variant="outline">{uploadedFiles.length} files</Badge>
                        </div>

                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>File Name</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Upload Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {uploadedFiles.map((file) => (
                                <TableRow key={file.id}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                      <FileText className="w-4 h-4 text-primary" />
                                      {file.name}
                                    </div>
                                  </TableCell>
                                  <TableCell>{file.size}</TableCell>
                                  <TableCell>{new Date(file.uploadDate).toLocaleDateString()}</TableCell>
                                  <TableCell>
                                    <Badge className="bg-success/20 text-success">
                                      Processed
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleDeleteFile(file.id)}
                                    >
                                      <Trash2 className="w-3 h-3 text-destructive" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>

                      {/* RAG Configuration */}
                      <Card className="border-border/50 bg-card/20">
                        <CardHeader>
                          <CardTitle className="text-base">RAG Configuration</CardTitle>
                          <CardDescription>Configure how the AI uses uploaded documents</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-sm font-medium">Enable RAG</Label>
                              <p className="text-xs text-muted-foreground">Use uploaded documents to enhance AI responses</p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Chunk Size</Label>
                            <Select defaultValue="512">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="256">256 tokens</SelectItem>
                                <SelectItem value="512">512 tokens</SelectItem>
                                <SelectItem value="1024">1024 tokens</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Retrieval Strategy</Label>
                            <Select defaultValue="semantic">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="semantic">Semantic Search</SelectItem>
                                <SelectItem value="keyword">Keyword Search</SelectItem>
                                <SelectItem value="hybrid">Hybrid Search</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Top K Results</Label>
                            <Select defaultValue="5">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3">3 results</SelectItem>
                                <SelectItem value="5">5 results</SelectItem>
                                <SelectItem value="10">10 results</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex justify-end gap-3">
                        <Button variant="outline">Clear All Files</Button>
                        <Button className="bg-primary hover:bg-primary/90">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Apply RAG Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Use Case Management Tables */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              AI Voice Assistant Use Cases
            </CardTitle>
            <CardDescription>Manage customer cases across different AI voice assistant scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                <TabsTrigger value="cost_breakdown" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Cost Breakdown
                </TabsTrigger>
                <TabsTrigger value="maintenance_alerts" className="flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  Maintenance Alerts
                </TabsTrigger>
                <TabsTrigger value="general_service" className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  General Service
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cost_breakdown" className="mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Real-Time Transparent Cost Breakdown Cases</h3>
                    <Badge variant="outline">{costBreakdownCases.length} active cases</Badge>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>VIN</TableHead>
                          <TableHead>Customer Name</TableHead>
                          <TableHead>Original Issue</TableHead>
                          <TableHead>Estimated Cost</TableHead>
                          <TableHead>Additional Work</TableHead>
                          <TableHead>Additional Cost</TableHead>
                          <TableHead>Call Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Language</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                              Loading data...
                            </TableCell>
                          </TableRow>
                        ) : costBreakdownCases.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                              No cost breakdown cases found
                            </TableCell>
                          </TableRow>
                        ) : (
                          costBreakdownCases.map((case_item) => (
                            <TableRow key={case_item.id}>
                              <TableCell className="font-mono text-xs">{case_item.vin}</TableCell>
                              <TableCell className="font-medium">{case_item.customer_name}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{case_item.issue}</TableCell>
                              <TableCell className="font-semibold text-green-600">{case_item.estimated_cost}</TableCell>
                              <TableCell className="max-w-[150px] truncate">{case_item.additional_work || 'None'}</TableCell>
                              <TableCell className="font-semibold text-orange-600">{case_item.additional_cost}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(case_item.call_status)}>
                                  {case_item.call_status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getPriorityColor(case_item.priority)}>
                                  {case_item.priority}
                                </Badge>
                              </TableCell>
                              <TableCell>{case_item.language}</TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline">
                                    <Phone className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="maintenance_alerts" className="mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Predictive Maintenance Alert Cases</h3>
                    <Badge variant="outline">{maintenanceAlerts.length} active alerts</Badge>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>VIN</TableHead>
                          <TableHead>Customer Name</TableHead>
                          <TableHead>Maintenance Issue</TableHead>
                          <TableHead>Predicted Failure</TableHead>
                          <TableHead>Risk Level</TableHead>
                          <TableHead>Scheduled Date</TableHead>
                          <TableHead>Call Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Mileage</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                              Loading data...
                            </TableCell>
                          </TableRow>
                        ) : maintenanceAlerts.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                              No maintenance alerts found
                            </TableCell>
                          </TableRow>
                        ) : (
                          maintenanceAlerts.map((alert) => (
                            <TableRow key={alert.id}>
                              <TableCell className="font-mono text-xs">{alert.vin}</TableCell>
                              <TableCell className="font-medium">{alert.customer_name}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{alert.issue}</TableCell>
                              <TableCell className="max-w-[150px] truncate">{alert.predicted_failure}</TableCell>
                              <TableCell>
                                <Badge variant={alert.risk_level === "High" ? "destructive" : alert.risk_level === "Medium" ? "default" : "secondary"}>
                                  {alert.risk_level}
                                </Badge>
                              </TableCell>
                              <TableCell>{alert.scheduled_date ? new Date(alert.scheduled_date).toLocaleDateString() : 'Not scheduled'}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(alert.call_status)}>
                                  {alert.call_status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getPriorityColor(alert.priority)}>
                                  {alert.priority}
                                </Badge>
                              </TableCell>
                              <TableCell>{alert.mileage}</TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline">
                                    <Phone className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>



              <TabsContent value="general_service" className="mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">General Service Management Cases</h3>
                    <Badge variant="outline">{generalServiceCases.length} service cases</Badge>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>VIN</TableHead>
                          <TableHead>Customer Name</TableHead>
                          <TableHead>Issue</TableHead>
                          <TableHead>Service Type</TableHead>
                          <TableHead>Appointment Date</TableHead>
                          <TableHead>Call Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Service Advisor</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                              Loading data...
                            </TableCell>
                          </TableRow>
                        ) : generalServiceCases.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                              No general service cases found
                            </TableCell>
                          </TableRow>
                        ) : (
                          generalServiceCases.map((service) => (
                            <TableRow key={service.id}>
                              <TableCell className="font-mono text-xs">{service.vin}</TableCell>
                              <TableCell className="font-medium">{service.customer_name}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{service.issue}</TableCell>
                              <TableCell>{service.service_type}</TableCell>
                              <TableCell>{service.appointment_date ? new Date(service.appointment_date).toLocaleDateString() : 'Not scheduled'}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(service.call_status)}>
                                  {service.call_status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getPriorityColor(service.priority)}>
                                  {service.priority}
                                </Badge>
                              </TableCell>
                              <TableCell>{service.estimated_duration || 'N/A'}</TableCell>
                              <TableCell>{service.service_advisor || 'Unassigned'}</TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline">
                                    <Phone className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* AI Configuration Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                AI Performance Summary
              </CardTitle>
              <CardDescription>Overall AI voice assistant performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border border-border/50 bg-card/20">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm font-semibold">Success Rate</span>
                    </div>
                    <p className="text-xl font-bold">{performanceSummary?.success_rate?.toFixed(1) || '0.0'}%</p>
                    <p className="text-xs text-success">{performanceSummary?.success_rate_change || '+0% this month'}</p>
                  </div>

                  <div className="p-3 rounded-lg border border-border/50 bg-card/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Timer className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold">Avg Call Duration</span>
                    </div>
                    <p className="text-xl font-bold">{performanceSummary?.avg_call_duration_minutes?.toFixed(1) || '0.0'}m</p>
                    <p className="text-xs text-muted-foreground">{performanceSummary?.avg_call_duration_change || '0m improvement'}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Use Case Performance</h4>
                  {[
                    { name: "Cost Breakdown", success: performanceSummary?.cost_breakdown_success || 0, color: "bg-green-500" },
                    { name: "Maintenance Alerts", success: performanceSummary?.maintenance_alerts_success || 0, color: "bg-blue-500" },
                    { name: "General Service", success: performanceSummary?.general_service_success || 0, color: "bg-orange-500" }
                  ].map((useCase, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{useCase.name}</span>
                        <span className="font-medium">{useCase.success.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${useCase.color}`}
                          style={{ width: `${useCase.success}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" />
                Service & Cost Analytics
              </CardTitle>
              <CardDescription>Service management and cost breakdown insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border border-border/50 bg-card/20">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold">Avg Cost Approval</span>
                    </div>
                    <p className="text-xl font-bold">{costAnalytics?.avg_cost_approval || '₹0'}</p>
                    <p className="text-xs text-muted-foreground">{costAnalytics?.avg_cost_info || 'Per service case'}</p>
                  </div>

                  <div className="p-3 rounded-lg border border-border/50 bg-card/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Wrench className="w-4 h-4 text-success" />
                      <span className="text-sm font-semibold">Preventive Success</span>
                    </div>
                    <p className="text-xl font-bold">{costAnalytics?.preventive_success_rate?.toFixed(0) || '0'}%</p>
                    <p className="text-xs text-success">{costAnalytics?.preventive_success_info || 'Avoided breakdowns'}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Service Type Distribution</h4>
                  {[
                    { type: "Cost Breakdown", cases: costAnalytics?.cost_breakdown_cases || 0, percentage: costAnalytics?.cost_breakdown_percentage || 0 },
                    { type: "Maintenance Alerts", cases: costAnalytics?.maintenance_alert_cases || 0, percentage: costAnalytics?.maintenance_alert_percentage || 0 },
                    { type: "General Service", cases: costAnalytics?.general_service_cases || 0, percentage: costAnalytics?.general_service_percentage || 0 }
                  ].map((service, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{service.type}</span>
                      <div className="flex gap-4">
                        <span className="text-muted-foreground">{service.cases} cases</span>
                        <span className="text-primary">{service.percentage.toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIConfiguration;
