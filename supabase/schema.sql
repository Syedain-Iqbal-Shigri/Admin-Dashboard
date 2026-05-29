-- ============================================================
-- TravelEase Admin Dashboard — Supabase Schema
-- Run this entire file in: Supabase → SQL Editor → New Query
-- ============================================================

-- ── Bookings ─────────────────────────────────────────────────
create table if not exists bookings (
  id          text primary key,
  "user"      text not null,
  email       text not null,
  type        text not null check (type in ('Package','Hotel','Car')),
  item        text not null,
  date        date not null,
  amount      numeric(10,2) not null default 0,
  status      text not null check (status in ('Confirmed','Pending','Cancelled')),
  created_at  timestamptz default now()
);

insert into bookings (id,"user",email,type,item,date,amount,status) values
  ('BK-1001','Ahmed Raza','ahmed@email.com','Package','Dubai Explorer','2024-01-15',1299,'Confirmed'),
  ('BK-1002','Sara Khan','sara@email.com','Hotel','Pearl Continental Lahore','2024-01-16',480,'Confirmed'),
  ('BK-1003','Usman Ali','usman@email.com','Car','Toyota Corolla','2024-01-17',120,'Pending'),
  ('BK-1004','Fatima Noor','fatima@email.com','Package','Northern Areas Adventure','2024-01-18',850,'Confirmed'),
  ('BK-1005','Bilal Hassan','bilal@email.com','Hotel','Serena Hotel Islamabad','2024-01-19',620,'Cancelled'),
  ('BK-1006','Zara Malik','zara@email.com','Car','Honda City','2024-01-20',90,'Confirmed'),
  ('BK-1007','Hassan Mirza','hassan@email.com','Package','Bangkok Getaway','2024-01-21',1150,'Pending'),
  ('BK-1008','Aisha Siddiqui','aisha@email.com','Hotel','Avari Towers Karachi','2024-01-22',390,'Confirmed'),
  ('BK-1009','Tariq Mehmood','tariq@email.com','Package','Istanbul Heritage Tour','2024-01-23',1680,'Confirmed'),
  ('BK-1010','Nadia Islam','nadia@email.com','Car','Suzuki Cultus','2024-01-24',75,'Cancelled')
on conflict (id) do nothing;


-- ── Hotels ───────────────────────────────────────────────────
create table if not exists hotels (
  id          text primary key,
  name        text not null,
  city        text not null,
  stars       int not null check (stars between 1 and 5),
  rooms       int not null default 0,
  owner       text not null,
  status      text not null check (status in ('Active','Inactive','Pending')),
  rating      numeric(3,1) not null default 0,
  created_at  timestamptz default now()
);

insert into hotels (id,name,city,stars,rooms,owner,status,rating) values
  ('HTL-001','Pearl Continental Lahore','Lahore',5,420,'PC Group','Active',4.8),
  ('HTL-002','Serena Hotel Islamabad','Islamabad',5,260,'Serena Hotels','Active',4.7),
  ('HTL-003','Avari Towers Karachi','Karachi',5,196,'Avari Hotels','Active',4.6),
  ('HTL-004','Monal Restaurant & Hotel','Islamabad',4,80,'Monal Group','Active',4.5),
  ('HTL-005','Faletti''s Hotel','Lahore',4,120,'Independent','Active',4.3),
  ('HTL-006','Shangrila Resort','Skardu',4,64,'PTDC','Active',4.4),
  ('HTL-007','Luxus Grand Hotel','Peshawar',4,150,'Luxus Group','Pending',0),
  ('HTL-008','Mashal Hotel','Quetta',3,90,'Independent','Inactive',3.9),
  ('HTL-009','Shelton Rezidor','Lahore',4,180,'Shelton Hotels','Active',4.2),
  ('HTL-010','PC Bhurban','Murree',5,245,'PC Group','Active',4.6)
on conflict (id) do nothing;


-- ── Packages ─────────────────────────────────────────────────
create table if not exists packages (
  id          text primary key,
  name        text not null,
  destination text not null,
  duration    text not null,
  price       numeric(10,2) not null default 0,
  category    text not null check (category in ('International','Domestic')),
  status      text not null check (status in ('Active','Inactive','Pending')),
  bookings    int not null default 0,
  created_at  timestamptz default now()
);

