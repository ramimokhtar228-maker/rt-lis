import { createClient } from "@/lib/supabase/client";
import type { Patient } from "@/types/database";

export async function getPatients(search?: string): Promise<Patient[]> {
  const supabase = createClient();
  let query = supabase
    .from("patients")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,phone.ilike.%${search}%,patient_code.ilike.%${search}%`
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("getPatients error:", error);
    return [];
  }
  return data || [];
}

export async function getPatient(id: string): Promise<Patient | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function createPatient(
  patient: Partial<Patient>
): Promise<{ data: Patient | null; error: string | null }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("patients")
    .insert(patient)
    .select()
    .single();
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function updatePatient(
  id: string,
  updates: Partial<Patient>
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.from("patients").update(updates).eq("id", id);
  return { error: error?.message || null };
}
