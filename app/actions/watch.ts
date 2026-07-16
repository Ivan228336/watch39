'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Gender } from "@prisma/client";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// 1. Инициализируем клиент Яндекс S3
const s3Client = new S3Client({
  region: "ru-central1",
  endpoint: "https://storage.yandexcloud.net",
  credentials: {
    accessKeyId: process.env.YANDEX_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.YANDEX_S3_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.YANDEX_S3_BUCKET_NAME!;

// 2. Вспомогательная функция для ЗАГРУЗКИ в S3
export async function uploadToS3(file: File, prefix: string) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${prefix}-${Date.now()}.${fileExt}`;
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    }));

    // Формируем публичную ссылку Яндекс Облака
    return `https://${BUCKET_NAME}.storage.yandexcloud.net/${fileName}`;
  } catch (error) {
    console.error("Ошибка загрузки в Яндекс S3:", error);
    return null;
  }
}

// 3. Вспомогательная функция для УДАЛЕНИЯ из S3
export async function deleteFromS3(url: string) {
  try {
    // Вытаскиваем ключ (имя файла) из полного URL
    const prefix = `https://${BUCKET_NAME}.storage.yandexcloud.net/`;
    if (!url.startsWith(prefix)) return; // Если URL чужой, игнорируем
    
    const key = url.replace(prefix, '');

    await s3Client.send(new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    }));
  } catch (error) {
    console.error("Ошибка удаления из Яндекс S3:", error);
  }
}

// ==========================================
// ОСНОВНЫЕ ACTIONS
// ==========================================

export async function createWatchAction(formData: FormData) {
  const brandId = formData.get("brandId") as string;
  const categoryId = formData.get("categoryId") as string;
  const title = formData.get("title") as string;
  const modelCode = formData.get("modelCode") as string;

  if (!brandId || brandId === "undefined" || !categoryId || categoryId === "undefined") {
    throw new Error("Необходимо выбрать бренд и категорию!");
  }

  const mainImageFile = formData.get("mainImageFile") as File | null;
  let imageUrl = formData.get("imageUrl") as string || ""; 
  
  if (mainImageFile && mainImageFile.size > 0) {
    const uploadedUrl = await uploadToS3(mainImageFile, modelCode);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  const galleryFiles = formData.getAll("galleryFiles") as File[];
  const uploadedGalleryImages = [];

  for (const file of galleryFiles) {
    if (file && file.size > 0) {
      const url = await uploadToS3(file, `${modelCode}-gallery`);
      if (url) {
        uploadedGalleryImages.push({
          url,
          alt: `Часы ${title} - ${modelCode}`
        });
      }
    }
  }

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
        gender: formData.get("gender") as Gender,
        inStock: formData.get("inStock") === "true",
        stockKaliningrad: Number(formData.get("stockKaliningrad")),
        metaTitle: formData.get("metaTitle") as string,
        metaDescription: formData.get("metaDescription") as string,
        h1: formData.get("h1") as string,
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

  const galleryFiles = formData.getAll("galleryFiles") as File[];
  const newUploadedImages = [];

  for (const file of galleryFiles) {
    if (file instanceof File && file.size > 0) {
      const url = await uploadToS3(file, modelCode);
      if (url) {
        newUploadedImages.push({
          url,
          alt: `Часы ${title} - фото ${Date.now()}`
        });
      }
    }
  }

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

  if (newUploadedImages.length > 0) {
    updateData.images = { create: newUploadedImages };
  }

  await prisma.watch.update({ where: { id }, data: updateData });

  revalidatePath("/admin/watch");
  revalidatePath(`/product/${updateData.slug}`);
  redirect("/admin/watch");
}

export async function deleteImageAction(imageId: string) {
  const image = await prisma.watchImage.findUnique({ where: { id: imageId } });
  if (image && image.url) {
    await deleteFromS3(image.url); 
    await prisma.watchImage.delete({ where: { id: imageId } });
  }
  revalidatePath("/admin/watch");
}

export async function deleteWatchAction(watchId: string) {
  const watch = await prisma.watch.findUnique({ where: { id: watchId } });
  const images = await prisma.watchImage.findMany({ where: { watchId } });
  
  if (watch?.imageUrl) await deleteFromS3(watch.imageUrl);

  for (const img of images) {
    if (img.url) await deleteFromS3(img.url);
  }

  await prisma.watch.delete({ where: { id: watchId } });
  
  revalidatePath("/admin/watch");
  redirect("/admin/watch");
}

export async function deleteMainImageAction(watchId: string) {
  const watch = await prisma.watch.findUnique({ where: { id: watchId } });
  if (watch?.imageUrl) {
    await deleteFromS3(watch.imageUrl);
    await prisma.watch.update({ where: { id: watchId }, data: { imageUrl: null } });
  }
  revalidatePath("/admin/watch");
}