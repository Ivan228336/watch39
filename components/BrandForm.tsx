'use client';

import { Input, Button } from "antd";

export function BrandForm({ initialData, action }: { initialData?: any, action: any }) {
  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input 
        name="name" 
        defaultValue={initialData?.name} 
        placeholder="Название бренда" 
        required 
      />
      <Input 
        name="slug" 
        defaultValue={initialData?.slug} 
        placeholder="URL (Slug)" 
        required 
      />
      <Button type="primary" htmlType="submit">Сохранить</Button>
    </form>
  );
}