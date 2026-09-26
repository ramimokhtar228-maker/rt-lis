"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function AppShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="mr-64">
        <Header title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
