import { Button } from "antd";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { WatchTable } from "./components/WatchTable"; // Импортируем наш клиентский компонент

export default async function WatchListPage() {
  // Получаем данные на сервере
  const watches = await prisma.watch.findMany({
    orderBy: { price: 'desc' }
  });

  return (
    <div style={{ padding: 24 }}>
      <h1>Часы</h1>
      <Link href="/admin/watch/create">
        <Button type="primary" style={{ marginBottom: 16 }}>Создать</Button>
      </Link>
      
      {/* Передаем данные в клиентский компонент */}
      <WatchTable data={watches} />
    </div>
  );
}