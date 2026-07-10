// app/admin/brand/create/page.tsx
'use client';

import { Suspense } from 'react';
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export default function BrandCreatePage() {
  // Этот хук автоматически понимает, что мы находимся на маршруте /brand/create
  // и при сабмите формы отправит POST-запрос в Supabase таблицу 'Brand'
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
        <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Название бренда"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="URL (Slug)"
          name="slug"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        {/* Остальные поля по желанию */}
      </Form>
    </Create>
    </Suspense>
  );
}