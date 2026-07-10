'use client';

import { useState } from 'react';
import { Input, InputNumber, Select, Button, Switch, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteImageAction, deleteWatchAction, deleteMainImageAction } from "@/app/actions/watch";

export function WatchForm({ initialData, brands, categories, action }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brandId: initialData?.brandId || '',
    categoryId: initialData?.categoryId || '',
    gender: initialData?.gender || 'UNISEX',
    inStock: initialData?.inStock ?? true,
  });

  const handleDeleteImage = async (imageId: string) => {
    try {
      setLoading(true);
      await deleteImageAction(imageId);
      message.success("Фото удалено");
    } catch (error) {
      message.error("Ошибка при удалении");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMainImage = async () => {
    try {
      setLoading(true);
      await deleteMainImageAction(initialData.id);
      message.success("Главное фото удалено");
    } catch (e) { message.error("Ошибка"); } finally { setLoading(false); }
  };

  const handleDeleteWatch = async () => {
    try {
      setLoading(true);
      await deleteWatchAction(initialData.id);
    } catch (error) {
      message.error("Ошибка при удалении");
      setLoading(false);
    }
  };

  return (
    // Убрали encType="multipart/form-data", так как React делает это автоматически
    <form action={action}>
      <input type="hidden" name="brandId" value={formData.brandId} />
      <input type="hidden" name="categoryId" value={formData.categoryId} />
      <input type="hidden" name="gender" value={formData.gender} />
      <input type="hidden" name="inStock" value={formData.inStock ? "true" : "false"} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input name="title" defaultValue={initialData?.title} placeholder="Название" required />
        <Input name="modelCode" defaultValue={initialData?.modelCode} placeholder="Код модели" required />
        <Input name="slug" defaultValue={initialData?.slug} placeholder="URL (Slug)" required />
        
        {/* --- БЛОК ОТОБРАЖЕНИЯ ФОТО (ГЛАВНОЕ + ГАЛЕРЕЯ) --- */}
        <div className="flex flex-col gap-6 mb-4">
          
          {/* Главное фото */}
          {initialData?.imageUrl && (
            <div>
              <p className="font-bold mb-2">Главное фото:</p>
              <div className="relative w-32 h-32 border rounded overflow-hidden">
                <img src={initialData.imageUrl} alt="Main" className="w-full h-full object-cover" />
                {/* Кнопка всегда видна */}
                <div className="absolute bottom-0 left-0 w-full p-1 bg-black/60">
                  <Popconfirm title="Удалить главное фото?" onConfirm={handleDeleteMainImage}>
                    <Button danger icon={<DeleteOutlined />} size="small" block loading={loading} />
                  </Popconfirm>
                </div>
              </div>
            </div>
          )}

          {/* Галерея */}
          {initialData?.images && initialData.images.length > 0 && (
            <div>
              <p className="font-bold mb-2">Галерея:</p>
              <div className="flex gap-4 flex-wrap">
                {initialData.images.map((img: any) => (
                  <div key={img.id} className="relative w-24 h-24 border rounded overflow-hidden">
                    <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                    {/* Кнопка всегда видна */}
                    <div className="absolute bottom-0 left-0 w-full p-1 bg-black/60">
                      <Popconfirm title="Удалить?" onConfirm={() => handleDeleteImage(img.id)}>
                        <Button danger icon={<DeleteOutlined />} size="small" block loading={loading} />
                      </Popconfirm>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

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
        <Input name="imageUrl" defaultValue={initialData?.imageUrl} placeholder="URL главной картинки" />
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

        <div className="flex flex-col gap-2">
          <label htmlFor="mainImageFile" className="font-bold">Заменить главное фото</label>
          <input type="file" id="mainImageFile" name="mainImageFile" accept="image/*" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="galleryFiles" className="font-bold">Добавить новые в галерею</label>
          <input type="file" id="galleryFiles" name="galleryFiles" accept="image/*" multiple />
        </div>

        <div className="flex justify-between items-center mt-8 pt-4 border-t">
          <Button type="primary" htmlType="submit" loading={loading}>Сохранить изменения</Button>
          
          {initialData?.id && (
            <Popconfirm
              title="Удалить товар полностью?"
              description="Это действие нельзя отменить."
              onConfirm={handleDeleteWatch}
              okText="Удалить"
              okButtonProps={{ danger: true }}
              cancelText="Отмена"
            >
              <Button danger icon={<DeleteOutlined />} loading={loading}>Удалить товар</Button>
            </Popconfirm>
          )}
        </div>
      </div>
    </form>
  );
}