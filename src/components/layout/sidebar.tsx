"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  FlaskConical,
  TestTube,
  Calendar,
  Package,
  Wallet,
  Settings,
  Bell,
  LogOut,
  Building2,
  BarChart3,
  Gift,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "لوحة المعلومات", icon: LayoutDashboard },
  { href: "/patients", label: "المرضى", icon: Users },
  { href: "/invoices", label: "الفواتير", icon: FileText },
  { href: "/samples", label: "العينات", icon: FlaskConical },
  { href: "/results", label: "النتائج", icon: TestTube },
  { href: "/appointments", label: "الحجوزات", icon: Calendar },
  { href: "/inventory", label: "المخزن", icon: Package },
  { href: "/finance", label: "المالية", icon: Wallet },
  { href: "/loyalty", label: "نظام الولاء", icon: Gift },
  { href: "/quality", label: "رقابة الجودة", icon: Shield },
  { href: "/reports", label: "التقارير", icon: BarChart3 },
  { href: "/branches", label: "الفروع", icon: Building2 },
  { href: "/settings", label: "الإعدادات", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed right-0 top-0 z-40 h-screen w-64 bg-primary-900 text-white flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-primary-700">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <FlaskConical className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg">RT LIS</h1>
          <p className="text-xs text-primary-200">نظام إدارة المختبرات</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-primary-600 text-white"
                      : "text-primary-100 hover:bg-primary-800"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-primary-700 p-4">
        <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm text-primary-100 hover:bg-primary-800 transition-colors">
          <LogOut className="w-5 h-5" />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
