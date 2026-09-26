# RT LIS - نظام إدارة المختبرات الطبية

نظام متكامل لإدارة المختبرات الطبية مبني على **Next.js 15** + **Supabase** (مجاني بالكامل).

## المميزات المكتملة

| الوحدة | الحالة |
|--------|--------|
| تسجيل الدخول + Auth | ✅ |
| لوحة المعلومات (إحصائيات + رسوم) | ✅ |
| المرضى (قائمة + إضافة) | ✅ |
| الفواتير (قائمة + إنشاء كاملة) | ✅ |
| متابعة العينات (Pipeline) | ✅ |
| النتائج (مراجعة + توقيع + إرسال) | ✅ |
| الحجوزات (منزلية / مختبر) | ✅ |
| المخزن + تنبيهات النفاذ | ✅ |
| الإدارة المالية | ✅ |
| نظام الولاء + أكواد خصم | ✅ |
| رقابة الجودة | ✅ |
| التقارير | ✅ |
| الفروع | ✅ |
| الإعدادات | ✅ |
| قاعدة بيانات كاملة (schema.sql) | ✅ |
| طبقة Services لـ Supabase | ✅ |
| RTL عربي كامل | ✅ |

**بدون ربط أجهزة التحاليل** (حسب الطلب).

## التثبيت السريع

```bash
cd rt-lis
npm install
cp .env.example .env.local
# أضف مفاتيح Supabase في .env.local

# في Supabase SQL Editor: نفّذ محتوى supabase/schema.sql

npm run dev
```

افتح http://localhost:3000

## هيكل المشروع

```
src/
├── app/
│   ├── dashboard/     لوحة المعلومات
│   ├── patients/      المرضى
│   ├── invoices/      الفواتير (+ /new)
│   ├── samples/       العينات
│   ├── results/       النتائج
│   ├── appointments/  الحجوزات
│   ├── inventory/     المخزن
│   ├── finance/       المالية
│   ├── loyalty/       الولاء
│   ├── quality/       رقابة الجودة
│   ├── reports/       التقارير
│   ├── branches/      الفروع
│   ├── settings/      الإعدادات
│   └── login/
├── components/layout/  Sidebar + Header + AppShell
├── components/ui/      Button, Input, Card
├── lib/services/       patients, invoices, tests, samples, results, inventory, finance
├── lib/supabase/       client, server, middleware
└── types/database.ts

supabase/schema.sql     قاعدة البيانات الكاملة
```

## ملاحظات

- الصفحات تعمل ببيانات تجريبية (Mock) حتى تربط مشروع Supabase.
- بعد إضافة المفاتيح وتشغيل الـ schema، ستُحفظ البيانات فعليًا عبر طبقة `lib/services`.
- Free Tier من Supabase يكفي لمختبر متوسط الحجم.

## الترخيص

MIT — مجاني للاستخدام التجاري والشخصي.
