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
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const AIConfiguration = () => {
  const [activeTab, setActiveTab] = useState("cost_breakdown");
  const [showModelSettings, setShowModelSettings] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ id: number; name: string; size: string; uploadDate: string }>>([
    { id: 1, name: "volkswagen_service_manual.pdf", size: "12.4 MB", uploadDate: "2024-11-01" },
    { id: 2, name: "parts_catalog_2024.pdf", size: "8.7 MB", uploadDate: "2024-11-02" },
    { id: 3, name: "warranty_policies.pdf", size: "3.2 MB", uploadDate: "2024-11-03" }
  ]);

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
    gujarati: {
      stt: "whisper-large-v3",
      tts: "google-wavenet-gu",
      llm: "gpt-4-turbo"
    },
    urdu: {
      stt: "whisper-large-v3",
      tts: "google-wavenet-ur",
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
    { value: "google-wavenet-gu", label: "Google WaveNet Gujarati" },
    { value: "google-wavenet-ur", label: "Google WaveNet Urdu" },
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
    { value: "gujarati", label: "Gujarati" },
    { value: "urdu", label: "Urdu" }
  ];

  const taskStats = [
    { title: "Cost Breakdown Cases", value: "47", change: "+12 this week", icon: DollarSign },
    { title: "Maintenance Alerts", value: "83", change: "Next: 2:30 PM", icon: Wrench },
    { title: "General Service Cases", value: "156", change: "Active appointments", icon: Car },
    { title: "Total Active Cases", value: "286", change: "+127 this month", icon: Target },
  ];

  // Use Case Data Tables
  const costBreakdownCases = [
    {
      id: 1,
      vin: "WVWZZZ1JZ3W386752",
      customerName: "Rajesh Kumar",
      issue: "Engine oil leak + brake pad replacement",
      estimatedCost: "₹15,400",
      additionalWork: "Timing belt replacement needed",
      additionalCost: "₹8,200",
      callStatus: "Pending Approval",
      priority: "high",
      lastContact: "2024-11-05 10:30",
      language: "Hindi"
    },
    {
      id: 2,
      vin: "WVWZZZ1JZ3W386753",
      customerName: "Priya Sharma",
      issue: "AC compressor replacement",
      estimatedCost: "₹22,800",
      additionalWork: "Cabin filter replacement",
      additionalCost: "₹1,200",
      callStatus: "Approved",
      priority: "medium",
      lastContact: "2024-11-05 09:15",
      language: "English"
    },
    {
      id: 3,
      vin: "WVWZZZ1JZ3W386754",
      customerName: "Mohammed Ali",
      issue: "Transmission service + clutch adjustment",
      estimatedCost: "₹18,600",
      additionalWork: "Flywheel resurfacing required",
      additionalCost: "₹12,500",
      callStatus: "Customer Reviewing",
      priority: "high",
      lastContact: "2024-11-05 11:45",
      language: "Urdu"
    },
    {
      id: 4,
      vin: "WVWZZZ1JZ3W386755",
      customerName: "Anita Patel",
      issue: "Suspension repair",
      estimatedCost: "₹9,800",
      additionalWork: "None",
      additionalCost: "₹0",
      callStatus: "Work Completed",
      priority: "low",
      lastContact: "2024-11-04 16:20",
      language: "Gujarati"
    }
  ];

  const maintenanceAlerts = [
    {
      id: 1,
      vin: "WVWZZZ1JZ3W386756",
      customerName: "Suresh Reddy",
      issue: "Service due in 500km - Oil change + filter",
      predictedFailure: "Engine oil degradation",
      riskLevel: "Medium",
      scheduledDate: "2024-11-12",
      callStatus: "Appointment Booked",
      priority: "medium",
      lastContact: "2024-11-05 14:20",
      mileage: "47,500 km"
    },
    {
      id: 2,
      vin: "WVWZZZ1JZ3W386757",
      customerName: "Deepika Singh",
      issue: "Brake pads wear detected",
      predictedFailure: "Brake pad failure in 2 weeks",
      riskLevel: "High",
      scheduledDate: "2024-11-08",
      callStatus: "Urgent - Called 3x",
      priority: "high",
      lastContact: "2024-11-05 15:45",
      mileage: "62,300 km"
    },
    {
      id: 3,
      vin: "WVWZZZ1JZ3W386758",
      customerName: "Vikram Joshi",
      issue: "Timing belt replacement due",
      predictedFailure: "Belt failure risk in 1 month",
      riskLevel: "High",
      scheduledDate: "2024-11-15",
      callStatus: "Customer Declined",
      priority: "high",
      lastContact: "2024-11-05 12:30",
      mileage: "89,200 km"
    },
    {
      id: 4,
      vin: "WVWZZZ1JZ3W386759",
      customerName: "Kavita Nair",
      issue: "Battery health declining",
      predictedFailure: "Battery failure in 3 months",
      riskLevel: "Low",
      scheduledDate: "2024-12-01",
      callStatus: "Scheduled",
      priority: "low",
      lastContact: "2024-11-05 13:10",
      mileage: "34,800 km"
    }
  ];



  const generalServiceCases = [
    {
      id: 1,
      vin: "WVWZZZ1JZ3W386764",
      customerName: "Amit Agarwal",
      issue: "Routine service + inspection",
      serviceType: "Scheduled Maintenance",
      appointmentDate: "2024-11-08",
      callStatus: "Confirmed",
      priority: "low",
      lastContact: "2024-11-05 10:00",
      estimatedDuration: "2 hours",
      serviceAdvisor: "Rohit Sharma"
    },
    {
      id: 2,
      vin: "WVWZZZ1JZ3W386765",
      customerName: "Neha Kapoor",
      issue: "Strange noise from engine",
      serviceType: "Diagnostic",
      appointmentDate: "2024-11-06",
      callStatus: "Urgent - Same Day",
      priority: "high",
      lastContact: "2024-11-05 18:30",
      estimatedDuration: "1 hour",
      serviceAdvisor: "Pradeep Kumar"
    },
    {
      id: 3,
      vin: "WVWZZZ1JZ3W386766",
      customerName: "Rahul Verma",
      issue: "Recall service - airbag module",
      serviceType: "Recall Service",
      appointmentDate: "2024-11-10",
      callStatus: "Scheduled",
      priority: "high",
      lastContact: "2024-11-05 09:45",
      estimatedDuration: "3 hours",
      serviceAdvisor: "Sunita Devi"
    },
    {
      id: 4,
      vin: "WVWZZZ1JZ3W386767",
      customerName: "Pooja Jain",
      issue: "Extended warranty inquiry",
      serviceType: "Consultation",
      appointmentDate: "2024-11-07",
      callStatus: "Information Provided",
      priority: "low",
      lastContact: "2024-11-05 15:00",
      estimatedDuration: "30 minutes",
      serviceAdvisor: "Vikash Singh"
    }
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
                        {costBreakdownCases.map((case_item) => (
                          <TableRow key={case_item.id}>
                            <TableCell className="font-mono text-xs">{case_item.vin}</TableCell>
                            <TableCell className="font-medium">{case_item.customerName}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{case_item.issue}</TableCell>
                            <TableCell className="font-semibold text-green-600">{case_item.estimatedCost}</TableCell>
                            <TableCell className="max-w-[150px] truncate">{case_item.additionalWork}</TableCell>
                            <TableCell className="font-semibold text-orange-600">{case_item.additionalCost}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(case_item.callStatus)}>
                                {case_item.callStatus}
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
                        ))}
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
                        {maintenanceAlerts.map((alert) => (
                          <TableRow key={alert.id}>
                            <TableCell className="font-mono text-xs">{alert.vin}</TableCell>
                            <TableCell className="font-medium">{alert.customerName}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{alert.issue}</TableCell>
                            <TableCell className="max-w-[150px] truncate">{alert.predictedFailure}</TableCell>
                            <TableCell>
                              <Badge variant={alert.riskLevel === "High" ? "destructive" : alert.riskLevel === "Medium" ? "default" : "secondary"}>
                                {alert.riskLevel}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(alert.scheduledDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(alert.callStatus)}>
                                {alert.callStatus}
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
                        ))}
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
                        {generalServiceCases.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-mono text-xs">{service.vin}</TableCell>
                            <TableCell className="font-medium">{service.customerName}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{service.issue}</TableCell>
                            <TableCell>{service.serviceType}</TableCell>
                            <TableCell>{new Date(service.appointmentDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(service.callStatus)}>
                                {service.callStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getPriorityColor(service.priority)}>
                                {service.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>{service.estimatedDuration}</TableCell>
                            <TableCell>{service.serviceAdvisor}</TableCell>
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
                        ))}
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
                    <p className="text-xl font-bold">89.3%</p>
                    <p className="text-xs text-success">+3.2% this month</p>
                  </div>

                  <div className="p-3 rounded-lg border border-border/50 bg-card/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Timer className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold">Avg Call Duration</span>
                    </div>
                    <p className="text-xl font-bold">3.2m</p>
                    <p className="text-xs text-muted-foreground">-0.4m improvement</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Use Case Performance</h4>
                  {[
                    { name: "Cost Breakdown", success: 92, color: "bg-green-500" },
                    { name: "Maintenance Alerts", success: 87, color: "bg-blue-500" },
                    { name: "General Service", success: 91, color: "bg-orange-500" }
                  ].map((useCase, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{useCase.name}</span>
                        <span className="font-medium">{useCase.success}%</span>
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
                    <p className="text-xl font-bold">₹18,200</p>
                    <p className="text-xs text-muted-foreground">Per service case</p>
                  </div>

                  <div className="p-3 rounded-lg border border-border/50 bg-card/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Wrench className="w-4 h-4 text-success" />
                      <span className="text-sm font-semibold">Preventive Success</span>
                    </div>
                    <p className="text-xl font-bold">76%</p>
                    <p className="text-xs text-success">Avoided breakdowns</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Service Type Distribution</h4>
                  {[
                    { type: "Cost Breakdown", cases: 47, percentage: 35 },
                    { type: "Maintenance Alerts", cases: 83, percentage: 42 },
                    { type: "General Service", cases: 156, percentage: 23 }
                  ].map((service, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{service.type}</span>
                      <div className="flex gap-4">
                        <span className="text-muted-foreground">{service.cases} cases</span>
                        <span className="text-primary">{service.percentage}%</span>
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
