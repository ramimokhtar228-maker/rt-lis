import { createClient } from "@/lib/supabase/client";

export async function getProducts() {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("*, stocks:product_stocks(*)")
    .eq("is_active", true)
    .order("name");
  return data || [];
}

export async function getLowStock() {
  const supabase = createClient();
  const { data } = await supabase
    .from("product_stocks")
    .select("*, product:products(*)")
    .lt("quantity", 10); // simple threshold
  return data || [];
}

export async function addStockMovement(payload: {
  product_id: string;
  branch_id?: string;
  type: string;
  quantity: number;
  reason?: string;
  unit_price?: number;
}) {
  const supabase = createClient();
  const { error } = await supabase.from("stock_movements").insert(payload);
  if (!error && payload.branch_id) {
    // Update stock
    const { data: stock } = await supabase
      .from("product_stocks")
      .select("id, quantity")
      .eq("product_id", payload.product_id)
      .eq("branch_id", payload.branch_id)
      .single();

    if (stock) {
      const delta =
        payload.type === "purchase" || payload.type === "transfer_in"
          ? payload.quantity
          : -payload.quantity;
      await supabase
        .from("product_stocks")
        .update({ quantity: Number(stock.quantity) + delta })
        .eq("id", stock.id);
    }
  }
  return { error: error?.message || null };
}
