"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Send, CheckCircle, FileText } from "lucide-react";

const mockResults = [
  { id: "1", patient: "أحمد محمد", test: "CBC", value: "HGB: 14.2", status: "signed", is_abnormal: false },
  { id: "2", patient: "سارة أحمد", test: "TSH", value: "5.8", status: "pending_review", is_abnormal: true },
  { id: "3", patient: "محمد خالد", test: "Liver Profile", value: "ALT: 45", status: "draft", is_abnormal: false },
  { id: "4", patient: "فاطمة محمود", test: "Lipid Profile", value: "LDL: 160", status: "reviewed", is_abnormal: true },
];

const statusMap: Record<string, { label: string; class: string }> = {
  draft: { label: "مسودة", class: "bg-slate-100 text-slate-700" },
  pending_review: { label: "بانتظار المراجعة", class: "bg-amber-100 text-amber-800" },
  reviewed: { label: "تمت المراجعة", class: "bg-blue-100 text-blue-800" },
  signed: { label: "موقعة", class: "bg-green-100 text-green-800" },
  sent: { label: "تم الإرسال", class: "bg-emerald-100 text-emerald-800" },
};

export default function ResultsPage() {
  return (
    <AppShell title="النتائج">
      <div className="space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="بحث بالمريض أو الاختبار..." className="pr-10" />
        </div>
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">المريض</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الاختبار</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">النتيجة</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الحالة</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {mockResults.map((r) => (
                  <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-medium">{r.patient}</td>
                    <td className="px-4 py-3 text-sm">{r.test}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={r.is_abnormal ? "text-red-600 font-medium" : ""}>
                        {r.value}{r.is_abnormal && " ⚠"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[r.status].class}`}>
                        {statusMap[r.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" title="عرض"><FileText className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" title="توقيع"><CheckCircle className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" title="إرسال"><Send className="w-4 h-4" /></Button>
                      </div>
                    </td>
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
