import { createClient } from "@/lib/supabase/client";
import type { Sample } from "@/types/database";

export async function getSamples(status?: string): Promise<Sample[]> {
  const supabase = createClient();
  let query = supabase
    .from("samples")
    .select("*, patient:patients(full_name), test:tests(name_ar)")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return [];
  return (data || []).map((s: any) => ({
    ...s,
    patient: s.patient,
    test: s.test,
  }));
}

export async function updateSampleStatus(
  id: string,
  status: Sample["status"],
  extra?: { rejection_reason?: string }
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const updates: any = { status, updated_at: new Date().toISOString() };

  if (status === "collected") updates.collected_at = new Date().toISOString();
  if (status === "received") updates.received_at = new Date().toISOString();
  if (status === "rejected") {
    updates.rejected_at = new Date().toISOString();
    updates.rejection_reason = extra?.rejection_reason;
  }

  const { error } = await supabase.from("samples").update(updates).eq("id", id);
  return { error: error?.message || null };
}
