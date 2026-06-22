// app/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { WatchCard } from '@/components/WatchCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Интернет-магазин наручных часов в Калининграде | Купить оригинальные часы',
  description: 'Широкий выбор оригинальных наручных часов в Калининграде. В наличии японские Casio, Seiko, Orient и швейцарские Tissot, Certina. Официальная гарантия, быстрая доставка.',
  keywords: 'купить часы калининград, наручные часы, оригинальные часы, casio, tissot, seiko, internet magazin chasov',
  alternates: {
    canonical: 'https://watch39.ru',
  },
};

export default async function Home() {
  // Инициализируем пустые массивы на случай сбоя БД
  let featuredWatches = [];
  let recentPosts = [];
  let brands = [];
  let categories = [];

  // Безопасно загружаем данные из БД
  try {
    featuredWatches = await prisma.watch.findMany({
      take: 12,
      include: { brand: true },
      orderBy: { id: 'desc' }, 
    });
  } catch (error) {
    console.error('❌ Ошибка при получении часов из Prisma:', error);
  }

  try {
    recentPosts = await prisma.post.findMany({
      where: { published: true },
      take: 3,
      orderBy: { id: 'desc' }, // Заменили на id, если createdAt отсутствует
    });
  } catch (error) {
    console.error('❌ Ошибка при получении постов (возможно, таблицы Post нет):', error);
  }

  try {
    brands = await prisma.brand.findMany({ take: 8 });
    categories = await prisma.category.findMany({ take: 4 });
  } catch (error) {
    console.error('❌ Ошибка при получении брендов/категорий:', error);
  }

  // Формируем JSON-LD микроразметку
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Новинки наручных часов в Калининграде',
    'url': 'https://watch39.ru',
    'itemListElement': featuredWatches.map((watch, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `https://watch39.ru/product/${watch.slug}`,
      'name': watch.title,
    })),
  };

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Интернет-магазин наручных часов в Калининграде
        </h1>
        <p className="mt-2 text-gray-600 max-w-3xl text-sm sm:text-base">
          Добро пожаловать в специализированный магазин оригинальных часов. Мы предлагаем сертифицированные модели мировых брендов с локальной гарантией в Калининграде.
        </p>
      </header>

      {/* СЕКЦИЯ ПЕРЕЛИНКОВКИ */}
      {(categories.length > 0 || brands.length > 0) && (
        <section className="mb-10 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Популярные направления каталога</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/catalog/${cat.slug}`} className="bg-white border text-gray-700 hover:text-black hover:border-black px-3 py-1.5 rounded-full text-xs transition font-medium">
                {cat.name}
              </Link>
            ))}
            {brands.map((brand) => (
              <Link key={brand.id} href={`/brand/${brand.slug}`} className="bg-white border text-gray-700 hover:text-black hover:border-black px-3 py-1.5 rounded-full text-xs transition font-medium">
                Часы {brand.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* БЛОК НОВИНОК */}
      <section aria-labelledby="featured-heading">
        <div className="flex items-baseline justify-between mb-6">
          <h2 id="featured-heading" className="text-2xl font-bold text-gray-900">
            Каталог оригинальных новинок
          </h2>
          <span className="text-xs text-gray-500">Обновлено сегодня</span>
        </div>
        
        {featuredWatches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredWatches.map((watch) => (
              <WatchCard key={watch.id} {...watch} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Каталог товаров временно обновляется...</p>
        )}
      </section>

      {/* ПОСЛЕДНИЕ СТАТЬИ И СЕО БЛОК */}
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 border-t pt-10">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Экспертный блог: как выбрать часы</h2>
          {recentPosts.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <article key={post.id} className="border-b pb-4 last:border-0">
                  <Link href={`/blog/${post.slug}`} className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline block">
                    {post.title}
                  </Link>
                  <p className="text-xs text-gray-400 mt-1">Полезные советы экспертов часового дела</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Статьи блога скоро появятся.</p>
          )}
        </div>

        <div className="bg-slate-50 p-6 rounded-lg border h-fit">
          <h3 className="text-sm font-bold text-slate-800 mb-2">Где купить оригинальные часы?</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ищете надежный магазин часов в Калининградской области? Мы поставляем сертифицированные 
            мужские и женские модели напрямую от дистрибьюторов. Вся продукция проходит предпродажную 
            проверку точности хода. Жители Калининграда могут заказать примерку нескольких моделей.
          </p>
        </div>
      </section>
    </main>
  );
}