"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Home, Building2, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

const mockAppointments = [
  { id: "1", patient: "أحمد محمد", type: "home_visit", scheduled_at: "2026-09-26T10:00:00", status: "confirmed", address: "المعادي - شارع 9" },
  { id: "2", patient: "سارة أحمد", type: "lab_visit", scheduled_at: "2026-09-26T11:30:00", status: "pending", address: null },
  { id: "3", patient: "محمد خالد", type: "home_visit", scheduled_at: "2026-09-26T14:00:00", status: "confirmed", address: "مدينة نصر" },
  { id: "4", patient: "فاطمة محمود", type: "lab_visit", scheduled_at: "2026-09-27T09:00:00", status: "pending", address: null },
];

const statusMap: Record<string, { label: string; class: string }> = {
  pending: { label: "معلق", class: "bg-amber-100 text-amber-800" },
  confirmed: { label: "مؤكد", class: "bg-green-100 text-green-800" },
  completed: { label: "مكتمل", class: "bg-slate-100 text-slate-700" },
  cancelled: { label: "ملغي", class: "bg-red-100 text-red-800" },
};

export default function AppointmentsPage() {
  return (
    <AppShell title="إدارة الحجوزات">
      <div className="space-y-6">
        <div className="flex justify-between">
          <p className="text-sm text-slate-500">{mockAppointments.length} حجز</p>
          <Button><Plus className="w-4 h-4" /> حجز جديد</Button>
        </div>
        <div className="space-y-3">
          {mockAppointments.map((a) => (
            <Card key={a.id}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${a.type === "home_visit" ? "bg-purple-100" : "bg-blue-100"}`}>
                    {a.type === "home_visit" ? <Home className="w-5 h-5 text-purple-600" /> : <Building2 className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{a.patient}</p>
                    <p className="text-sm text-slate-500">
                      {a.type === "home_visit" ? "زيارة منزلية" : "زيارة مختبر"}
                      {a.address && ` — ${a.address}`}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(a.scheduled_at)} — {new Date(a.scheduled_at).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[a.status]?.class || ""}`}>
                    {statusMap[a.status]?.label || a.status}
                  </span>
                  <Button variant="outline" size="sm">تفاصيل</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