insert into packages (id,name,destination,duration,price,category,status,bookings) values
  ('PKG-001','Dubai Explorer','Dubai, UAE','5 Days',1299,'International','Active',42),
  ('PKG-002','Northern Areas Adventure','Gilgit-Baltistan','7 Days',850,'Domestic','Active',89),
  ('PKG-003','Bangkok Getaway','Bangkok, Thailand','6 Days',1150,'International','Active',31),
  ('PKG-004','Murree Winter Package','Murree, Pakistan','3 Days',320,'Domestic','Inactive',0),
  ('PKG-005','Istanbul Heritage Tour','Istanbul, Turkey','8 Days',1680,'International','Active',27),
  ('PKG-006','Lahore Cultural Tour','Lahore, Pakistan','2 Days',180,'Domestic','Active',114),
  ('PKG-007','Maldives Luxury Escape','Maldives','5 Days',2400,'International','Active',19),
  ('PKG-008','Swat Valley Retreat','Swat, Pakistan','4 Days',420,'Domestic','Pending',0)
on conflict (id) do nothing;


-- ── Cars ─────────────────────────────────────────────────────
create table if not exists cars (
  id          text primary key,
  model       text not null,
  brand       text not null,
  type        text not null,
  seats       int not null default 5,
  daily_rate  numeric(10,2) not null default 0,
  city        text not null,
  status      text not null check (status in ('Available','Booked','Maintenance')),
  partner     text not null,
  created_at  timestamptz default now()
);

insert into cars (id,model,brand,type,seats,daily_rate,city,status,partner) values
  ('CAR-001','Corolla 2022','Toyota','Sedan',5,45,'Lahore','Available','Ali Rentals'),
  ('CAR-002','Civic 2023','Honda','Sedan',5,55,'Islamabad','Booked','FastCars'),
  ('CAR-003','Fortuner 2022','Toyota','SUV',7,110,'Karachi','Available','Premium Cars'),
  ('CAR-004','Cultus 2021','Suzuki','Hatchback',5,30,'Lahore','Available','Budget Rides'),
  ('CAR-005','Land Cruiser 2023','Toyota','SUV',8,180,'Islamabad','Booked','Luxury Rides'),
  ('CAR-006','City 2023','Honda','Sedan',5,48,'Peshawar','Maintenance','Ali Rentals'),
  ('CAR-007','Hiace 2022','Toyota','Van',12,90,'Lahore','Available','Group Tours'),
  ('CAR-008','Alto 2022','Suzuki','Hatchback',4,25,'Multan','Available','Budget Rides'),
  ('CAR-009','Prado 2022','Toyota','SUV',7,140,'Karachi','Booked','Premium Cars'),
  ('CAR-010','Revo 2023','Toyota','Pickup',5,95,'Gilgit','Available','Mountain Rides')
on conflict (id) do nothing;


-- ── Users ────────────────────────────────────────────────────
create table if not exists users (
  id          text primary key,
  name        text not null,
  email       text not null unique,
  phone       text,
  role        text not null check (role in ('User','Agent')) default 'User',
  bookings    int not null default 0,
  status      text not null check (status in ('Active','Inactive','Suspended')) default 'Active',
  joined      date not null,
  created_at  timestamptz default now()
);

insert into users (id,name,email,phone,role,bookings,status,joined) values
  ('USR-001','Ahmed Raza','ahmed@email.com','+92-300-1111111','User',8,'Active','2023-02-14'),
  ('USR-002','Sara Khan','sara@email.com','+92-321-2222222','User',3,'Active','2023-03-22'),
  ('USR-003','Usman Ali','usman@email.com','+92-333-3333333','Agent',15,'Active','2023-01-10'),
  ('USR-004','Fatima Noor','fatima@email.com','+92-345-4444444','User',1,'Active','2023-05-18'),
  ('USR-005','Bilal Hassan','bilal@email.com','+92-311-5555555','User',0,'Suspended','2023-04-05'),
  ('USR-006','Zara Malik','zara@email.com','+92-322-6666666','Agent',22,'Active','2022-12-01'),
  ('USR-007','Hassan Mirza','hassan@email.com','+92-300-7777777','User',5,'Active','2023-06-30'),
  ('USR-008','Aisha Siddiqui','aisha@email.com','+92-321-8888888','User',2,'Active','2023-07-15'),
  ('USR-009','Tariq Mehmood','tariq@email.com','+92-333-9999999','Agent',31,'Active','2022-10-20'),
  ('USR-010','Nadia Islam','nadia@email.com','+92-345-0000000','User',0,'Inactive','2023-08-10')
on conflict (id) do nothing;


-- ── Reviews ──────────────────────────────────────────────────
create table if not exists reviews (
  id          text primary key,
  "user"      text not null,
  type        text not null check (type in ('Package','Hotel','Car')),
  item        text not null,
  rating      int not null check (rating between 1 and 5),
  comment     text,
  date        date not null,
  status      text not null check (status in ('Published','Pending','Hidden')) default 'Pending',
  created_at  timestamptz default now()
);

