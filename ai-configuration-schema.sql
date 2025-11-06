-- AI Configuration Database Schema
-- This schema tracks AI voice assistant use cases and performance

-- ============================================
-- 1. COST BREAKDOWN CASES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS cost_breakdown_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vin TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  issue TEXT NOT NULL,
  estimated_cost TEXT NOT NULL,
  additional_work TEXT,
  additional_cost TEXT DEFAULT '₹0',
  call_status TEXT NOT NULL CHECK (call_status IN (
    'Pending Approval',
    'Approved',
    'Customer Reviewing',
    'Work Completed',
    'Declined'
  )),
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  language TEXT NOT NULL CHECK (language IN ('English', 'Hindi', 'Marathi', 'Bengali')),
  last_contact TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. MAINTENANCE ALERTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS maintenance_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vin TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  issue TEXT NOT NULL,
  predicted_failure TEXT NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('High', 'Medium', 'Low')),
  scheduled_date DATE,
  call_status TEXT NOT NULL CHECK (call_status IN (
    'Appointment Booked',
    'Urgent - Called 3x',
    'Customer Declined',
    'Scheduled',
    'Completed'
  )),
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  mileage TEXT NOT NULL,
  last_contact TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. GENERAL SERVICE CASES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS general_service_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vin TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  issue TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN (
    'Scheduled Maintenance',
    'Diagnostic',
    'Recall Service',
    'Consultation',
    'Repair',
    'Inspection'
  )),
  appointment_date DATE,
  call_status TEXT NOT NULL CHECK (call_status IN (
    'Confirmed',
    'Urgent - Same Day',
    'Scheduled',
    'Information Provided',
    'Completed',
    'Cancelled'
  )),
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  estimated_duration TEXT,
  service_advisor TEXT,
  last_contact TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. AI USE CASE STATISTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_use_case_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  cost_breakdown_cases INTEGER DEFAULT 0,
  cost_breakdown_change TEXT DEFAULT '+0 this week',
  maintenance_alerts INTEGER DEFAULT 0,
  maintenance_next_alert TEXT DEFAULT 'No alerts',
  general_service_cases INTEGER DEFAULT 0,
  general_service_info TEXT DEFAULT 'No active appointments',
  total_active_cases INTEGER DEFAULT 0,
  total_cases_change TEXT DEFAULT '+0 this month',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. AI PERFORMANCE SUMMARY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_performance_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  success_rate DECIMAL(5,2) DEFAULT 0.00,
  success_rate_change TEXT DEFAULT '+0% this month',
  avg_call_duration_minutes DECIMAL(5,2) DEFAULT 0.00,
  avg_call_duration_change TEXT DEFAULT '0m improvement',
  cost_breakdown_success DECIMAL(5,2) DEFAULT 0.00,
  maintenance_alerts_success DECIMAL(5,2) DEFAULT 0.00,
  general_service_success DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. SERVICE COST ANALYTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS service_cost_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  avg_cost_approval TEXT DEFAULT '₹0',
  avg_cost_info TEXT DEFAULT 'Per service case',
  preventive_success_rate DECIMAL(5,2) DEFAULT 0.00,
  preventive_success_info TEXT DEFAULT 'Avoided breakdowns',
  cost_breakdown_cases INTEGER DEFAULT 0,
  cost_breakdown_percentage DECIMAL(5,2) DEFAULT 0.00,
  maintenance_alert_cases INTEGER DEFAULT 0,
  maintenance_alert_percentage DECIMAL(5,2) DEFAULT 0.00,
  general_service_cases INTEGER DEFAULT 0,
  general_service_percentage DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_cost_breakdown_cases_created_at ON cost_breakdown_cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cost_breakdown_cases_vin ON cost_breakdown_cases(vin);
