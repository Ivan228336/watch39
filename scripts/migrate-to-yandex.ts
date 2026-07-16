import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ru-central1",
  endpoint: "https://storage.yandexcloud.net",
  credentials: {
    accessKeyId: process.env.YANDEX_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.YANDEX_S3_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.YANDEX_S3_BUCKET_NAME!;

async function migrateUrl(oldUrl: string | null) {
  // ТЕПЕРЬ ищем ссылки Vercel Blob
  if (!oldUrl || !oldUrl.includes('vercel-storage.com')) return oldUrl;

  try {
    console.log(`⬇️ Скачивание из Blob: ${oldUrl}`);
    const response = await fetch(oldUrl);
    if (!response.ok) throw new Error('Не удалось скачать файл из Vercel Blob');

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Генерируем имя файла из URL
    const fileName = oldUrl.split('/').pop()?.split('?')[0] || `migrated-${Date.now()}.webp`;

    console.log(`⬆️ Загрузка в Yandex Cloud: ${fileName}`);
    
    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: response.headers.get('content-type') || 'image/webp',
    }));

    const newUrl = `https://${BUCKET_NAME}.storage.yandexcloud.net/${fileName}`;
    console.log(`✅ Успешно: ${newUrl}`);
    return newUrl;
  } catch (err: any) {
    console.error(`❌ Ошибка с ${oldUrl}:`, err.message);
    return oldUrl; 
  }
}

async function main() {
  console.log('🚀 Начинаем миграцию из Vercel Blob в Яндекс Облако...');

  // Ищем все записи, где еще остались ссылки на Vercel
  const watches = await prisma.watch.findMany({
    where: { imageUrl: { contains: 'vercel-storage.com' } }
  });

  for (const watch of watches) {
    const newUrl = await migrateUrl(watch.imageUrl);
    if (newUrl !== watch.imageUrl) {
      await prisma.watch.update({ where: { id: watch.id }, data: { imageUrl: newUrl } });
    }
  }

  const images = await prisma.watchImage.findMany({
    where: { url: { contains: 'vercel-storage.com' } }
  });

  for (const img of images) {
    const newUrl = await migrateUrl(img.url);
    if (newUrl !== img.url) {
      await prisma.watchImage.update({ where: { id: img.id }, data: { url: newUrl } });
    }
  }

  console.log('🎉 Миграция успешно завершена!');
}

main().catch(console.error).finally(() => prisma.$disconnect());