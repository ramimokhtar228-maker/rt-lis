"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, BarChart3, Users, FlaskConical, Wallet } from "lucide-react";

const reportTypes = [
  { title: "التقرير المالي", desc: "الدخل والمصاريف والمشتريات ورصيد الخزائن", icon: Wallet, color: "bg-emerald-500" },
  { title: "إحصائيات الاختبارات", desc: "الاختبارات والباقات الأكثر طلباً", icon: FlaskConical, color: "bg-blue-500" },
  { title: "تقرير المرضى", desc: "المرضى الأكثر تعاملاً والإحالات", icon: Users, color: "bg-purple-500" },
  { title: "مطالبات التأمين", desc: "تفاصيل فواتير كل شركة تأمين", icon: FileText, color: "bg-amber-500" },
  { title: "المختبرات الخارجية", desc: "الديون والمستحقات", icon: BarChart3, color: "bg-cyan-500" },
  { title: "تقرير المخزن", desc: "المشتريات والاستهلاك والكميات", icon: FileText, color: "bg-rose-500" },
];

export default function ReportsPage() {
  return (
    <AppShell title="التقارير">
      <div className="space-y-6">
        <p className="text-sm text-slate-500">اختر نوع التقرير والفترة الزمنية لاستخراج البيانات</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((r) => {
            const Icon = r.icon;
            return (
              <Card key={r.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${r.color}`}><Icon className="w-5 h-5 text-white" /></div>
                    <div className="flex-1">
                      <p className="font-medium">{r.title}</p>
                      <p className="text-sm text-slate-500 mt-1">{r.desc}</p>
                      <Button variant="outline" size="sm" className="mt-3">
                        <Download className="w-3 h-3" /> استخراج
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
