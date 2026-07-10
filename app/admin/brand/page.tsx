// app/admin/brand/page.tsx
'use client';

import { Suspense } from 'react';
import { BrandList } from '../resources/brand';

export default function BrandListPage() {
  // Слово return должно стоять здесь, оборачивая весь JSX в круглые скобки!
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <BrandList />
    </Suspense>
  );
}