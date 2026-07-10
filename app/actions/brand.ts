'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBrandAction(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  if (!name || !slug) throw new Error("Заполните все поля");

  await prisma.brand.create({
    data: { name, slug }
  });

  revalidatePath("/admin/brand");
  redirect("/admin/brand");
}

export async function updateBrandAction(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  if (!name || !slug) throw new Error("Заполните все поля");

  await prisma.brand.update({
    where: { id },
    data: { name, slug }
  });

  revalidatePath("/admin/brand");
  revalidatePath("/brands"); // ваш публичный список
  revalidatePath(`/brand/${slug}`, 'page');
  revalidatePath("/");
  redirect("/admin/brand");
}