CREATE INDEX IF NOT EXISTS idx_cost_breakdown_cases_status ON cost_breakdown_cases(call_status);
CREATE INDEX IF NOT EXISTS idx_maintenance_alerts_created_at ON maintenance_alerts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_maintenance_alerts_vin ON maintenance_alerts(vin);
CREATE INDEX IF NOT EXISTS idx_maintenance_alerts_risk ON maintenance_alerts(risk_level);
CREATE INDEX IF NOT EXISTS idx_general_service_cases_created_at ON general_service_cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_general_service_cases_vin ON general_service_cases(vin);
CREATE INDEX IF NOT EXISTS idx_general_service_cases_type ON general_service_cases(service_type);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE cost_breakdown_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE general_service_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_use_case_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_performance_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_cost_analytics ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users (admin) full access to all tables
CREATE POLICY "Admin full access to cost_breakdown_cases" ON cost_breakdown_cases
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to maintenance_alerts" ON maintenance_alerts
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to general_service_cases" ON general_service_cases
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to ai_use_case_statistics" ON ai_use_case_statistics
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to ai_performance_summary" ON ai_performance_summary
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to service_cost_analytics" ON service_cost_analytics
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anon role to read data
CREATE POLICY "Anon read access to cost_breakdown_cases" ON cost_breakdown_cases
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Anon read access to maintenance_alerts" ON maintenance_alerts
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Anon read access to general_service_cases" ON general_service_cases
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Anon read access to ai_use_case_statistics" ON ai_use_case_statistics
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Anon read access to ai_performance_summary" ON ai_performance_summary
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Anon read access to service_cost_analytics" ON service_cost_analytics
  FOR SELECT 
  TO anon
  USING (true);

-- ============================================
-- FUNCTIONS FOR AUTOMATIC UPDATES
-- ============================================

-- Function to update use case statistics
CREATE OR REPLACE FUNCTION update_ai_use_case_statistics()
RETURNS void AS $$
DECLARE
  cost_count INTEGER;
  maintenance_count INTEGER;
  service_count INTEGER;
  total_count INTEGER;
BEGIN
  -- Count cases
  SELECT COUNT(*) INTO cost_count FROM cost_breakdown_cases;
  SELECT COUNT(*) INTO maintenance_count FROM maintenance_alerts;
  SELECT COUNT(*) INTO service_count FROM general_service_cases;
  total_count := cost_count + maintenance_count + service_count;
  
  -- Update or insert statistics
  INSERT INTO ai_use_case_statistics (
    date,
    cost_breakdown_cases,
    maintenance_alerts,
    general_service_cases,
    total_active_cases
  )
  VALUES (
    CURRENT_DATE,
    cost_count,
    maintenance_count,
    service_count,
    total_count
  )
  ON CONFLICT (date) DO UPDATE SET
    cost_breakdown_cases = cost_count,
    maintenance_alerts = maintenance_count,
    general_service_cases = service_count,
    total_active_cases = total_count,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to update service cost analytics
CREATE OR REPLACE FUNCTION update_service_cost_analytics()
RETURNS void AS $$
DECLARE
  cost_count INTEGER;
  maintenance_count INTEGER;
  service_count INTEGER;
  total_count INTEGER;
