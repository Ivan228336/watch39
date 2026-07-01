import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';

interface Props {
  searchParams: Promise<{
    brand?: string;
    type?: string;
    sort?: string;
  }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const filters = await searchParams;
  let title = 'Каталог оригинальных наручных часов в Калининграде | watch39';
  let description = 'Официальный каталог наручных часов в интернет-магазине watch39. В наличии японские и швейцарские бренды. Бесплатная доставка и примерка по Калининграду.';

  if (filters.brand) {
    const brandName = filters.brand.charAt(0).toUpperCase() + filters.brand.slice(1);
    title = `Купить часы ${brandName} в Калининграде | Каталог оригиналов 2026`;
    description = `Ищете оригинальные часы ${brandName}? В нашем каталоге представлены лучшие модели с官方 гарантией. Закажите бесплатную доставку с примеркой.`;
  }

  return {
    title,
    description,
    alternates: { canonical: 'https://watch39.ru/catalog' },
  };
}

export default async function CatalogPage({ searchParams }: Props) {
  const filters = await searchParams;
  
  const [brands, allWatches] = await Promise.all([
    prisma.brand.findMany({ select: { id: true, name: true, slug: true } }),
    prisma.watch.findMany({
      where: {
        ...(filters.brand && {
          brand: { slug: { equals: filters.brand, mode: 'insensitive' } }
        }),
        ...(filters.type && {
            category: {
                slug: { equals: filters.type, mode: 'insensitive' }
            }
        }),
      },
      include: { brand: true },
      orderBy: filters.sort === 'price_asc' 
        ? { price: 'asc' } 
        : filters.sort === 'price_desc' 
        ? { price: 'desc' } 
        : { id: 'desc' },
    })
  ]);

  const watches = allWatches.map((w: any) => ({
    ...w,
    price: Number(w.price)
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    'mainEntity': {
      '@type': 'ItemList',
      'name': 'Каталог наручных часов watch39',
      'numberOfItems': watches.length,
      'itemListElement': watches.slice(0, 10).map((watch: any, index: number) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'offers': {
          '@type': 'Offer',
          'price': watch.price,
          'priceCurrency': 'RUB',
          'availability': watch.stockKaliningrad > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          'url': `https://watch39.ru/product/${watch.slug}`
        }
      }))
    }
  };

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
      <BreadcrumbSchema items={[{ label: 'Каталог часов', href: '/catalog' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <Breadcrumbs items={[{ label: 'Каталог часов' }]} />

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          {filters.brand 
            ? `Оригинальные часы ${brands.find((b: { slug: string; name: string }) => b.slug === filters.brand)?.name || ''} в Калининграде` 
            : 'Каталог оригинальных наручных часов'}
        </h1>
        <p className="mt-3 text-gray-600 max-w-4xl text-sm sm:text-base leading-relaxed">
          Добро пожаловать в сертифицированный магазин оригинальных часов <span className="font-semibold text-gray-900">watch39</span>. 
          Все модели в каталоге поставляются напрямую от дистрибьюторов, имеют официальную гарантию до 2-х лет и кассовый чек. 
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛡️</span>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900">100% Оригинал</h4>
            <p className="text-[11px] text-gray-500">Паспорта, чеки, инструкции</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚗</span>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900">Примерка в Клд</h4>
            <p className="text-[11px] text-gray-500">Идеальная посадка</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">💳</span>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900">Оплата при получении</h4>
            <p className="text-[11px] text-gray-500">Карта, наличные, QR-код</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔧</span>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900">Свой сервис</h4>
            <p className="text-[11px] text-gray-500">Подгонка браслета на месте</p>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="border rounded-xl p-5 bg-white sticky top-4">
            <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b text-sm uppercase tracking-wider">Фильтры каталога</h3>
            
            <div className="mb-6">
              <span className="block text-xs font-semibold text-gray-500 uppercase mb-2">Бренды</span>
              <div className="space-y-2 flex flex-col">
                <Link href="/catalog" className={`text-sm ${!filters.brand ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}>
                  Все бренды
                </Link>
                {brands.map((b: { id: string | number; name: string; slug: string }) => (
                  <Link 
                    key={b.id} 
                    href={`/catalog?brand=${b.slug}${filters.type ? `&type=${filters.type}` : ''}`} 
                    className={`text-sm ${filters.brand === b.slug ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <span className="block text-xs font-semibold text-gray-500 uppercase mb-2">Механизм</span>
              <div className="space-y-2 flex flex-col">
                <Link href={`/catalog${filters.brand ? `?brand=${filters.brand}` : ''}`} className={`text-sm ${!filters.type ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}>
                  Все типы
                </Link>
                <Link href={`/catalog?type=quartz${filters.brand ? `&brand=${filters.brand}` : ''}`} className={`text-sm ${filters.type === 'quartz' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}>
                  Кварцевые
                </Link>
                <Link href={`/catalog?type=mechanical${filters.brand ? `&brand=${filters.brand}` : ''}`} className={`text-sm ${filters.type === 'mechanical' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}>
                  Механические
                </Link>
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase mb-2">Сортировка</span>
              <div className="space-y-2 flex flex-col">
                <Link href={`/catalog?sort=newest${filters.brand ? `&brand=${filters.brand}` : ''}${filters.type ? `&type=${filters.type}` : ''}`} className="text-sm text-gray-600 hover:text-gray-900">По новизне</Link>
                <Link href={`/catalog?sort=price_asc${filters.brand ? `&brand=${filters.brand}` : ''}${filters.type ? `&type=${filters.type}` : ''}`} className="text-sm text-gray-600 hover:text-gray-900">Сначала дешевле</Link>
                <Link href={`/catalog?sort=price_desc${filters.brand ? `&brand=${filters.brand}` : ''}${filters.type ? `&type=${filters.type}` : ''}`} className="text-sm text-gray-600 hover:text-gray-900">Сначала дороже</Link>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1">
          {watches.length === 0 ? (
            <div className="border border-dashed rounded-xl p-12 text-center bg-gray-50">
              <p className="text-gray-500 font-medium">Модели с выбранными фильтрами временно распроданы.</p>
              <Link href="/catalog" className="text-blue-600 font-semibold text-sm mt-2 inline-block hover:underline">Сбросить все фильтры</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {watches.map((watch: any) => (
                <article key={watch.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group">
                  <div className="p-4 relative">
                    <span className="absolute top-6 left-6 z-10 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-emerald-200">
                      В наличии в Клд
                    </span>
                    
                    <div className="relative w-full h-56 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center mb-4">
                      {watch.imageUrl ? (
                        <Image 
                          src={watch.imageUrl} 
                          alt={`Наручные часы ${watch.brand?.name || ''} ${watch.title}`} 
                          fill 
                          className="object-contain p-4 group-hover:scale-105 transition duration-300"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      ) : (
                        <span className="text-gray-300 text-xs">Нет фото</span>
                      )}
                    </div>

                    <span className="text-xs font-semibold text-gray-400 block mb-1">
                      {watch.brand?.name || 'Бренд'}
                    </span>
                    <h2 className="text-base font-bold text-gray-900 line-clamp-2 min-h-[3rem] hover:text-blue-600 transition">
                      <Link href={`/product/${watch.slug}`}>{watch.title}</Link>
                    </h2>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-xl font-black text-gray-900">
                        {watch.price.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    
                    <Link 
                      href={`/product/${watch.slug}`}
                      className="w-full block text-center bg-gray-900 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-600 transition text-sm shadow-sm"
                    >
                      Смотреть и примерить
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <footer className="mt-16 border-t pt-10 bg-slate-50 -mx-4 px-4 sm:-mx-8 sm:px-8 py-10 rounded-b-2xl">
        <div className="prose max-w-none text-gray-600 text-xs sm:text-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Где купить оригинальные наручные часы в Калининграде?</h2>
          <p>
            Интернет-магазин <strong>watch39</strong> — это специализированная торговая площадка, где жители Калининграда и Калининградской области могут приобрести оригинальные мужские и женские наручные часы. Мы исключаем любой риск столкновения с контрафактом, сотрудничая только с официальными дистрибьюторами марок на территории РФ.
          </p>
          <h3 className="text-sm font-bold text-gray-900 mt-4">Широкий ассортимент механизмов и материалов</h3>
          <p>
            В нашем каталоге представлены как классические <strong>механические часы с автоподзаводом</strong> (символ престижа, точности и инженерных часовых традиций), так и практичные, устойчивые к нагрузкам <strong>кварцевые мужские часы</strong>, работающие от элемента питания. Вы можете выбрать часы со стойким к царапинам <em>сапфировым стеклом</em>, модели на надежных <em>металлических браслетах</em> из хирургической стали марки 316L или спортивные ударопрочные и <em>водонепроницаемые часы</em> для активного отдыха.
          </p>
          <h3 className="text-sm font-bold text-gray-900 mt-4">Преимущества локальной покупки в watch39</h3>
          <p>
            Главное неудобство обычных интернет-магазинов — невозможность оценить габариты и вес часов на руке до момента оплаты. Мы полностью решили эту проблему. Выберите любые понравившиеся модели, и курьер бесплатно доставит их по Калининграду. Каждая покупка сопровождается товарным и кассовым чеком, а также официальным гарантийным талоном, который принимается в любых сертифицированных часовых мастерских.
          </p>
        </div>
      </footer>
    </main>
  );
}