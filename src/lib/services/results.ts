import { createClient } from "@/lib/supabase/client";
import type { Result } from "@/types/database";

export async function getResults(): Promise<Result[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("results")
    .select("*, sample:samples(barcode, patient:patients(full_name)), test:tests(name_ar, unit, normal_range_male, normal_range_female)")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

export async function saveResult(payload: {
  sample_id: string;
  test_id: string;
  value: string;
  unit?: string;
  is_abnormal?: boolean;
  reference_range?: string;
  comments?: string;
}): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.from("results").upsert({
    ...payload,
    status: "draft",
    entered_at: new Date().toISOString(),
  });
  return { error: error?.message || null };
}

export async function reviewResult(id: string): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("results")
    .update({ status: "reviewed", reviewed_at: new Date().toISOString() })
    .eq("id", id);
  return { error: error?.message || null };
}

export async function signResult(id: string): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("results")
    .update({ status: "signed", signed_at: new Date().toISOString() })
    .eq("id", id);
  return { error: error?.message || null };
}

export async function markResultSent(id: string, via: string[]): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("results")
    .update({ status: "sent", sent_at: new Date().toISOString(), sent_via: via })
    .eq("id", id);
  return { error: error?.message || null };
}
