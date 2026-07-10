// app/admin/brand/page.tsx
'use client';

import { Suspense } from 'react';
import { BrandList } from '../resources/brand'; // Поправьте импорт в зависимости от расположения

export default function BrandListPage() {
  <Suspense fallback={<div>Загрузка...</div>}>
    return <BrandList />;
  </Suspense>
  
}