'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Gender } from "@prisma/client";

// Создание
export async function createWatchAction(formData: FormData) {
  const brandId = formData.get("brandId") as string;
  const categoryId = formData.get("categoryId") as string;

  // Извлекаем остальные данные
  const data = {
    title: formData.get("title") as string,
    modelCode: formData.get("modelCode") as string,
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
  };

  await prisma.watch.create({
    data: {
      ...data,
      brand: { connect: { id: brandId } },
      category: { connect: { id: categoryId } },
    }
  });

  revalidatePath("/admin/watch");
  redirect("/admin/watch");
}

// Редактирование
export async function updateWatchAction(id: string, formData: FormData) {
  // Получаем все данные
  const rawData = {
    title: formData.get("title") as string,
    modelCode: formData.get("modelCode") as string,
    slug: formData.get("slug") as string,
    price: parseInt(formData.get("price") as string) || 0,
    description: formData.get("description") as string,
    imageUrl: formData.get("imageUrl") as string,
    model3dUrl: formData.get("model3dUrl") as string,
    gender: formData.get("gender") as Gender,
    inStock: formData.get("inStock") === "true",
    stockKaliningrad: parseInt(formData.get("stockKaliningrad") as string) || 0,
    metaTitle: formData.get("metaTitle") as string,
    metaDescription: formData.get("metaDescription") as string,
    h1: formData.get("h1") as string,
    brandId: formData.get("brandId") as string,
    categoryId: formData.get("categoryId") as string,
  };

  // Валидация
  if (!rawData.modelCode || !rawData.title) {
    throw new Error("Обязательные поля не заполнены");
  }

  // ФИКС ОШИБКИ TS: отделяем ID связей от остальных данных
  const { brandId, categoryId, ...watchData } = rawData;

  await prisma.watch.update({
    where: { id },
    data: {
      ...watchData, // Здесь только поля модели, без brandId/categoryId
      brand: { connect: { id: brandId } },
      category: { connect: { id: categoryId } },
    },
  });

  revalidatePath("/admin/watch");
  redirect("/admin/watch");
}