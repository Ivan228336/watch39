// scripts/update-db-urls.js
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Создаём адаптер с той же строкой подключения, что и в seed.ts
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function update() {
  // Читаем mapping
  const mappingPath = path.join(__dirname, '../image-mapping.json');
  if (!fs.existsSync(mappingPath)) {
    console.error('❌ Файл image-mapping.json не найден. Сначала запустите upload-images.js.');
    return;
  }
  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

  console.log(`🔄 Обновление URL в БД (найдено ${mapping.length} записей)...`);

  for (const item of mapping) {
    const { modelCode, originalName, publicUrl } = item;

    const watch = await prisma.watch.findUnique({
      where: { modelCode },
      include: { images: true },
    });
    if (!watch) {
      console.warn(`⚠️ Модель ${modelCode} не найдена в БД, пропускаем`);
      continue;
    }

    // Обновляем основное изображение
    if (watch.imageUrl && watch.imageUrl.includes(originalName)) {
      await prisma.watch.update({
        where: { id: watch.id },
        data: { imageUrl: publicUrl },
      });
      console.log(`✅ Обновлён imageUrl для ${modelCode}`);
    }

    // Обновляем дополнительные изображения
    for (const img of watch.images) {
      if (img.url && img.url.includes(originalName)) {
        await prisma.watchImage.update({
          where: { id: img.id },
          data: { url: publicUrl },
        });
        console.log(`✅ Обновлён WatchImage для ${modelCode} (${originalName})`);
      }
    }
  }

  console.log('🎉 Готово!');
}

update()
  .catch(console.error)
  .finally(() => prisma.$disconnect());