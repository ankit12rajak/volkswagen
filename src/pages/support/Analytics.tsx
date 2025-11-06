import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  Phone, 
  CheckCircle, 
  BarChart3, 
  Activity,
  Star,
  DollarSign,
  Award,
  Languages
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Area,
  Line
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [kpiStats, setKpiStats] = useState<any[]>([]);
  const [revenueTrend, setRevenueTrend] = useState<any[]>([]);
  const [useCaseData, setUseCaseData] = useState<any[]>([]);
  const [languageData, setLanguageData] = useState<any[]>([]);
  const [serviceTimeData, setServiceTimeData] = useState<any[]>([]);
  const [staffPerformanceData, setStaffPerformanceData] = useState<any[]>([]);
  const [aiCallVolumeData, setAiCallVolumeData] = useState<any[]>([]);
  const [topServices, setTopServices] = useState<any[]>([]);
  const [approvalRateData, setApprovalRateData] = useState<any[]>([]);
  const [peakHoursData, setPeakHoursData] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);

      // Fetch KPI stats
      const { data: kpiData } = await supabase.rpc('get_analytics_kpi_stats');
      if (kpiData && kpiData.length > 0) {
        const stats = kpiData[0];
        setKpiStats([
          {
            title: "Monthly Revenue",
            value: `₹${(Number(stats.monthly_revenue_inr) / 100000).toFixed(1)}L`,
            change: "+12% from last month",
            changeType: "positive" as const,
            icon: DollarSign,
          },
          {
            title: "Services Completed",
            value: stats.services_completed.toString(),
            change: "+28 this week",
            changeType: "positive" as const,
            icon: CheckCircle,
          },
          {
            title: "Customer Satisfaction",
            value: `${Number(stats.customer_satisfaction_avg).toFixed(1)}/5`,
            change: "+0.2 improvement",
            changeType: "positive" as const,
            icon: Star,
          },
          {
            title: "AI Call Success Rate",
            value: `${Number(stats.ai_call_success_rate).toFixed(1)}%`,
            change: "+3.1% this month",
            changeType: "positive" as const,
            icon: Phone,
          },
          {
            title: "Avg Response Time",
            value: `${Number(stats.avg_response_time_hours).toFixed(1)} hrs`,
            change: "-0.5 hrs faster",
            changeType: "positive" as const,
            icon: Clock,
          },
          {
            title: "Active Staff",
            value: `${stats.active_staff}/${stats.total_staff}`,
            change: "92% attendance",
            changeType: "positive" as const,
            icon: Users,
          },
          {
            title: "Service Bay Utilization",
            value: `${Number(stats.service_bay_utilization).toFixed(0)}%`,
            change: "+5% this week",
            changeType: "positive" as const,
            icon: Activity,
          },
          {
            title: "Repeat Customers",
            value: `${Number(stats.repeat_customers_percentage).toFixed(0)}%`,
            change: "+4% loyalty",
            changeType: "positive" as const,
            icon: Award,
          },
        ]);
      }

      // Fetch weekly revenue trend
      const { data: revenueData } = await supabase.rpc('get_weekly_revenue_trend');
      if (revenueData) {
        setRevenueTrend(revenueData.map((item: any) => ({
          date: item.week_label,
          revenue: Number(item.revenue_inr),
          services: Number(item.services_completed),
          satisfaction: Number(item.satisfaction_avg),
        })));
      }

      // Fetch use case distribution
      const { data: useCaseDistribution } = await supabase.rpc('get_use_case_distribution');
      if (useCaseDistribution) {
        const colorMap: Record<string, string> = {
          'Cost Breakdown': 'hsl(38, 92%, 50%)',
          'Predictive Maintenance': 'hsl(142, 76%, 36%)',
          'General Service': 'hsl(199, 89%, 48%)',
        };
        setUseCaseData(useCaseDistribution.map((item: any) => ({
          name: item.use_case,
          value: Number(item.case_count),
          color: colorMap[item.use_case] || 'hsl(199, 89%, 48%)',
          percentage: Number(item.percentage),
        })));
      }

      // Fetch language distribution
      const { data: langData } = await supabase.rpc('get_language_distribution');
      if (langData) {
        const langColors: Record<string, string> = {
          'Hindi': 'hsl(38, 92%, 50%)',
          'English': 'hsl(199, 89%, 48%)',
          'Gujarati': 'hsl(142, 76%, 36%)',
          'Urdu': 'hsl(271, 76%, 53%)',
          'Marathi': 'hsl(217, 91%, 60%)',
        };
        setLanguageData(langData.map((item: any) => ({
          name: item.language,
          value: Number(item.call_count),
          color: langColors[item.language] || 'hsl(199, 89%, 48%)',
        })));
      }

      // Fetch daily AI call volume
      const { data: callVolumeData } = await supabase.rpc('get_daily_ai_call_volume');
      if (callVolumeData) {
        setAiCallVolumeData(callVolumeData.map((item: any) => ({
          day: item.day_name,
          costBreakdown: Number(item.cost_breakdown),
          predictive: Number(item.predictive),
          general: Number(item.general),
        })));
      }

      // Fetch service completion times
      const { data: serviceTimesData } = await supabase.rpc('get_service_completion_times');
      if (serviceTimesData) {
        setServiceTimeData(serviceTimesData.map((item: any) => ({
          service: item.service_type,
          avgTime: Number(item.avg_time_minutes),
          target: Number(item.target_time_minutes),
        })));
      }

      // Fetch top services by revenue
      const { data: topServicesData } = await supabase.rpc('get_top_services_by_revenue');
      if (topServicesData) {
        setTopServices(topServicesData.map((item: any) => ({
          service: item.service_type,
          count: Number(item.service_count),
          revenue: `₹${(Number(item.total_revenue_inr) / 100000).toFixed(1)}L`,
          trend: item.trend,
          change: `${item.change_percentage >= 0 ? '+' : ''}${Number(item.change_percentage).toFixed(0)}%`,
        })));
      }

      // Fetch approval rates by cost range
      const { data: approvalData } = await supabase.rpc('get_approval_rates_by_cost_range');
      if (approvalData) {
        setApprovalRateData(approvalData.map((item: any) => ({
          range: item.cost_range,
          approved: Number(item.approved_percentage),
          declined: Number(item.declined_percentage),
        })));
      }

      // Fetch peak hours analysis
      const { data: peakData } = await supabase.rpc('get_peak_hours_analysis');
      if (peakData) {
        setPeakHoursData(peakData.map((item: any) => ({
          hour: item.hour_label,
          calls: Number(item.call_count),
          appointments: Number(item.appointment_count),
          revenue: Number(item.estimated_revenue_inr),
        })));
      }

      // Fetch staff performance metrics
      const { data: staffData } = await supabase.rpc('get_staff_performance_metrics');
      if (staffData) {
        setStaffPerformanceData(staffData.map((item: any) => ({
          metric: item.metric_name,
          target: Number(item.target_value),
          current: Number(item.current_value),
        })));
      }

    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Dealership Analytics" description="VW Mumbai Central - Comprehensive performance insights">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading analytics data...</div>
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout 
      title="Dealership Analytics" 
      description="VW Mumbai Central - Comprehensive performance insights"
    >
      <div className="space-y-8">
        {/* KPI Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiStats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Main Analytics Tabs */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Performance Analytics
            </CardTitle>
            <CardDescription>Detailed insights across revenue, services, and AI interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-muted/50">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="ai_usage">AI Usage</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="peak_hours">Peak Hours</TabsTrigger>
              </TabsList>

              {/* Revenue Tab */}
              <TabsContent value="revenue" className="mt-6">
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={revenueTrend}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                    <XAxis dataKey="date" stroke="hsl(0, 0%, 60%)" />
                    <YAxis yAxisId="left" stroke="hsl(0, 0%, 60%)" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(0, 0%, 60%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 6%)', 
                        border: '1px solid hsl(0, 0%, 18%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(142, 76%, 36%)" 
                      fillOpacity={1} 
                      fill="url(#revenueGradient)" 
                      name="Revenue (₹)"
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="services" 
                      fill="hsl(199, 89%, 48%)" 
                      name="Services Completed"
                      radius={[8, 8, 0, 0]}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="satisfaction" 
                      stroke="hsl(38, 92%, 50%)" 
                      strokeWidth={3}
                      name="Satisfaction (1-5)"
                      dot={{ fill: "hsl(38, 92%, 50%)", r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </TabsContent>

              {/* AI Usage Tab */}
              <TabsContent value="ai_usage" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Use Case Distribution */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">AI Use Case Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={useCaseData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {useCaseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(0, 0%, 6%)', 
                            border: '1px solid hsl(0, 0%, 18%)',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2">
                      {useCaseData.map((useCase, i) => (
                        <div key={i} className="p-3 rounded-lg border border-border/50 bg-card/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{useCase.name}</span>
                            <span className="text-lg font-bold text-primary">{useCase.value}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted/50 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all" 
                                style={{ 
                                  width: `${useCase.percentage}%`,
                                  backgroundColor: useCase.color
                                }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground min-w-[50px] text-right">
                              {useCase.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Language Distribution */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Languages className="w-5 h-5 text-primary" />
                      Language Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={languageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {languageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(0, 0%, 6%)', 
                            border: '1px solid hsl(0, 0%, 18%)',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="font-semibold">Multilingual Success</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        AI voice assistant successfully handles 5 languages with 94% accuracy, serving diverse customer base.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Daily AI Call Volume */}
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-4">Daily AI Call Volume by Use Case</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={aiCallVolumeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                      <XAxis dataKey="day" stroke="hsl(0, 0%, 60%)" />
                      <YAxis stroke="hsl(0, 0%, 60%)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(0, 0%, 6%)', 
                          border: '1px solid hsl(0, 0%, 18%)',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="costBreakdown" stackId="a" fill="hsl(38, 92%, 50%)" name="Cost Breakdown" />
                      <Bar dataKey="predictive" stackId="a" fill="hsl(142, 76%, 36%)" name="Predictive Maintenance" />
                      <Bar dataKey="general" stackId="a" fill="hsl(199, 89%, 48%)" name="General Service" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Service Completion Time */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Service Completion Time</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={serviceTimeData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                        <XAxis type="number" stroke="hsl(0, 0%, 60%)" label={{ value: 'Minutes', position: 'insideBottom', offset: -5 }} />
                        <YAxis type="category" dataKey="service" stroke="hsl(0, 0%, 60%)" width={120} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(0, 0%, 6%)', 
                            border: '1px solid hsl(0, 0%, 18%)',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="avgTime" fill="hsl(142, 76%, 36%)" name="Avg Time" />
                        <Bar dataKey="target" fill="hsl(0, 0%, 40%)" name="Target" opacity={0.5} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Top Services by Revenue */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Top Services by Revenue</h3>
                    {topServices.map((service, i) => (
                      <div key={i} className="p-4 rounded-lg border border-border/50 bg-card/30">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{service.service}</span>
                              {service.trend === "up" && <TrendingUp className="w-4 h-4 text-success" />}
                              {service.trend === "down" && <TrendingDown className="w-4 h-4 text-muted-foreground" />}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {service.count} services completed
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-success">{service.revenue}</p>
                            <Badge 
                              variant="outline"
                              className={
                                service.trend === "up" ? "border-success text-success" :
                                service.trend === "down" ? "border-muted text-muted-foreground" :
                                "border-border text-foreground"
                              }
                            >
                              {service.change}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Approval Rates */}
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-4">Customer Approval Rates by Cost Range</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={approvalRateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                      <XAxis dataKey="range" stroke="hsl(0, 0%, 60%)" />
                      <YAxis stroke="hsl(0, 0%, 60%)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(0, 0%, 6%)', 
                          border: '1px solid hsl(0, 0%, 18%)',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="approved" stackId="a" fill="hsl(142, 76%, 36%)" name="Approved %" />
                      <Bar dataKey="declined" stackId="a" fill="hsl(0, 72%, 51%)" name="Declined %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              {/* Staff Tab */}
              <TabsContent value="staff" className="mt-6">
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={staffPerformanceData}>
                    <PolarGrid stroke="hsl(0, 0%, 18%)" />
                    <PolarAngleAxis dataKey="metric" stroke="hsl(0, 0%, 60%)" />
                    <PolarRadiusAxis stroke="hsl(0, 0%, 60%)" />
                    <Radar 
                      name="Current Performance" 
                      dataKey="current" 
                      stroke="hsl(142, 76%, 36%)" 
                      fill="hsl(142, 76%, 36%)" 
                      fillOpacity={0.6} 
                    />
                    <Radar 
                      name="Target" 
                      dataKey="target" 
                      stroke="hsl(0, 0%, 60%)" 
                      fill="hsl(0, 0%, 60%)" 
                      fillOpacity={0.2} 
                      strokeDasharray="5 5"
                    />
                    <Legend />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 6%)', 
                        border: '1px solid hsl(0, 0%, 18%)',
                        borderRadius: '8px'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-success" />
                    <span className="font-semibold">Staff Performance Highlight</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Team is exceeding targets across all metrics with 89% efficiency and 92% quality scores. Technical skills show 7% improvement over target.
                  </p>
                </div>
              </TabsContent>

              {/* Peak Hours Tab */}
              <TabsContent value="peak_hours" className="mt-6">
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={peakHoursData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                    <XAxis dataKey="hour" stroke="hsl(0, 0%, 60%)" />
                    <YAxis yAxisId="left" stroke="hsl(0, 0%, 60%)" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(0, 0%, 60%)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 6%)', 
                        border: '1px solid hsl(0, 0%, 18%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="calls" fill="hsl(199, 89%, 48%)" name="AI Calls" />
                    <Bar yAxisId="left" dataKey="appointments" fill="hsl(142, 76%, 36%)" name="Appointments" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(38, 92%, 50%)" 
                      strokeWidth={3}
                      name="Revenue (₹)"
                      dot={{ fill: "hsl(38, 92%, 50%)", r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Peak Call Time</p>
                    <p className="text-2xl font-bold">11 AM</p>
                    <p className="text-xs text-muted-foreground mt-1">15 calls/hour</p>
                  </div>
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <p className="text-sm text-muted-foreground mb-1">Peak Revenue Time</p>
                    <p className="text-2xl font-bold">11 AM</p>
                    <p className="text-xs text-muted-foreground mt-1">₹1.25L/hour</p>
                  </div>
                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <p className="text-sm text-muted-foreground mb-1">Busiest Period</p>
                    <p className="text-2xl font-bold">10 AM - 12 PM</p>
                    <p className="text-xs text-muted-foreground mt-1">Optimize staffing</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
