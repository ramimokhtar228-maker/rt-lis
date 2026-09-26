import { createClient } from "@/lib/supabase/client";
import type { Invoice, InvoiceItem } from "@/types/database";

export async function getInvoices(search?: string): Promise<Invoice[]> {
  const supabase = createClient();
  let query = supabase
    .from("invoices")
    .select("*, patient:patients(full_name, phone), items:invoice_items(*)")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`invoice_number.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getInvoices error:", error);
    return [];
  }
  return (data || []).map((inv: any) => ({
    ...inv,
    patient: inv.patient,
    items: inv.items,
  }));
}

export async function createInvoice(payload: {
  patient_id: string;
  branch_id?: string;
  items: { test_id: string; test_name: string; price: number; quantity?: number }[];
  discount_amount?: number;
  discount_percentage?: number;
  notes?: string;
  paid_amount?: number;
  payment_method_id?: string;
}): Promise<{ data: Invoice | null; error: string | null }> {
  const supabase = createClient();

  const subtotal = payload.items.reduce(
    (sum, i) => sum + i.price * (i.quantity || 1),
    0
  );
  const discount =
    payload.discount_amount ||
    (payload.discount_percentage
      ? (subtotal * payload.discount_percentage) / 100
      : 0);
  const total = Math.max(0, subtotal - discount);
  const paid = payload.paid_amount || 0;
  const status =
    paid >= total ? "paid" : paid > 0 ? "partial" : "pending";

  const { data: invoice, error: invError } = await supabase
    .from("invoices")
    .insert({
      patient_id: payload.patient_id,
      branch_id: payload.branch_id,
      subtotal,
      discount_amount: discount,
      discount_percentage: payload.discount_percentage || 0,
      total_amount: total,
      paid_amount: paid,
      status,
      notes: payload.notes,
    })
    .select()
    .single();

  if (invError || !invoice) {
    return { data: null, error: invError?.message || "Failed to create invoice" };
  }

  const items = payload.items.map((item) => ({
    invoice_id: invoice.id,
    test_id: item.test_id,
    test_name: item.test_name,
    price: item.price,
    quantity: item.quantity || 1,
    discount: 0,
    total: item.price * (item.quantity || 1),
  }));

  const { error: itemsError } = await supabase
    .from("invoice_items")
    .insert(items);

  if (itemsError) {
    return { data: null, error: itemsError.message };
  }

  // Create samples for each item
  for (const item of items) {
    const barcode = `RT${Date.now()}${Math.floor(Math.random() * 1000)}`;
    await supabase.from("samples").insert({
      barcode,
      invoice_item_id: undefined, // will link after if needed
      patient_id: payload.patient_id,
      test_id: item.test_id,
      status: "pending",
      branch_id: payload.branch_id,
    });
  }

  if (paid > 0 && payload.payment_method_id) {
    await supabase.from("payments").insert({
      invoice_id: invoice.id,
      amount: paid,
      payment_method_id: payload.payment_method_id,
    });
  }

  return { data: invoice, error: null };
}
