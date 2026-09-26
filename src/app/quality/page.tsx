"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, CheckCircle, XCircle, Shield } from "lucide-react";
import { formatDate } from "@/lib/utils";

const records = [
  { id: "1", test: "TSH", device: "Cobas e411", expected: "2.5", actual: "2.48", passed: true, date: "2026-09-25" },
  { id: "2", test: "CBC - HGB", device: "Sysmex XN", expected: "14.0", actual: "14.1", passed: true, date: "2026-09-25" },
  { id: "3", test: "Glucose", device: "Cobas c311", expected: "100", actual: "108", passed: false, date: "2026-09-24" },
  { id: "4", test: "ALT", device: "Cobas c311", expected: "25", actual: "24.5", passed: true, date: "2026-09-24" },
];

export default function QualityPage() {
  return (
    <AppShell title="رقابة الجودة">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-500">تسجيل نتائج المعايرة الدورية للأجهزة</p>
          <Button><Plus className="w-4 h-4" /> تسجيل معايرة</Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الاختبار</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الجهاز</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">المتوقع</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الفعلي</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">النتيجة</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-medium">{r.test}</td>
                    <td className="px-4 py-3 text-sm">{r.device}</td>
                    <td className="px-4 py-3 text-sm">{r.expected}</td>
                    <td className="px-4 py-3 text-sm">{r.actual}</td>
                    <td className="px-4 py-3">
                      {r.passed ? (
                        <span className="inline-flex items-center gap-1 text-green-700 text-sm"><CheckCircle className="w-4 h-4" /> ناجح</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-700 text-sm"><XCircle className="w-4 h-4" /> فاشل</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">{formatDate(r.date)}</td>
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
