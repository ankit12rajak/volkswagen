-- Support Dashboard Database Schema
-- This schema tracks dealership operations, AI voice calls, appointments, and service cases

-- ============================================
-- 1. SUPPORT CASES TABLE (Customer Service Cases)
-- ============================================
CREATE TABLE IF NOT EXISTS support_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  vin TEXT,
  issue TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('Low', 'Normal', 'Medium', 'High', 'Critical')),
  status TEXT NOT NULL CHECK (status IN (
    'Pending Approval', 
    'Appointment Booked', 
    'Follow-up Required', 
    'Completed', 
    'Scheduled',
    'In Progress',
    'Cancelled'
  )),
  use_case TEXT NOT NULL CHECK (use_case IN (
    'Cost Breakdown',
    'Predictive Maintenance',
    'General Service'
  )),
  category TEXT NOT NULL,
  estimated_cost_inr DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. AI VOICE CALLS TABLE (Active AI Interactions)
-- ============================================
CREATE TABLE IF NOT EXISTS ai_voice_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  vin TEXT,
  topic TEXT NOT NULL,
  use_case TEXT NOT NULL CHECK (use_case IN (
    'Cost Breakdown',
    'Predictive Maintenance',
    'General Service'
  )),
  sentiment TEXT CHECK (sentiment IN ('Positive', 'Neutral', 'Negative')),
  duration_seconds INTEGER DEFAULT 0,
  ai_confidence INTEGER CHECK (ai_confidence >= 0 AND ai_confidence <= 100),
  priority TEXT NOT NULL CHECK (priority IN ('Normal', 'Medium', 'High', 'Critical')),
  language TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (
    'Awaiting Approval',
    'Scheduling',
    'In Progress',
    'Customer Reviewing',
    'Completed',
    'Escalated'
  )),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. APPOINTMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  vin TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  service_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (
    'Scheduled',
    'Confirmed',
    'Pending Arrival',
    'In Progress',
    'Completed',
    'Cancelled',
    'No Show'
  )),
  estimated_cost_inr DECIMAL(10,2) DEFAULT 0,
  service_bay_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. SERVICE BAYS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS service_bays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bay_id TEXT UNIQUE NOT NULL,
  bay_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Available', 'Occupied', 'Maintenance', 'Reserved')),
  current_vehicle_vin TEXT,
  current_appointment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. STAFF ATTENDANCE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS staff_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id TEXT NOT NULL,
  staff_name TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL CHECK (status IN ('Present', 'Absent', 'Leave', 'Half Day')),
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(staff_id, date)
);

-- ============================================
-- 6. DAILY REVENUE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS daily_revenue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  total_revenue_inr DECIMAL(12,2) DEFAULT 0,
  services_completed INTEGER DEFAULT 0,
  parts_sold_revenue_inr DECIMAL(12,2) DEFAULT 0,
  service_revenue_inr DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. PENDING APPROVALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS pending_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  approval_id TEXT UNIQUE NOT NULL,
  case_id TEXT,
  customer_name TEXT NOT NULL,
  approval_type TEXT NOT NULL CHECK (approval_type IN (
    'Cost Breakdown',
    'Additional Work',
    'Warranty Claim',
    'Discount Request'
  )),
  amount_inr DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolved_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. DEALERSHIP STATS TABLE (Daily aggregated stats)
-- ============================================
CREATE TABLE IF NOT EXISTS dealership_daily_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  total_appointments INTEGER DEFAULT 0,
  pending_arrival INTEGER DEFAULT 0,
  ai_calls_handled INTEGER DEFAULT 0,
  customer_satisfaction_avg DECIMAL(3,2) DEFAULT 0,
  customer_satisfaction_count INTEGER DEFAULT 0,
  avg_response_time_hours DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_support_cases_created_at ON support_cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_cases_status ON support_cases(status);
