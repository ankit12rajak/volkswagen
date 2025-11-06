# Support Dashboard - Quick Start Guide

Get your Support Dashboard up and running with real data in 5 minutes!

## Prerequisites

- Supabase project set up
- Environment variables configured (`.env` file)
- Admin Dashboard schema already applied (optional, but recommended)

## Step 1: Apply Database Schema (2 minutes)

### Option A: Using Supabase Dashboard
1. Go to your Supabase project
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the contents of `support-dashboard-schema.sql`
5. Click "Run" or press `Ctrl+Enter`
6. Wait for "Success. No rows returned" message

### Option B: Using Supabase CLI
```bash
cd volkswagenfrontend
supabase db push
```

## Step 2: Add Sample Data (1 minute) - OPTIONAL

This step is optional but recommended for testing.

1. In Supabase SQL Editor, create another new query
2. Copy and paste the contents of `support-dashboard-sample-data.sql`
3. Click "Run"
4. Wait for success message

## Step 3: Verify Setup (1 minute)

Run this verification query in Supabase SQL Editor:

```sql
-- Quick verification
SELECT 'Support Cases' as table_name, COUNT(*) as count FROM support_cases
UNION ALL
SELECT 'AI Voice Calls', COUNT(*) FROM ai_voice_calls
UNION ALL
SELECT 'Appointments', COUNT(*) FROM appointments
UNION ALL
SELECT 'Service Bays', COUNT(*) FROM service_bays
UNION ALL
SELECT 'Staff Attendance', COUNT(*) FROM staff_attendance
UNION ALL
SELECT 'Daily Revenue', COUNT(*) FROM daily_revenue
UNION ALL
SELECT 'Pending Approvals', COUNT(*) FROM pending_approvals
UNION ALL
SELECT 'Dealership Stats', COUNT(*) FROM dealership_daily_stats;
```

Expected results:
- All tables should show count > 0 if you added sample data
- If you skipped sample data, most will show 0 (except service_bays and dealership_daily_stats which are auto-initialized)

## Step 4: Open Dashboard (30 seconds)

1. Start your development server (if not already running):
   ```bash
   npm run dev
   # or
   bun run dev
   ```

2. Navigate to the Support Dashboard in your browser
3. You should see:
   - Loading state briefly
   - Then all metrics populated with data (or zeros if no sample data)
   - No errors in browser console

## Step 5: Test It Out (30 seconds)

### If you added sample data:
- ✅ Stats cards should show numbers (24 appointments, 47 AI calls, etc.)
- ✅ Live AI Calls section shows 4 active calls
- ✅ Support Cases table shows 5 cases
- ✅ Charts show data in all 4 tabs
- ✅ Staff shows 18/22 present
- ✅ Service Bays shows 3/10 occupied

### If you skipped sample data:
- ✅ Stats cards show 0 or "N/A"
- ✅ Empty state messages in sections
- ✅ Service Bays shows 0/10 (all available)
- ✅ No errors in console

## What's Next?

### Add Your First Real Data

Try adding a support case manually:

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
  'CASE-TEST-001',
  'Test Customer',
  '+91 98765 43210',
  'WVWZZZ1JZ3W386752',
  'Test issue - Brake inspection needed',
  'Medium',
  'Pending Approval',
  'General Service',
  'Service',
  5000
);
```

Refresh the dashboard - you should see the new case appear!

### Enable Real-Time Updates (Optional)

Add this to your `SupportDashboard.tsx` component:

```typescript
useEffect(() => {
  // Subscribe to support_cases changes
  const subscription = supabase
    .channel('support_dashboard_updates')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'support_cases' },
      () => {
        console.log('Support case updated, refreshing...');
        fetchDashboardData();
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

Now the dashboard will automatically refresh when data changes!

## Common Issues

### Issue: "Missing Supabase environment variables"
**Solution:** Check your `.env` file has:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Issue: "relation does not exist" error
**Solution:** The schema wasn't applied. Go back to Step 1.

### Issue: Dashboard shows all zeros
**Solution:** This is normal if you didn't add sample data. Either:
- Add sample data (Step 2)
- Or start adding real data from your systems

### Issue: Permission denied errors
**Solution:** Check RLS policies:
```sql
-- Verify policies exist
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('support_cases', 'ai_voice_calls', 'appointments');
```

## Data Integration

### Connect Your Systems

To integrate with your existing systems, you can:

1. **Direct Database Inserts** - Insert data directly into tables
2. **API Endpoints** - Create Supabase Edge Functions to receive data
3. **Webhooks** - Set up webhooks from external systems
4. **Scheduled Jobs** - Use cron jobs to sync data periodically

Example API endpoint (Edge Function):

```typescript
// supabase/functions/add-support-case/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  const { customer_name, issue, priority } = await req.json()

  const { data, error } = await supabase
    .from('support_cases')
    .insert({
      case_id: `CASE-${Date.now()}`,
      customer_name,
      issue,
      priority,
      status: 'Pending Approval',
      use_case: 'General Service',
      category: 'Service',
      estimated_cost_inr: 0
    })

  return new Response(JSON.stringify({ data, error }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

## Performance Tips

1. **Add Indexes** - Already included in schema for common queries
2. **Use Pagination** - For large datasets, add pagination to queries
3. **Cache Data** - Consider caching frequently accessed data
4. **Real-time Subscriptions** - Only subscribe to tables that change frequently

## Monitoring

### Check Dashboard Health

```sql
-- Check data freshness
SELECT 
  'Last Support Case' as metric,
  MAX(created_at) as last_update
FROM support_cases
UNION ALL
SELECT 
  'Last AI Call',
  MAX(created_at)
FROM ai_voice_calls
UNION ALL
SELECT 
  'Last Appointment',
  MAX(created_at)
FROM appointments;
```

### Monitor Performance

```sql
-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN (
  'support_cases',
  'ai_voice_calls',
  'appointments',
  'service_bays',
  'staff_attendance',
  'daily_revenue',
  'pending_approvals',
  'dealership_daily_stats'
)
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## Success Checklist

- [ ] Schema applied successfully
- [ ] Sample data added (optional)
- [ ] Dashboard loads without errors
- [ ] All sections display correctly
- [ ] Can add new data manually
- [ ] New data appears on refresh
- [ ] No console errors
- [ ] RLS policies working
- [ ] Ready for production data

## Need Help?

1. Check `SUPPORT_DASHBOARD_SETUP.md` for detailed documentation
2. Review `SUPPORT_DASHBOARD_CHANGES.md` for what changed
3. Look at `support-dashboard-sample-data.sql` for data examples
4. Check Supabase logs for errors
5. Review browser console for frontend errors

## You're Done! 🎉

Your Support Dashboard is now connected to real data and ready to use. As you add more data through your systems, the dashboard will automatically reflect the changes.

**Pro Tip:** Set up automated data ingestion from your existing systems to keep the dashboard always up-to-date!
