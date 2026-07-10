// app/admin/post/edit/[id]/page.tsx
'use client';

import { Suspense } from 'react';
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch } from "antd";

export default function PostEditPage() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
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
    </Suspense>
    
  );
}