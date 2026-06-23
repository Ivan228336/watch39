import { prisma } from '@/lib/prisma';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://watch39.ru';

  // 1. Статические страницы
  const staticPages: MetadataRoute.Sitemap = ['', '/catalog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  }));

  // 2. Динамические страницы часов (убрали updatedAt из выборки)
  const watches = await prisma.watch.findMany({
    select: { slug: true },
  });
  
  const watchPages: MetadataRoute.Sitemap = watches.map((watch: { slug: string }) => ({
    url: `${baseUrl}/product/${watch.slug}`,
    lastModified: new Date(), // Передаем текущую дату, раз в схеме нет таймстампа
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 3. Динамические страницы постов блога 
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  
  const postPages: MetadataRoute.Sitemap = posts.map((post: { slug: string; updatedAt: Date }) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...watchPages, ...postPages];
}