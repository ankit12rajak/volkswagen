# Admin Dashboard Setup Guide

## Overview

The Admin Dashboard has been updated to use **real data from Supabase** instead of dummy data. All metrics are now dynamically calculated based on actual call records and system performance.

## Database Schema

### Tables Created

1. **call_records** - Individual call records with full details
2. **daily_statistics** - Aggregated daily metrics
3. **hourly_call_volume** - Call volume broken down by hour
4. **agent_performance** - Performance metrics per agent per day
5. **category_statistics** - Call statistics by category
6. **ai_performance_metrics** - AI system performance scores
7. **cost_analysis** - Monthly cost analysis and savings
8. **system_alerts** - System notifications and alerts

### Automatic Updates

The database includes **triggers** that automatically update statistics when new call records are inserted:
- Daily statistics are recalculated
- Hourly call volume is updated
- Agent performance metrics are refreshed
- Category statistics are maintained

## Setup Instructions

### 1. Run the SQL Schema

Execute the SQL file to create all necessary tables:

```bash
# Copy the SQL content from admin-dashboard-schema.sql
# Then run it in your Supabase SQL Editor
```

Or use the Supabase CLI:

```bash
supabase db push
```

### 2. Initial Data

The schema automatically initializes all tables with **zero values** for today's date. This ensures the dashboard displays properly even with no call data.

### 3. Verify Tables

Check that all tables were created successfully in your Supabase dashboard:
- Go to Table Editor
- Verify all 8 tables exist
- Check that RLS policies are enabled

## How Data Updates

### Recording a Call

When a call is completed, insert a record into `call_records`:

```typescript
const { data, error } = await supabase
  .from('call_records')
  .insert({
    call_id: '#10001',
    customer_name: 'John Doe',
    customer_phone: '+1234567890',
    category: 'Service Booking',
    duration_seconds: 180,
    agent_type: 'AI',
    agent_id: 'ai-agent-1',
    agent_name: 'AI Agent 1',
    sentiment: 'Positive',
    status: 'Resolved',
    rating: 5,
    escalated: false
  });
```

### Automatic Updates

Once a call record is inserted, the following happens automatically:
1. ✅ Daily statistics are updated
2. ✅ Hourly call volume is incremented
3. ✅ Agent performance is recalculated
4. ✅ Category statistics are updated

### Dashboard Refresh

The dashboard automatically refreshes every **30 seconds** to show the latest data.

## Dashboard Metrics

### Top Stats Cards

1. **Total Calls Today** - Count of all calls today
2. **Resolution Rate** - Percentage of resolved calls
3. **Avg. Handle Time** - Average call duration
4. **Active Agents** - Number of agents who handled calls today
5. **Cost Savings** - Today's cost savings in euros
6. **Customer Satisfaction** - Average rating from customers
7. **AI Accuracy** - Overall AI health score
8. **First Call Resolution** - Calls resolved on first contact

### Charts & Visualizations

- **Call Volume** - Hourly breakdown of calls (resolved vs escalated)
- **Weekly Trends** - 7-day trends for calls, resolution, satisfaction
- **Cost Analysis** - Monthly cost comparison (AI vs Human agents)
- **Peak Hours** - System load by hour (8 AM - 5 PM)
- **Category Distribution** - Pie chart of call categories
- **Response Time Distribution** - How quickly calls are answered
- **Agent Performance** - Individual agent statistics
- **AI Performance Metrics** - Detailed AI accuracy scores

### Recent Activity

- **Recent Call Activity** - Last 6 calls with full details
- **System Alerts** - Latest notifications and warnings

## Updating AI Performance Metrics

AI performance metrics need to be updated manually or via a scheduled job:

```typescript
const { data, error } = await supabase
  .from('ai_performance_metrics')
  .upsert({
    date: new Date().toISOString().split('T')[0],
    voice_recognition_accuracy: 96.5,
    sentiment_accuracy: 94.2,
    intent_classification_accuracy: 95.8,
    response_quality_score: 92.3,
    context_understanding_score: 93.7,
    language_processing_score: 97.1,
    overall_health_score: 94.9
  });
```

