'use client';

import { Suspense } from 'react';
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

function CategoryCreateForm() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Название" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="URL (Slug)" name="slug" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="SEO Title" name="metaTitle">
          <Input />
        </Form.Item>
        <Form.Item label="SEO Description" name="metaDescription">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Create>
  );
}

export default function CategoryCreatePage() {
  return (
    <Suspense fallback={<div>Загрузка формы...</div>}>
      <CategoryCreateForm />
    </Suspense>
  );
}