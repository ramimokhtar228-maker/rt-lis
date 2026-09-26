import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RT LIS - نظام إدارة المختبرات الطبية",
  description: "نظام متكامل لإدارة المختبرات الطبية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
