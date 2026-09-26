"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Eye, Edit, Phone, User } from "lucide-react";

const mockPatients = [
  { id: "1", patient_code: "P000001", full_name: "أحمد محمد علي", gender: "male", phone: "01012345678", birth_date: "1990-05-15", loyalty_points: 120 },
  { id: "2", patient_code: "P000002", full_name: "سارة أحمد حسن", gender: "female", phone: "01098765432", birth_date: "1985-11-22", loyalty_points: 85 },
  { id: "3", patient_code: "P000003", full_name: "محمد خالد إبراهيم", gender: "male", phone: "01123456789", birth_date: "1978-03-08", loyalty_points: 200 },
  { id: "4", patient_code: "P000004", full_name: "فاطمة محمود", gender: "female", phone: "01234567890", birth_date: "1995-07-30", loyalty_points: 45 },
  { id: "5", patient_code: "P000005", full_name: "عمر يوسف", gender: "male", phone: "01567890123", birth_date: "2000-01-12", loyalty_points: 30 },
];

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockPatients.filter(
    (p) => p.full_name.includes(search) || p.phone.includes(search) || p.patient_code.includes(search)
  );

  return (
    <AppShell title="المرضى">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="بحث بالاسم أو الهاتف أو الكود..." className="pr-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Link href="/patients/new"><Button><Plus className="w-4 h-4" /> إضافة مريض جديد</Button></Link>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الكود</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الاسم</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الجنس</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">الهاتف</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">نقاط الولاء</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((patient) => (
                    <tr key={patient.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-mono text-primary-600">{patient.patient_code}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center"><User className="w-4 h-4 text-primary-600" /></div>
                          <span className="text-sm font-medium">{patient.full_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{patient.gender === "male" ? "ذكر" : "أنثى"}</td>
                      <td className="px-4 py-3 text-sm"><div className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" />{patient.phone}</div></td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">{patient.loyalty_points} نقطة</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
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
