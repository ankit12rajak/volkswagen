-- Supabase Database Setup for Volkswagen Authentication System
-- Run this SQL in your Supabase SQL Editor

-- Create dealership_users table
CREATE TABLE IF NOT EXISTS public.dealership_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  dealership_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT NOT NULL,
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable Row Level Security
ALTER TABLE public.dealership_users ENABLE ROW LEVEL SECURITY;

-- Create policies for dealership_users table
-- Allow authenticated users (admin) to read all dealership users
CREATE POLICY "Allow authenticated read" ON public.dealership_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admin) to insert dealership users
CREATE POLICY "Allow authenticated insert" ON public.dealership_users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users (admin) to update dealership users
CREATE POLICY "Allow authenticated update" ON public.dealership_users
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users (admin) to delete dealership users
CREATE POLICY "Allow authenticated delete" ON public.dealership_users
  FOR DELETE
  TO authenticated
  USING (true);

-- Allow anon role to read for login validation
CREATE POLICY "Allow anon read for login" ON public.dealership_users
  FOR SELECT
  TO anon
  USING (true);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_dealership_users_email ON public.dealership_users(email);

-- Insert sample dealership user (optional - for testing)
-- Password: DealerTest@123
INSERT INTO public.dealership_users (email, password, dealership_name, created_by)
VALUES ('dealer@volkswagen.com', 'DealerTest@123', 'VW Mumbai Central', 'admin@volkswagen.com')
ON CONFLICT (email) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON public.dealership_users TO authenticated;
GRANT ALL ON public.dealership_users TO service_role;

-- Create a function to validate dealership login
CREATE OR REPLACE FUNCTION public.validate_dealership_login(
  p_email TEXT,
  p_password TEXT
)
RETURNS TABLE (
  id UUID,
  email TEXT,
  dealership_name TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    du.id,
    du.email,
    du.dealership_name
  FROM public.dealership_users du
  WHERE du.email = p_email 
    AND du.password = p_password;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.validate_dealership_login TO authenticated;
GRANT EXECUTE ON FUNCTION public.validate_dealership_login TO anon;

COMMENT ON TABLE public.dealership_users IS 'Stores dealership support user credentials created by admin';
COMMENT ON FUNCTION public.validate_dealership_login IS 'Validates dealership user login credentials';
