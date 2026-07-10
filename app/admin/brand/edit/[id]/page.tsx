import { prisma } from "@/lib/prisma";
import { BrandForm } from "@/components/BrandForm";
import { updateBrandAction } from "@/app/actions/brand";

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const brand = await prisma.brand.findUnique({ where: { id } });

  if (!brand) return <div>Бренд не найден</div>;

  // Привязываем ID к экшену
  const updateAction = updateBrandAction.bind(null, brand.id);

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h1>Редактирование: {brand.name}</h1>
      <BrandForm initialData={brand} action={updateAction} />
    </div>
  );
}