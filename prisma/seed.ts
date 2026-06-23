// prisma/seed.ts
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { seoBrands, seoCategories, seoWatches, articles } from './seed-data';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log(`🌱 SEO-оптимизация БД: Начинаем очистку и наполнение...`);

  // Из-за каскадного удаления (onDelete: Cascade) в схеме, 
  // удаление часов автоматически очистит и таблицу WatchImage!
  await prisma.watch.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.post.deleteMany(); // Добавим очистку постов для порядка

  console.log('🔹 Запуск SEO-оптимизированного сидинга статей...');
  for (const article of articles) {
    await prisma.post.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
    console.log(`✅ Статья записана: /blog/${article.slug}`);
  }

  console.log(`🔹 Заливаем SEO-бренды (${seoBrands.length})...`);
  for (const brand of seoBrands) {
    await prisma.brand.create({ data: brand });
  }

  console.log(`🔹 Заливаем SEO-категории (${seoCategories.length})...`);
  for (const cat of seoCategories) {
    await prisma.category.create({ data: cat });
  }

  const allBrands = await prisma.brand.findMany();
  const allCategories = await prisma.category.findMany();

  console.log(`🔹 Связываем модели часов и генерируем SEO-галереи (${seoWatches.length})...`);
  
  let insertedCount = 0;

  for (const w of seoWatches) {
    const dbBrand = allBrands.find(b => b.name === w.brandName);
    const dbCategory = allCategories.find(c => c.slug === w.categorySlug);

    if (!dbBrand || !dbCategory) {
      console.warn(`⚠️ Пропущена модель ${w.modelCode}: не найден бренд или категория.`);
      continue;
    }

    // Деструктуризация: вытаскиваем служебные поля (brandName, categorySlug) 
    // и массив картинок (images), чтобы они не шли в саму модель Watch напрямую.
    const { brandName, categorySlug, images, ...watchData } = w;

    await prisma.watch.create({
      data: {
        ...watchData,
        brandId: dbBrand.id,
        categoryId: dbCategory.id,
        // ВОТ ТУТ ПРОИСХОДИТ МАГИЯ ПРИЗМЫ ДЛЯ ССЫЛОК ГАЛЕРЕИ:
        images: {
          create: images ?? [] // Создает записи в таблице WatchImage
        }
      }
    });
    insertedCount++;
  }

  console.log(`🎉 SEO-миграция завершена! Успешно добавлено ${insertedCount} моделей часов с галереями.`);
}

main()
  .catch((e) => {
    console.error('❌ Критическая ошибка при заполнении:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });