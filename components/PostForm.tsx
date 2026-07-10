'use client';

import { useState } from 'react';
import { Input, Button, Switch } from "antd";

export function PostForm({ initialData, action }: { initialData?: any, action: any }) {
  const [published, setPublished] = useState(initialData?.published ?? false);

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Скрытое поле для передачи boolean значения */}
      <input type="hidden" name="published" value={published ? "true" : "false"} />

      <Input name="title" defaultValue={initialData?.title} placeholder="Заголовок" required />
      <Input name="slug" defaultValue={initialData?.slug} placeholder="URL (Slug)" required />
      <Input.TextArea name="excerpt" defaultValue={initialData?.excerpt} placeholder="Краткое описание" rows={2} />
      <Input.TextArea name="content" defaultValue={initialData?.content} placeholder="HTML Контент" rows={10} required />
      <Input name="imageUrl" defaultValue={initialData?.imageUrl} placeholder="URL Главной картинки" />
      
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <span>Опубликовано:</span>
        <Switch checked={published} onChange={setPublished} />
      </div>

      <Button type="primary" htmlType="submit">Сохранить</Button>
    </form>
  );
}