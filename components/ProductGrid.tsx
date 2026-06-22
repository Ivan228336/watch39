// components/ProductGrid.tsx
import { WatchCard } from '@/components/WatchCard';

// Типизация совпадает с тем, что ожидает WatchCard
interface WatchData {
  id: number;
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

export const ProductGrid = ({ watches }: { watches: WatchData[] }) => {
  if (watches.length === 0) {
    return (
      <div className="text-center py-12 border rounded-xl bg-gray-50">
        <p className="text-gray-500 text-sm">В данной категории товары временно отсутствуют.</p>
        <p className="text-xs text-gray-400 mt-1">Ожидаем новое поступление оригинальных моделей в ближайшее время.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {watches.map((watch) => (
        <WatchCard key={watch.id} {...watch} />
      ))}
    </div>
  );
};