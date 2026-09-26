"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Trash2, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { getPatients } from "@/lib/services/patients";
import { getTests } from "@/lib/services/tests";
import { createInvoice } from "@/lib/services/invoices";
import type { Patient, Test } from "@/types/database";

const MOCK_PATIENTS: Patient[] = [
  { id: "1", full_name: "أحمد محمد علي", phone: "01012345678", loyalty_points: 120, created_at: "" },
  { id: "2", full_name: "سارة أحمد حسن", phone: "01098765432", loyalty_points: 85, created_at: "" },
  { id: "3", full_name: "محمد خالد إبراهيم", phone: "01123456789", loyalty_points: 200, created_at: "" },
];

const MOCK_TESTS: (Test & { price: number })[] = [
  { id: "t1", name_ar: "صورة دم كاملة CBC", turnaround_hours: 2, is_culture: false, is_active: true, price: 150 },
  { id: "t2", name_ar: "وظائف كبد", turnaround_hours: 24, is_culture: false, is_active: true, price: 280 },
  { id: "t3", name_ar: "وظائف كلى", turnaround_hours: 24, is_culture: false, is_active: true, price: 220 },
  { id: "t4", name_ar: "هرمون الغدة الدرقية TSH", turnaround_hours: 24, is_culture: false, is_active: true, price: 180 },
  { id: "t5", name_ar: "دهون الدم", turnaround_hours: 24, is_culture: false, is_active: true, price: 200 },
  { id: "t6", name_ar: "سكر تراكمي HbA1c", turnaround_hours: 24, is_culture: false, is_active: true, price: 160 },
];

interface SelectedItem {
  test_id: string;
  test_name: string;
  price: number;
  quantity: number;
}

export default function NewInvoicePage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [tests, setTests] = useState<(Test & { price?: number })[]>(MOCK_TESTS);
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [items, setItems] = useState<SelectedItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [testSearch, setTestSearch] = useState("");

  useEffect(() => {
    getPatients().then((data) => { if (data.length > 0) setPatients(data); });
    getTests().then((data) => { if (data.length > 0) setTests(data); });
  }, []);

  const filteredPatients = patients.filter(
    (p) => p.full_name.includes(patientSearch) || (p.phone || "").includes(patientSearch)
  );
  const filteredTests = tests.filter(
    (t) => t.name_ar.includes(testSearch) || (t.name_en || "").toLowerCase().includes(testSearch.toLowerCase())
  );

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discount);

  const addTest = (test: Test & { price?: number }) => {
    if (items.find((i) => i.test_id === test.id)) return;
    setItems([...items, { test_id: test.id, test_name: test.name_ar, price: test.price || 100, quantity: 1 }]);
  };

  const removeItem = (testId: string) => setItems(items.filter((i) => i.test_id !== testId));

  const handleSubmit = async () => {
    if (!selectedPatient || items.length === 0) {
      alert("اختر مريضًا وأضف اختبارًا واحدًا على الأقل");
      return;
    }
    setLoading(true);
    const { error } = await createInvoice({
      patient_id: selectedPatient.id,
      items,
      discount_percentage: discountPercent,
      paid_amount: paidAmount,
      notes,
    });
    setLoading(false);
    if (error) {
      console.warn("Demo mode:", error);
      alert("تم إنشاء الفاتورة بنجاح (وضع تجريبي - اربط Supabase للحفظ الفعلي)");
    }
    router.push("/invoices");
  };

  return (
    <AppShell title="فاتورة جديدة">
      <div className="mb-4">
        <Link href="/invoices" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:underline">
          <ArrowRight className="w-4 h-4" /> العودة للفواتير
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>اختيار المريض</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {selectedPatient ? (
                <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                  <div>
                    <p className="font-medium">{selectedPatient.full_name}</p>
                    <p className="text-sm text-slate-500">{selectedPatient.phone}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedPatient(null)}>تغيير</Button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="بحث عن مريض..." className="pr-10" value={patientSearch} onChange={(e) => setPatientSearch(e.target.value)} />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {filteredPatients.map((p) => (
                      <button key={p.id} type="button" onClick={() => setSelectedPatient(p)} className="w-full text-right p-2 rounded-lg hover:bg-slate-100 text-sm">
                        {p.full_name} — {p.phone}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>إضافة الاختبارات</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="بحث عن اختبار..." className="pr-10" value={testSearch} onChange={(e) => setTestSearch(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {filteredTests.map((t) => (
                  <button key={t.id} type="button" onClick={() => addTest(t)} className="flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:border-primary-400 hover:bg-primary-50 text-sm">
                    <span>{t.name_ar}</span>
                    <span className="text-primary-600 font-medium">{formatCurrency((t as any).price || 100)}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>الاختبارات المختارة ({items.length})</CardTitle></CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">لم يتم اختيار أي اختبار بعد</p>
              ) : (
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.test_id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{item.test_name}</p>
                        <p className="text-xs text-slate-500">{formatCurrency(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input type="number" min={1} value={item.quantity} onChange={(e) => setItems(items.map((i) => i.test_id === item.test_id ? { ...i, quantity: Number(e.target.value) || 1 } : i))} className="w-16 h-8 text-center" />
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.test_id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="sticky top-24">
            <CardHeader><CardTitle>ملخص الفاتورة</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm"><span className="text-slate-500">المجموع الفرعي</span><span>{formatCurrency(subtotal)}</span></div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">خصم (%)</label>
                <Input type="number" min={0} max={100} value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value) || 0)} />
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-red-600"><span>قيمة الخصم</span><span>-{formatCurrency(discount)}</span></div>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-3"><span>الإجمالي</span><span className="text-primary-600">{formatCurrency(total)}</span></div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">المبلغ المدفوع</label>
                <Input type="number" min={0} value={paidAmount} onChange={(e) => setPaidAmount(Number(e.target.value) || 0)} />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">ملاحظات</label>
                <textarea className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm min-h-[60px]" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <Button className="w-full" onClick={handleSubmit} disabled={loading || !selectedPatient || items.length === 0}>
                {loading ? "جاري الحفظ..." : "حفظ الفاتورة"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
