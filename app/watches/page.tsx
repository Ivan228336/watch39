// import { prisma } from '@/lib/prisma';
// import Link from 'next/link';

// export default async function WatchesPage() {
//   const watches = await prisma.watch.findMany({
//     orderBy: { brand: 'asc' },
//   });

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Каталог часов</h1>
//       <div className="grid grid-cols-3 gap-6">
//         {watches.map((watch) => (
//           <div key={watch.id} className="border p-4 rounded shadow">
//             <img src={watch.imageUrl || 'https://avatars.mds.yandex.net/i?id=f776d2f527512c1c4656ec078d17f90f_sr-4885166-images-thumbs&n=13'} alt={`${watch.brand} ${watch.model}`} className="w-full h-48 object-cover" />
//             <h2 className="text-xl font-semibold mt-2">{watch.brand} {watch.model}</h2>
//             <p className="text-gray-600">{watch.price} ₽</p>
//             <Link href={`/watches/${watch.id}`} className="text-blue-500 mt-2 inline-block">
//               Посмотреть
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }