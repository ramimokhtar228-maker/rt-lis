"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users, FileText, FlaskConical, TrendingUp, Calendar, TestTube, Wallet, Package,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const stats = [
  { label: "عدد المرضى", value: "1,248", change: "+12%", icon: Users, color: "bg-blue-500" },
  { label: "الفواتير", value: "856", change: "+8%", icon: FileText, color: "bg-green-500" },
  { label: "الحجوزات", value: "124", change: "+15%", icon: Calendar, color: "bg-purple-500" },
  { label: "الاختبارات المكتملة", value: "2,340", change: "+5%", icon: TestTube, color: "bg-orange-500" },
  { label: "الإيرادات", value: "185,400 ج.م", change: "+18%", icon: TrendingUp, color: "bg-emerald-500" },
  { label: "المصاريف", value: "42,300 ج.م", change: "-3%", icon: Wallet, color: "bg-red-500" },
  { label: "العينات المعلقة", value: "47", change: "", icon: FlaskConical, color: "bg-amber-500" },
  { label: "تنبيهات المخزن", value: "8", change: "", icon: Package, color: "bg-rose-500" },
];

const revenueData = [
  { name: "يناير", value: 42000 }, { name: "فبراير", value: 51000 },
  { name: "مارس", value: 48000 }, { name: "أبريل", value: 62000 },
  { name: "مايو", value: 55000 }, { name: "يونيو", value: 71000 },
];

const testDistribution = [
  { name: "CBC", value: 35, color: "#8b5cf6" },
  { name: "Liver", value: 22, color: "#06b6d4" },
  { name: "Kidney", value: 18, color: "#10b981" },
  { name: "Hormones", value: 15, color: "#f59e0b" },
  { name: "أخرى", value: 10, color: "#ef4444" },
];

export default function DashboardPage() {
  return (
    <AppShell title="لوحة المعلومات">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                      {stat.change && (
                        <p className={`text-xs mt-1 ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                          {stat.change} من الشهر الماضي
                        </p>
                      )}
                    </div>
                    <div className={`p-3 rounded-xl ${stat.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>الإيرادات الشهرية</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>توزيع الاختبارات</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={testDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {testDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>آخر النشاطات</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { text: "تم إنشاء فاتورة جديدة للمريض أحمد محمد", time: "منذ 5 دقائق" },
                { text: "تم إدخال نتائج تحليل CBC للمريض سارة علي", time: "منذ 15 دقيقة" },
                { text: "طلب زيارة منزلية جديد من فاطمة حسن", time: "منذ 30 دقيقة" },
                { text: "تنبيه: كمية أنابيب الاختبار قاربت على النفاذ", time: "منذ ساعة" },
                { text: "تم تسجيل مريض جديد: محمد خالد", time: "منذ ساعتين" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <p className="text-sm text-slate-700">{activity.text}</p>
                  <span className="text-xs text-slate-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
