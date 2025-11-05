import { supabase } from '@/lib/supabase';

export interface DailyStats {
  total_calls: number;
  resolved_calls: number;
  escalated_calls: number;
  avg_handle_time_seconds: number;
  ai_calls: number;
  human_calls: number;
  avg_rating: number;
  resolution_rate: number;
  first_call_resolution: number;
  cost_savings_euros: number;
}

export interface HourlyCallVolume {
  hour: number;
  total_calls: number;
  resolved_calls: number;
  escalated_calls: number;
}

export interface CategoryStats {
  category: string;
  total_calls: number;
  resolved_calls: number;
  avg_duration_seconds: number;
}

export interface AgentPerformance {
  agent_id: string;
  agent_name: string;
  agent_type: string;
  total_calls: number;
  resolved_calls: number;
  avg_handle_time_seconds: number;
  avg_rating: number;
  resolution_rate: number;
}

export interface AIPerformanceMetrics {
  voice_recognition_accuracy: number;
  sentiment_accuracy: number;
  intent_classification_accuracy: number;
  response_quality_score: number;
  context_understanding_score: number;
  language_processing_score: number;
  overall_health_score: number;
}

export interface CallRecord {
  call_id: string;
  customer_name: string;
  category: string;
  duration_seconds: number;
  agent_name: string;
  agent_type: string;
  sentiment: string;
  status: string;
  rating: number;
  created_at: string;
}

export interface SystemAlert {
  id: string;
  alert_type: string;
  message: string;
  priority: string;
  is_read: boolean;
  created_at: string;
}

export interface WeeklyTrend {
  day: string;
  calls: number;
  resolution: number;
  satisfaction: number;
  avgTime: number;
}

export interface CostAnalysis {
  month: string;
  aiCost: number;
  humanCost: number;
  savings: number;
}

// Fetch today's daily statistics
export async function getDailyStatistics(): Promise<DailyStats | null> {
  const { data, error } = await supabase
    .from('daily_statistics')
    .select('*')
    .eq('date', new Date().toISOString().split('T')[0])
    .single();

  if (error) {
    console.error('Error fetching daily statistics:', error);
    return null;
  }

  return data;
}

// Fetch hourly call volume for today
export async function getHourlyCallVolume(): Promise<HourlyCallVolume[]> {
  const { data, error } = await supabase
    .from('hourly_call_volume')
    .select('*')
    .eq('date', new Date().toISOString().split('T')[0])
    .order('hour', { ascending: true });

  if (error) {
    console.error('Error fetching hourly call volume:', error);
    return [];
  }

  return data || [];
}

// Fetch category statistics for today
export async function getCategoryStatistics(): Promise<CategoryStats[]> {
  const { data, error } = await supabase
    .from('category_statistics')
    .select('*')
    .eq('date', new Date().toISOString().split('T')[0])
    .order('total_calls', { ascending: false });

  if (error) {
    console.error('Error fetching category statistics:', error);
    return [];
  }

  return data || [];
}

// Fetch agent performance for today
export async function getAgentPerformance(): Promise<AgentPerformance[]> {
  const { data, error } = await supabase
    .from('agent_performance')
    .select('*')
    .eq('date', new Date().toISOString().split('T')[0])
    .order('total_calls', { ascending: false });

  if (error) {
    console.error('Error fetching agent performance:', error);
    return [];
  }

  return data || [];
}

// Fetch AI performance metrics for today
export async function getAIPerformanceMetrics(): Promise<AIPerformanceMetrics | null> {
  const { data, error } = await supabase
    .from('ai_performance_metrics')
    .select('*')
    .eq('date', new Date().toISOString().split('T')[0])
    .single();

  if (error) {
    console.error('Error fetching AI performance metrics:', error);
    return null;
  }

  return data;
}

// Fetch recent call records
export async function getRecentCallRecords(limit: number = 10): Promise<CallRecord[]> {
  const { data, error } = await supabase
    .from('call_records')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent call records:', error);
    return [];
  }

  return data || [];
}

// Fetch system alerts
export async function getSystemAlerts(limit: number = 5): Promise<SystemAlert[]> {
  const { data, error } = await supabase
    .from('system_alerts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching system alerts:', error);
    return [];
  }

  return data || [];
}

// Fetch weekly trends (last 7 days)
export async function getWeeklyTrends(): Promise<WeeklyTrend[]> {
  const { data, error } = await supabase
    .from('daily_statistics')
    .select('*')
    .gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching weekly trends:', error);
    return [];
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (data || []).map(stat => ({
    day: daysOfWeek[new Date(stat.date).getDay()],
    calls: stat.total_calls,
    resolution: stat.resolution_rate,
    satisfaction: stat.avg_rating,
    avgTime: stat.avg_handle_time_seconds / 60 // Convert to minutes
  }));
}

// Fetch cost analysis (last 6 months)
export async function getCostAnalysis(): Promise<CostAnalysis[]> {
  const { data, error } = await supabase
    .from('cost_analysis')
    .select('*')
    .gte('month', new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('month', { ascending: true });

  if (error) {
    console.error('Error fetching cost analysis:', error);
    return [];
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (data || []).map(cost => ({
    month: monthNames[new Date(cost.month).getMonth()],
    aiCost: cost.ai_cost_euros,
    humanCost: cost.human_cost_euros,
    savings: cost.total_savings_euros
  }));
}

// Mark alert as read
export async function markAlertAsRead(alertId: string): Promise<boolean> {
  const { error } = await supabase
    .from('system_alerts')
    .update({ is_read: true, updated_at: new Date().toISOString() })
    .eq('id', alertId);

  if (error) {
    console.error('Error marking alert as read:', error);
    return false;
  }

  return true;
}

// Create a new system alert
export async function createSystemAlert(
  alertType: 'warning' | 'success' | 'info' | 'error',
  message: string,
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
): Promise<boolean> {
  const { error } = await supabase
    .from('system_alerts')
    .insert({
      alert_type: alertType,
      message,
      priority,
      is_read: false
    });

  if (error) {
    console.error('Error creating system alert:', error);
    return false;
  }

  return true;
}
