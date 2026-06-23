"use client";

import { useState } from 'react';
import Image from 'next/image';

interface WatchGalleryProps {
  title: string;
  mainImage: string | null;
  images: { id: string; url: string; alt: string | null }[];
}

export const WatchGallery = ({ title, mainImage, images }: WatchGalleryProps) => {
  // Собираем все картинки в один массив: сначала главная (если есть), потом дополнительные
  const allImages = [
    ...(mainImage ? [{ id: 'main', url: mainImage, alt: `Наручные часы ${title}` }] : []),
    ...images.map(img => ({ ...img, alt: img.alt || `Дополнительное фото ${title}` }))
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden p-4 border border-gray-100 flex items-center justify-center">
        <Image src="/placeholder.png" alt="Нет фото" fill className="object-contain p-6" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Главное увеличенное фото */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden p-4 border border-gray-100 flex items-center justify-center">
        <Image
          src={allImages[currentIndex].url}
          alt={allImages[currentIndex].alt || title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6 transition-opacity duration-300"
          priority={currentIndex === 0} // Приоритет только для первой картинки, это важно для LCP (SEO)
        />
      </div>

      {/* Линейка миниатюр (показываем, только если картинок больше 1) */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === index ? 'border-slate-900 shadow-sm' : 'border-transparent hover:border-slate-300'
              }`}
              aria-label={`Посмотреть ${image.alt}`}
            >
              <Image
                src={image.url}
                alt={image.alt || 'Миниатюра'}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};