"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Package, AlertTriangle, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const mockProducts = [
  { id: "1", name: "أنابيب EDTA", sku: "TUBE-EDTA", unit: "علبة", quantity: 45, min_stock: 20, price: 120 },
  { id: "2", name: "أنابيب Plain", sku: "TUBE-PLN", unit: "علبة", quantity: 8, min_stock: 15, price: 100 },
  { id: "3", name: "كواشف CBC", sku: "RGT-CBC", unit: "عبوة", quantity: 12, min_stock: 5, price: 850 },
  { id: "4", name: "كواشف كيمياء", sku: "RGT-CHEM", unit: "عبوة", quantity: 3, min_stock: 5, price: 1200 },
  { id: "5", name: "قفازات طبية", sku: "GLV-M", unit: "علبة", quantity: 60, min_stock: 10, price: 45 },
  { id: "6", name: "إبر سحب دم", sku: "NDL-21G", unit: "علبة", quantity: 25, min_stock: 20, price: 80 },
];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const filtered = mockProducts.filter((p) => p.name.includes(search) || p.sku.includes(search));
  const lowStock = mockProducts.filter((p) => p.quantity <= p.min_stock);

  return (
    <AppShell title="نظام المخزن">
      <div className="space-y-6">
        {lowStock.length > 0 && (
          <Card className="border-amber-300 bg-amber-50">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800">تنبيه نفاذ المخزون</p>
                <p className="text-sm text-amber-700">{lowStock.map((p) => p.name).join("، ")} — يرجى إعادة الطلب</p>
              </div>
            </CardContent>
          </Card>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="بحث عن منتج..." className="pr-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button><Plus className="w-4 h-4" /> إضافة منتج / شراء</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <Card key={p.id} className={p.quantity <= p.min_stock ? "border-red-300" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-100"><Package className="w-5 h-5 text-primary-600" /></div>
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.sku}</p>
                    </div>
                  </div>
                  {p.quantity <= p.min_stock && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">منخفض</span>}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div><p className="text-lg font-bold">{p.quantity}</p><p className="text-xs text-slate-500">{p.unit}</p></div>
                  <div><p className="text-lg font-bold text-slate-400">{p.min_stock}</p><p className="text-xs text-slate-500">الحد الأدنى</p></div>
                  <div><p className="text-lg font-bold text-primary-600">{formatCurrency(p.price)}</p><p className="text-xs text-slate-500">السعر</p></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
