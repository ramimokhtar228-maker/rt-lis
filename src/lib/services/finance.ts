import { createClient } from "@/lib/supabase/client";

export async function getExpenses() {
  const supabase = createClient();
  const { data } = await supabase
    .from("expenses")
    .select("*, category:expense_categories(name)")
    .order("expense_date", { ascending: false });
  return data || [];
}

export async function addExpense(payload: {
  category_id?: string;
  amount: number;
  description?: string;
  payment_method_id?: string;
  branch_id?: string;
  expense_date?: string;
}) {
  const supabase = createClient();
  const { error } = await supabase.from("expenses").insert(payload);
  return { error: error?.message || null };
}

export async function getPaymentMethods() {
  const supabase = createClient();
  const { data } = await supabase
    .from("payment_methods")
    .select("*")
    .eq("is_active", true);
  return data || [];
}

export async function getDashboardStats() {
  const supabase = createClient();
  const [patients, invoices, samples, expenses] = await Promise.all([
    supabase.from("patients").select("id", { count: "exact", head: true }),
    supabase.from("invoices").select("total_amount, paid_amount, status"),
    supabase.from("samples").select("status"),
    supabase.from("expenses").select("amount"),
  ]);

  const invData = invoices.data || [];
  const revenue = invData.reduce((s: number, i: any) => s + Number(i.paid_amount || 0), 0);
  const totalExpenses = (expenses.data || []).reduce(
    (s: number, e: any) => s + Number(e.amount || 0),
    0
  );
  const sampleData = samples.data || [];
  const completed = sampleData.filter((s: any) => s.status === "completed").length;
  const pending = sampleData.filter((s: any) =>
    ["pending", "collected", "received", "processing"].includes(s.status)
  ).length;

  return {
    patients_count: patients.count || 0,
    invoices_count: invData.length,
    revenue,
    expenses: totalExpenses,
    profit: revenue - totalExpenses,
    completed_tests: completed,
    pending_tests: pending,
  };
}
