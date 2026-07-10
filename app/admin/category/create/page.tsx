import { CategoryForm } from "@/components/CategoryForm";
import { saveCategoryAction } from "@/app/actions/category";

export default function CreateCategoryPage() {
  const createAction = saveCategoryAction.bind(null, null); // null для создания

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h1>Создать категорию</h1>
      <CategoryForm action={createAction} />
    </div>
  );
}