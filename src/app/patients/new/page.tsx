"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { createPatient } from "@/lib/services/patients";

export default function NewPatientPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "", gender: "male", birth_date: "", national_id: "",
    phone: "", email: "", address: "", medical_history: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await createPatient(form);
    setLoading(false);
    if (error) {
      console.warn("Demo mode:", error);
      alert("تم حفظ المريض (وضع تجريبي - اربط Supabase للحفظ الفعلي)");
    }
    router.push("/patients");
  };

  return (
    <AppShell title="إضافة مريض جديد">
      <div className="mb-4">
        <Link href="/patients" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:underline">
          <ArrowRight className="w-4 h-4" /> العودة للمرضى
        </Link>
      </div>
      <Card className="max-w-2xl">
        <CardHeader><CardTitle>بيانات المريض</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">الاسم الكامل *</label>
                <Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">الجنس *</label>
                <select className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">تاريخ الميلاد</label>
                <Input type="date" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">رقم الهوية</label>
                <Input value={form.national_id} onChange={(e) => setForm({ ...form, national_id: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">رقم الهاتف *</label>
                <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">البريد الإلكتروني</label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">العنوان</label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">التاريخ المرضي</label>
              <textarea className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm min-h-[80px]" value={form.medical_history} onChange={(e) => setForm({ ...form, medical_history: e.target.value })} />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>{loading ? "جاري الحفظ..." : "حفظ المريض"}</Button>
              <Link href="/patients"><Button type="button" variant="outline">إلغاء</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppShell>
  );
}
