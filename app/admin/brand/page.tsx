// app/admin/brand/page.tsx
'use client';

export const dynamic = 'force-dynamic';
import { BrandList } from '../resources/brand'; // Поправьте импорт в зависимости от расположения

export default function BrandListPage() {
  return <BrandList />;
}