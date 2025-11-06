# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Setup Database
1. Open your Supabase project: https://supabase.com/dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `supabase-setup.sql`
4. Click "Run" to execute the script

**⚠️ If you get an RLS error when creating users:**
- Run the `QUICK-FIX.sql` script in Supabase SQL Editor
- See `FIX-RLS-ERROR.md` for detailed troubleshooting

### Step 2: Start the Application
```bash
cd volkswagenfrontend
npm run dev
```

### Step 3: Login

#### As Admin:
- Navigate to: http://localhost:5173/auth
- Email: `admin@volkswagen.com`
- Password: `Volkswagen@2025`

#### As Dealership Support:
1. First, login as admin
2. Go to "User Management"
3. Create a dealership user
4. Logout and login with the new credentials

## 📋 What You Get

### Admin Dashboard (`/admin`)
- System analytics and metrics
- User management
- Create dealership credentials
- AI configuration
- Settings

### Support Dashboard (`/support`)
- Dealership-specific analytics
- Ticket management
- Customer service cases
- Performance metrics

## 🔐 Default Credentials

**Admin Account:**
- Email: `admin@volkswagen.com`
- Password: `Volkswagen@2025`

**Sample Dealership Account** (after running SQL script):
- Email: `dealer@volkswagen.com`
- Password: `DealerTest@123`
- Dealership: VW Mumbai Central

## 🎯 Key Features

✅ Secure authentication with Supabase
✅ Role-based access control (Admin/Support)
✅ Protected routes
✅ Session management
✅ Admin can create dealership users
✅ No self-registration (admin-controlled)

## 📱 Navigation

- **Landing Page**: `/`
- **Login**: `/auth`
- **Admin Dashboard**: `/admin`
- **Support Dashboard**: `/support`
- **Car Monitor**: `/car-monitor` (public)

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- Supabase (Auth + Database)
- TailwindCSS + shadcn/ui
- React Router
- Recharts

## 📝 Next Steps

1. ✅ Run the SQL setup script
2. ✅ Start the dev server
3. ✅ Login as admin
4. ✅ Create dealership users
5. ✅ Test support dashboard access

## 🆘 Need Help?

Check `AUTH_SETUP.md` for detailed documentation.
