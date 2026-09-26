import { createClient } from "@/lib/supabase/client";
import type { Test } from "@/types/database";

export async function getTests(): Promise<Test[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tests")
    .select("*")
    .eq("is_active", true)
    .order("name_ar");
  if (error) {
    console.error("getTests error:", error);
    return [];
  }
  return data || [];
}

export async function getTestCategories() {
  const supabase = createClient();
  const { data } = await supabase
    .from("test_categories")
    .select("*")
    .order("sort_order");
  return data || [];
}