## Creating System Alerts

Use the service function to create alerts:

```typescript
import { createSystemAlert } from '@/services/adminDashboardService';

await createSystemAlert(
  'warning',
  'High call volume detected - 15% above average',
  'High'
);
```

## Cost Analysis

Update monthly cost analysis:

```typescript
const { data, error } = await supabase
  .from('cost_analysis')
  .upsert({
    month: '2024-11-01',
    ai_cost_euros: 3500,
    human_cost_euros: 19500,
    total_savings_euros: 16000,
    roi_percentage: 457
  });
```

## Example: Complete Call Flow

Here's how to record a complete call with all updates:

```typescript
// 1. Insert call record (triggers automatic updates)
const { data: callData, error: callError } = await supabase
  .from('call_records')
  .insert({
    call_id: `#${Date.now()}`,
    customer_name: 'Jane Smith',
    customer_phone: '+1234567890',
    category: 'Technical Support',
    duration_seconds: 245,
    agent_type: 'AI',
    agent_id: 'ai-agent-2',
    agent_name: 'AI Agent 2',
    sentiment: 'Positive',
    status: 'Resolved',
    rating: 5,
    escalated: false
  });

// 2. Statistics are automatically updated via triggers!
// 3. Dashboard will show updated data on next refresh (30s)
```

## Testing the Dashboard

### 1. Insert Test Data

```sql
-- Insert a test call
INSERT INTO call_records (
  call_id,
  customer_name,
  category,
  duration_seconds,
  agent_type,
  agent_id,
  agent_name,
  sentiment,
  status,
  rating,
  escalated
) VALUES (
  '#TEST001',
  'Test Customer',
  'Service Booking',
  180,
  'AI',
  'ai-agent-1',
  'AI Agent 1',
  'Positive',
  'Resolved',
  5,
  false
);
```

### 2. Verify Updates

Check that the following tables were updated:
- `daily_statistics` - total_calls should increment
- `hourly_call_volume` - current hour should increment
- `agent_performance` - ai-agent-1 should have 1 call
- `category_statistics` - Service Booking should have 1 call

### 3. View in Dashboard

Refresh the Admin Dashboard and verify:
- Total Calls Today shows 1
- Recent Call Activity shows the test call
- Charts display the data point

## Troubleshooting

### Dashboard Shows All Zeros

**Cause**: No call records have been inserted yet.

**Solution**: This is expected! Insert test data or wait for real calls.

### Data Not Updating

**Cause**: Triggers might not be working.

**Solution**: Check trigger status:
```sql
SELECT * FROM pg_trigger WHERE tgname LIKE 'trigger_update%';
```

### RLS Errors

**Cause**: Row Level Security policies blocking access.

**Solution**: Ensure you're logged in as an admin user:
```sql
SELECT role FROM profiles WHERE id = auth.uid();
```

## API Reference

See `src/services/adminDashboardService.ts` for all available functions:

- `getDailyStatistics()` - Get today's stats
- `getHourlyCallVolume()` - Get hourly breakdown
- `getCategoryStatistics()` - Get category breakdown
- `getAgentPerformance()` - Get agent metrics
- `getAIPerformanceMetrics()` - Get AI scores
- `getRecentCallRecords(limit)` - Get recent calls
- `getSystemAlerts(limit)` - Get recent alerts
- `getWeeklyTrends()` - Get 7-day trends
- `getCostAnalysis()` - Get 6-month cost data
- `markAlertAsRead(alertId)` - Mark alert as read
- `createSystemAlert(type, message, priority)` - Create new alert

## Next Steps

1. ✅ Run the SQL schema in Supabase
2. ✅ Verify all tables are created
3. ✅ Insert test call data
4. ✅ View the dashboard
5. ✅ Integrate with your call handling system
6. ✅ Set up scheduled jobs for AI metrics updates
7. ✅ Configure cost analysis updates

## Support

For issues or questions:
1. Check the Supabase logs for errors
2. Verify RLS policies are correct
3. Ensure triggers are active
4. Check browser console for API errors
