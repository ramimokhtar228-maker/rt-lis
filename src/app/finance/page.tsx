"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const mockExpenses = [
  { id: "1", category: "رواتب", amount: 25000, description: "رواتب شهر سبتمبر", date: "2026-09-01" },
  { id: "2", category: "مستهلكات", amount: 4200, description: "شراء أنابيب وكواشف", date: "2026-09-10" },
  { id: "3", category: "إيجار", amount: 8000, description: "إيجار الفرع الرئيسي", date: "2026-09-01" },
  { id: "4", category: "كهرباء وماء", amount: 1500, description: "فاتورة الكهرباء", date: "2026-09-15" },
];

export default function FinancePage() {
  const totalExpenses = mockExpenses.reduce((s, e) => s + e.amount, 0);
  const revenue = 185400;
  const profit = revenue - totalExpenses;

  return (
    <AppShell title="الإدارة المالية">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500"><TrendingUp className="w-5 h-5 text-white" /></div>
              <div><p className="text-sm text-slate-500">الإيرادات</p><p className="text-xl font-bold text-emerald-600">{formatCurrency(revenue)}</p></div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500"><TrendingDown className="w-5 h-5 text-white" /></div>
              <div><p className="text-sm text-slate-500">المصاريف</p><p className="text-xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p></div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary-600"><Wallet className="w-5 h-5 text-white" /></div>
              <div><p className="text-sm text-slate-500">صافي الربح</p><p className="text-xl font-bold text-primary-600">{formatCurrency(profit)}</p></div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">المصاريف</h2>
          <Button><Plus className="w-4 h-4" /> إضافة مصروف</Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">البند</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الوصف</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">المبلغ</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {mockExpenses.map((e) => (
                  <tr key={e.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-medium">{e.category}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{e.description}</td>
                    <td className="px-4 py-3 text-sm text-red-600">{formatCurrency(e.amount)}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{formatDate(e.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
