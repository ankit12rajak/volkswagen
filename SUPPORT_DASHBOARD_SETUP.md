# Support Dashboard Database Setup Guide

This guide explains how to set up the database tables for the Support Dashboard to display real-time data instead of dummy data.

## Overview

The Support Dashboard now fetches real data from Supabase database tables. All metrics start at zero and will update automatically as data is added to the system.

## Database Schema

### Tables Created

1. **support_cases** - Customer service cases and tickets
2. **ai_voice_calls** - Active AI voice assistant interactions
3. **appointments** - Service appointments
4. **service_bays** - Service bay availability tracking
5. **staff_attendance** - Daily staff attendance records
6. **daily_revenue** - Daily revenue tracking
7. **pending_approvals** - Pending approval requests
8. **dealership_daily_stats** - Aggregated daily statistics

### Related Tables (from Admin Dashboard)

The Support Dashboard also uses these existing tables:
- **call_records** - For use case distribution
- **hourly_call_volume** - For hourly activity charts

## Setup Instructions

### Step 1: Run the SQL Schema

Execute the SQL file to create all necessary tables:

```bash
# In your Supabase SQL Editor, run:
volkswagenfrontend/support-dashboard-schema.sql
```

Or use the Supabase CLI:

```bash
supabase db push
```

### Step 2: Verify Tables

