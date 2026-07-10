// app/admin/category/edit/[id]/page.tsx
'use client';

import { Suspense } from 'react';
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export default function CategoryEditPage() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
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
    </Suspense>
    
  );
}