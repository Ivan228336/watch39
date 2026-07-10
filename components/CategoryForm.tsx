'use client';

import { Input, Button, Form } from "antd";

export function CategoryForm({ initialData, action }: { initialData?: any, action: any }) {
  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input name="name" defaultValue={initialData?.name} placeholder="Название" required />
      <Input name="slug" defaultValue={initialData?.slug} placeholder="URL (Slug)" required />
      <Input name="metaTitle" defaultValue={initialData?.metaTitle} placeholder="SEO Title" />
      <Input.TextArea name="metaDescription" defaultValue={initialData?.metaDescription} placeholder="SEO Description" rows={3} />
      
      <Button type="primary" htmlType="submit">Сохранить</Button>
    </form>
  );
}