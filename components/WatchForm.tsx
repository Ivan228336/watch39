'use client';

import { useState } from 'react';
import { Input, InputNumber, Select, Button, Switch } from "antd";

export function WatchForm({ initialData, brands, categories, action }: any) {
  const [formData, setFormData] = useState({
    brandId: initialData?.brandId || '',
    categoryId: initialData?.categoryId || '',
    gender: initialData?.gender || 'UNISEX',
    inStock: initialData?.inStock ?? true,
  });

  return (
    <form action={action}>
      {/* Скрытые поля для передачи состояния сложных компонентов */}
      <input type="hidden" name="brandId" value={formData.brandId} />
      <input type="hidden" name="categoryId" value={formData.categoryId} />
      <input type="hidden" name="gender" value={formData.gender} />
      <input type="hidden" name="inStock" value={formData.inStock ? "true" : "false"} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input name="title" defaultValue={initialData?.title} placeholder="Название" required />
        <Input name="modelCode" defaultValue={initialData?.modelCode} placeholder="Код модели" required />
        <Input name="slug" defaultValue={initialData?.slug} placeholder="URL (Slug)" required />
        
        <Select 
          value={formData.brandId} 
          placeholder="Выберите бренд" 
          style={{ width: '100%' }}
          onChange={(val) => setFormData(prev => ({...prev, brandId: val}))}
        >
          {brands.map((b: any) => <Select.Option key={b.id} value={b.id}>{b.name}</Select.Option>)}
        </Select>

        <Select 
          value={formData.categoryId} 
          placeholder="Выберите категорию" 
          style={{ width: '100%' }}
          onChange={(val) => setFormData(prev => ({...prev, categoryId: val}))}
        >
          {categories.map((c: any) => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)}
        </Select>

        <InputNumber name="price" defaultValue={initialData?.price} placeholder="Цена" style={{ width: '100%' }} />
        
        <Select 
          value={formData.gender} 
          onChange={(val) => setFormData(prev => ({...prev, gender: val}))} 
          style={{ width: '100%' }}
        >
          <Select.Option value="MALE">Мужские</Select.Option>
          <Select.Option value="FEMALE">Женские</Select.Option>
          <Select.Option value="UNISEX">Унисекс</Select.Option>
        </Select>

        <Input.TextArea name="description" defaultValue={initialData?.description} placeholder="Описание" rows={4} />
        <Input name="imageUrl" defaultValue={initialData?.imageUrl} placeholder="URL картинки" />
        <Input name="model3dUrl" defaultValue={initialData?.model3dUrl} placeholder="URL 3D модели" />
        
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span>В наличии:</span>
          <Switch 
            checked={formData.inStock} 
            onChange={(val) => setFormData(prev => ({...prev, inStock: val}))} 
          />
        </div>

        <InputNumber name="stockKaliningrad" defaultValue={initialData?.stockKaliningrad} placeholder="Остаток в Калининграде" style={{ width: '100%' }} />
        <Input name="metaTitle" defaultValue={initialData?.metaTitle} placeholder="SEO Title" />
        <Input name="metaDescription" defaultValue={initialData?.metaDescription} placeholder="SEO Description" />
        <Input name="h1" defaultValue={initialData?.h1} placeholder="H1 заголовок" />

        <Button type="primary" htmlType="submit">Сохранить</Button>
      </div>
    </form>
  );
}