insert into reviews (id,"user",type,item,rating,comment,date,status) values
  ('RV-001','Ahmed Raza','Package','Dubai Explorer',5,'Absolutely amazing experience! Highly recommended.','2024-01-20','Published'),
  ('RV-002','Sara Khan','Hotel','Pearl Continental Lahore',4,'Great hotel, excellent service. Room was clean and comfortable.','2024-01-21','Published'),
  ('RV-003','Usman Ali','Car','Toyota Fortuner',3,'Car was decent but could use better maintenance.','2024-01-22','Pending'),
  ('RV-004','Fatima Noor','Package','Northern Areas Adventure',5,'Life-changing trip. The scenery was breathtaking!','2024-01-23','Published'),
  ('RV-005','Bilal Hassan','Hotel','Serena Hotel Islamabad',2,'Service was below expectations. Needs improvement.','2024-01-24','Pending'),
  ('RV-006','Zara Malik','Package','Bangkok Getaway',5,'Perfect planning and execution. Will book again!','2024-01-25','Published'),
  ('RV-007','Hassan Mirza','Car','Honda Civic',4,'Smooth ride and clean car. Driver was professional.','2024-01-26','Published'),
  ('RV-008','Aisha Siddiqui','Hotel','Avari Towers Karachi',1,'Very disappointing stay. Multiple issues reported.','2024-01-27','Hidden')
on conflict (id) do nothing;


-- ── Contact Messages ─────────────────────────────────────────
create table if not exists contact_messages (
  id          text primary key,
  name        text not null,
  email       text not null,
  subject     text not null,
  message     text not null,
  date        date not null,
  status      text not null check (status in ('Unread','In Progress','Resolved')) default 'Unread',
  created_at  timestamptz default now()
);

insert into contact_messages (id,name,email,subject,message,date,status) values
  ('MSG-001','Ahmed Raza','ahmed@email.com','Inquiry about Dubai package','I would like to know more about the Dubai Explorer package and what is included in the price.','2024-01-20','Unread'),
  ('MSG-002','Sara Khan','sara@email.com','Booking cancellation request','I need to cancel my booking BK-1002 due to an emergency. Please guide me through the process.','2024-01-21','In Progress'),
  ('MSG-003','Usman Ali','usman@email.com','Complaint about car service','The car I rented was not in the condition described. The AC was not working properly.','2024-01-22','Resolved'),
  ('MSG-004','Fatima Noor','fatima@email.com','Custom package request','Can you create a custom package for a family of 5 to Hunza Valley for 7 days in March?','2024-01-23','Unread'),
  ('MSG-005','Bilal Hassan','bilal@email.com','Payment issue','My payment was deducted twice for booking BK-1005. Please resolve this urgently.','2024-01-24','In Progress'),
  ('MSG-006','Zara Malik','zara@email.com','Great experience feedback','I just returned from the Bangkok trip and it was absolutely amazing! Your team is wonderful.','2024-01-25','Resolved'),
  ('MSG-007','Hassan Mirza','hassan@email.com','Hotel upgrade request','I would like to upgrade my hotel room to a suite. Is this possible for my upcoming booking?','2024-01-26','Unread'),
  ('MSG-008','Aisha Siddiqui','aisha@email.com','Group booking discount','We have a group of 20 people planning a trip. Can you offer any group discounts?','2024-01-27','Unread')
on conflict (id) do nothing;


-- ── Hotel Partners ───────────────────────────────────────────
create table if not exists hotel_partners (
  id          text primary key,
  name        text not null,
  contact     text not null,
  phone       text not null,
  hotels      int not null default 0,
  commission  int not null default 10,
  city        text not null,
  status      text not null check (status in ('Active','Inactive','Pending')) default 'Active',
  join_date   date not null,
  created_at  timestamptz default now()
);

insert into hotel_partners (id,name,contact,phone,hotels,commission,city,status,join_date) values
  ('HP-001','PC Group','info@pchotels.com','+92-42-111-505-505',4,12,'Lahore','Active','2022-03-15'),
  ('HP-002','Serena Hotels','info@serenahotels.com','+92-51-111-133-133',3,10,'Islamabad','Active','2022-05-20'),
  ('HP-003','Avari Hotels','info@avari.com','+92-21-111-282-747',2,11,'Karachi','Active','2022-07-10'),
  ('HP-004','Shelton Hotels','info@shelton.com.pk','+92-42-555-0101',5,9,'Lahore','Active','2023-01-08'),
  ('HP-005','PTDC Hotels','info@tourism.gov.pk','+92-51-920-2766',8,8,'Islamabad','Active','2022-11-01'),
  ('HP-006','Luxus Group','info@luxusgrand.com','+92-91-222-0000',2,13,'Peshawar','Pending','2024-01-15'),
  ('HP-007','Independent Properties','contact@indhot.pk','+92-300-1234567',1,15,'Quetta','Inactive','2023-06-20')
