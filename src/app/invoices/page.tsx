"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Eye, Printer } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const mockInvoices = [
  { id: "1", invoice_number: "INV-20260925-0001", patient_name: "أحمد محمد علي", total: 450, paid: 450, status: "paid", created_at: "2026-09-25" },
  { id: "2", invoice_number: "INV-20260925-0002", patient_name: "سارة أحمد حسن", total: 820, paid: 400, status: "partial", created_at: "2026-09-25" },
  { id: "3", invoice_number: "INV-20260924-0003", patient_name: "محمد خالد", total: 320, paid: 0, status: "pending", created_at: "2026-09-24" },
  { id: "4", invoice_number: "INV-20260924-0004", patient_name: "فاطمة محمود", total: 150, paid: 150, status: "paid", created_at: "2026-09-24" },
];

const statusMap: Record<string, { label: string; class: string }> = {
  paid: { label: "مدفوعة", class: "bg-green-100 text-green-800" },
  partial: { label: "جزئية", class: "bg-amber-100 text-amber-800" },
  pending: { label: "معلقة", class: "bg-red-100 text-red-800" },
  cancelled: { label: "ملغاة", class: "bg-slate-100 text-slate-800" },
};

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  return (
    <AppShell title="الفواتير">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="بحث برقم الفاتورة أو اسم المريض..." className="pr-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Link href="/invoices/new"><Button><Plus className="w-4 h-4" /> فاتورة جديدة</Button></Link>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">رقم الفاتورة</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">المريض</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">المبلغ</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">المدفوع</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الحالة</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">التاريخ</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInvoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-mono text-primary-600">{inv.invoice_number}</td>
                      <td className="px-4 py-3 text-sm font-medium">{inv.patient_name}</td>
                      <td className="px-4 py-3 text-sm">{formatCurrency(inv.total)}</td>
                      <td className="px-4 py-3 text-sm">{formatCurrency(inv.paid)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[inv.status].class}`}>
                          {statusMap[inv.status].label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500">{formatDate(inv.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon"><Printer className="w-4 h-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
