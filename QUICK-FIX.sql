-- QUICK FIX: Run this immediately to fix the RLS error
-- Copy and paste this entire script into Supabase SQL Editor and click RUN

-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "Users can read own data" ON public.dealership_users;
DROP POLICY IF EXISTS "Service role can insert" ON public.dealership_users;
DROP POLICY IF EXISTS "Service role can update" ON public.dealership_users;
DROP POLICY IF EXISTS "Service role can delete" ON public.dealership_users;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.dealership_users;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.dealership_users;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.dealership_users;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.dealership_users;
DROP POLICY IF EXISTS "Allow anon read for login" ON public.dealership_users;

-- Step 2: Create new correct policies
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

-- Step 3: Grant permissions
GRANT ALL ON public.dealership_users TO authenticated;
GRANT SELECT ON public.dealership_users TO anon;

-- Done! Now try creating a dealership user from the admin dashboard
