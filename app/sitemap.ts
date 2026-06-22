// app/sitemap.ts
import { prisma } from '@/lib/prisma';

export default async function sitemap() {
  const baseUrl = 'https://your-domain.com';

  // Статические страницы
  const staticPages = ['', '/watches', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }));

  // Динамические страницы товаров и постов
  const watches = await prisma.watch.findMany({
    select: { id: true, updatedAt: true },
  });
  const watchPages = watches.map((watch) => ({
    url: `${baseUrl}/watches/${watch.id}`,
    lastModified: watch.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticPages, ...watchPages, ...postPages];
}