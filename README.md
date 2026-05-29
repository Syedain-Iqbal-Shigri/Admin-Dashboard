## Author

**Syedain Iqbal Shigri**

# TravelEase Admin Dashboard

A modern, enterprise-grade admin panel for managing a full-stack travel and tourism booking platform. Built with React 19, Vite, and Tailwind CSS v4.

---

## Overview

TravelEase Admin Dashboard provides a centralized control panel for managing all aspects of a travel booking platform — from packages and hotel listings to partner relationships, bookings, user accounts, and customer communications. It connects to a live Supabase backend with real-time data across all modules.

---

## Features

- **Dashboard** — KPI stats grid, revenue & bookings area chart, category bar chart, and live widgets for recent bookings, pending packages, new hotels, and contact messages
- **Packages** — Full CRUD for travel packages with category, destination, duration, pricing, and booking count tracking
- **Custom Packages** — Review and moderate custom package requests submitted by users; approve, reject, or flag in-review
- **Bookings** — View and manage all customer bookings across packages, hotels, and cars with status and type filtering
- **Hotels** — Hotel listings with star ratings, room counts, owner details, and status management
- **Cars** — Vehicle inventory management with type, availability, daily rate, and partner assignment
- **Hotel Partners** — Hotel partner relationships, commission rates, and listing counts
- **Car Partners** — Car rental partner management with commission and fleet tracking
- **Users** — User account management with role control (User / Agent) and status toggling
- **Reviews** — Moderate and publish customer reviews across all booking types
- **Contact Messages** — Inbox-style message management with in-app reply, resolve, and in-progress workflow
- **Settings** — Profile, password/security, notification preferences, and appearance configuration

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Backend / DB | Supabase (PostgreSQL) |
| Charts | Recharts |
| Language | JavaScript (ESM) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with the schema from `supabase/schema.sql`

### Installation

```bash
# Clone the repository
git clone https://github.com/Syedain-Iqbal-Shigri/Admin-Dashboard.git
cd Admin-Dashboard

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Your Supabase URL and anon key are found in your project dashboard under **Settings → API**.

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── ui/                  # Shared UI primitives
│   │   ├── Toast.jsx        # Toast notification system
│   │   ├── ConfirmModal.jsx # Promise-based confirm dialog
│   │   ├── PageHeader.jsx   # Page title + action header
│   │   ├── MiniStat.jsx     # Mini KPI stat card
│   │   ├── EmptyState.jsx   # Empty table state
│   │   └── ErrorBanner.jsx  # Data-load error banner
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── Layout.jsx
│   ├── StatsGrid.jsx
│   ├── RecentBookings.jsx
│   ├── PendingPackages.jsx
│   ├── NewHotels.jsx
│   └── ContactMessages.jsx
├── context/
│   └── ThemeContext.jsx     # Dark mode context
├── hooks/
│   └── useQuery.js          # Generic async data-fetching hook
├── lib/
│   └── supabase.js          # Supabase client
├── pages/                   # 13 route pages
├── services/                # Supabase service functions per entity
└── index.css
```

---

## Deployment

This project is configured for seamless deployment on [Vercel](https://vercel.com).

1. Import the repository on Vercel
2. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables
3. Deploy — Vercel auto-detects Vite and configures everything

Every push to `master` triggers an automatic redeploy.

---

## License

This project is private. All rights reserved.