Check that all tables were created successfully:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'support_cases',
  'ai_voice_calls',
  'appointments',
  'service_bays',
  'staff_attendance',
  'daily_revenue',
  'pending_approvals',
  'dealership_daily_stats'
);
```

### Step 3: Initial Data

The schema automatically initializes:
- Today's stats with zeros
- 10 service bays (all available)
- Empty tables ready for data

## Dashboard Metrics Explained

### Stats Cards

1. **Today's Appointments** - Count from `appointments` table for today
2. **AI Calls Handled** - Count from `dealership_daily_stats.ai_calls_handled`
3. **Customer Satisfaction** - Average from `dealership_daily_stats.customer_satisfaction_avg`
4. **Revenue Today** - Sum from `daily_revenue.total_revenue_inr`
5. **Active Staff** - Count of 'Present' status in `staff_attendance`
6. **Service Bays** - Count of 'Occupied' vs total in `service_bays`
7. **Avg Response Time** - From `dealership_daily_stats.avg_response_time_hours`
8. **Pending Approvals** - Count of 'Pending' status in `pending_approvals`

### Live AI Voice Calls

Displays active AI interactions from `ai_voice_calls` table where `is_active = true`.

Shows:
- Customer name, phone, VIN
- Topic and use case
- Sentiment analysis
- AI confidence score
- Language and status
- Call duration

### Support Cases Table

Recent cases from `support_cases` table, ordered by creation date.

Shows:
- Case ID and customer details
- Issue description
- Priority and status
- Use case category
- Estimated cost
- Time created

### Analytics Charts

1. **AI Activity (Hourly)** - From `hourly_call_volume` table
2. **Use Cases Distribution** - From `call_records` grouped by category
3. **Revenue & Services** - From `daily_revenue` for last 5 days
4. **Performance Radar** - Calculated from various metrics

## Adding Sample Data

### Add a Support Case

```sql
INSERT INTO support_cases (
  case_id,
  customer_name,
  customer_phone,
  vin,
  issue,
  priority,
  status,
  use_case,
  category,
  estimated_cost_inr
) VALUES (
  'CASE-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0'),
  'John Doe',
  '+91 98765 43210',
  'WVWZZZ1JZ3W386752',
  'Brake pad replacement needed',
  'High',
  'Pending Approval',
  'Cost Breakdown',
  'Service',
  12500
);
```

### Add an AI Voice Call

```sql
INSERT INTO ai_voice_calls (
  call_id,
  customer_name,
  customer_phone,
  vin,
  topic,
  use_case,
  sentiment,
  duration_seconds,
  ai_confidence,
  priority,
  language,
  status,
  is_active
) VALUES (
  'AI-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0'),
  'Jane Smith',
  '+91 98765 43211',
  'WVWZZZ1JZ3W386753',
  'Oil change service booking',
  'General Service',
  'Positive',
  135,
  92,
  'Normal',
  'English',
  'In Progress',
  true
);
```

### Add an Appointment

```sql
INSERT INTO appointments (
  appointment_id,
  customer_name,
  customer_phone,
  vin,
  appointment_date,
  appointment_time,
  service_type,
  status,
  estimated_cost_inr
) VALUES (
  'APT-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0'),
  'Mike Johnson',
  '+91 98765 43212',
  'WVWZZZ1JZ3W386754',
  CURRENT_DATE,
  '10:00:00',
  'Regular Service',
  'Pending Arrival',
  5500
);
```

### Add Staff Attendance

```sql
INSERT INTO staff_attendance (
  staff_id,
  staff_name,
  date,
  status,
  role
) VALUES 
  ('STAFF-001', 'Rajesh Kumar', CURRENT_DATE, 'Present', 'Service Advisor'),
  ('STAFF-002', 'Priya Sharma', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-003', 'Amit Patel', CURRENT_DATE, 'Present', 'Technician'),
  ('STAFF-004', 'Sunita Reddy', CURRENT_DATE, 'Absent', 'Service Advisor');
```

### Update Service Bay Status

```sql
UPDATE service_bays 
SET 
  status = 'Occupied',
  current_vehicle_vin = 'WVWZZZ1JZ3W386752',
  current_appointment_id = 'APT-0001'
WHERE bay_id = 'BAY-01';
```

### Add Revenue

```sql
-- Revenue is automatically updated when appointments are marked as 'Completed'
UPDATE appointments 
SET status = 'Completed' 
WHERE appointment_id = 'APT-0001';
```

## Automatic Updates

The schema includes triggers that automatically update:

1. **dealership_daily_stats** - Updates when appointments or AI calls are added
2. **daily_revenue** - Updates when appointments are marked as 'Completed'

## Data Flow

```
User Action → Database Insert/Update → Trigger Fires → Stats Updated → Dashboard Refreshes
```

## Frontend Integration

The Support Dashboard component (`SupportDashboard.tsx`) now:

1. Fetches data on component mount using `useEffect`
2. Uses Supabase client to query all tables
3. Processes and formats data for display
4. Shows loading state while fetching
5. Displays "No data" messages when tables are empty
6. Auto-refreshes can be added with polling or real-time subscriptions

## Real-time Updates (Optional)

To enable real-time updates, add Supabase subscriptions:

```typescript
useEffect(() => {
  const subscription = supabase
    .channel('support_dashboard')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'support_cases' },
      () => fetchDashboardData()
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## Testing

1. Run the SQL schema
2. Add sample data using the queries above
3. Open the Support Dashboard
4. Verify all metrics display correctly
5. Add more data and refresh to see updates

## Troubleshooting

### No data showing

- Check if tables exist: `\dt` in psql
- Verify RLS policies are set correctly
- Check browser console for errors
- Ensure Supabase environment variables are set

### Permission errors

- Verify RLS policies allow anon/authenticated access
- Check if user is authenticated (if required)
- Review Supabase logs for policy violations

### Data not updating

- Check if triggers are created: `\df` in psql
- Verify trigger functions exist
- Test manual updates to see if stats change

## Next Steps

1. Set up automated data ingestion from your systems
2. Add real-time subscriptions for live updates
3. Create API endpoints for external systems to push data
4. Set up scheduled jobs to aggregate historical data
5. Add data validation and error handling

## Support

For issues or questions:
1. Check Supabase logs in the dashboard
2. Review browser console for errors
3. Verify SQL queries in Supabase SQL Editor
4. Check RLS policies and permissions
