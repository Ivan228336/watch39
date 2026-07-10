// app/admin/post/create/page.tsx
'use client';

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Switch } from "antd";

export default function PostCreatePage() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Заголовок" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="URL (Slug)" name="slug" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Краткое описание" name="excerpt">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item label="HTML Контент" name="content" rules={[{ required: true }]}>
          <Input.TextArea rows={10} />
        </Form.Item>
        <Form.Item label="URL Главной картинки" name="imageUrl">
          <Input />
        </Form.Item>
        <Form.Item label="Опубликовано" name="published" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Create>
  );
}