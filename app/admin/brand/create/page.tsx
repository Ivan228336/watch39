// app/admin/brand/create/page.tsx
'use client';

import { Suspense } from 'react';
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

// 1. Выносим всю логику и хуки в отдельный внутренний компонент
function BrandCreateForm() {
  // Теперь хук вызывается ВНУТРИ зоны действия Suspense
  const { formProps, saveButtonProps } = useForm({});

  return (
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
      </Form>
    </Create>
  );
}

// 2. Главная страница просто рендерит форму через Suspense
export default function BrandCreatePage() {
  return (
    <Suspense fallback={<div>Загрузка формы...</div>}>
      <BrandCreateForm />
    </Suspense>
  );
}