on conflict (id) do nothing;


-- ── Car Partners ─────────────────────────────────────────────
create table if not exists car_partners (
  id          text primary key,
  name        text not null,
  contact     text not null,
  phone       text not null,
  cars        int not null default 0,
  commission  int not null default 15,
  city        text not null,
  status      text not null check (status in ('Active','Inactive','Pending')) default 'Active',
  join_date   date not null,
  created_at  timestamptz default now()
);

insert into car_partners (id,name,contact,phone,cars,commission,city,status,join_date) values
  ('CP-001','Ali Rentals','info@alirentals.pk','+92-300-1111111',12,15,'Lahore','Active','2022-04-10'),
  ('CP-002','FastCars','info@fastcars.pk','+92-321-2222222',8,14,'Islamabad','Active','2022-06-15'),
  ('CP-003','Premium Cars','info@premiumcars.pk','+92-333-3333333',15,12,'Karachi','Active','2022-08-20'),
  ('CP-004','Budget Rides','info@budgetrides.pk','+92-345-4444444',20,18,'Lahore','Active','2023-01-05'),
  ('CP-005','Luxury Rides','info@luxuryrides.pk','+92-311-5555555',6,10,'Islamabad','Active','2023-03-12'),
  ('CP-006','Group Tours','info@grouptours.pk','+92-322-6666666',10,13,'Lahore','Pending','2024-01-20'),
  ('CP-007','Mountain Rides','info@mountainrides.pk','+92-333-7777777',4,16,'Gilgit','Active','2023-07-01'),
  ('CP-008','City Cabs','info@citycabs.pk','+92-300-8888888',25,20,'Karachi','Inactive','2022-12-10')
on conflict (id) do nothing;


-- ── Custom Package Requests ──────────────────────────────────
create table if not exists custom_package_requests (
  id          text primary key,
  "user"      text not null,
  email       text not null,
  destination text not null,
  activities  text,
  budget      numeric(10,2) not null default 0,
  status      text not null check (status in ('Pending','In Review','Approved','Rejected')) default 'Pending',
  date        date not null,
  created_at  timestamptz default now()
);

insert into custom_package_requests (id,"user",email,destination,activities,budget,status,date) values
  ('REQ-001','Ahmed Raza','ahmed@email.com','Bali, Indonesia','Snorkeling, Hiking',2000,'Pending','2024-01-15'),
  ('REQ-002','Sara Khan','sara@email.com','Hunza, Pakistan','Trekking, Camping',600,'In Review','2024-01-18'),
  ('REQ-003','Usman Ali','usman@email.com','Paris, France','Sightseeing, Food Tour',3500,'Approved','2024-01-20'),
  ('REQ-004','Fatima Noor','fatima@email.com','Neelum Valley','River Rafting, Camping',500,'Pending','2024-01-22'),
  ('REQ-005','Bilal Hassan','bilal@email.com','London, UK','Cultural Tour, Shopping',4200,'Rejected','2024-01-24'),
  ('REQ-006','Zara Malik','zara@email.com','Skardu, Pakistan','Mountaineering, Photography',800,'Approved','2024-01-26'),
  ('REQ-007','Hassan Mirza','hassan@email.com','Dubai, UAE','Desert Safari, City Tour',1800,'In Review','2024-01-28')
on conflict (id) do nothing;


-- ── Row-Level Security (RLS) ──────────────────────────────────
-- Enable RLS on all tables and allow reads for the anon role.
-- Tighten these policies before going to production.

alter table bookings enable row level security;
alter table hotels enable row level security;
alter table packages enable row level security;
alter table cars enable row level security;
alter table users enable row level security;
alter table reviews enable row level security;
alter table contact_messages enable row level security;
alter table hotel_partners enable row level security;
alter table car_partners enable row level security;
alter table custom_package_requests enable row level security;

-- Allow all operations for anon (dashboard uses anon key).
-- Replace with authenticated-only policies when you add auth.
create policy "anon_all" on bookings for all to anon using (true) with check (true);
create policy "anon_all" on hotels for all to anon using (true) with check (true);
create policy "anon_all" on packages for all to anon using (true) with check (true);
create policy "anon_all" on cars for all to anon using (true) with check (true);
create policy "anon_all" on users for all to anon using (true) with check (true);
create policy "anon_all" on reviews for all to anon using (true) with check (true);
create policy "anon_all" on contact_messages for all to anon using (true) with check (true);
create policy "anon_all" on hotel_partners for all to anon using (true) with check (true);
create policy "anon_all" on car_partners for all to anon using (true) with check (true);
create policy "anon_all" on custom_package_requests for all to anon using (true) with check (true);
