import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. ДИНАМИЧЕСКИЕ МЕТА-ТЕГИ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const watch = await prisma.watch.findUnique({
    where: { slug },
    include: { brand: true },
  });

  if (!watch) return {};

  const priceAsNumber = Number(watch.price);
  const fallbackTitle = `Купить оригинальные часы ${watch.title} в Калининграде — цена, отзывы`;
  const fallbackDesc = `Заказать наручные часы ${watch.title} за ${priceAsNumber} ₽ в интернет-магазине watch39. Оригинал, official гарантия, быстрая доставка по Калининграду.`;

  return {
    title: watch.metaTitle || fallbackTitle,
    description: watch.metaDescription || fallbackDesc,
    alternates: {
      canonical: `https://watch39.ru/product/${watch.slug}`,
    },
    openGraph: {
      title: watch.metaTitle || fallbackTitle,
      description: watch.metaDescription || fallbackDesc,
      images: watch.imageUrl ? [{ url: watch.imageUrl }] : [],
      type: 'website', // Изменили с 'music.song' на стандартный 'website' для e-commerce
    },
  };
}

// 2. ОСНОВНОЙ КОМПОНЕНТ СТРАНИЦЫ
export default async function WatchPage({ params }: Props) {
  const { slug } = await params;

  const dbWatch = await prisma.watch.findUnique({
    where: { slug },
    include: { 
      brand: true,
      category: true
    },
  });

  if (!dbWatch) notFound();

  // Санитизация объекта во избежание конфликтов типов Prisma.Decimal и null-объектов отношений
  const watch = {
    ...dbWatch,
    price: Number(dbWatch.price),
    brand: {
      name: dbWatch.brand?.name || 'Бренд',
      slug: dbWatch.brand?.slug || '',
    },
    category: {
      name: dbWatch.category?.name || 'Каталог',
      slug: dbWatch.category?.slug || '',
    }
  };

  const isAvailable = watch.stockKaliningrad > 0;

  // 3. МИКРОРАЗМЕТКА SCHEMA.ORG
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': watch.title,
    'image': watch.imageUrl || 'https://watch39.ru/placeholder.png',
    'description': watch.description,
    'sku': watch.modelCode,
    'brand': {
      '@type': 'Brand',
      'name': watch.brand.name,
    },
    'offers': {
      '@type': 'Offer',
      'url': `https://watch39.ru/product/${watch.slug}`,
      'priceCurrency': 'RUB',
      'price': watch.price,
      'itemCondition': 'https://schema.org/NewCondition',
      'availability': isAvailable 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2" aria-label="Хлебные крошки">
        <Link href="/" className="hover:text-black transition">Главная</Link>
        <span>/</span>
        {watch.brand.slug && (
          <>
            <Link href={`/brand/${watch.brand.slug}`} className="hover:text-black transition">Часы {watch.brand.name}</Link>
            <span>/</span>
          </>
        )}
        {watch.category.slug && (
          <>
            <Link href={`/catalog/${watch.category.slug}`} className="hover:text-black transition">{watch.category.name}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-900 truncate" aria-current="page">{watch.modelCode}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 rounded-2xl border">
        <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden p-4 border border-gray-100 flex items-center justify-center">
          <Image
            src={watch.imageUrl || '/placeholder.png'}
            alt={`Фото наручных часов ${watch.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
            priority 
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Код модели: {watch.modelCode}
            </span>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 leading-tight">
              {watch.title}
            </h1>

            <div className="mt-4 p-4 bg-slate-50 rounded-xl flex items-baseline justify-between">
              <div>
                <p className="text-xs text-slate-500">Цена в Калининграде</p>
                <p className="text-3xl font-black text-slate-900 mt-1">
                  {watch.price.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  isAvailable ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-600' : 'bg-amber-600'}`} />
                  {isAvailable ? `В наличии (${watch.stockKaliningrad} шт.)` : 'Под заказ'}
                </span>
                <p className="text-[10px] text-slate-400 mt-1">Доставка за 1 день или самовывоз</p>
              </div>
            </div>

            <section className="mt-6 border-t pt-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Описание и характеристики
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {watch.description}
              </p>
            </section>
          </div>

          <div className="mt-8 border-t pt-6 grid grid-cols-2 gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <span>100% Оригинал <br/><b className="text-slate-700">Официальная гарантия</b></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span>Примерка в Клд <br/><b className="text-slate-700">Оплата после осмотра</b></span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}