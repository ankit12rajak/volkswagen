-- Sample Data for Support Dashboard
-- Run this after setting up the schema to populate the dashboard with test data

-- ============================================
-- 1. ADD SAMPLE SUPPORT CASES
-- ============================================

INSERT INTO support_cases (
  case_id, customer_name, customer_phone, vin, issue, 
  priority, status, use_case, category, estimated_cost_inr
) VALUES 
  (
    'CASE-2045', 'Suresh Reddy', '+91 98765 43210', 'WVWZZZ1JZ3W386756',
    'Additional work approval needed - Brake pad replacement',
    'High', 'Pending Approval', 'Cost Breakdown', 'Cost Approval', 12500
  ),
  (
    'CASE-2044', 'Deepika Singh', '+91 98765 43211', 'WVWZZZ1JZ3W386757',
    'Brake pad wear detected - Urgent service needed',
    'Critical', 'Appointment Booked', 'Predictive Maintenance', 'Preventive Service', 8200
  ),
  (
    'CASE-2043', 'Vikram Joshi', '+91 98765 43212', 'WVWZZZ1JZ3W386758',
    'Timing belt replacement due - Customer declined',
    'High', 'Follow-up Required', 'Predictive Maintenance', 'Preventive Service', 15400
  ),
  (
    'CASE-2042', 'Kavita Nair', '+91 98765 43213', 'WVWZZZ1JZ3W386759',
    'Routine service completed successfully',
    'Low', 'Completed', 'General Service', 'Service', 3500
  ),
  (
    'CASE-2041', 'Amit Agarwal', '+91 98765 43214', 'WVWZZZ1JZ3W386760',
    'Service appointment confirmed for tomorrow',
    'Medium', 'Scheduled', 'General Service', 'Appointment', 5800
  );

-- ============================================
-- 2. ADD SAMPLE AI VOICE CALLS
-- ============================================

INSERT INTO ai_voice_calls (
  call_id, customer_name, customer_phone, vin, topic,
  use_case, sentiment, duration_seconds, ai_confidence,
  priority, language, status, is_active
) VALUES 
  (
    'AI-1034', 'Rajesh Sharma', '+91 98765 43220', 'WVWZZZ1JZ3W386752',
    'Cost breakdown approval - Brake pad replacement',
    'Cost Breakdown', 'Positive', 135, 94, 'High', 'Hindi', 'Awaiting Approval', true
  ),
  (
    'AI-1033', 'Priya Mehta', '+91 98765 43221', 'WVWZZZ1JZ3W386753',
    'Predictive maintenance alert - Oil change due',
    'Predictive Maintenance', 'Neutral', 105, 91, 'Medium', 'English', 'Scheduling', true
  ),
  (
    'AI-1032', 'Mohammed Ali', '+91 98765 43222', 'WVWZZZ1JZ3W386754',
    'General inquiry - Service history',
    'General Service', 'Positive', 200, 88, 'Normal', 'Urdu', 'In Progress', true
  ),
  (
    'AI-1031', 'Anita Desai', '+91 98765 43223', 'WVWZZZ1JZ3W386755',
    'Additional work approval - Timing belt',
    'Cost Breakdown', 'Neutral', 250, 85, 'High', 'Gujarati', 'Customer Reviewing', true
  );

-- ============================================
-- 3. ADD SAMPLE APPOINTMENTS
-- ============================================

INSERT INTO appointments (
  appointment_id, customer_name, customer_phone, vin,
  appointment_date, appointment_time, service_type,
  status, estimated_cost_inr, service_bay_id
) VALUES 
  (
    'APT-1001', 'Ravi Kumar', '+91 98765 43230', 'WVWZZZ1JZ3W386761',
    CURRENT_DATE, '09:00:00', 'Regular Service',
    'Pending Arrival', 4500, NULL
  ),
  (
    'APT-1002', 'Sneha Patel', '+91 98765 43231', 'WVWZZZ1JZ3W386762',
    CURRENT_DATE, '10:30:00', 'Brake Service',
    'Pending Arrival', 8200, NULL
  ),
  (
    'APT-1003', 'Arjun Reddy', '+91 98765 43232', 'WVWZZZ1JZ3W386763',
    CURRENT_DATE, '11:00:00', 'Oil Change',
    'In Progress', 2500, 'BAY-01'
  ),
  (
    'APT-1004', 'Meera Shah', '+91 98765 43233', 'WVWZZZ1JZ3W386764',
    CURRENT_DATE, '14:00:00', 'Tire Rotation',
    'Confirmed', 3000, NULL
  ),
  (
    'APT-1005', 'Karthik Iyer', '+91 98765 43234', 'WVWZZZ1JZ3W386765',
    CURRENT_DATE, '15:30:00', 'Full Service',
    'Pending Arrival', 12000, NULL
  );

-- ============================================
-- 4. UPDATE SERVICE BAYS STATUS
-- ============================================

UPDATE service_bays 
SET 
  status = 'Occupied',
  current_vehicle_vin = 'WVWZZZ1JZ3W386763',
  current_appointment_id = 'APT-1003'
