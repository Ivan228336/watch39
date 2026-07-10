'use client';

import { Suspense } from 'react';
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

function CategoryEditForm() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
    </Edit>
  );
}

export default function CategoryEditPage() {
  return (
    <Suspense fallback={<div>Загрузка данных...</div>}>
      <CategoryEditForm />
    </Suspense>
  );
}