import { prisma } from "@/lib/prisma";
import { CategoryTable } from "@/components/CategoryTable"; // Импортируем наш новый компонент
import { Button } from "antd";
import Link from "next/link";

export default async function CategoryListPage() {
  const categories = await prisma.category.findMany();

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h1>Категории</h1>
        <Link href="/admin/category/create">
          <Button type="primary">Создать категорию</Button>
        </Link>
      </div>

      {/* Передаем данные как обычный массив объектов, это безопасно */}
      <CategoryTable data={categories} />
    </div>
  );
}