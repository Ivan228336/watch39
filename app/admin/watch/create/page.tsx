import { prisma } from "@/lib/prisma";
import { WatchForm } from "@/components/WatchForm";
import { createWatchAction } from "@/app/actions/watch";

export default async function CreatePage() {
  const brands = await prisma.brand.findMany();
  const categories = await prisma.category.findMany();

  return (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h1>Создать часы</h1>
      <WatchForm brands={brands} categories={categories} action={createWatchAction} />
    </div>
  );
}