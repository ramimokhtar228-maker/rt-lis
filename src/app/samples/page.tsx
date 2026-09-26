"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

const statusMap: Record<string, { label: string; class: string }> = {
  pending: { label: "في الانتظار", class: "bg-slate-100 text-slate-700" },
  collected: { label: "تم السحب", class: "bg-blue-100 text-blue-800" },
  received: { label: "تم الاستلام", class: "bg-cyan-100 text-cyan-800" },
  processing: { label: "قيد الفحص", class: "bg-amber-100 text-amber-800" },
  completed: { label: "مكتمل", class: "bg-green-100 text-green-800" },
  rejected: { label: "مرفوض", class: "bg-red-100 text-red-800" },
};

const mockSamples = [
  { id: "1", barcode: "RT1727300001", patient: "أحمد محمد", test: "CBC", status: "completed" },
  { id: "2", barcode: "RT1727300002", patient: "سارة أحمد", test: "Liver Profile", status: "processing" },
  { id: "3", barcode: "RT1727300003", patient: "محمد خالد", test: "TSH", status: "received" },
  { id: "4", barcode: "RT1727300004", patient: "فاطمة محمود", test: "Lipid Profile", status: "collected" },
  { id: "5", barcode: "RT1727300005", patient: "عمر يوسف", test: "Kidney Profile", status: "pending" },
];

export default function SamplesPage() {
  return (
    <AppShell title="متابعة العينات">
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {["pending", "collected", "received", "processing", "completed"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${statusMap[s].class}`}>{statusMap[s].label}</div>
              {i < 4 && <div className="w-8 h-0.5 bg-slate-300" />}
            </div>
          ))}
        </div>
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="بحث بالباركود..." className="pr-10" />
        </div>
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الباركود</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">المريض</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الاختبار</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الحالة</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {mockSamples.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-mono text-primary-600">{s.barcode}</td>
                    <td className="px-4 py-3 text-sm">{s.patient}</td>
                    <td className="px-4 py-3 text-sm">{s.test}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[s.status].class}`}>{statusMap[s.status].label}</span>
                    </td>
                    <td className="px-4 py-3"><Button variant="outline" size="sm">تحديث الحالة</Button></td>
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