CREATE INDEX IF NOT EXISTS idx_support_cases_priority ON support_cases(priority);
CREATE INDEX IF NOT EXISTS idx_ai_voice_calls_created_at ON ai_voice_calls(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_voice_calls_is_active ON ai_voice_calls(is_active);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_service_bays_status ON service_bays(status);
CREATE INDEX IF NOT EXISTS idx_staff_attendance_date ON staff_attendance(date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_revenue_date ON daily_revenue(date DESC);
CREATE INDEX IF NOT EXISTS idx_pending_approvals_status ON pending_approvals(status);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE support_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_voice_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_bays ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_revenue ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealership_daily_stats ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users full access
CREATE POLICY "Admin full access to support_cases" ON support_cases
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access to ai_voice_calls" ON ai_voice_calls
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access to appointments" ON appointments
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access to service_bays" ON service_bays
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access to staff_attendance" ON staff_attendance
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access to daily_revenue" ON daily_revenue
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access to pending_approvals" ON pending_approvals
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access to dealership_daily_stats" ON dealership_daily_stats
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Allow anon role to read data
CREATE POLICY "Anon read access to support_cases" ON support_cases
  FOR SELECT TO anon USING (true);

CREATE POLICY "Anon read access to ai_voice_calls" ON ai_voice_calls
  FOR SELECT TO anon USING (true);

CREATE POLICY "Anon read access to appointments" ON appointments
  FOR SELECT TO anon USING (true);

CREATE POLICY "Anon read access to service_bays" ON service_bays
  FOR SELECT TO anon USING (true);

CREATE POLICY "Anon read access to staff_attendance" ON staff_attendance
  FOR SELECT TO anon USING (true);

CREATE POLICY "Anon read access to daily_revenue" ON daily_revenue
  FOR SELECT TO anon USING (true);

CREATE POLICY "Anon read access to pending_approvals" ON pending_approvals
  FOR SELECT TO anon USING (true);

CREATE POLICY "Anon read access to dealership_daily_stats" ON dealership_daily_stats
  FOR SELECT TO anon USING (true);

-- ============================================
-- INITIAL DATA (All zeros/empty as requested)
-- ============================================

-- Initialize today's dealership stats with zeros
INSERT INTO dealership_daily_stats (
  date,
  total_appointments,
  pending_arrival,
  ai_calls_handled,
  customer_satisfaction_avg,
  customer_satisfaction_count,
  avg_response_time_hours
) VALUES (
  CURRENT_DATE,
  0, 0, 0, 0, 0, 0
) ON CONFLICT (date) DO NOTHING;

-- Initialize today's revenue with zeros
INSERT INTO daily_revenue (
  date,
  total_revenue_inr,
  services_completed,
  parts_sold_revenue_inr,
  service_revenue_inr
) VALUES (
  CURRENT_DATE,
  0, 0, 0, 0
) ON CONFLICT (date) DO NOTHING;

-- Initialize service bays (10 bays, all available)
INSERT INTO service_bays (bay_id, bay_name, status)
VALUES 
  ('BAY-01', 'Service Bay 1', 'Available'),
  ('BAY-02', 'Service Bay 2', 'Available'),
  ('BAY-03', 'Service Bay 3', 'Available'),
  ('BAY-04', 'Service Bay 4', 'Available'),
  ('BAY-05', 'Service Bay 5', 'Available'),
  ('BAY-06', 'Service Bay 6', 'Available'),
  ('BAY-07', 'Service Bay 7', 'Available'),
  ('BAY-08', 'Service Bay 8', 'Available'),
  ('BAY-09', 'Service Bay 9', 'Available'),
  ('BAY-10', 'Service Bay 10', 'Available')
ON CONFLICT (bay_id) DO NOTHING;

-- ============================================
-- FUNCTIONS FOR AUTOMATIC UPDATES
-- ============================================

-- Function to update dealership daily stats when appointments are created/updated
CREATE OR REPLACE FUNCTION update_dealership_stats_from_appointments()
RETURNS TRIGGER AS $$
BEGIN
  -- Update today's stats
  INSERT INTO dealership_daily_stats (
    date,
    total_appointments,
    pending_arrival
  )
  SELECT 
    CURRENT_DATE,
    COUNT(*) FILTER (WHERE appointment_date = CURRENT_DATE),
    COUNT(*) FILTER (WHERE appointment_date = CURRENT_DATE AND status = 'Pending Arrival')
  FROM appointments
  ON CONFLICT (date) DO UPDATE SET
    total_appointments = EXCLUDED.total_appointments,
    pending_arrival = EXCLUDED.pending_arrival,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for appointments
CREATE TRIGGER trigger_update_dealership_stats_appointments
AFTER INSERT OR UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION update_dealership_stats_from_appointments();

-- Function to update dealership stats when AI calls are created
CREATE OR REPLACE FUNCTION update_dealership_stats_from_ai_calls()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO dealership_daily_stats (
    date,
    ai_calls_handled
  )
  SELECT 
    CURRENT_DATE,
    COUNT(*) FILTER (WHERE DATE(created_at) = CURRENT_DATE)
  FROM ai_voice_calls
  ON CONFLICT (date) DO UPDATE SET
    ai_calls_handled = EXCLUDED.ai_calls_handled,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for AI calls
CREATE TRIGGER trigger_update_dealership_stats_ai_calls
AFTER INSERT ON ai_voice_calls
FOR EACH ROW
EXECUTE FUNCTION update_dealership_stats_from_ai_calls();

-- Function to update daily revenue
CREATE OR REPLACE FUNCTION update_daily_revenue_from_appointments()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'Completed' AND (OLD.status IS NULL OR OLD.status != 'Completed') THEN
    INSERT INTO daily_revenue (
      date,
      total_revenue_inr,
      services_completed,
      service_revenue_inr
    )
    VALUES (
      CURRENT_DATE,
      NEW.estimated_cost_inr,
      1,
      NEW.estimated_cost_inr
    )
    ON CONFLICT (date) DO UPDATE SET
      total_revenue_inr = daily_revenue.total_revenue_inr + NEW.estimated_cost_inr,
      services_completed = daily_revenue.services_completed + 1,
      service_revenue_inr = daily_revenue.service_revenue_inr + NEW.estimated_cost_inr,
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for revenue updates
CREATE TRIGGER trigger_update_daily_revenue
AFTER UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION update_daily_revenue_from_appointments();