BEGIN
  -- Count cases
  SELECT COUNT(*) INTO cost_count FROM cost_breakdown_cases;
  SELECT COUNT(*) INTO maintenance_count FROM maintenance_alerts;
  SELECT COUNT(*) INTO service_count FROM general_service_cases;
  total_count := cost_count + maintenance_count + service_count;
  
  -- Update or insert analytics
  INSERT INTO service_cost_analytics (
    date,
    cost_breakdown_cases,
    cost_breakdown_percentage,
    maintenance_alert_cases,
    maintenance_alert_percentage,
    general_service_cases,
    general_service_percentage
  )
  VALUES (
    CURRENT_DATE,
    cost_count,
    CASE WHEN total_count > 0 THEN (cost_count::DECIMAL / total_count) * 100 ELSE 0 END,
    maintenance_count,
    CASE WHEN total_count > 0 THEN (maintenance_count::DECIMAL / total_count) * 100 ELSE 0 END,
    service_count,
    CASE WHEN total_count > 0 THEN (service_count::DECIMAL / total_count) * 100 ELSE 0 END
  )
  ON CONFLICT (date) DO UPDATE SET
    cost_breakdown_cases = cost_count,
    cost_breakdown_percentage = CASE WHEN total_count > 0 THEN (cost_count::DECIMAL / total_count) * 100 ELSE 0 END,
    maintenance_alert_cases = maintenance_count,
    maintenance_alert_percentage = CASE WHEN total_count > 0 THEN (maintenance_count::DECIMAL / total_count) * 100 ELSE 0 END,
    general_service_cases = service_count,
    general_service_percentage = CASE WHEN total_count > 0 THEN (service_count::DECIMAL / total_count) * 100 ELSE 0 END,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- INITIAL DATA (All zeros as requested)
-- ============================================

-- Initialize today's use case statistics with zeros
INSERT INTO ai_use_case_statistics (
  date,
  cost_breakdown_cases,
  cost_breakdown_change,
  maintenance_alerts,
  maintenance_next_alert,
  general_service_cases,
  general_service_info,
  total_active_cases,
  total_cases_change
) VALUES (
  CURRENT_DATE,
  0,
  '+0 this week',
  0,
  'No alerts',
  0,
  'No active appointments',
  0,
  '+0 this month'
) ON CONFLICT (date) DO NOTHING;

-- Initialize today's AI performance summary with zeros
INSERT INTO ai_performance_summary (
  date,
  success_rate,
  success_rate_change,
  avg_call_duration_minutes,
  avg_call_duration_change,
  cost_breakdown_success,
  maintenance_alerts_success,
  general_service_success
) VALUES (
  CURRENT_DATE,
  0.00,
  '+0% this month',
  0.00,
  '0m improvement',
  0.00,
  0.00,
  0.00
) ON CONFLICT (date) DO NOTHING;

-- Initialize today's service cost analytics with zeros
INSERT INTO service_cost_analytics (
  date,
  avg_cost_approval,
  avg_cost_info,
  preventive_success_rate,
  preventive_success_info,
  cost_breakdown_cases,
  cost_breakdown_percentage,
  maintenance_alert_cases,
  maintenance_alert_percentage,
  general_service_cases,
  general_service_percentage
) VALUES (
  CURRENT_DATE,
  '₹0',
  'Per service case',
  0.00,
  'Avoided breakdowns',
  0,
  0.00,
  0,
  0.00,
  0,
  0.00
) ON CONFLICT (date) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON cost_breakdown_cases TO authenticated;
GRANT ALL ON cost_breakdown_cases TO service_role;
GRANT ALL ON maintenance_alerts TO authenticated;
GRANT ALL ON maintenance_alerts TO service_role;
GRANT ALL ON general_service_cases TO authenticated;
GRANT ALL ON general_service_cases TO service_role;
GRANT ALL ON ai_use_case_statistics TO authenticated;
GRANT ALL ON ai_use_case_statistics TO service_role;
GRANT ALL ON ai_performance_summary TO authenticated;
GRANT ALL ON ai_performance_summary TO service_role;
GRANT ALL ON service_cost_analytics TO authenticated;
GRANT ALL ON service_cost_analytics TO service_role;

COMMENT ON TABLE cost_breakdown_cases IS 'Stores real-time transparent cost breakdown cases for AI voice assistant';
COMMENT ON TABLE maintenance_alerts IS 'Stores predictive maintenance alert cases';
COMMENT ON TABLE general_service_cases IS 'Stores general service management cases';
COMMENT ON TABLE ai_use_case_statistics IS 'Tracks daily statistics for AI use cases';
COMMENT ON TABLE ai_performance_summary IS 'Tracks AI performance metrics and success rates';
COMMENT ON TABLE service_cost_analytics IS 'Tracks service cost and distribution analytics';
