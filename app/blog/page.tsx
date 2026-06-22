// app/blog/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Экспертный блог о наручных часах | Магазин watch39 Калининград',
  description: 'Полезные статьи, обзоры и рейтинги наручных и смарт-часов в Калининграде. Узнайте, как правильно выбрать оригинальные часы и отличить их от подделки.',
  alternates: { canonical: 'https://watch39.ru/blog' },
};

// Запрещаем динамический рендеринг, делаем страницу строго статичной
export const dynamic = 'force-static';

export default async function BlogIndexPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
      <Breadcrumbs items={[{ label: 'Блог' }]} />

      <header className="mb-10 border-b pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Экспертный часовой блог
        </h1>
        <p className="mt-2 text-gray-600 max-w-3xl text-sm sm:text-base">
          Гайды по выбору аксессуаров, обзоры культовых японских и швейцарских брендов, а также актуальные рейтинги умных гаджетов в Калининграде от профессионалов.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-sm">Новые статьи подготавливаются к публикации...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <article key={post.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                {post.imageUrl && (
                  <div className="relative w-full h-48 bg-gray-50">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
                    Статьи и обзоры
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              
              <div className="p-5 pt-0">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm font-medium text-slate-900 hover:text-blue-600 transition"
                >
                  Читать гайд
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}