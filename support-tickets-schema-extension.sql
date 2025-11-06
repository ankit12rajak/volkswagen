-- Extension to support_cases table for Tickets page
-- Run this after the main support-dashboard-schema.sql

-- Add additional columns to support_cases for different use case types
ALTER TABLE support_cases 
ADD COLUMN IF NOT EXISTS original_cost_inr DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS additional_work TEXT,
ADD COLUMN IF NOT EXISTS additional_cost_inr DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_cost_inr DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS predicted_failure TEXT,
ADD COLUMN IF NOT EXISTS risk_level TEXT CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical')),
ADD COLUMN IF NOT EXISTS scheduled_date DATE,
ADD COLUMN IF NOT EXISTS mileage TEXT,
ADD COLUMN IF NOT EXISTS service_type TEXT,
ADD COLUMN IF NOT EXISTS appointment_date DATE,
ADD COLUMN IF NOT EXISTS estimated_duration TEXT,
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'English',
ADD COLUMN IF NOT EXISTS ai_call_duration_seconds INTEGER DEFAULT 0;

-- Create a view for easier querying by use case
CREATE OR REPLACE VIEW cost_breakdown_cases AS
SELECT 
  case_id,
  customer_name,
  customer_phone,
  vin,
  issue,
  original_cost_inr,
  additional_work,
  additional_cost_inr,
  total_cost_inr,
  status,
  priority,
  language,
  ai_call_duration_seconds,
  created_at
FROM support_cases
WHERE use_case = 'Cost Breakdown'
ORDER BY created_at DESC;

CREATE OR REPLACE VIEW predictive_maintenance_cases AS
SELECT 
  case_id,
  customer_name,
  customer_phone,
  vin,
  issue,
  predicted_failure,
  risk_level,
  estimated_cost_inr,
  scheduled_date,
  status,
  priority,
  language,
  ai_call_duration_seconds,
  mileage,
  created_at
FROM support_cases
WHERE use_case = 'Predictive Maintenance'
ORDER BY created_at DESC;

CREATE OR REPLACE VIEW general_service_cases AS
SELECT 
  case_id,
  customer_name,
  customer_phone,
  vin,
  issue,
  service_type,
  estimated_cost_inr,
  appointment_date,
  status,
  priority,
  language,
  ai_call_duration_seconds,
  estimated_duration,
  created_at
FROM support_cases
WHERE use_case = 'General Service'
ORDER BY created_at DESC;

-- Function to calculate total cost automatically
CREATE OR REPLACE FUNCTION calculate_total_cost()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.use_case = 'Cost Breakdown' THEN
    NEW.total_cost_inr := COALESCE(NEW.original_cost_inr, 0) + COALESCE(NEW.additional_cost_inr, 0);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate total cost
DROP TRIGGER IF EXISTS trigger_calculate_total_cost ON support_cases;
CREATE TRIGGER trigger_calculate_total_cost
BEFORE INSERT OR UPDATE ON support_cases
FOR EACH ROW
EXECUTE FUNCTION calculate_total_cost();

-- Sample data removed - tables will be populated by actual AI calls and user interactions

-- Create function to get weekly case trends
CREATE OR REPLACE FUNCTION get_weekly_case_trends()
RETURNS TABLE (
  day TEXT,
  cost_breakdown BIGINT,
  predictive BIGINT,
  general BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TO_CHAR(date_series, 'Dy') as day,
    COUNT(*) FILTER (WHERE sc.use_case = 'Cost Breakdown') as cost_breakdown,
    COUNT(*) FILTER (WHERE sc.use_case = 'Predictive Maintenance') as predictive,
    COUNT(*) FILTER (WHERE sc.use_case = 'General Service') as general
  FROM generate_series(
    CURRENT_DATE - INTERVAL '4 days',
    CURRENT_DATE,
    INTERVAL '1 day'
  ) AS date_series
  LEFT JOIN support_cases sc ON DATE(sc.created_at) = date_series::date
  GROUP BY date_series
  ORDER BY date_series;
END;
$$ LANGUAGE plpgsql;

-- Create function to get ticket stats
CREATE OR REPLACE FUNCTION get_ticket_stats()
RETURNS TABLE (
  total_active_cases BIGINT,
  pending_approvals BIGINT,
  appointments_today BIGINT,
  urgent_cases BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) FILTER (WHERE status NOT IN ('Completed', 'Cancelled')) as total_active_cases,
    COUNT(*) FILTER (WHERE status = 'Pending Approval') as pending_approvals,
    COUNT(*) FILTER (WHERE appointment_date = CURRENT_DATE OR scheduled_date = CURRENT_DATE) as appointments_today,
    COUNT(*) FILTER (WHERE priority IN ('Critical', 'High') AND status NOT IN ('Completed', 'Cancelled')) as urgent_cases
  FROM support_cases;
END;
$$ LANGUAGE plpgsql;
