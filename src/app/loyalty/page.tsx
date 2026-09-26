"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Plus, Ticket } from "lucide-react";

const codes = [
  { code: "SUMMER30", type: "percentage", value: 30, used: 12, max: 100, valid_until: "2026-12-31" },
  { code: "WELCOME50", type: "fixed", value: 50, used: 45, max: 200, valid_until: "2026-10-31" },
  { code: "VIP100", type: "fixed", value: 100, used: 3, max: 50, valid_until: "2026-12-31" },
];

export default function LoyaltyPage() {
  return (
    <AppShell title="نظام الولاء">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500"><Gift className="w-5 h-5 text-white" /></div>
              <div><p className="text-sm text-slate-500">نقاط لكل جنيه</p><p className="text-xl font-bold">1 نقطة</p></div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary-600"><Ticket className="w-5 h-5 text-white" /></div>
              <div><p className="text-sm text-slate-500">نقاط للخصم</p><p className="text-xl font-bold">100 = 10 ج.م</p></div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500"><Gift className="w-5 h-5 text-white" /></div>
              <div><p className="text-sm text-slate-500">أكواد نشطة</p><p className="text-xl font-bold">{codes.length}</p></div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">أكواد الخصم</h2>
          <Button><Plus className="w-4 h-4" /> كود جديد</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {codes.map((c) => (
            <Card key={c.code}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-bold text-primary-600 text-lg">{c.code}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">نشط</span>
                </div>
                <p className="text-2xl font-bold">
                  {c.type === "percentage" ? `${c.value}%` : `${c.value} ج.م`}
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  استخدم {c.used} من {c.max} — حتى {c.valid_until}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
