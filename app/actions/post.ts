'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Изменили тип id с string | null на number | null
export async function savePostAction(id: number | null, formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    imageUrl: formData.get("imageUrl") as string,
    published: formData.get("published") === "true",
  };

  if (id) {
    // Prisma корректно обработает id как number
    await prisma.post.update({ where: { id }, data });
  } else {
    await prisma.post.create({ data });
  }

  revalidatePath("/admin/post");
  redirect("/admin/post");
}