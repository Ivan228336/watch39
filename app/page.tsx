import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { WatchCard } from '@/components/WatchCard';
import MarqueeNav from "@/components/MarqueeNav";
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Интернет-магазин наручных часов в Калининграде | Купить оригинальные часы',
  description: 'Широкий выбор оригинальных наручных часов в Калининграде. В наличии японские Casio, Seiko, Orient и швейцарские Tissot, Certina. Официальная гарантия, профессиональная консультация.',
  keywords: 'купить часы калининград, наручные часы, оригинальные часы, casio, tissot, seiko, internet magazin chasov',
  alternates: {
    canonical: 'https://watch39.ru',
  },
};

export default async function Home() {
  let featuredWatches: any[] = [];
  let recentPosts: any[] = [];
  let brands: any[] = [];
  let categories: any[] = [];

  try {
    const dbWatches = await prisma.watch.findMany({
      take: 13, // Берем 13, чтобы 1 ушла в Hero-блок, а 12 в сетку
      include: { brand: true },
      orderBy: { price: 'desc' }, 
    });
    featuredWatches = dbWatches.map((w: any) => ({
      ...w,
      price: Number(w.price),
    }));
  } catch (error) {
    console.error('❌ Ошибка при получении часов из Prisma:', error);
  }

  try {
    recentPosts = await prisma.post.findMany({
      where: { published: true },
      take: 4,
      orderBy: { id: 'desc' },
    });
    brands = await prisma.brand.findMany({ take: 8 });
    categories = await prisma.category.findMany({ take: 4 });
  } catch (error) {
    console.error('❌ Ошибка при БД:', error);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Новинки наручных часов в Калининграде',
    'url': 'https://watch39.ru',
    'itemListElement': featuredWatches.map((watch: any, index: number) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `https://watch39.ru/product/${watch.slug}`,
      'name': watch.title,
    })),
  };

  // Разделяем часы для журнальной верстки: 1 главный флагман и остальные для каталога
  const heroWatch = featuredWatches[0];
  const gridWatches = featuredWatches.slice(1);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1400px] bg-white text-stone-900 selection:bg-stone-900 selection:text-white">
      <LocalBusinessSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ЖУРНАЛЬНЫЙ ЗАГОЛОВОК (MASTHEAD) */}
      <header className="py-8 md:py-12 border-b-2 border-stone-900 flex flex-col items-center text-center">
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-4">
          Калининградская область • Официальная гарантия • Профессиональная консультация
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black tracking-tighter uppercase text-stone-900 leading-none">
          Watch<span className="font-sans font-light">39</span>
        </h1>
        <p className="mt-6 text-stone-600 max-w-2xl text-sm md:text-base font-serif italic">
          Интернет-магазин оригинальных наручных часов. Подберем надежную модель под любой бюджет с официальной гарантией.
        </p>
      </header>

      {/* РУБРИКАТОР (ГЛАВНОЕ МЕНЮ)
      {(categories.length > 0 || brands.length > 0) && (
        <nav className="border-b border-stone-300 py-4 mb-12 overflow-x-auto scrollbar-none">
          <ul className="flex items-center justify-center gap-8 md:gap-12 min-w-max px-4">
            {categories.map((cat: any) => (
              <li key={cat.id}>
                <Link href={`/catalog/${cat.slug}`} className="text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-stone-500 transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li className="text-stone-300">|</li>
            {brands.map((brand: any) => (
              <li key={brand.id}>
                <Link href={`/brand/${brand.slug}`} className="text-xs font-medium uppercase tracking-wider text-stone-600 hover:text-stone-900 transition-colors">
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )} */}

      <MarqueeNav categories={categories} brands={brands} />

      {/* ГЛАВНАЯ ТЕМА (HERO FEATURE) */}
      {heroWatch && (
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7 relative w-full aspect-[4/3] lg:aspect-square bg-stone-50 border border-stone-200">
            <Image
              src={heroWatch.imageUrl || '/placeholder.png'}
              alt={heroWatch.title}
              fill
              priority
              className="object-cover md:object-contain p-8 mix-blend-multiply"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute top-4 left-4 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              Выбор редакции
            </div>
          </div>
          
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-4 border-b border-stone-300 pb-2 inline-block">
              Новое поступление
            </h2>
            <Link href={`/product/${heroWatch.slug}`} className="group">
              <h3 className="text-3xl lg:text-5xl font-serif font-bold leading-tight text-stone-900 group-hover:text-stone-600 transition-colors">
                {heroWatch.title}
              </h3>
            </Link>
            <p className="mt-6 text-stone-600 text-sm leading-relaxed font-serif">
              {heroWatch.description}
            </p>
            <div className="mt-8 flex items-end justify-between border-t border-stone-300 pt-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Стоимость</p>
                <p className="text-2xl font-sans font-light mt-1">{heroWatch.price.toLocaleString('ru-RU')} ₽</p>
              </div>
              <Link 
                href={`/product/${heroWatch.slug}`} 
                className="text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-stone-500 transition-colors border-b-2 border-stone-900 hover:border-stone-500 pb-1"
              >
                Смотреть детали ↗
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* КОЛЛЕКЦИЯ (THE COLLECTION) */}
      <section aria-labelledby="collection-heading" className="py-16 border-t border-stone-300">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 id="collection-heading" className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              Каталог коллекции
            </h2>
            <p className="text-stone-500 text-sm mt-2 font-serif italic">Кураторская подборка актуальных моделей</p>
          </div>
          <Link href="/catalog" className="text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-stone-500 transition-colors mt-4 md:mt-0">
            Весь каталог ↗
          </Link>
        </div>
        
        {gridWatches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {gridWatches.map((watch: any) => (
              <WatchCard key={watch.id} {...watch} />
            ))}
          </div>
        ) : (
          <p className="text-stone-500 text-sm font-serif italic border-t border-stone-200 pt-4">Коллекция обновляется...</p>
        )}
      </section>

      {/* НОВАЯ СЕКЦИЯ: НАШИ МАГАЗИНЫ */}
      <section className="py-16 border-t border-stone-300">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">Наши магазины</h2>
          <p className="text-stone-500 text-sm mt-2 font-serif italic">Посетите нас для примерки и профессиональной консультации</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Магазин 1 */}
          <div className="space-y-4">
            <div className="w-full h-80 bg-stone-100 overflow-hidden border border-stone-200">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A52c4c0848959dc89ec7bf17bfb038b32ee35991e9695722e38cce36af23b92a5&amp;source=constructor" 
                className="w-full h-full hover:scale-105 duration-500" 
                allowFullScreen 
              />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm text-stone-900">Южный рынок</h3>
              <p className="text-stone-600 text-sm mt-1">Калининград, ул. Интернациональная, 30</p>
            </div>
          </div>

          {/* Магазин 2 */}
          <div className="space-y-4">
            <div className="w-full h-80 bg-stone-100 overflow-hidden border border-stone-200">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A61efd2fa38a305789a53f072af1ffade38e41b12c333c41240517a8d32ffb92a&amp;source=constructor" 
                className="w-full h-full hover:scale-105 duration-500" 
                allowFullScreen 
              />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm text-stone-900">Балтийский рынок</h3>
              <p className="text-stone-600 text-sm mt-1">Калининград, ул. Киевская, 95</p>
            </div>
          </div>
        </div>
      </section>

      {/* ЖУРНАЛ И ИМПРИНТ (JOURNAL & IMPRINT) */}
      <section className="mt-12 py-16 border-t-2 border-stone-900 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Статьи */}
        <div className="lg:col-span-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-8">Журнал & Экспертиза</h2>
          {recentPosts.length > 0 ? (
            <div className="flex flex-col border-t border-stone-300">
              {recentPosts.map((post: any, index: number) => (
                <article key={post.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6 border-b border-stone-300 group">
                  <div className="md:col-span-1 text-xs font-bold text-stone-400 font-sans">
                    0{index + 1}
                  </div>
                  <div className="md:col-span-3">
                    <Link href={`/blog/${post.slug}`} className="text-xl font-serif font-bold text-stone-900 group-hover:text-stone-500 transition-colors">
                      {post.title}
                    </Link>
                    {post.excerpt && (
                      <p className="text-stone-500 text-sm mt-2 font-serif italic line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-stone-500 text-sm font-serif italic border-t border-stone-200 pt-4">Статьи готовятся к публикации.</p>
          )}
        </div>

        {/* Колонка редактора / SEO-блок */}
        <div className="lg:col-span-4 lg:border-l border-stone-300 lg:pl-12">
          <div className="bg-stone-100 p-8 h-full">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-6">О редакции</h3>
            <div className="space-y-4 font-serif text-sm text-stone-700 leading-relaxed">
              <p>
                Watch39 — это не просто магазин, это пространство для ценителей микромеханики в Калининграде. 
              </p>
              <p>
                Мы поставляем сертифицированные мужские и женские модели напрямую от дистрибьюторов. Вся продукция проходит предпродажную проверку точности хода.
              </p>
              <p className="italic text-stone-500 pt-4 border-t border-stone-300">
                Жители Калининграда могут посетить наши магазины для примерки и поккупки продукции.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}