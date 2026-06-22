create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  submitted_at timestamptz not null default timezone('utc', now()),
  approved_at timestamptz,
  denied_at timestamptz,
  pdf_file_name text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'denied')),
  owner_name text not null,
  email text not null,
  phone text not null,
  owner_address text not null,
  emergency_contact text not null,
  emergency_phone text not null,
  dog_name text not null,
  dog_breed text not null,
  dog_age text not null,
  dog_weight text not null,
  dog_sex text not null,
  spayed_neutered text not null,
  color_markings text not null,
  service text not null default 'Boarding',
  start_date date not null,
  end_date date not null,
  veterinarian_name text not null,
  veterinarian_phone text not null,
  vaccination_status text not null,
  feeding_instructions text not null,
  medications text not null,
  medical_conditions text not null,
  allergies text not null,
  behavior_notes text not null,
  bite_history text not null,
  special_handling text not null,
  belongings text not null,
  notes text not null default ''
);

create index if not exists bookings_status_submitted_idx
  on public.bookings (status, submitted_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists bookings_set_updated_at on public.bookings;

create trigger bookings_set_updated_at
before update on public.bookings
for each row
execute function public.set_updated_at();

alter table public.bookings enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on public.bookings to anon, authenticated;
grant select, update on public.bookings to authenticated;

drop policy if exists "public_can_submit_booking_requests" on public.bookings;
create policy "public_can_submit_booking_requests"
on public.bookings
for insert
to anon, authenticated
with check (
  status = 'pending'
  and approved_at is null
  and denied_at is null
  and pdf_file_name is null
);

drop policy if exists "kelsey_can_view_all_bookings" on public.bookings;
create policy "kelsey_can_view_all_bookings"
on public.bookings
for select
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'nmmckee@icloud.com');

drop policy if exists "kelsey_can_update_all_bookings" on public.bookings;
create policy "kelsey_can_update_all_bookings"
on public.bookings
for update
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'nmmckee@icloud.com')
with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'nmmckee@icloud.com');
