import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { WatchGallery } from '@/components/WatchGallery';

export async function generateStaticParams() {
  const watches = await prisma.watch.findMany({ select: { slug: true } });
  return watches.map((watch: any) => ({ slug: watch.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const watch = await prisma.watch.findUnique({
    where: { slug },
    include: { brand: true, images: true }, // Запрашиваем картинки для OpenGraph!
  });

  if (!watch) return {};

  const fallbackTitle = `Купить оригинальные часы ${watch.title} в Калининграде — цена, отзывы`;
  const fallbackDesc = `Заказать наручные часы ${watch.title} за ${watch.price} ₽ в интернет-магазине watch39. Оригинал, official гарантия, быстрая доставка по Калининграду.`;

  // Собираем все картинки для репостов в соцсети
  const ogImages = [];
  if (watch.imageUrl) ogImages.push({ url: watch.imageUrl });
  watch.images.forEach(img => ogImages.push({ url: img.url }));

  return {
    title: watch.metaTitle || fallbackTitle,
    description: watch.metaDescription || fallbackDesc,
    alternates: { canonical: `https://watch39.ru/product/${watch.slug}` },
    openGraph: {
      title: watch.metaTitle || fallbackTitle,
      description: watch.metaDescription || fallbackDesc,
      images: ogImages,
      type: 'website',
    },
  };
}

export default async function WatchPage({ params }: Props) {
  const { slug } = await params;

  // ДОБАВЛЕН INCLUDE: { images: true }
  const dbWatch = await prisma.watch.findUnique({
    where: { slug },
    include: { 
      brand: true,
      category: true,
      images: true 
    },
  });

  if (!dbWatch) notFound();

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

  // Обогащаем Schema.org массивом всех картинок (супер полезно для SEO Google Картинок)
  const allImageUrls = [watch.imageUrl, ...watch.images.map(img => img.url)].filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': watch.title,
    'image': allImageUrls.length > 0 ? allImageUrls : 'https://watch39.ru/placeholder.png',
    'description': watch.description,
    'sku': watch.modelCode,
    'brand': { '@type': 'Brand', 'name': watch.brand.name },
    'offers': {
      '@type': 'Offer',
      'url': `https://watch39.ru/product/${watch.slug}`,
      'priceCurrency': 'RUB',
      'price': watch.price,
      'itemCondition': 'https://schema.org/NewCondition',
      'availability': isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-6xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
        
        {/* === ВСТАВЛЯЕМ НАШУ ГАЛЕРЕЮ СЮДА === */}
        <WatchGallery 
          title={watch.title} 
          mainImage={watch.imageUrl} 
          images={watch.images.filter(img => img.url !== null) as { id: string; url: string; alt: string | null; }[]}
        />
        {/* ================================== */}

        <div className="flex flex-col justify-between">
            {/* Остальной код правой части карточки товара оставляем без изменений */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Код модели: {watch.modelCode}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 leading-tight">
              {watch.title}
            </h1>
            
            {/* Цены, описание и прочий UI, который был у тебя... */}
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
              </div>
            </div>

            <section className="mt-6 border-t pt-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Описание и характеристики</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{watch.description}</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}