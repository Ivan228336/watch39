import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/PostForm";
import { savePostAction } from "@/app/actions/post";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // 1. Преобразуем строку в число
  const postId = parseInt(id, 10);

  // 2. Добавляем проверку, что ID является валидным числом
  if (isNaN(postId)) {
    return <div>Некорректный ID поста</div>;
  }

  // 3. Используем числовой postId
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) return <div>Пост не найден</div>;

  const updateAction = savePostAction.bind(null, post.id);

  return (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h1>Редактирование: {post.title}</h1>
      <PostForm initialData={post} action={updateAction} />
    </div>
  );
}