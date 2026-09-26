-- =====================================================
-- RT LIS - Laboratory Information System
-- Complete Database Schema for Supabase
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. BRANCHES (الفروع)
-- =====================================================
CREATE TABLE branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_en TEXT,
  address TEXT,
  phone TEXT,
  is_main BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 2. PROFILES (المستخدمين)
-- =====================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'receptionist',
  branch_id UUID REFERENCES branches(id),
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 3. INSURANCE COMPANIES (شركات التأمين)
-- =====================================================
CREATE TABLE insurance_companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  discount_percentage NUMERIC(5,2) DEFAULT 0,
  contact_person TEXT,
  phone TEXT,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- 4. PATIENTS (المرضى)
-- =====================================================
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone TEXT,
  national_id TEXT,
  date_of_birth DATE,
  gender TEXT,
  address TEXT,
  insurance_company_id UUID REFERENCES insurance_companies(id),
  insurance_number TEXT,
  notes TEXT,
  loyalty_points INTEGER DEFAULT 0,
  branch_id UUID REFERENCES branches(id),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 5. TESTS (التحاليل)
-- =====================================================
CREATE TABLE test_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  name_en TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES test_categories(id),
  name_ar TEXT NOT NULL,
  name_en TEXT,
  code TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  sample_type TEXT,
  turnaround_hours INTEGER DEFAULT 24,
  reference_range TEXT,
  unit TEXT,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE price_lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  insurance_company_id UUID REFERENCES insurance_companies(id),
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE price_list_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  price_list_id UUID REFERENCES price_lists(id),
  test_id UUID REFERENCES tests(id),
  price NUMERIC(10,2) NOT NULL
);

CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  insurance_company_id UUID REFERENCES insurance_companies(id),
  price_list_id UUID REFERENCES price_lists(id),
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- 6. INVOICES (الفواتير)
-- =====================================================
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id),
  invoice_number TEXT,
  total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(12,2) DEFAULT 0,
  paid_amount NUMERIC(12,2) DEFAULT 0,
  status TEXT DEFAULT 'unpaid',
  branch_id UUID REFERENCES branches(id),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoices(id),
  test_id UUID REFERENCES tests(id),
  price NUMERIC(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1
);

CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  name_en TEXT
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoices(id),
  amount NUMERIC(12,2) NOT NULL,
  payment_method_id UUID REFERENCES payment_methods(id),
  paid_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES profiles(id)
);

-- =====================================================
-- 7. SAMPLES (العينات)
-- =====================================================
CREATE TABLE samples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id),
  invoice_id UUID REFERENCES invoices(id),
  sample_code TEXT,
  status TEXT DEFAULT 'collected',
  collected_at TIMESTAMPTZ DEFAULT now(),
  collected_by UUID REFERENCES profiles(id),
  branch_id UUID REFERENCES branches(id)
);

-- =====================================================
-- 8. RESULTS (النتائج)
-- =====================================================
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sample_id UUID REFERENCES samples(id),
  test_id UUID REFERENCES tests(id),
  value TEXT,
  is_abnormal BOOLEAN DEFAULT false,
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  signed_by UUID REFERENCES profiles(id),
  signed_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending'
);

-- =====================================================
-- 9. APPOINTMENTS (الحجوزات)
-- =====================================================
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id),
  appointment_type TEXT DEFAULT 'lab',
  scheduled_at TIMESTAMPTZ NOT NULL,
  address TEXT,
  status TEXT DEFAULT 'scheduled',
  branch_id UUID REFERENCES branches(id),
  created_by UUID REFERENCES profiles(id)
);

-- =====================================================
-- 10. INVENTORY (المخزن)
-- =====================================================
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  unit TEXT,
  min_quantity NUMERIC(10,2) DEFAULT 0,
  supplier_id UUID REFERENCES suppliers(id),
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE product_stocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id),
  branch_id UUID REFERENCES branches(id),
  quantity NUMERIC(10,2) DEFAULT 0
);

CREATE TABLE stock_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id),
  branch_id UUID REFERENCES branches(id),
  quantity NUMERIC(10,2) NOT NULL,
  movement_type TEXT NOT NULL,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE test_consumptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_id UUID REFERENCES tests(id),
  product_id UUID REFERENCES products(id),
  quantity_per_test NUMERIC(10,4) NOT NULL
);

-- =====================================================
-- 15. FINANCIAL (المالية)
-- =====================================================
CREATE TABLE expense_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES expense_categories(id),
  amount NUMERIC(12,2) NOT NULL,
  description TEXT,
  payment_method_id UUID REFERENCES payment_methods(id),
  receipt_url TEXT,
  branch_id UUID REFERENCES branches(id),
  created_by UUID REFERENCES profiles(id),
  expense_date DATE DEFAULT CURRENT_DATE
);

-- =====================================================
-- 16. LOYALTY (الولاء)
-- =====================================================
CREATE TABLE loyalty_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  points_per_currency NUMERIC(10,2) DEFAULT 1,
  points_to_discount NUMERIC(10,2) DEFAULT 100,
  discount_value NUMERIC(10,2) DEFAULT 10
);

CREATE TABLE discount_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_percentage NUMERIC(5,2),
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ
);

-- =====================================================
-- 17. QUALITY CONTROL (رقابة الجودة)
-- =====================================================
CREATE TABLE qc_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_id UUID REFERENCES tests(id),
  control_level TEXT,
  expected_value NUMERIC(12,4),
  measured_value NUMERIC(12,4),
  is_within_range BOOLEAN,
  recorded_by UUID REFERENCES profiles(id),
  recorded_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 18. NOTIFICATIONS / REPORTS
-- =====================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id),
  title TEXT,
  body TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE report_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  content TEXT
);

-- =====================================================
-- SEED DATA
-- =====================================================
INSERT INTO payment_methods (name_ar, name_en) VALUES
  ('نقدي', 'cash'),
  ('فيزا', 'visa'),
  ('تحويل بنكي', 'bank_transfer'),
  ('شيك', 'cheque'),
  ('دفع إلكتروني', 'electronic');

INSERT INTO test_categories (name_ar, name_en, sort_order) VALUES
  ('تحاليل الدم', 'Hematology', 1),
  ('الكيمياء الحيوية', 'Biochemistry', 2),
  ('الهرمونات', 'Hormones', 3),
  ('المناعة', 'Immunology', 4),
  ('المزارع', 'Cultures', 5),
  ('البول والبراز', 'Urine & Stool', 6);

INSERT INTO expense_categories (name) VALUES
  ('رواتب'), ('إيجار'), ('كهرباء وماء'), ('مستهلكات'), ('صيانة'), ('تسويق'), ('أخرى');

-- Default loyalty settings
INSERT INTO loyalty_settings (points_per_currency, points_to_discount, discount_value)
VALUES (1, 100, 10);

COMMIT;