-- Fix RLS Policies for dealership_users table
-- Run this script to fix the "new row violates row-level security policy" error

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON public.dealership_users;
DROP POLICY IF EXISTS "Service role can insert" ON public.dealership_users;
DROP POLICY IF EXISTS "Service role can update" ON public.dealership_users;
DROP POLICY IF EXISTS "Service role can delete" ON public.dealership_users;

-- Create new policies that allow authenticated users (admin) to manage dealership users

-- Allow authenticated users to read all dealership users
CREATE POLICY "Allow authenticated read" ON public.dealership_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert dealership users
CREATE POLICY "Allow authenticated insert" ON public.dealership_users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update dealership users
CREATE POLICY "Allow authenticated update" ON public.dealership_users
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete dealership users
CREATE POLICY "Allow authenticated delete" ON public.dealership_users
  FOR DELETE
  TO authenticated
  USING (true);

-- Also allow anon role to read for login validation
CREATE POLICY "Allow anon read for login" ON public.dealership_users
  FOR SELECT
  TO anon
  USING (true);

-- Verify the policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'dealership_users';
