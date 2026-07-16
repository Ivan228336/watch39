// scripts/migrate-to-blob.ts
import 'dotenv/config'; // Автоматически подтянет ваш .env
import { put } from '@vercel/blob';

// ИМПОРТИРУЕМ ВАШЕГО КЛИЕНТА (проверьте путь, если lib лежит в src, то '../src/lib/prisma')
import { prisma } from '../lib/prisma'; 

async function migrateUrl(oldUrl: string | null) {
  // Пропускаем пустые и те, что уже не в supabase
  if (!oldUrl || !oldUrl.includes('supabase.co')) return oldUrl;

  try {
    console.log(`⬇️  Скачивание: ${oldUrl}`);
    const response = await fetch(oldUrl);
    if (!response.ok) throw new Error('Не удалось скачать');

    // Получаем буфер
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Достаем имя файла из старого URL
    const fileName = oldUrl.split('/').pop() || `migrated-${Date.now()}.jpg`;

    console.log(`⬆️  Загрузка в Vercel Blob...`);
    
    // ВАЖНО: убедитесь, что в .env есть BLOB_READ_WRITE_TOKEN
    const blob = await put(`migrated/${fileName}`, buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN 
    });

    console.log(`✅ Успешно: ${blob.url}`);
    return blob.url;
  } catch (err: any) {
    console.error(`❌ Ошибка с ${oldUrl}:`, err.message);
    return oldUrl; // В случае ошибки оставляем старый URL
  }
}

async function main() {
  console.log('🚀 Начинаем миграцию картинок в Vercel Blob...');

  // 1. Обновляем главные картинки товаров
  const watches = await prisma.watch.findMany({
    where: { imageUrl: { contains: 'supabase.co' } }
  });

  console.log(`Найдено ${watches.length} главных картинок для переноса.`);
  for (const watch of watches) {
    if (watch.imageUrl) {
      const newUrl = await migrateUrl(watch.imageUrl);
      if (newUrl !== watch.imageUrl) {
        await prisma.watch.update({
          where: { id: watch.id },
          data: { imageUrl: newUrl }
        });
      }
    }
  }

  // 2. Обновляем картинки из галереи
  const images = await prisma.watchImage.findMany({
    where: { url: { contains: 'supabase.co' } }
  });

  console.log(`Найдено ${images.length} картинок в галереях для переноса.`);
  for (const img of images) {
    if (img.url) {
      const newUrl = await migrateUrl(img.url);
      if (newUrl !== img.url) {
        await prisma.watchImage.update({
          where: { id: img.id },
          data: { url: newUrl }
        });
      }
    }
  }

  console.log('🎉 Миграция успешно завершена!');
}

main()
  .catch(console.error)
  // Закрываем соединения в вашем пуле, чтобы скрипт завершил работу
  .finally(() => prisma.$disconnect());