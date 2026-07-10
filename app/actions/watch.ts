'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Gender } from "@prisma/client";
import { supabase } from "@/lib/supabase";

// Вспомогательная функция загрузки одного файла
export async function uploadToSupabase(file: File, filename: string) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Создаем уникальное имя файла
    const fileExt = file.name.split('.').pop();
    const fileName = `${filename}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('watch-39-bucket')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) throw error;

    // Получаем публичный URL
    const { data: publicUrlData } = supabase.storage
      .from('watch-39-bucket')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Критическая ошибка загрузки в Supabase:", error);
    return null; // Возвращаем null, чтобы не ломать логику создания товара
  }
}

export async function createWatchAction(formData: FormData) {
  const brandId = formData.get("brandId") as string;
  const categoryId = formData.get("categoryId") as string;
  const title = formData.get("title") as string;
  const modelCode = formData.get("modelCode") as string;

  // 1. ПРОВЕРКА ДАННЫХ
  if (!brandId || brandId === "undefined" || !categoryId || categoryId === "undefined") {
    throw new Error("Необходимо выбрать бренд и категорию!");
  }

  // 2. Обработка файлов (главное фото)
  const mainImageFile = formData.get("mainImageFile") as File | null;
  let imageUrl = formData.get("imageUrl") as string || ""; 
  
  if (mainImageFile && mainImageFile.size > 0) {
    const uploadedUrl = await uploadToSupabase(mainImageFile, modelCode);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  // 3. Обработка галереи
  const galleryFiles = formData.getAll("galleryFiles") as File[];
  const uploadedGalleryImages = [];

  for (const file of galleryFiles) {
    if (file && file.size > 0) {
      const url = await uploadToSupabase(file, `${modelCode}-gallery`);
      if (url) {
        uploadedGalleryImages.push({
          url,
          alt: `Часы ${title} - ${modelCode}`
        });
      }
    }
  }

  // 4. СОЗДАНИЕ В БД
  try {
    await prisma.watch.create({
      data: {
        title,
        modelCode,
        slug: formData.get("slug") as string,
        price: Number(formData.get("price")),
        description: formData.get("description") as string,
        imageUrl,
        model3dUrl: formData.get("model3dUrl") as string,
        gender: formData.get("gender") as any,
        inStock: formData.get("inStock") === "true",
        stockKaliningrad: Number(formData.get("stockKaliningrad")),
        metaTitle: formData.get("metaTitle") as string,
        metaDescription: formData.get("metaDescription") as string,
        h1: formData.get("h1") as string,
        // ИСПОЛЬЗУЕМ ПРОВЕРЕННЫЕ ID
        brand: { connect: { id: brandId } },
        category: { connect: { id: categoryId } },
        images: { create: uploadedGalleryImages }
      }
    });
  } catch (error) {
    console.error("Ошибка при сохранении в базу:", error);
    throw new Error("Ошибка базы данных: убедитесь, что все поля заполнены верно.");
  }

  revalidatePath("/admin/watch");
  redirect("/admin/watch");
}

export async function updateWatchAction(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const modelCode = formData.get("modelCode") as string;
  const brandId = formData.get("brandId") as string;
  const categoryId = formData.get("categoryId") as string;

  // 1. Сначала загружаем файлы
  const galleryFiles = formData.getAll("galleryFiles") as File[];
  const newUploadedImages = [];

  for (const file of galleryFiles) {
    if (file instanceof File && file.size > 0) { // Проверка, что это файл
      const url = await uploadToSupabase(file, modelCode);
      if (url) {
        newUploadedImages.push({
          url,
          alt: `Часы ${title} - фото ${Date.now()}`
        });
      }
    }
  }

  // 2. Обновляем данные
  const updateData: any = {
    title,
    modelCode,
    slug: formData.get("slug") as string,
    price: Number(formData.get("price")),
    description: formData.get("description") as string,
    imageUrl: formData.get("imageUrl") as string,
    model3dUrl: formData.get("model3dUrl") as string,
    gender: formData.get("gender") as Gender,
    inStock: formData.get("inStock") === "true",
    stockKaliningrad: Number(formData.get("stockKaliningrad")),
    metaTitle: formData.get("metaTitle") as string,
    metaDescription: formData.get("metaDescription") as string,
    h1: formData.get("h1") as string,
    brand: { connect: { id: brandId } },
    category: { connect: { id: categoryId } },
  };

  // 3. Добавляем картинки, только если они реально загрузились
  if (newUploadedImages.length > 0) {
    updateData.images = {
      create: newUploadedImages
    };
  }

  await prisma.watch.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/admin/watch");
  revalidatePath(`/product/${updateData.slug}`);
  redirect("/admin/watch");
}

// Вспомогательная функция для получения пути файла из URL
const getFilePathFromUrl = (url: string) => {
  // Наш путь в хранилище начинается после /watch-39-bucket/
  const parts = url.split('/watch-39-bucket/');
  return parts.length > 1 ? parts[1] : null;
};

// Удаление одной картинки
export async function deleteImageAction(imageId: string) {
  const image = await prisma.watchImage.findUnique({ where: { id: imageId } });
  
  if (image && image.url) {
    const filePath = getFilePathFromUrl(image.url);
    if (filePath) {
      await supabase.storage.from('watch-39-bucket').remove([filePath]);
    }
    await prisma.watchImage.delete({ where: { id: imageId } });
  }
  
  revalidatePath("/admin/watch");
}

// Удаление товара целиком
export async function deleteWatchAction(watchId: string) {
  // 1. Находим все картинки товара, чтобы удалить их из Supabase
  const images = await prisma.watchImage.findMany({ where: { watchId } });
  
  // 2. Удаляем файлы из хранилища
  for (const img of images) {
    if (img.url) {
      const filePath = getFilePathFromUrl(img.url);
      if (filePath) {
        await supabase.storage.from('watch-39-bucket').remove([filePath]);
      }
    }
  }

  // 3. Удаляем сам товар (картинки удалятся каскадно по базе)
  await prisma.watch.delete({
    where: { id: watchId }
  });
  
  revalidatePath("/admin/watch");
  redirect("/admin/watch");
}

export async function deleteMainImageAction(watchId: string) {
  const watch = await prisma.watch.findUnique({ where: { id: watchId } });
  
  if (watch?.imageUrl) {
    // 1. Удаляем из Supabase (используем тот же метод парсинга пути)
    const filePath = watch.imageUrl.split('/watch-39-bucket/')[1];
    if (filePath) {
      await supabase.storage.from('watch-39-bucket').remove([filePath]);
    }
    
    // 2. Очищаем поле в БД
    await prisma.watch.update({ 
      where: { id: watchId }, 
      data: { imageUrl: null } 
    });
  }
  
  revalidatePath("/admin/watch");
}