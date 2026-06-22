// components/WatchCard.tsx
import Link from 'next/link';
import Image from 'next/image';

interface WatchCardProps {
  title: string;
  slug: string;
  price: number;
  imageUrl: string | null;
  stockKaliningrad: number;
  brand: {
    name: string;
    slug: string;
  };
}

export const WatchCard = ({ title, slug, price, imageUrl, stockKaliningrad, brand }: WatchCardProps) => {
  const isAvailable = stockKaliningrad > 0;

  return (
    <article className="border p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white">
      <div>
        {/* Оптимизированное изображение с корректным alt для Яндекс.Картинок */}
        <div className="relative w-full h-48 bg-gray-50 rounded-md overflow-hidden mb-3">
          <Image
            src={imageUrl || '/placeholder.png'}
            alt={`Наручные часы ${title} — купить в Калининграде`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-2"
            loading="lazy"
          />
        </div>

        {/* Хлебная крошка или бренд для веса */}
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {brand.name}
        </span>

        {/* Заголовок товара (для листингов h3 — идеальная иерархия) */}
        <h3 className="font-medium text-gray-900 mt-1 line-clamp-2 text-sm min-h-[40px]">
          {title}
        </h3>
      </div>

      <div className="mt-4">
        {/* Цена и статус наличия для локального SEO */}
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">{price.toLocaleString('ru-RU')} ₽</span>
          <span className={`text-xs ${isAvailable ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
            {isAvailable ? '● В наличии' : 'Временно нет в наличии'}
          </span>
        </div>

        {/* ЧПУ URL вместо ID */}
        <Link 
          href={`/product/${slug}`} 
          className="block text-center w-full bg-slate-900 hover:bg-slate-800 text-white text-sm py-2 rounded font-medium transition"
        >
          Смотреть параметры
        </Link>
      </div>
    </article>
  );
};