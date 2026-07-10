// app/admin/category/create/page.tsx
'use client';
export const dynamic = 'force-dynamic';
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export default function CategoryCreatePage() {
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