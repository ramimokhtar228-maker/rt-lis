"use client";

import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="بحث..."
              className="w-64 pr-10"
            />
          </div>
          
          <button className="relative p-2 rounded-lg hover:bg-slate-100">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div className="hidden sm:block text-sm">
              <p className="font-medium text-slate-800">المسؤول</p>
              <p className="text-xs text-slate-500">مدير النظام</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
