import { prisma } from "@/lib/prisma";
import { updateWatchAction } from "@/app/actions/watch";
import { WatchForm } from "@/components/WatchForm"; // Вынесем форму сюда

export default async function EditWatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const watch = await prisma.watch.findUnique({ where: { id } });
  const brands = await prisma.brand.findMany();
  const categories = await prisma.category.findMany();

  if (!watch) return <div>Часы не найдены</div>;

  return (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h1>Редактирование: {watch.title}</h1>
      {/* Передаем данные в клиентский компонент формы */}
      <WatchForm 
        initialData={watch} 
        brands={brands} 
        categories={categories} 
        action={updateWatchAction.bind(null, watch.id)} 
      />
    </div>
  );
}