// import Link from "next/link";

// export default function MarqueeNav({ categories, brands }: { categories: any[], brands: any[] }) {
//   const repeatedItems = (items: any[], times = 4) =>
//     Array.from({ length: times }, () => items).flat();

//   const MarqueeContent = ({ items, type }: { items: any[], type: 'cat' | 'brand' }) => (
//     <div className="flex animate-marquee whitespace-nowrap gap-12 px-6 min-w-max will-change-transform">
//       {repeatedItems(items).map((item, index) => (
//         <Link
//           key={`${item.id}-${index}`}
//           href={type === 'cat' ? `/catalog/${item.slug}` : `/brand/${item.slug}`}
//           className={`text-xs font-bold uppercase tracking-widest transition-colors ${
//             type === 'cat'
//               ? "text-stone-900 hover:text-stone-500"
//               : "text-stone-600 hover:text-stone-900"
//           }`}
//         >
//           {item.name}
//         </Link>
//       ))}
//     </div>
//   );

//   return (
//     <nav className="border-y border-stone-200 py-6 my-12 overflow-hidden flex flex-col gap-4 bg-white">
//       <div className="flex overflow-hidden">
//         <MarqueeContent items={categories} type="cat" />
//       </div>

//       <div className="flex overflow-hidden">
//         <div className="flex animate-marquee-reverse whitespace-nowrap gap-12 px-6 min-w-max will-change-transform">
//           {repeatedItems(brands).map((brand, index) => (
//             <Link
//               key={`${brand.id}-${index}`}
//               href={`/brand/${brand.slug}`}
//               className="text-xs font-medium uppercase tracking-wider text-stone-600 hover:text-stone-900 transition-colors"
//             >
//               {brand.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// }

import Link from "next/link";
import styles from "./MarqueeNav.module.css";

export default function MarqueeNav({ categories, brands }: { categories: any[], brands: any[] }) {
  const repeatedItems = (items: any[], times = 4) =>
    Array.from({ length: times }, () => items).flat();

  return (
    <nav className="border-y border-stone-200 py-6 my-12 overflow-hidden flex flex-col gap-4 bg-white">
      {/* Категории — слева направо */}
      <div className={styles.track}>
        <div className={styles.content}>
          {repeatedItems(categories).map((item, index) => (
            <Link
              key={`cat-${item.id}-${index}`}
              href={`/catalog/${item.slug}`}
              className={`${styles.item} ${styles.catItem}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Бренды — справа налево */}
      <div className={styles.track}>
        <div className={`${styles.content} ${styles.reverse}`}>
          {repeatedItems(brands).map((brand, index) => (
            <Link
              key={`brand-${brand.id}-${index}`}
              href={`/brand/${brand.slug}`}
              className={`${styles.item} ${styles.brandItem}`}
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}