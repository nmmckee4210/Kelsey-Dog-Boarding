# Kelsey's Lazy Bonez

This app now uses Supabase for:

- Customer booking request storage
- Kelsey's admin login
- Admin review, approve, and deny actions

## 1. Create the Supabase project

Create a new project in the [Supabase dashboard](https://supabase.com/dashboard).

## 2. Create your environment file

Copy `.env.example` to `.env.local` and fill in your project values:

```bash
cp .env.example .env.local
```

Set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_ADMIN_EMAIL`

## 3. Create the database table and policies

Open the Supabase SQL editor and run:

- `supabase/schema.sql`

This creates the `public.bookings` table and row-level security policies so:

- anyone can submit a booking request
- only `nmmckee@icloud.com` can read and update booking requests after signing in

## 4. Create Kelsey's login in Supabase Auth

In Supabase Dashboard:

1. Go to `Authentication`
2. Create a user
3. Use:
   `nmmckee@icloud.com`
4. Set the password to:
   `password2`

If you want to change the admin email later, update both:

- `VITE_ADMIN_EMAIL`
- the email value inside `supabase/schema.sql`

## 5. Run the app

```bash
npm install
npm run dev
```

## What changed

- The booking form now saves to Supabase instead of browser `localStorage`
- The admin login now uses Supabase Auth
- The admin dashboard now loads pending, approved, and denied requests from Supabase
- Approval and denial now update booking status in Supabase

## Useful files

- `src/lib/supabase.js`
- `src/lib/bookings.js`
- `src/App.jsx`
- `src/pages/AdminLogin.jsx`
- `src/pages/Booking.jsx`
- `supabase/schema.sql`
