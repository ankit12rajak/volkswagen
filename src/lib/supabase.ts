import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DealershipUser {
  id: string;
  email: string;
  password: string;
  dealership_name: string;
  created_at: string;
  created_by: string;
}

// Support Dashboard Types
export interface SupportCase {
  id: string;
  case_id: string;
  customer_name: string;
  customer_phone: string | null;
  vin: string | null;
  issue: string;
  priority: 'Low' | 'Normal' | 'Medium' | 'High' | 'Critical';
  status: string;
  use_case: 'Cost Breakdown' | 'Predictive Maintenance' | 'General Service';
  category: string;
  estimated_cost_inr: number;
  created_at: string;
  updated_at: string;
  // Cost Breakdown specific fields
  original_cost_inr?: number;
  additional_work?: string;
  additional_cost_inr?: number;
  total_cost_inr?: number;
  // Predictive Maintenance specific fields
  predicted_failure?: string;
  risk_level?: 'Low' | 'Medium' | 'High' | 'Critical';
  scheduled_date?: string;
  mileage?: string;
  // General Service specific fields
  service_type?: string;
  appointment_date?: string;
  estimated_duration?: string;
  // Common fields
  language?: string;
  ai_call_duration_seconds?: number;
}

export interface AIVoiceCall {
  id: string;
  call_id: string;
  customer_name: string;
  customer_phone: string;
  vin: string | null;
  topic: string;
  use_case: 'Cost Breakdown' | 'Predictive Maintenance' | 'General Service';
  sentiment: 'Positive' | 'Neutral' | 'Negative' | null;
  duration_seconds: number;
  ai_confidence: number | null;
  priority: 'Normal' | 'Medium' | 'High' | 'Critical';
  language: string;
  status: 'Awaiting Approval' | 'Scheduling' | 'In Progress' | 'Customer Reviewing' | 'Completed' | 'Escalated';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  appointment_id: string;
  customer_name: string;
  customer_phone: string | null;
  vin: string | null;
  appointment_date: string;
  appointment_time: string;
  service_type: string;
  status: 'Scheduled' | 'Confirmed' | 'Pending Arrival' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';
  estimated_cost_inr: number;
  service_bay_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceBay {
  id: string;
  bay_id: string;
  bay_name: string;
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  current_vehicle_vin: string | null;
  current_appointment_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface StaffAttendance {
  id: string;
  staff_id: string;
  staff_name: string;
  date: string;
  status: 'Present' | 'Absent' | 'Leave' | 'Half Day';
  role: string;
  created_at: string;
  updated_at: string;
}

export interface DailyRevenue {
  id: string;
  date: string;
  total_revenue_inr: number;
  services_completed: number;
  parts_sold_revenue_inr: number;
  service_revenue_inr: number;
  created_at: string;
  updated_at: string;
}

export interface PendingApproval {
  id: string;
  approval_id: string;
  case_id: string | null;
  customer_name: string;
  approval_type: 'Cost Breakdown' | 'Additional Work' | 'Warranty Claim' | 'Discount Request';
  amount_inr: number;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requested_at: string;
  resolved_at: string | null;
  resolved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DealershipDailyStats {
  id: string;
  date: string;
  total_appointments: number;
  pending_arrival: number;
  ai_calls_handled: number;
  customer_satisfaction_avg: number;
  customer_satisfaction_count: number;
  avg_response_time_hours: number;
  created_at: string;
  updated_at: string;
}

// Admin Dashboard Types (from existing schema)
export interface CallRecord {
  id: string;
  call_id: string;
  customer_name: string;
  customer_phone: string | null;
  category: string;
  duration_seconds: number;
  agent_type: 'AI' | 'Human';
  agent_id: string;
  agent_name: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative' | null;
  status: 'Resolved' | 'Escalated' | 'Pending' | 'Failed';
  rating: number | null;
  resolution_time_seconds: number | null;
  escalated: boolean;
  created_at: string;
  updated_at: string;
}

export interface DailyStatistics {
  id: string;
  date: string;
  total_calls: number;
  resolved_calls: number;
  escalated_calls: number;
  failed_calls: number;
  total_duration_seconds: number;
  avg_handle_time_seconds: number;
  ai_calls: number;
  human_calls: number;
  total_rating_sum: number;
  total_ratings_count: number;
  avg_rating: number;
  resolution_rate: number;
  first_call_resolution: number;
  cost_savings_euros: number;
  created_at: string;
  updated_at: string;
}

export interface HourlyCallVolume {
  id: string;
  date: string;
  hour: number;
  total_calls: number;
  resolved_calls: number;
  escalated_calls: number;
  avg_duration_seconds: number;
  created_at: string;
  updated_at: string;
}
