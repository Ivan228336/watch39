'use client';

import { Suspense } from 'react';
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch } from "antd";

function PostEditForm() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
    </Edit>
  );
}

export default function PostEditPage() {
  return (
    <Suspense fallback={<div>Загрузка данных...</div>}>
      <PostEditForm />
    </Suspense>
  );
}