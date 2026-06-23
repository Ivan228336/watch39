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

  // Очищаем таблицы в правильном порядке из-за Foreign Keys
  await prisma.watch.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  console.log('🔹 Запуск SEO-оптимизированного сидинга статей...');

  for (const article of articles) {
    const post = await prisma.post.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        imageUrl: article.imageUrl,
        published: article.published,
      },
      create: {
        slug: article.slug,
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        imageUrl: article.imageUrl,
        published: article.published,
      },
    });
    console.log(`✅ Статья записана: /blog/${post.slug}`);
  }

  console.log('🎉 Все SEO-лонгриды успешно добавлены в базу данных!');

  console.log(`🔹 Заливаем SEO-бренды (${seoBrands.length})...`);
  for (const brand of seoBrands) {
    await prisma.brand.create({ data: brand });
  }

  console.log(`🔹 Заливаем SEO-категории (${seoCategories.length})...`);
  for (const cat of seoCategories) {
    await prisma.category.create({ data: cat });
  }

  // Получаем созданные сущности для маппинга по именам/слагам
  const allBrands = await prisma.brand.findMany();
  const allCategories = await prisma.category.findMany();

  console.log(`🔹 Связываем и добавляем модели часов (${seoWatches.length})...`);
  
  let insertedCount = 0;

  for (const w of seoWatches) {
    const dbBrand = allBrands.find(b => b.name === w.brandName);
    const dbCategory = allCategories.find(c => c.slug === w.categorySlug);

    if (!dbBrand || !dbCategory) {
      console.warn(`⚠️ Пропущена модель ${w.modelCode}: не найден бренд или категория.`);
      continue;
    }

    // Убираем временные поля маппинга перед вставкой в Watch
    const { brandName, categorySlug, ...watchData } = w;

    await prisma.watch.create({
      data: {
        ...watchData,
        brandId: dbBrand.id,
        categoryId: dbCategory.id,
      }
    });
    insertedCount++;
  }

  console.log(`✅ SEO-миграция завершена! Успешно добавлено ${insertedCount} моделей часов.`);
}

main()
  .catch((e) => {
    console.error('❌ Критическая ошибка при заполнении:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });