-- ============================================================
-- BALANS ACCOUNTING & BOOKKEEPING — COMPLETE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin','client','accountant','sales')),
  full_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  whatsapp TEXT,
  company TEXT,
  country TEXT DEFAULT 'UAE',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CLIENTS
CREATE TABLE clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id),
  company_name TEXT NOT NULL,
  trade_licence TEXT,
  vat_trn TEXT,
  country TEXT DEFAULT 'UAE',
  plan TEXT CHECK (plan IN ('starter','growth','pro')) DEFAULT 'starter',
  plan_price DECIMAL(10,2),
  credits_total INTEGER DEFAULT 600,
  credits_used INTEGER DEFAULT 0,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  payment_status TEXT DEFAULT 'trial' CHECK (payment_status IN ('active','overdue','cancelled','trial')),
  trial_ends_at TIMESTAMPTZ,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending','in_progress','approved','rejected')),
  vat_registered BOOLEAN DEFAULT false,
  assigned_accountant_id UUID REFERENCES profiles(id),
  onboarding_complete BOOLEAN DEFAULT false,
  nps_score INTEGER,
  last_login TIMESTAMPTZ,
  notes TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ACCOUNTANTS
CREATE TABLE accountants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) UNIQUE,
  acca_number TEXT,
  specialisations TEXT[],
  max_clients INTEGER DEFAULT 10,
  commission_rate DECIMAL(5,2) DEFAULT 40.00,
  calendly_url TEXT,
  working_hours_start TIME DEFAULT '10:00',
  working_hours_end TIME DEFAULT '19:00',
  working_days TEXT[] DEFAULT ARRAY['MON','TUE','WED','THU','FRI','SAT'],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SALES REPS
CREATE TABLE sales_reps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) UNIQUE,
  monthly_target INTEGER DEFAULT 20,
  commission_per_conversion DECIMAL(10,2) DEFAULT 200.00,
  bonus_tier1_target INTEGER DEFAULT 15,
  bonus_tier1_amount DECIMAL(10,2) DEFAULT 500.00,
  bonus_tier2_target INTEGER DEFAULT 20,
  bonus_tier2_amount DECIMAL(10,2) DEFAULT 1500.00,
  bonus_tier3_target INTEGER DEFAULT 25,
  bonus_tier3_amount DECIMAL(10,2) DEFAULT 3000.00,
  after_hours_multiplier DECIMAL(4,2) DEFAULT 1.50,
  fine_amount DECIMAL(10,2) DEFAULT 0.00,
  working_hours_start TIME DEFAULT '10:00',
  working_hours_end TIME DEFAULT '19:00',
  working_days TEXT[] DEFAULT ARRAY['MON','TUE','WED','THU','FRI','SAT'],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LEADS
CREATE TABLE leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  company TEXT,
  country TEXT DEFAULT 'UAE',
  source TEXT NOT NULL CHECK (source IN ('instagram','facebook','whatsapp','lead_form','google_sheet','other')),
  source_ad_id TEXT,
  interest TEXT,
  notes TEXT,
  assigned_to UUID REFERENCES profiles(id),
  previous_rep UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','proposal','negotiation','won','lost')),
  lost_reason TEXT,
  contacted_at TIMESTAMPTZ,
  contact_deadline TIMESTAMPTZ,
  one_hour_rule_breached BOOLEAN DEFAULT false,
  fine_applied BOOLEAN DEFAULT false,
  fine_amount DECIMAL(10,2),
  converted_client_id UUID REFERENCES clients(id),
  converted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lead_activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  sales_rep_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  notes TEXT,
  stage_from TEXT,
  stage_to TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TASKS
CREATE TABLE tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  client_id UUID REFERENCES clients(id),
  assigned_to UUID REFERENCES profiles(id),
  assigned_by UUID REFERENCES profiles(id),
  type TEXT CHECK (type IN ('vat','bookkeeping','report','corporate_tax','payroll','kyc','advisory','other')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('critical','high','normal','low')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','in_progress','done','escalated','cancelled')),
  due_date DATE,
  completed_at TIMESTAMPTZ,
  escalated_at TIMESTAMPTZ,
  escalation_reason TEXT,
  credits_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- DOCUMENTS
CREATE TABLE documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  uploaded_by UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  doc_type TEXT CHECK (doc_type IN ('vat','report','bank','kyc','bookkeeping','payroll','corporate_tax','other')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- REPORTS
CREATE TABLE reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  accountant_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('pl','vat','review','bookkeeping','corporate_tax','payroll','annual','other')),
  period TEXT,
  file_url TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  opened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KYC
CREATE TABLE kyc_documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  doc_type TEXT NOT NULL CHECK (doc_type IN ('emirates_id_front','emirates_id_back','passport','trade_licence','bank_statement','other')),
  file_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','missing')),
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRANSACTIONS
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  type TEXT NOT NULL CHECK (type IN ('stripe_payment','credit_deduction','credit_topup','refund','failed_payment')),
  description TEXT,
  amount DECIMAL(10,2),
  credits INTEGER,
  stripe_payment_intent_id TEXT,
  stripe_invoice_id TEXT,
  task_id UUID REFERENCES tasks(id),
  status TEXT DEFAULT 'success' CHECK (status IN ('success','pending','failed','refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- COMMISSIONS
CREATE TABLE commissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sales_rep_id UUID REFERENCES profiles(id),
  client_id UUID REFERENCES clients(id),
  lead_id UUID REFERENCES leads(id),
  base_amount DECIMAL(10,2) DEFAULT 200.00,
  bonus_amount DECIMAL(10,2) DEFAULT 0,
  after_hours_bonus DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2),
  is_after_hours BOOLEAN DEFAULT false,
  converted_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','paid','rejected')),
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  month INTEGER,
  year INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PAYROLL
CREATE TABLE payroll_runs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','processing','completed','cancelled')),
  total_amount DECIMAL(10,2),
  run_by UUID REFERENCES profiles(id),
  run_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payroll_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  payroll_run_id UUID REFERENCES payroll_runs(id),
  employee_id UUID REFERENCES profiles(id),
  base_salary DECIMAL(10,2) DEFAULT 0,
  commission_earned DECIMAL(10,2) DEFAULT 0,
  bonus_earned DECIMAL(10,2) DEFAULT 0,
  after_hours_bonus DECIMAL(10,2) DEFAULT 0,
  fine_deduction DECIMAL(10,2) DEFAULT 0,
  other_deductions DECIMAL(10,2) DEFAULT 0,
  total_payable DECIMAL(10,2),
  currency TEXT DEFAULT 'AED',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- EXPENSES
CREATE TABLE expenses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('software','marketing','office','salary','tools','legal','other')),
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'AED',
  receipt_url TEXT,
  recorded_by UUID REFERENCES profiles(id),
  expense_date DATE DEFAULT CURRENT_DATE,
  month INTEGER,
  year INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ANNOUNCEMENTS
CREATE TABLE announcements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  sent_by UUID REFERENCES profiles(id),
  target TEXT NOT NULL CHECK (target IN ('all','accountants','sales','individual')),
  target_user_id UUID REFERENCES profiles(id),
  channels TEXT[] DEFAULT ARRAY['email'],
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','scheduled','sent')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- EMAIL CAMPAIGNS
CREATE TABLE email_campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  target TEXT NOT NULL CHECK (target IN ('all_clients','starter','growth','pro','uae','uk','individual')),
  target_client_id UUID REFERENCES clients(id),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','scheduled','sent')),
  total_sent INTEGER DEFAULT 0,
  total_opened INTEGER DEFAULT 0,
  total_clicked INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TEAM ACTIVITY
CREATE TABLE team_activity (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  page TEXT,
  ip_address TEXT,
  logged_in_at TIMESTAMPTZ,
  logged_out_at TIMESTAMPTZ,
  session_minutes INTEGER,
  is_after_hours BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  message TEXT,
  type TEXT CHECK (type IN ('finance','client','sales','system','task','lead')),
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- VAT DEADLINES
CREATE TABLE vat_deadlines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  period TEXT NOT NULL,
  period_start DATE,
  period_end DATE,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming','in_progress','filed','overdue')),
  filed_at TIMESTAMPTZ,
  filed_by UUID REFERENCES profiles(id),
  penalty_risk BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SETTINGS
CREATE TABLE settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  category TEXT,
  updated_by UUID REFERENCES profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- DEFAULT SETTINGS
INSERT INTO settings (key,value,category) VALUES
('stripe_secret_key','','integrations'),
('stripe_webhook_secret','','integrations'),
('whatsapp_api_token','','integrations'),
('whatsapp_phone_number_id','','integrations'),
('whatsapp_business_number','+971527404854','integrations'),
('google_sheet_id','','integrations'),
('google_sheets_api_key','','integrations'),
('smtp_host','','email'),('smtp_port','587','email'),
('smtp_user','','email'),('smtp_pass','','email'),
('smtp_from_name','Balans Accounting','email'),
('smtp_from_email','hello@balans.ae','email'),
('starter_price','750','pricing'),('growth_price','1500','pricing'),('pro_price','2250','pricing'),
('starter_credits','600','pricing'),('growth_credits','1200','pricing'),('pro_credits','1800','pricing'),
('free_trial_days','3','pricing'),
('commission_per_conversion','200','commissions'),
('one_hour_rule_enabled','true','leads'),
('lead_assignment_method','round_robin','leads'),
('task_escalation_days','3','automation'),
('credit_alert_threshold','100','automation'),
('vat_reminder_days','14','automation'),
('working_hours_start','10:00','team'),
('working_hours_end','19:00','team'),
('working_days','MON,TUE,WED,THU,FRI,SAT','team');

-- ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_profile" ON profiles FOR SELECT USING (id=auth.uid());
CREATE POLICY "admin_all_profiles" ON profiles FOR ALL USING ((SELECT role FROM profiles WHERE id=auth.uid())='admin');
CREATE POLICY "own_notifications" ON notifications FOR ALL USING (user_id=auth.uid());
CREATE POLICY "client_own_data" ON clients FOR SELECT USING (profile_id=auth.uid());
CREATE POLICY "client_own_docs" ON documents FOR ALL USING (client_id IN (SELECT id FROM clients WHERE profile_id=auth.uid()));

-- TRIGGERS
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at=NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER upd_clients BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER upd_leads BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER upd_tasks BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- AUTO-CREATE PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id,email,role,full_name)
  VALUES (NEW.id,NEW.email,COALESCE(NEW.raw_user_meta_data->>'role','client'),COALESCE(NEW.raw_user_meta_data->>'full_name',''));
  RETURN NEW;
END; $$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- AUTO-CALCULATE COMMISSION TOTAL
CREATE OR REPLACE FUNCTION calc_commission() RETURNS TRIGGER AS $$
BEGIN NEW.total_amount=NEW.base_amount+NEW.bonus_amount+NEW.after_hours_bonus; RETURN NEW; END; $$ LANGUAGE plpgsql;
CREATE TRIGGER calc_comm BEFORE INSERT OR UPDATE ON commissions FOR EACH ROW EXECUTE FUNCTION calc_commission();

-- AUTO-CALCULATE PAYROLL TOTAL
CREATE OR REPLACE FUNCTION calc_payroll() RETURNS TRIGGER AS $$
BEGIN NEW.total_payable=NEW.base_salary+NEW.commission_earned+NEW.bonus_earned+NEW.after_hours_bonus-NEW.fine_deduction-NEW.other_deductions; RETURN NEW; END; $$ LANGUAGE plpgsql;
CREATE TRIGGER calc_pay BEFORE INSERT OR UPDATE ON payroll_items FOR EACH ROW EXECUTE FUNCTION calc_payroll();

-- CREDITS REMAINING VIEW
CREATE OR REPLACE VIEW client_credits AS
SELECT id,company_name,plan,credits_total,credits_used,(credits_total-credits_used) AS credits_remaining FROM clients;
