"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <AppShell title="الإعدادات">
      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader><CardTitle>بيانات المختبر</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">اسم المختبر</label>
              <Input defaultValue="مختبرات RT الطبية" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">الهاتف</label>
              <Input defaultValue="02-25252525" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">البريد الإلكتروني</label>
              <Input defaultValue="info@rtlab.com" />
            </div>
            <Button>حفظ التغييرات</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>اللغة والعملة</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">اللغة الافتراضية</label>
              <select className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm">
                <option>العربية</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">العملة</label>
              <select className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm">
                <option>جنيه مصري (EGP)</option>
                <option>ريال سعودي (SAR)</option>
                <option>درهم إماراتي (AED)</option>
              </select>
            </div>
            <Button>حفظ</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
