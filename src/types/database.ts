export type Role = "admin" | "manager" | "receptionist" | "lab_tech" | "accountant" | "sample_collector";

export interface Branch {
  id: string;
  name: string;
  name_en?: string;
  address?: string;
  phone?: string;
  email?: string;
  working_hours?: Record<string, string>;
  is_active: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  role: Role;
  branch_id?: string;
  permissions?: Record<string, boolean>;
  cash_box_balance: number;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface Patient {
  id: string;
  patient_code?: string;
  full_name: string;
  gender?: "male" | "female";
  birth_date?: string;
  national_id?: string;
  phone?: string;
  email?: string;
  address?: string;
  insurance_company_id?: string;
  insurance_card_number?: string;
  medical_history?: string;
  loyalty_points: number;
  notes?: string;
  branch_id?: string;
  created_at: string;
}

export interface Test {
  id: string;
  code?: string;
  name_ar: string;
  name_en?: string;
  category_id?: string;
  sample_type?: string;
  unit?: string;
  normal_range_male?: string;
  normal_range_female?: string;
  normal_range_child?: string;
  turnaround_hours: number;
  formula?: string;
  is_culture: boolean;
  is_active: boolean;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  patient_id: string;
  branch_id: string;
  contract_id?: string;
  subtotal: number;
  discount_amount: number;
  discount_percentage: number;
  total_amount: number;
  paid_amount: number;
  status: "pending" | "partial" | "paid" | "cancelled";
  notes?: string;
  created_by?: string;
  created_at: string;
  patient?: Patient;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  test_id: string;
  test_name?: string;
  price: number;
  quantity: number;
  discount: number;
  total: number;
  test?: Test;
}

export interface Sample {
  id: string;
  barcode: string;
  invoice_item_id?: string;
  patient_id?: string;
  test_id?: string;
  status: "pending" | "collected" | "received" | "processing" | "completed" | "rejected" | "recollected";
  collected_at?: string;
  received_at?: string;
  rejected_at?: string;
  rejection_reason?: string;
  notes?: string;
  branch_id?: string;
  created_at: string;
  patient?: Patient;
  test?: Test;
}

export interface Result {
  id: string;
  sample_id: string;
  test_id: string;
  value?: string;
  unit?: string;
  is_abnormal: boolean;
  reference_range?: string;
  comments?: string;
  status: "draft" | "pending_review" | "reviewed" | "signed" | "sent";
  entered_by?: string;
  reviewed_by?: string;
  signed_by?: string;
  entered_at?: string;
  reviewed_at?: string;
  signed_at?: string;
  sent_at?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id?: string;
  branch_id?: string;
  type: "lab_visit" | "home_visit";
  scheduled_at: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show";
  sample_collector_id?: string;
  address?: string;
  notes?: string;
  created_at: string;
  patient?: Patient;
}

export interface Product {
  id: string;
  name: string;
  sku?: string;
  unit: string;
  category?: string;
  min_stock: number;
  is_active: boolean;
}

export interface DashboardStats {
  patients_count: number;
  invoices_count: number;
  appointments_count: number;
  completed_tests: number;
  pending_tests: number;
  revenue: number;
  expenses: number;
  profit: number;
}
