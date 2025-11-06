# Authentication Setup Guide

## Overview
This application implements a secure authentication system with two user roles:
- **Admin**: Full access to manage the system and create dealership users
- **Support**: Dealership-specific access to support dashboard

## Setup Instructions

### 1. Database Setup

Run the SQL script in your Supabase SQL Editor:

```bash
# The SQL file is located at: supabase-setup.sql
```

This will create:
- `dealership_users` table
- Row Level Security policies
- Helper functions for authentication

### 2. Environment Variables

Your `.env` file should already contain:
```
VITE_SUPABASE_URL=https://xawbcnfhnvvgelaoerpw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

```bash
npm run dev
```

## Authentication Flow

### Admin Login
- **Email**: `admin@volkswagen.com`
- **Password**: `Volkswagen@2025`
- **Access**: Full system access, can create dealership users

### Dealership Support Login
- Credentials are created by the admin
- Each dealership gets unique login credentials
- Access is limited to support dashboard only

## Features

### Admin Dashboard
- View system analytics
- Create dealership user credentials
- Manage all users
- Configure AI settings

### Support Dashboard
- View dealership-specific data
- Manage tickets
- Access analytics for their dealership

## Security Features

1. **Session Management**: Uses Supabase Auth for secure session handling
2. **Protected Routes**: All dashboard routes require authentication
3. **Role-Based Access**: Admin and Support roles have different permissions
4. **Row Level Security**: Database-level security policies
5. **Password Storage**: Passwords are stored securely (consider hashing in production)

## Creating Dealership Users (Admin Only)

1. Login as admin
2. Navigate to "User Management"
3. Click "Create User"
4. Fill in:
   - Email address
   - Password (will be shared with dealership)
   - Dealership name
5. Share credentials with the dealership

## Testing

### Test Admin Access
1. Go to `/auth`
2. Login with admin credentials
3. You should be redirected to `/admin`

### Test Dealership Access
1. Create a dealership user as admin
2. Logout
3. Login with dealership credentials
4. You should be redirected to `/support`

## Database Schema

### dealership_users Table
```sql
- id: UUID (Primary Key)
- email: TEXT (Unique)
- password: TEXT
- dealership_name: TEXT
- created_at: TIMESTAMP
- created_by: TEXT
```

## Important Notes

1. **Admin Account**: The admin account is automatically created on first login
2. **No Self-Registration**: Users cannot create their own accounts
3. **Admin Control**: Only admin can create dealership credentials
4. **Session Persistence**: Sessions persist across page refreshes
5. **Logout**: Available in all dashboards via the sidebar

## Production Considerations

For production deployment, consider:
1. Implementing password hashing (bcrypt)
2. Adding password reset functionality
3. Implementing 2FA for admin accounts
4. Adding audit logs for user creation/deletion
5. Implementing rate limiting
6. Adding email verification
7. Using environment-specific credentials

## Troubleshooting

### "Unauthorized" Error
- Ensure you've run the SQL setup script
- Check that RLS policies are enabled
- Verify environment variables are correct

### Cannot Create Users
- Ensure you're logged in as admin
- Check Supabase console for errors
- Verify table permissions

### Login Not Working
- Clear browser cache and cookies
- Check browser console for errors
- Verify credentials are correct
- Ensure database table exists

## Support

For issues or questions, check:
1. Browser console for errors
2. Supabase logs in the dashboard
3. Network tab for failed requests
