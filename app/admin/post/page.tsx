import { prisma } from "@/lib/prisma";
import { PostTable } from "@/components/PostTable";
import { Button } from "antd";
import Link from "next/link";

export default async function PostListPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });

  // Важно: Prisma возвращает Date объекты, которые не всегда корректно сериализуются.
  // Преобразуем их в строки перед передачей в клиентский компонент.
  const serializablePosts = posts.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h1>Посты</h1>
        <Link href="/admin/post/create">
          <Button type="primary">Создать пост</Button>
        </Link>
      </div>

      <PostTable data={serializablePosts} />
    </div>
  );
}