// components/Breadcrumbs.tsx
import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  return (
    <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2 flex-wrap" aria-label="Хлебные крошки">
      <Link href="/" className="hover:text-black transition font-medium">
        Главная
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-2">
            <span className="text-gray-300">/</span>
            {isLast || !item.href ? (
              <span className="text-gray-900 font-semibold truncate max-w-[200px]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-black transition font-medium">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};