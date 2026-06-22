// app/catalog/[categorySlug]/page.tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductGrid } from '@/components/ProductGrid';

interface Props {
  params: Promise<{ categorySlug: string }>;
}

// Включаем генерацию статических путей при сборке на Vercel
export async function generateStaticParams() {
  const categories = await prisma.category.findMany({ select: { slug: true } });
  return categories.map((cat) => ({ categorySlug: cat.slug }));
}

// Динамические SEO мета-теги под категорию
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });

  if (!category) return {};

  return {
    title: category.metaTitle || `${category.name} часы в Калининграде | Купить оригинал`,
    description: category.metaDescription || `Каталог оригинальных наручных часов категории ${category.name}. Официальная гарантия, примерка перед покупкой в Калининграде.`,
    alternates: { canonical: `https://watch39.ru/catalog/${categorySlug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;

  // Тянем категорию и товары параллельно (оптимизация производительности)
  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) notFound();

  const watches = await prisma.watch.findMany({
    where: { category: { slug: categorySlug } },
    include: { brand: true },
    orderBy: { id: 'desc' },
  });

  // Микроразметка Schema.org для списка товаров категории
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': `${category.name} часы в Калининграде`,
    'description': category.metaDescription,
    'url': `https://watch39.ru/catalog/${categorySlug}`,
  };

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs 
        items={[
          { label: 'Каталог', href: '/catalog' },
          { label: category.name }
        ]} 
      />

      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {category.name} часы
        </h1>
        <p className="mt-2 text-gray-600 max-w-4xl text-sm sm:text-base">
          Выбирайте оригинальные {category.name.toLowerCase()} наручные часы с доставкой по Калининграду. 
          В нашем ассортименте только проверенные бренды с полной комплектацией и гарантией производителя.
        </p>
      </header>

      <ProductGrid watches={watches} />
    </main>
  );
}