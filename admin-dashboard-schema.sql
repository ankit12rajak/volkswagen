-- Admin Dashboard Database Schema
-- This schema tracks all metrics displayed in the admin dashboard

-- ============================================
-- 1. CALL RECORDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS call_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'Service Booking', 
    'Technical Support', 
    'Warranty Inquiry', 
    'Parts Information', 
    'Billing Questions', 
    'General Inquiry'
  )),
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  agent_type TEXT NOT NULL CHECK (agent_type IN ('AI', 'Human')),
  agent_id TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  sentiment TEXT CHECK (sentiment IN ('Positive', 'Neutral', 'Negative')),
  status TEXT NOT NULL CHECK (status IN ('Resolved', 'Escalated', 'Pending', 'Failed')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  resolution_time_seconds INTEGER,
  escalated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. DAILY STATISTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS daily_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  total_calls INTEGER DEFAULT 0,
  resolved_calls INTEGER DEFAULT 0,
  escalated_calls INTEGER DEFAULT 0,
  failed_calls INTEGER DEFAULT 0,
  total_duration_seconds INTEGER DEFAULT 0,
  avg_handle_time_seconds INTEGER DEFAULT 0,
  ai_calls INTEGER DEFAULT 0,
  human_calls INTEGER DEFAULT 0,
  total_rating_sum INTEGER DEFAULT 0,
  total_ratings_count INTEGER DEFAULT 0,
  avg_rating DECIMAL(3,2) DEFAULT 0,
  resolution_rate DECIMAL(5,2) DEFAULT 0,
  first_call_resolution INTEGER DEFAULT 0,
  cost_savings_euros DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. HOURLY CALL VOLUME TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS hourly_call_volume (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  hour INTEGER NOT NULL CHECK (hour >= 0 AND hour <= 23),
  total_calls INTEGER DEFAULT 0,
  resolved_calls INTEGER DEFAULT 0,
  escalated_calls INTEGER DEFAULT 0,
  avg_duration_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, hour)
);

-- ============================================
-- 4. AGENT PERFORMANCE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS agent_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  agent_type TEXT NOT NULL CHECK (agent_type IN ('AI', 'Human')),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_calls INTEGER DEFAULT 0,
  resolved_calls INTEGER DEFAULT 0,
  escalated_calls INTEGER DEFAULT 0,
  total_duration_seconds INTEGER DEFAULT 0,
  avg_handle_time_seconds INTEGER DEFAULT 0,
  total_rating_sum INTEGER DEFAULT 0,
  total_ratings_count INTEGER DEFAULT 0,
  avg_rating DECIMAL(3,2) DEFAULT 0,
  resolution_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agent_id, date)
);

-- ============================================
-- 5. CATEGORY STATISTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS category_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  total_calls INTEGER DEFAULT 0,
  resolved_calls INTEGER DEFAULT 0,
  avg_duration_seconds INTEGER DEFAULT 0,
  avg_rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, category)
);

-- ============================================
-- 6. AI PERFORMANCE METRICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  voice_recognition_accuracy DECIMAL(5,2) DEFAULT 0,
  sentiment_accuracy DECIMAL(5,2) DEFAULT 0,
  intent_classification_accuracy DECIMAL(5,2) DEFAULT 0,
  response_quality_score DECIMAL(5,2) DEFAULT 0,
  context_understanding_score DECIMAL(5,2) DEFAULT 0,
  language_processing_score DECIMAL(5,2) DEFAULT 0,
  overall_health_score DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date)
);

-- ============================================
-- 7. COST ANALYSIS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS cost_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month DATE NOT NULL,
  ai_cost_euros DECIMAL(10,2) DEFAULT 0,
  human_cost_euros DECIMAL(10,2) DEFAULT 0,
  total_savings_euros DECIMAL(10,2) DEFAULT 0,
  roi_percentage DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(month)
);

