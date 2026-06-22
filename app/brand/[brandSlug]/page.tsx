// app/brand/[brandSlug]/page.tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductGrid } from '@/components/ProductGrid';

interface Props {
  params: Promise<{ brandSlug: string }>;
}

export async function generateStaticParams() {
  const brands = await prisma.brand.findMany({ select: { slug: true } });
  return brands.map((b: { slug: string }) => ({ brandSlug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug } = await params;
  
  // Ищем бренд без учета регистра букв для мета-тегов
  const brand = await prisma.brand.findFirst({ 
    where: { slug: { equals: brandSlug, mode: 'insensitive' } } 
  });

  if (!brand) return {};

  return {
    title: brand.metaTitle || `Японские и швейцарские часы ${brand.name} в Калининграде`,
    description: brand.metaDescription || `Купить оригинальные наручные часы ${brand.name} в интернет-магазине watch39. Официальная дистрибуция, чек, гарантийный талон.`,
    alternates: { canonical: `https://watch39.ru/brand/${brandSlug.toLowerCase()}` },
  };
}

export default async function BrandPage({ params }: Props) {
  const { brandSlug } = await params;

  // КЛЮЧЕВОЙ ФИКС: Ищем бренд через findFirst с флагом insensitive (игнорируем регистр Casio/casio)
  const brand = await prisma.brand.findFirst({
    where: { slug: { equals: brandSlug, mode: 'insensitive' } },
  });

  if (!brand) notFound();

  // Ищем часы, привязанные к ID найденного бренда
  const dbWatches = await prisma.watch.findMany({
    where: { brandId: brand.id },
    include: { brand: true },
    orderBy: { id: 'desc' },
  });

  // КЛЮЧЕВОЙ ФИКС СЕО-МОНСТРА: Маппим данные, гарантируя TypeScript отсутствие null и объектов Decimal
  const sanitizedWatches = dbWatches.map((watch: any) => ({
    id: watch.id,
    title: watch.title,
    slug: watch.slug,
    // Превращаем Decimal от Prisma в обычный number, безопасный для .toLocaleString()
    price: Number(watch.price), 
    imageUrl: watch.imageUrl,
    stockKaliningrad: watch.stockKaliningrad,
    // Гарантируем наличие объекта бренда, даже если в схеме он объявлен как опциональный
    brand: {
      name: watch.brand?.name || brand.name,
      slug: watch.brand?.slug || brand.slug,
    },
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': `Оригинальные часы ${brand.name} в Калининграде`,
    'description': brand.metaDescription,
    'url': `https://watch39.ru/brand/${brandSlug}`,
  };

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs items={[{ label: 'Бренды' }, { label: brand.name }]} />

      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Наручные часы {brand.name}
        </h1>
        <p className="mt-2 text-gray-600 max-w-4xl text-sm sm:text-base">
          Официальный каталог часов бренда {brand.name} в Калининграде. Подбор моделей по параметрам, 
          фирменная упаковка, инструкции на русском языке. Закажите примерку до 3-х моделей бесплатно.
        </p>
      </header>

      {/* Передаем очищенный, строго типизированный массив */}
      <ProductGrid watches={sanitizedWatches} />
    </main>
  );
}