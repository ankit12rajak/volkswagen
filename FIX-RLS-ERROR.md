# Fix: "new row violates row-level security policy" Error

## Problem
When trying to create a dealership user from the admin dashboard, you get this error:
```
new row violates row-level security policy for table "dealership_users"
```

## Solution

### Option 1: Run the Fix Script (Recommended)
1. Open your Supabase SQL Editor
2. Copy and paste the contents of `supabase-fix-rls.sql`
3. Click "Run"
4. Try creating a dealership user again

### Option 2: Manual Fix via Supabase Dashboard

#### Step 1: Go to Table Editor
1. Open your Supabase project
2. Go to "Table Editor"
3. Find the `dealership_users` table

#### Step 2: Disable RLS Temporarily
1. Click on the table
2. Click the "..." menu
3. Select "Edit table"
4. **Uncheck** "Enable Row Level Security (RLS)"
5. Save

#### Step 3: Test Creating a User
1. Go back to your app
2. Login as admin
3. Try creating a dealership user
4. It should work now

#### Step 4: Re-enable RLS with Correct Policies
1. Go back to Supabase SQL Editor
2. Run this script:

```sql
-- Re-enable RLS
ALTER TABLE public.dealership_users ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow authenticated read" ON public.dealership_users;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.dealership_users;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.dealership_users;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.dealership_users;
DROP POLICY IF EXISTS "Allow anon read for login" ON public.dealership_users;

-- Create correct policies
CREATE POLICY "Allow authenticated read" ON public.dealership_users
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON public.dealership_users
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON public.dealership_users
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON public.dealership_users
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow anon read for login" ON public.dealership_users
  FOR SELECT TO anon USING (true);
```

### Option 3: Complete Reset (If nothing else works)

Run this complete reset script:

```sql
-- Drop the table completely
DROP TABLE IF EXISTS public.dealership_users CASCADE;

-- Recreate the table
CREATE TABLE public.dealership_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  dealership_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.dealership_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated read" ON public.dealership_users
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON public.dealership_users
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON public.dealership_users
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON public.dealership_users
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow anon read for login" ON public.dealership_users
  FOR SELECT TO anon USING (true);

-- Grant permissions
GRANT ALL ON public.dealership_users TO authenticated;
GRANT SELECT ON public.dealership_users TO anon;

-- Create index
CREATE INDEX idx_dealership_users_email ON public.dealership_users(email);

-- Insert sample user
INSERT INTO public.dealership_users (email, password, dealership_name, created_by)
VALUES ('dealer@volkswagen.com', 'DealerTest@123', 'VW Mumbai Central', 'admin@volkswagen.com');
```

## Verify the Fix

After running any of the above solutions, verify it worked:

1. Login as admin (`admin@volkswagen.com` / `Volkswagen@2025`)
2. Go to "User Management"
3. Click "Create User"
4. Fill in the form:
   - Email: `test@volkswagen.com`
   - Password: `Test@123`
   - Dealership: `Test Dealership`
5. Click "Create User"
6. You should see a success message

## Why This Happened

The original RLS policies were too restrictive:
- They only allowed the `service_role` to insert data
- But the app uses the `authenticated` role when logged in
- This caused the insert to be blocked

The fix changes the policies to allow `authenticated` users (like the admin) to perform all operations.

## Check Current Policies

To see what policies are currently active, run:

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'dealership_users';
```

You should see:
- `Allow authenticated read` - SELECT - authenticated
- `Allow authenticated insert` - INSERT - authenticated
- `Allow authenticated update` - UPDATE - authenticated
- `Allow authenticated delete` - DELETE - authenticated
- `Allow anon read for login` - SELECT - anon

## Still Having Issues?

If you're still getting errors:

1. Check browser console for detailed error messages
2. Check Supabase logs (Logs & Analytics section)
3. Verify you're logged in as admin
4. Try logging out and logging back in
5. Clear browser cache and cookies

## Contact Support

If none of these solutions work, check:
- Supabase project settings
- API keys are correct in `.env`
- Network tab in browser dev tools for failed requests