-- ============================================
-- 8. SYSTEM ALERTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS system_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type TEXT NOT NULL CHECK (alert_type IN ('warning', 'success', 'info', 'error')),
  message TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_call_records_created_at ON call_records(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_call_records_agent_id ON call_records(agent_id);
CREATE INDEX IF NOT EXISTS idx_call_records_category ON call_records(category);
CREATE INDEX IF NOT EXISTS idx_call_records_status ON call_records(status);
CREATE INDEX IF NOT EXISTS idx_daily_statistics_date ON daily_statistics(date DESC);
CREATE INDEX IF NOT EXISTS idx_hourly_call_volume_date_hour ON hourly_call_volume(date, hour);
CREATE INDEX IF NOT EXISTS idx_agent_performance_date ON agent_performance(date DESC);
CREATE INDEX IF NOT EXISTS idx_agent_performance_agent_id ON agent_performance(agent_id);
CREATE INDEX IF NOT EXISTS idx_category_statistics_date ON category_statistics(date DESC);
CREATE INDEX IF NOT EXISTS idx_system_alerts_created_at ON system_alerts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_alerts_is_read ON system_alerts(is_read);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE call_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE hourly_call_volume ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_alerts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users (admin) full access to all tables
CREATE POLICY "Admin full access to call_records" ON call_records
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to daily_statistics" ON daily_statistics
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to hourly_call_volume" ON hourly_call_volume
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to agent_performance" ON agent_performance
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to category_statistics" ON category_statistics
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to ai_performance_metrics" ON ai_performance_metrics
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to cost_analysis" ON cost_analysis
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to system_alerts" ON system_alerts
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anon role to read data (for public dashboards if needed)
CREATE POLICY "Anon read access to call_records" ON call_records
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Anon read access to daily_statistics" ON daily_statistics
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Anon read access to hourly_call_volume" ON hourly_call_volume
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Anon read access to agent_performance" ON agent_performance
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Anon read access to category_statistics" ON category_statistics
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Anon read access to ai_performance_metrics" ON ai_performance_metrics
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Anon read access to cost_analysis" ON cost_analysis
  FOR SELECT 
  TO anon
  USING (true);

CREATE POLICY "Anon read access to system_alerts" ON system_alerts
  FOR SELECT 
  TO anon
  USING (true);

-- ============================================
-- FUNCTIONS FOR AUTOMATIC UPDATES
-- ============================================

-- Function to update daily statistics
CREATE OR REPLACE FUNCTION update_daily_statistics()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO daily_statistics (
    date,
    total_calls,
    resolved_calls,
    escalated_calls,
    total_duration_seconds,
    ai_calls,
    human_calls,
    total_rating_sum,
    total_ratings_count
  )
  VALUES (
    CURRENT_DATE,
    1,
    CASE WHEN NEW.status = 'Resolved' THEN 1 ELSE 0 END,
    CASE WHEN NEW.escalated = TRUE THEN 1 ELSE 0 END,
    NEW.duration_seconds,
    CASE WHEN NEW.agent_type = 'AI' THEN 1 ELSE 0 END,
    CASE WHEN NEW.agent_type = 'Human' THEN 1 ELSE 0 END,
    COALESCE(NEW.rating, 0),
    CASE WHEN NEW.rating IS NOT NULL THEN 1 ELSE 0 END
  )
  ON CONFLICT (date) DO UPDATE SET
    total_calls = daily_statistics.total_calls + 1,
    resolved_calls = daily_statistics.resolved_calls + CASE WHEN NEW.status = 'Resolved' THEN 1 ELSE 0 END,
    escalated_calls = daily_statistics.escalated_calls + CASE WHEN NEW.escalated = TRUE THEN 1 ELSE 0 END,
    total_duration_seconds = daily_statistics.total_duration_seconds + NEW.duration_seconds,
    ai_calls = daily_statistics.ai_calls + CASE WHEN NEW.agent_type = 'AI' THEN 1 ELSE 0 END,
    human_calls = daily_statistics.human_calls + CASE WHEN NEW.agent_type = 'Human' THEN 1 ELSE 0 END,
    total_rating_sum = daily_statistics.total_rating_sum + COALESCE(NEW.rating, 0),
    total_ratings_count = daily_statistics.total_ratings_count + CASE WHEN NEW.rating IS NOT NULL THEN 1 ELSE 0 END,
    avg_rating = CASE 
      WHEN (daily_statistics.total_ratings_count + CASE WHEN NEW.rating IS NOT NULL THEN 1 ELSE 0 END) > 0 
      THEN (daily_statistics.total_rating_sum + COALESCE(NEW.rating, 0))::DECIMAL / (daily_statistics.total_ratings_count + CASE WHEN NEW.rating IS NOT NULL THEN 1 ELSE 0 END)
      ELSE 0 
    END,
    avg_handle_time_seconds = (daily_statistics.total_duration_seconds + NEW.duration_seconds) / (daily_statistics.total_calls + 1),
    resolution_rate = CASE 
      WHEN (daily_statistics.total_calls + 1) > 0 
      THEN ((daily_statistics.resolved_calls + CASE WHEN NEW.status = 'Resolved' THEN 1 ELSE 0 END)::DECIMAL / (daily_statistics.total_calls + 1)) * 100
      ELSE 0 
    END,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update daily statistics
CREATE TRIGGER trigger_update_daily_statistics
AFTER INSERT ON call_records
FOR EACH ROW
EXECUTE FUNCTION update_daily_statistics();

-- Function to update hourly call volume
CREATE OR REPLACE FUNCTION update_hourly_call_volume()
RETURNS TRIGGER AS $$
DECLARE
  call_hour INTEGER;
BEGIN
  call_hour := EXTRACT(HOUR FROM NEW.created_at);
  
  INSERT INTO hourly_call_volume (
    date,
    hour,
    total_calls,
    resolved_calls,
    escalated_calls,
    avg_duration_seconds
  )
  VALUES (
    CURRENT_DATE,
    call_hour,
    1,
    CASE WHEN NEW.status = 'Resolved' THEN 1 ELSE 0 END,
    CASE WHEN NEW.escalated = TRUE THEN 1 ELSE 0 END,
    NEW.duration_seconds
  )
  ON CONFLICT (date, hour) DO UPDATE SET
    total_calls = hourly_call_volume.total_calls + 1,
    resolved_calls = hourly_call_volume.resolved_calls + CASE WHEN NEW.status = 'Resolved' THEN 1 ELSE 0 END,
    escalated_calls = hourly_call_volume.escalated_calls + CASE WHEN NEW.escalated = TRUE THEN 1 ELSE 0 END,
    avg_duration_seconds = ((hourly_call_volume.avg_duration_seconds * hourly_call_volume.total_calls) + NEW.duration_seconds) / (hourly_call_volume.total_calls + 1),
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update hourly call volume
CREATE TRIGGER trigger_update_hourly_call_volume
AFTER INSERT ON call_records
FOR EACH ROW
EXECUTE FUNCTION update_hourly_call_volume();

-- Function to update agent performance
CREATE OR REPLACE FUNCTION update_agent_performance()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO agent_performance (
    agent_id,
    agent_name,
    agent_type,
    date,
    total_calls,
    resolved_calls,
    escalated_calls,
    total_duration_seconds,
    total_rating_sum,
    total_ratings_count
  )
  VALUES (
    NEW.agent_id,
    NEW.agent_name,
    NEW.agent_type,
    CURRENT_DATE,
    1,
    CASE WHEN NEW.status = 'Resolved' THEN 1 ELSE 0 END,
    CASE WHEN NEW.escalated = TRUE THEN 1 ELSE 0 END,
    NEW.duration_seconds,
    COALESCE(NEW.rating, 0),
    CASE WHEN NEW.rating IS NOT NULL THEN 1 ELSE 0 END
  )
  ON CONFLICT (agent_id, date) DO UPDATE SET
    total_calls = agent_performance.total_calls + 1,
    resolved_calls = agent_performance.resolved_calls + CASE WHEN NEW.status = 'Resolved' THEN 1 ELSE 0 END,
    escalated_calls = agent_performance.escalated_calls + CASE WHEN NEW.escalated = TRUE THEN 1 ELSE 0 END,
    total_duration_seconds = agent_performance.total_duration_seconds + NEW.duration_seconds,
    total_rating_sum = agent_performance.total_rating_sum + COALESCE(NEW.rating, 0),
    total_ratings_count = agent_performance.total_ratings_count + CASE WHEN NEW.rating IS NOT NULL THEN 1 ELSE 0 END,
    avg_rating = CASE 
      WHEN (agent_performance.total_ratings_count + CASE WHEN NEW.rating IS NOT NULL THEN 1 ELSE 0 END) > 0 
      THEN (agent_performance.total_rating_sum + COALESCE(NEW.rating, 0))::DECIMAL / (agent_performance.total_ratings_count + CASE WHEN NEW.rating IS NOT NULL THEN 1 ELSE 0 END)
      ELSE 0 
    END,
    avg_handle_time_seconds = (agent_performance.total_duration_seconds + NEW.duration_seconds) / (agent_performance.total_calls + 1),
    resolution_rate = CASE 
      WHEN (agent_performance.total_calls + 1) > 0 
      THEN ((agent_performance.resolved_calls + CASE WHEN NEW.status = 'Resolved' THEN 1 ELSE 0 END)::DECIMAL / (agent_performance.total_calls + 1)) * 100
      ELSE 0 
    END,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update agent performance
CREATE TRIGGER trigger_update_agent_performance
AFTER INSERT ON call_records
FOR EACH ROW
EXECUTE FUNCTION update_agent_performance();

-- Function to update category statistics
CREATE OR REPLACE FUNCTION update_category_statistics()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO category_statistics (
    date,
    category,
    total_calls,
    resolved_calls,
    avg_duration_seconds
  )
  VALUES (
    CURRENT_DATE,
    NEW.category,
    1,
    CASE WHEN NEW.status = 'Resolved' THEN 1 ELSE 0 END,
    NEW.duration_seconds
  )
  ON CONFLICT (date, category) DO UPDATE SET
    total_calls = category_statistics.total_calls + 1,
    resolved_calls = category_statistics.resolved_calls + CASE WHEN NEW.status = 'Resolved' THEN 1 ELSE 0 END,
    avg_duration_seconds = ((category_statistics.avg_duration_seconds * category_statistics.total_calls) + NEW.duration_seconds) / (category_statistics.total_calls + 1),
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update category statistics
CREATE TRIGGER trigger_update_category_statistics
AFTER INSERT ON call_records
FOR EACH ROW
EXECUTE FUNCTION update_category_statistics();

-- ============================================
-- INITIAL DATA (All zeros as requested)
-- ============================================

-- Initialize today's statistics with zeros
INSERT INTO daily_statistics (
  date,
  total_calls,
  resolved_calls,
  escalated_calls,
  failed_calls,
  total_duration_seconds,
  avg_handle_time_seconds,
  ai_calls,
  human_calls,
  total_rating_sum,
  total_ratings_count,
  avg_rating,
  resolution_rate,
  first_call_resolution,
  cost_savings_euros
) VALUES (
  CURRENT_DATE,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
) ON CONFLICT (date) DO NOTHING;

-- Initialize AI performance metrics with zeros
INSERT INTO ai_performance_metrics (
  date,
  voice_recognition_accuracy,
  sentiment_accuracy,
  intent_classification_accuracy,
  response_quality_score,
  context_understanding_score,
  language_processing_score,
  overall_health_score
) VALUES (
  CURRENT_DATE,
  0, 0, 0, 0, 0, 0, 0
) ON CONFLICT (date) DO NOTHING;

-- Initialize category statistics with zeros for all categories
INSERT INTO category_statistics (date, category, total_calls, resolved_calls, avg_duration_seconds)
VALUES 
  (CURRENT_DATE, 'Service Booking', 0, 0, 0),
  (CURRENT_DATE, 'Technical Support', 0, 0, 0),
  (CURRENT_DATE, 'Warranty Inquiry', 0, 0, 0),
  (CURRENT_DATE, 'Parts Information', 0, 0, 0),
  (CURRENT_DATE, 'Billing Questions', 0, 0, 0),
  (CURRENT_DATE, 'General Inquiry', 0, 0, 0)
ON CONFLICT (date, category) DO NOTHING;

-- Initialize hourly call volume with zeros for all hours
INSERT INTO hourly_call_volume (date, hour, total_calls, resolved_calls, escalated_calls, avg_duration_seconds)
SELECT CURRENT_DATE, generate_series(0, 23), 0, 0, 0, 0
ON CONFLICT (date, hour) DO NOTHING;
