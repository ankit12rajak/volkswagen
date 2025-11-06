-- Analytics Schema Extension for Support Dashboard
-- Run this after support-dashboard-schema.sql and support-tickets-schema-extension.sql

-- ============================================
-- ANALYTICS FUNCTIONS
-- ============================================

-- Function to get KPI stats
CREATE OR REPLACE FUNCTION get_analytics_kpi_stats()
RETURNS TABLE (
  monthly_revenue_inr BIGINT,
  services_completed BIGINT,
  customer_satisfaction_avg DECIMAL,
  ai_call_success_rate DECIMAL,
  avg_response_time_hours DECIMAL,
  active_staff BIGINT,
  total_staff BIGINT,
  service_bay_utilization DECIMAL,
  repeat_customers_percentage DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    -- Monthly revenue (last 30 days)
    COALESCE(SUM(dr.total_revenue_inr), 0)::BIGINT as monthly_revenue_inr,
    
    -- Services completed (last 30 days)
    COALESCE(SUM(dr.services_completed), 0)::BIGINT as services_completed,
    
    -- Customer satisfaction average
    COALESCE(AVG(dds.customer_satisfaction_avg), 0)::DECIMAL as customer_satisfaction_avg,
    
    -- AI call success rate (completed / total)
    CASE 
      WHEN COUNT(avc.id) > 0 THEN 
        (COUNT(*) FILTER (WHERE avc.status = 'Completed')::DECIMAL / COUNT(avc.id)::DECIMAL * 100)
      ELSE 0 
    END as ai_call_success_rate,
    
    -- Average response time
    COALESCE(AVG(dds.avg_response_time_hours), 0)::DECIMAL as avg_response_time_hours,
    
    -- Active staff today
    COUNT(DISTINCT sa.staff_id) FILTER (WHERE sa.date = CURRENT_DATE AND sa.status = 'Present')::BIGINT as active_staff,
    
    -- Total staff
    COUNT(DISTINCT sa.staff_id)::BIGINT as total_staff,
    
    -- Service bay utilization
    CASE 
      WHEN COUNT(sb.id) > 0 THEN 
        (COUNT(*) FILTER (WHERE sb.status = 'Occupied')::DECIMAL / COUNT(sb.id)::DECIMAL * 100)
      ELSE 0 
    END as service_bay_utilization,
    
    -- Repeat customers (placeholder - would need customer history table)
    68.0::DECIMAL as repeat_customers_percentage
    
  FROM daily_revenue dr
  CROSS JOIN dealership_daily_stats dds
  CROSS JOIN ai_voice_calls avc
  CROSS JOIN staff_attendance sa
  CROSS JOIN service_bays sb
  WHERE dr.date >= CURRENT_DATE - INTERVAL '30 days'
    AND dds.date >= CURRENT_DATE - INTERVAL '30 days'
    AND avc.created_at >= CURRENT_DATE - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Function to get weekly revenue trend
CREATE OR REPLACE FUNCTION get_weekly_revenue_trend()
RETURNS TABLE (
  week_label TEXT,
  revenue_inr BIGINT,
  services_completed BIGINT,
  satisfaction_avg DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'Week ' || (4 - (CURRENT_DATE - dr.date)::INTEGER / 7)::TEXT as week_label,
    COALESCE(SUM(dr.total_revenue_inr), 0)::BIGINT as revenue_inr,
    COALESCE(SUM(dr.services_completed), 0)::BIGINT as services_completed,
    COALESCE(AVG(dds.customer_satisfaction_avg), 0)::DECIMAL as satisfaction_avg
  FROM daily_revenue dr
  LEFT JOIN dealership_daily_stats dds ON dr.date = dds.date
  WHERE dr.date >= CURRENT_DATE - INTERVAL '28 days'
  GROUP BY (CURRENT_DATE - dr.date)::INTEGER / 7
  ORDER BY (CURRENT_DATE - dr.date)::INTEGER / 7 DESC
  LIMIT 4;
END;
$$ LANGUAGE plpgsql;

-- Function to get use case distribution
CREATE OR REPLACE FUNCTION get_use_case_distribution()
RETURNS TABLE (
  use_case TEXT,
  case_count BIGINT,
  percentage DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  WITH case_counts AS (
    SELECT 
      sc.use_case,
      COUNT(*)::BIGINT as case_count
    FROM support_cases sc
    WHERE sc.created_at >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY sc.use_case
  ),
  total_count AS (
    SELECT SUM(case_count) as total FROM case_counts
  )
  SELECT 
    cc.use_case,
    cc.case_count,
    CASE 
      WHEN tc.total > 0 THEN (cc.case_count::DECIMAL / tc.total::DECIMAL * 100)
      ELSE 0 
    END as percentage
  FROM case_counts cc
  CROSS JOIN total_count tc
  ORDER BY cc.case_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get language distribution
CREATE OR REPLACE FUNCTION get_language_distribution()
RETURNS TABLE (
  language TEXT,
  call_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(sc.language, 'English') as language,
    COUNT(*)::BIGINT as call_count
  FROM support_cases sc
  WHERE sc.created_at >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY sc.language
  ORDER BY call_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get daily AI call volume by use case
CREATE OR REPLACE FUNCTION get_daily_ai_call_volume()
RETURNS TABLE (
  day_name TEXT,
  cost_breakdown BIGINT,
  predictive BIGINT,
  general BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TO_CHAR(date_series, 'Dy') as day_name,
    COUNT(*) FILTER (WHERE sc.use_case = 'Cost Breakdown')::BIGINT as cost_breakdown,
    COUNT(*) FILTER (WHERE sc.use_case = 'Predictive Maintenance')::BIGINT as predictive,
    COUNT(*) FILTER (WHERE sc.use_case = 'General Service')::BIGINT as general
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

-- Function to get service completion time by type
CREATE OR REPLACE FUNCTION get_service_completion_times()
RETURNS TABLE (
  service_type TEXT,
  avg_time_minutes INTEGER,
  target_time_minutes INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.service_type,
    -- Placeholder: would calculate from actual completion times
    CASE a.service_type
      WHEN 'Oil Change' THEN 45
      WHEN 'Brake Service' THEN 90
      WHEN 'AC Repair' THEN 150
      WHEN 'Transmission' THEN 240
      WHEN 'Engine Diagnostic' THEN 120
      WHEN 'Tire Service' THEN 30
      ELSE 60
    END as avg_time_minutes,
    CASE a.service_type
      WHEN 'Oil Change' THEN 60
      WHEN 'Brake Service' THEN 120
      WHEN 'AC Repair' THEN 180
      WHEN 'Transmission' THEN 300
      WHEN 'Engine Diagnostic' THEN 150
      WHEN 'Tire Service' THEN 45
      ELSE 90
    END as target_time_minutes
  FROM (
    SELECT DISTINCT service_type 
    FROM appointments 
    WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
    LIMIT 6
  ) a;
END;
$$ LANGUAGE plpgsql;

-- Function to get top services by revenue
CREATE OR REPLACE FUNCTION get_top_services_by_revenue()
RETURNS TABLE (
  service_type TEXT,
  service_count BIGINT,
  total_revenue_inr BIGINT,
  trend TEXT,
  change_percentage DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  WITH current_period AS (
    SELECT 
      a.service_type,
      COUNT(*)::BIGINT as service_count,
      COALESCE(SUM(a.estimated_cost_inr), 0)::BIGINT as total_revenue_inr
    FROM appointments a
    WHERE a.status = 'Completed'
      AND a.created_at >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY a.service_type
  ),
  previous_period AS (
    SELECT 
      a.service_type,
      COALESCE(SUM(a.estimated_cost_inr), 0)::BIGINT as prev_revenue
    FROM appointments a
    WHERE a.status = 'Completed'
      AND a.created_at >= CURRENT_DATE - INTERVAL '60 days'
      AND a.created_at < CURRENT_DATE - INTERVAL '30 days'
    GROUP BY a.service_type
  )
  SELECT 
    cp.service_type,
    cp.service_count,
    cp.total_revenue_inr,
    CASE 
      WHEN pp.prev_revenue IS NULL OR pp.prev_revenue = 0 THEN 'up'
      WHEN cp.total_revenue_inr > pp.prev_revenue THEN 'up'
      WHEN cp.total_revenue_inr < pp.prev_revenue THEN 'down'
      ELSE 'neutral'
    END as trend,
    CASE 
      WHEN pp.prev_revenue IS NULL OR pp.prev_revenue = 0 THEN 0::DECIMAL
      ELSE ((cp.total_revenue_inr - pp.prev_revenue)::DECIMAL / pp.prev_revenue::DECIMAL * 100)
    END as change_percentage
  FROM current_period cp
  LEFT JOIN previous_period pp ON cp.service_type = pp.service_type
  ORDER BY cp.total_revenue_inr DESC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql;

-- Function to get customer approval rates by cost range
CREATE OR REPLACE FUNCTION get_approval_rates_by_cost_range()
RETURNS TABLE (
  cost_range TEXT,
  approved_percentage INTEGER,
  declined_percentage INTEGER
) AS $$
BEGIN
  RETURN QUERY
  WITH cost_ranges AS (
    SELECT 
      CASE 
        WHEN sc.total_cost_inr < 5000 THEN '< ₹5,000'
        WHEN sc.total_cost_inr >= 5000 AND sc.total_cost_inr < 10000 THEN '₹5,000-₹10,000'
        WHEN sc.total_cost_inr >= 10000 AND sc.total_cost_inr < 20000 THEN '₹10,000-₹20,000'
        WHEN sc.total_cost_inr >= 20000 AND sc.total_cost_inr < 30000 THEN '₹20,000-₹30,000'
        ELSE '> ₹30,000'
      END as cost_range,
      CASE 
        WHEN sc.status IN ('Approved', 'Completed') THEN 1 
        ELSE 0 
      END as is_approved,
      CASE 
        WHEN sc.status IN ('Customer Declined', 'Cancelled') THEN 1 
        ELSE 0 
      END as is_declined
    FROM support_cases sc
    WHERE sc.use_case = 'Cost Breakdown'
      AND sc.created_at >= CURRENT_DATE - INTERVAL '30 days'
  )
  SELECT 
    cr.cost_range,
    CASE 
      WHEN COUNT(*) > 0 THEN (SUM(cr.is_approved)::DECIMAL / COUNT(*)::DECIMAL * 100)::INTEGER
      ELSE 0 
    END as approved_percentage,
    CASE 
      WHEN COUNT(*) > 0 THEN (SUM(cr.is_declined)::DECIMAL / COUNT(*)::DECIMAL * 100)::INTEGER
      ELSE 0 
    END as declined_percentage
  FROM cost_ranges cr
  GROUP BY cr.cost_range
  ORDER BY 
    CASE cr.cost_range
      WHEN '< ₹5,000' THEN 1
      WHEN '₹5,000-₹10,000' THEN 2
      WHEN '₹10,000-₹20,000' THEN 3
      WHEN '₹20,000-₹30,000' THEN 4
      ELSE 5
    END;
END;
$$ LANGUAGE plpgsql;

-- Function to get peak hours analysis
CREATE OR REPLACE FUNCTION get_peak_hours_analysis()
RETURNS TABLE (
  hour_label TEXT,
  call_count BIGINT,
  appointment_count BIGINT,
  estimated_revenue_inr BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TO_CHAR(EXTRACT(HOUR FROM sc.created_at), 'FM00') || ' ' || 
    CASE 
      WHEN EXTRACT(HOUR FROM sc.created_at) < 12 THEN 'AM'
      ELSE 'PM'
    END as hour_label,
    COUNT(sc.id)::BIGINT as call_count,
    COUNT(a.id)::BIGINT as appointment_count,
    COALESCE(SUM(sc.estimated_cost_inr), 0)::BIGINT as estimated_revenue_inr
  FROM support_cases sc
  LEFT JOIN appointments a ON DATE(a.created_at) = DATE(sc.created_at) 
    AND EXTRACT(HOUR FROM a.created_at) = EXTRACT(HOUR FROM sc.created_at)
  WHERE sc.created_at >= CURRENT_DATE - INTERVAL '7 days'
    AND EXTRACT(HOUR FROM sc.created_at) BETWEEN 8 AND 17
  GROUP BY EXTRACT(HOUR FROM sc.created_at)
  ORDER BY EXTRACT(HOUR FROM sc.created_at);
END;
$$ LANGUAGE plpgsql;

-- Function to get staff performance metrics (placeholder with sample data)
CREATE OR REPLACE FUNCTION get_staff_performance_metrics()
RETURNS TABLE (
  metric_name TEXT,
  target_value INTEGER,
  current_value INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM (VALUES
    ('Efficiency', 85, 89),
    ('Quality', 90, 92),
    ('Customer Service', 85, 88),
    ('Punctuality', 95, 94),
    ('Technical Skills', 80, 87)
  ) AS metrics(metric_name, target_value, current_value);
END;
$$ LANGUAGE plpgsql;

-- Sample data removed - analytics will be populated by actual operations
