// import { prisma } from '@/lib/prisma';
// import { notFound } from 'next/navigation';

// export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params; // ✅ Разворачиваем Promise

//   const watch = await prisma.watch.findUnique({
//     where: { id: Number(id) },
//   });

//   if (!watch) notFound();

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold">{watch.brand} {watch.model}</h1>
//       <img src={watch.imageUrl || '/placeholder.png'} alt={watch.model} className="w-96 h-96 object-cover my-4" />
//       <p className="text-xl">{watch.price} ₽</p>
//       <p className="mt-4">{watch.description}</p>
//       <p className="mt-2">Статус: {watch.inStock ? 'В наличии' : 'Нет в наличии'}</p>
//     </div>
//   );
// }