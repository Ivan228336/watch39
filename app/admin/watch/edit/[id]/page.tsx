// app/admin/watch/edit/[id]/page.tsx
'use client';

import { Suspense } from 'react';
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch, Select } from "antd";

export default function WatchEditPage() {
  const { formProps, saveButtonProps } = useForm({});

  // Подтягиваем списки для Select
  const { selectProps: brandSelectProps } = useSelect({ resource: "brand" });
  const { selectProps: categorySelectProps } = useSelect({ resource: "category" });

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
            <Edit saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
            <Form.Item label="Название (SEO Title)" name="title" rules={[{ required: true }]}>
            <Input />
            </Form.Item>
            <Form.Item label="Код модели" name="modelCode" rules={[{ required: true }]}>
            <Input />
            </Form.Item>
            <Form.Item label="URL (Slug)" name="slug" rules={[{ required: true }]}>
            <Input />
            </Form.Item>
            
            <Form.Item label="Бренд" name="brandId" rules={[{ required: true }]}>
            <Select {...brandSelectProps} />
            </Form.Item>
            <Form.Item label="Категория" name="categoryId" rules={[{ required: true }]}>
            <Select {...categorySelectProps} />
            </Form.Item>

            <Form.Item label="Цена" name="price" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item label="Пол" name="gender">
            <Select
                options={[
                { label: 'Мужские', value: 'MALE' },
                { label: 'Женские', value: 'FEMALE' },
                { label: 'Унисекс', value: 'UNISEX' },
                ]}
            />
            </Form.Item>

            <Form.Item label="Описание" name="description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item label="URL превью картинки" name="imageUrl">
            <Input />
            </Form.Item>
            
            <Form.Item label="В наличии" name="inStock" valuePropName="checked">
            <Switch />
            </Form.Item>
            <Form.Item label="Остаток в Калининграде" name="stockKaliningrad">
            <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
        </Form>
        </Edit>
    </Suspense>
    
  );
}