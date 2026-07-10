import { prisma } from "@/lib/prisma";
import { CategoryForm } from "@/components/CategoryForm";
import { saveCategoryAction } from "@/app/actions/category";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) return <div>Категория не найдена</div>;

  const updateAction = saveCategoryAction.bind(null, category.id);

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h1>Редактирование: {category.name}</h1>
      <CategoryForm initialData={category} action={updateAction} />
    </div>
  );
}