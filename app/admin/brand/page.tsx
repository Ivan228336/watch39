import { prisma } from "@/lib/prisma";
import { BrandTable } from "@/components/BrandTable";
import { Button } from "antd";
import Link from "next/link";

export default async function BrandListPage() {
  const brands = await prisma.brand.findMany();

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h1>Бренды</h1>
        <Link href="/admin/brand/create">
          <Button type="primary">Создать бренд</Button>
        </Link>
      </div>

      {/* Передаем данные как обычный пропс */}
      <BrandTable data={brands} />
    </div>
  );
}