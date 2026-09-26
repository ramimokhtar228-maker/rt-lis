"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Building2, MapPin, Phone, Clock } from "lucide-react";

const branches = [
  { id: "1", name: "الفرع الرئيسي", address: "المعادي - كورنيش النيل", phone: "02-25252525", hours: "8 ص - 10 م", active: true },
  { id: "2", name: "فرع مدينة نصر", address: "شارع عباس العقاد", phone: "02-24111111", hours: "9 ص - 9 م", active: true },
  { id: "3", name: "فرع المهندسين", address: "شارع جامعة الدول", phone: "02-33333333", hours: "8 ص - 8 م", active: true },
];

export default function BranchesPage() {
  return (
    <AppShell title="الفروع">
      <div className="space-y-6">
        <div className="flex justify-between">
          <p className="text-sm text-slate-500">{branches.length} فروع</p>
          <Button><Plus className="w-4 h-4" /> إضافة فرع</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((b) => (
            <Card key={b.id}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary-100"><Building2 className="w-5 h-5 text-primary-600" /></div>
                  <div>
                    <p className="font-medium">{b.name}</p>
                    {b.active && <span className="text-xs text-green-600">نشط</span>}
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{b.address}</div>
                  <div className="flex items-center gap-2"><Phone className="w-4 h-4" />{b.phone}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{b.hours}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