WHERE bay_id = 'BAY-01';

UPDATE service_bays 
SET 
  status = 'Occupied',
  current_vehicle_vin = 'WVWZZZ1JZ3W386766',
  current_appointment_id = 'APT-1006'
WHERE bay_id = 'BAY-02';

UPDATE service_bays 
SET 
  status = 'Occupied',
  current_vehicle_vin = 'WVWZZZ1JZ3W386767',
  current_appointment_id = 'APT-1007'
WHERE bay_id = 'BAY-03';

-- ============================================
-- 5. ADD STAFF ATTENDANCE
-- ============================================

INSERT INTO staff_attendance (
  staff_id, staff_name, date, status, role
) VALUES 
  ('STAFF-001', 'Rajesh Kumar', CURRENT_DATE, 'Present', 'Service Advisor'),
  ('STAFF-002', 'Priya Sharma', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-003', 'Amit Patel', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-004', 'Sunita Reddy', CURRENT_DATE, 'Present', 'Service Advisor'),
  ('STAFF-005', 'Vijay Singh', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-006', 'Lakshmi Nair', CURRENT_DATE, 'Present', 'Parts Manager'),
  ('STAFF-007', 'Arun Gupta', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-008', 'Divya Menon', CURRENT_DATE, 'Present', 'Service Advisor'),
  ('STAFF-009', 'Sanjay Verma', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-010', 'Pooja Desai', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-011', 'Rahul Joshi', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-012', 'Neha Kapoor', CURRENT_DATE, 'Present', 'Service Advisor'),
  ('STAFF-013', 'Manoj Kumar', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-014', 'Anjali Rao', CURRENT_DATE, 'Present', 'Parts Specialist'),
  ('STAFF-015', 'Suresh Babu', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-016', 'Kavita Singh', CURRENT_DATE, 'Present', 'Service Advisor'),
  ('STAFF-017', 'Deepak Sharma', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-018', 'Rekha Patel', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-019', 'Ashok Reddy', CURRENT_DATE, 'Absent', 'Technician'),
  ('STAFF-020', 'Swati Mehta', CURRENT_DATE, 'Absent', 'Service Advisor'),
  ('STAFF-021', 'Ramesh Iyer', CURRENT_DATE, 'Leave', 'Technician'),
  ('STAFF-022', 'Nisha Agarwal', CURRENT_DATE, 'Absent', 'Parts Specialist');

-- ============================================
-- 6. ADD PENDING APPROVALS
-- ============================================

INSERT INTO pending_approvals (
  approval_id, case_id, customer_name, approval_type,
  amount_inr, description, status
) VALUES 
  (
    'APPR-001', 'CASE-2045', 'Suresh Reddy', 'Cost Breakdown',
    12500, 'Brake pad replacement - Additional work discovered during service',
    'Pending'
  ),
  (
    'APPR-002', NULL, 'Vikram Joshi', 'Additional Work',
    15400, 'Timing belt replacement - Preventive maintenance recommendation',
    'Pending'
  ),
  (
    'APPR-003', NULL, 'Anita Desai', 'Cost Breakdown',
    8500, 'Suspension repair - Customer approval needed',
    'Pending'
  ),
  (
    'APPR-004', NULL, 'Ravi Kumar', 'Discount Request',
    500, 'Loyalty discount for regular customer',
    'Pending'
  ),
  (
    'APPR-005', NULL, 'Meera Shah', 'Warranty Claim',
    3200, 'Battery replacement under warranty',
    'Pending'
  );

-- ============================================
-- 7. ADD COMPLETED APPOINTMENTS FOR REVENUE
-- ============================================

-- Add some completed appointments to generate revenue
INSERT INTO appointments (
  appointment_id, customer_name, customer_phone, vin,
  appointment_date, appointment_time, service_type,
  status, estimated_cost_inr, service_bay_id
) VALUES 
  (
    'APT-0901', 'Completed Customer 1', '+91 98765 43240', 'WVWZZZ1JZ3W386770',
    CURRENT_DATE, '08:00:00', 'Regular Service',
    'Completed', 4500, NULL
  ),
  (
    'APT-0902', 'Completed Customer 2', '+91 98765 43241', 'WVWZZZ1JZ3W386771',
    CURRENT_DATE, '08:30:00', 'Oil Change',
    'Completed', 2500, NULL
  ),
  (
    'APT-0903', 'Completed Customer 3', '+91 98765 43242', 'WVWZZZ1JZ3W386772',
    CURRENT_DATE, '09:30:00', 'Brake Service',
    'Completed', 8200, NULL
  );

-- ============================================
-- 8. ADD CALL RECORDS FOR USE CASE DISTRIBUTION
-- ============================================

INSERT INTO call_records (
  call_id, customer_name, customer_phone, category,
  duration_seconds, agent_type, agent_id, agent_name,
  sentiment, status, rating
) VALUES 
  ('CALL-001', 'Customer A', '+91 98765 43250', 'Service Booking', 120, 'AI', 'AI-AGENT-1', 'AI Agent 1', 'Positive', 'Resolved', 5),
  ('CALL-002', 'Customer B', '+91 98765 43251', 'Service Booking', 95, 'AI', 'AI-AGENT-1', 'AI Agent 1', 'Positive', 'Resolved', 5),
  ('CALL-003', 'Customer C', '+91 98765 43252', 'Technical Support', 180, 'AI', 'AI-AGENT-2', 'AI Agent 2', 'Neutral', 'Resolved', 4),
  ('CALL-004', 'Customer D', '+91 98765 43253', 'Service Booking', 110, 'AI', 'AI-AGENT-1', 'AI Agent 1', 'Positive', 'Resolved', 5),
  ('CALL-005', 'Customer E', '+91 98765 43254', 'General Inquiry', 85, 'AI', 'AI-AGENT-3', 'AI Agent 3', 'Positive', 'Resolved', 5),
  ('CALL-006', 'Customer F', '+91 98765 43255', 'Technical Support', 200, 'AI', 'AI-AGENT-2', 'AI Agent 2', 'Neutral', 'Resolved', 4),
  ('CALL-007', 'Customer G', '+91 98765 43256', 'Service Booking', 130, 'AI', 'AI-AGENT-1', 'AI Agent 1', 'Positive', 'Resolved', 5),
  ('CALL-008', 'Customer H', '+91 98765 43257', 'General Inquiry', 75, 'AI', 'AI-AGENT-3', 'AI Agent 3', 'Positive', 'Resolved', 5),
  ('CALL-009', 'Customer I', '+91 98765 43258', 'Service Booking', 140, 'AI', 'AI-AGENT-1', 'AI Agent 1', 'Positive', 'Resolved', 5),
  ('CALL-010', 'Customer J', '+91 98765 43259', 'Technical Support', 190, 'AI', 'AI-AGENT-2', 'AI Agent 2', 'Neutral', 'Resolved', 4);

-- ============================================
-- 9. ADD HOURLY CALL VOLUME DATA
-- ============================================

INSERT INTO hourly_call_volume (date, hour, total_calls, resolved_calls, escalated_calls, avg_duration_seconds)
VALUES 
  (CURRENT_DATE, 8, 5, 5, 0, 120),
  (CURRENT_DATE, 9, 8, 8, 0, 115),
  (CURRENT_DATE, 10, 12, 11, 1, 130),
  (CURRENT_DATE, 11, 15, 14, 1, 125),
  (CURRENT_DATE, 12, 10, 10, 0, 110),
  (CURRENT_DATE, 13, 8, 8, 0, 105),
  (CURRENT_DATE, 14, 11, 10, 1, 120),
  (CURRENT_DATE, 15, 9, 9, 0, 115);

-- ============================================
-- 10. ADD WEEKLY REVENUE DATA
-- ============================================

-- Add revenue for the last 5 days
INSERT INTO daily_revenue (date, total_revenue_inr, services_completed, parts_sold_revenue_inr, service_revenue_inr)
VALUES 
  (CURRENT_DATE - INTERVAL '4 days', 145000, 28, 45000, 100000),
  (CURRENT_DATE - INTERVAL '3 days', 162000, 32, 52000, 110000),
  (CURRENT_DATE - INTERVAL '2 days', 138000, 26, 38000, 100000),
  (CURRENT_DATE - INTERVAL '1 day', 175000, 35, 55000, 120000),
  (CURRENT_DATE, 15200, 3, 3200, 12000)
ON CONFLICT (date) DO UPDATE SET
  total_revenue_inr = EXCLUDED.total_revenue_inr,
  services_completed = EXCLUDED.services_completed,
  parts_sold_revenue_inr = EXCLUDED.parts_sold_revenue_inr,
  service_revenue_inr = EXCLUDED.service_revenue_inr;

-- ============================================
-- 11. UPDATE CUSTOMER SATISFACTION
-- ============================================

UPDATE dealership_daily_stats
SET 
  customer_satisfaction_avg = 4.8,
  customer_satisfaction_count = 47,
  avg_response_time_hours = 2.3
WHERE date = CURRENT_DATE;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check all data was inserted correctly
SELECT 'Support Cases' as table_name, COUNT(*) as count FROM support_cases
UNION ALL
SELECT 'AI Voice Calls', COUNT(*) FROM ai_voice_calls WHERE is_active = true
UNION ALL
SELECT 'Appointments', COUNT(*) FROM appointments WHERE appointment_date = CURRENT_DATE
UNION ALL
SELECT 'Service Bays Occupied', COUNT(*) FROM service_bays WHERE status = 'Occupied'
UNION ALL
SELECT 'Staff Present', COUNT(*) FROM staff_attendance WHERE date = CURRENT_DATE AND status = 'Present'
UNION ALL
SELECT 'Pending Approvals', COUNT(*) FROM pending_approvals WHERE status = 'Pending'
UNION ALL
SELECT 'Call Records', COUNT(*) FROM call_records WHERE DATE(created_at) = CURRENT_DATE;

-- Check today's stats
SELECT * FROM dealership_daily_stats WHERE date = CURRENT_DATE;

-- Check today's revenue
SELECT * FROM daily_revenue WHERE date = CURRENT_DATE;
