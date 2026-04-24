# Balans Accounting & Bookkeeping — Full Stack Project


## What's Inside

```
balans-v2/
├── frontend/               ← React 18 app
│   └── src/
│       ├── pages/
│       │   ├── admin/      ← Admin portal (35+ pages)
│       │   ├── sales/      ← Sales portal (12 pages)
│       │   ├── accountant/ ← Accountant portal (15 pages)
│       │   ├── client/     ← Client portal (9 pages) [in Part 1]
│       │   └── website/    ← Public website [in Part 1]
│       ├── components/
│       ├── context/        ← Auth context (Supabase)
│       └── styles/         ← Global design system
├── backend/                ← Node.js Express API
│   ├── routes/             ← All API routes
│   ├── services/           ← Email, WhatsApp, automation cron jobs
│   └── middleware/         ← Auth middleware
└── database/
    └── schema.sql          ← Complete Supabase schema (25+ tables)
```

## Portals & Routes

| Portal | URL | Role |
|--------|-----|------|
| Website | `/` | Public |
| Admin | `/admin/dashboard` | admin |
| Sales | `/sales/dashboard` | sales |
| Accountant | `/accountant/dashboard` | accountant |
| Client | `/client/dashboard` | client |

---

## QUICK SETUP (15 minutes)

### Step 1 — Supabase Database

1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your **Project URL** and **Anon Key** from Settings → API
3. Also copy your **Service Role Key** (for backend)
4. Go to **SQL Editor** → paste all of `database/schema.sql` → **Run**

### Step 2 — Frontend

```bash
cd frontend
cp .env.example .env
# Edit .env — add your Supabase URL and Anon Key
npm install
npm start
# Runs on http://localhost:3000
```

### Step 3 — Backend

```bash
cd backend
cp .env.example .env
# Edit .env — add Supabase URL, Service Role Key, and other keys
npm install
npm run dev
# Runs on http://localhost:5000
```

### Step 4 — Create Your Admin Account

1. Go to Supabase → Authentication → Users → Add User
2. Email: `musa@balans.ae` | Password: your choice
3. Go to SQL Editor and run:
```sql
UPDATE profiles SET role = 'admin', full_name = 'Musa' WHERE email = 'musa@balans.ae';
```
4. Login at `http://localhost:3000/admin/dashboard`

### Step 5 — Connect Stripe (from Admin Settings)

1. Login as admin → Settings → Integrations
2. Paste your **Stripe Secret Key** → Save
3. Click **Test Connection**
4. In Stripe Dashboard: Webhooks → Add endpoint → `https://yourdomain.com/webhooks/stripe`
5. Paste webhook secret into Settings

### Step 6 — Connect Email (from Admin Settings)

1. Admin → Settings → Email
2. Enter SMTP details (Gmail: smtp.gmail.com:587, use App Password)
3. Click **Test Email** to verify

### Step 7 — Connect Google Sheets (Meta Leads)

1. Admin → Settings → Integrations → Google Sheets
2. Paste your Sheet ID and Google API Key
3. Click **Sync Now** to import existing leads
4. Auto-syncs every 15 minutes via cron job

---

## Deploy to Production

### Frontend → Vercel (Free)

```bash
cd frontend
npm run build
# Connect GitHub repo to Vercel
# Add environment variables in Vercel dashboard
```

### Backend → Render.com (Free)

1. Connect GitHub repo to Render
2. Set environment variables
3. Deploy — auto-starts with `npm start`

### Custom Domain

Point your domain DNS to Vercel/Render.
Update `FRONTEND_URL` in backend `.env`.

---

## Key Features

### Lead Management
- Auto-import from Google Sheets (Meta Ads leads) every 15 min
- Round-robin auto-assignment to sales rep with fewest leads
- 1-hour contact rule — auto-reassign + fine if breached
- Lost lead → instant reassignment to next rep
- Full pipeline: New → Contacted → Qualified → Proposal → Won/Lost

### Automation (Runs 24/7)
- Every 15 min: Google Sheet sync
- Every hour: Check 1-hour rule breaches
- Daily 8AM: Escalate overdue tasks (after 3 days)
- Daily 9AM: Create VAT tasks 30 days before deadline
- Daily 10AM: Alert clients with low credits
- Daily 3AM: Backup notification

### Finance
- Stripe payments with live webhook handling
- Credit tracking per client (auto-deducted per task)
- Commission engine: base + bonus tiers + after-hours multiplier
- Payroll runner — WPS export, per-person breakdown
- P&L report — revenue vs expenses vs commissions
- Expense tracker by category

### Notifications
- Real-time in-portal notifications
- Email via SMTP (configurable from Settings)
- WhatsApp via Business API (configurable from Settings)
- Whole team notified on task completion, new client, etc.

### All Configurable from Admin Settings
- Stripe secret key (live connection test)
- SMTP email (live send test)
- WhatsApp Business API token
- Google Sheets ID + API key
- Pricing plans (Starter/Growth/Pro)
- Commission rates + bonus tiers
- 1-hour rule fine amounts per rep
- Working hours (10AM–7PM, Sun off)
- Automation rules (toggle each on/off)
- Alert thresholds
- Security settings

---

## Tech Stack

- **Frontend**: React 18, React Router v6, Recharts, Lucide Icons, react-hot-toast
- **Backend**: Node.js, Express 4, node-cron (automation)
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Auth**: Supabase Auth (JWT, role-based)
- **Payments**: Stripe (subscriptions + webhooks)
- **Email**: Nodemailer (any SMTP provider)
- **WhatsApp**: WhatsApp Business API (Meta)
- **Leads**: Google Sheets API (Meta Ads sync)
- **Hosting**: Vercel (frontend) + Render (backend) — both free tier

---

## Support

WhatsApp: +971 52 740 4854
Email: hello@balans.ae
