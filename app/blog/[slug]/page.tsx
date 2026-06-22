// app/blog/[slug]/page.tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import Image from 'next/image';

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Предварительный рендеринг всех статей в HTML при сборке проекта
export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((post) => ({ slug: post.slug }));
}

// 2. Генерация идеальных SEO мета-тегов на основе статьи
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return {};

  return {
    title: `${post.title} | Блог интернет-магазина watch39`,
    description: post.excerpt || 'Полезные советы экспертов часового дела в Калининграде. Как выбрать оригинальные наручные часы.',
    alternates: {
      canonical: `https://watch39.ru/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      url: `https://watch39.ru/blog/${slug}`,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      images: [{ url: post.imageUrl || '/placeholder.png' }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Извлекаем статью из базы
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  // 3. Микроразметка JSON-LD для поисковых роботов (Google/Яндекс Карточки)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.excerpt,
    'image': post.imageUrl || 'https://watch39.ru/placeholder.png',
    'datePublished': post.createdAt.toISOString(),
    'dateModified': post.updatedAt.toISOString(),
    'author': {
      '@type': 'Organization',
      'name': 'Часовой эксперт watch39',
      'url': 'https://watch39.ru',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'watch39',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://watch39.ru/logo.png', // Замени на реальный лого при наличии
      },
    },
  };

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      {/* Внедряем JSON-LD в секцию head страницы */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Навигационные крошки для перелинковки */}
      <Breadcrumbs items={[{ label: 'Блог', href: '/blog' }, { label: post.title }]} />

      <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-5 sm:p-8">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Категория: Экспертный блог</span>
            <span>•</span>
            <time dateTime={post.createdAt.toISOString()}>
              {post.createdAt.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </div>
        </header>

        {post.imageUrl && (
          <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden mb-8 bg-gray-50">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

        {/* 4. Безопасный вывод SEO-оптимизированного HTML из БД с кастомными стилями */}
        <section 
          className="rich-text text-gray-800 leading-relaxed text-sm sm:text-base space-y-4 
                     prose max-w-none 
                     [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-3
                     [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-2
                     [&>p]:text-gray-700 [&>p]:mb-4
                     [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:my-4
                     [&>li]:text-gray-700
                     [&>strong]:text-gray-900 [&>strong]:font-semibold
                     [&>table]:w-full [&>table]:my-6 [&>table]:border-collapse
                     [&>table_th]:bg-gray-50 [&>table_th]:p-3 [&>table_th]:text-left [&>table_th]:font-semibold [&>table_th]:border
                     [&>table_td]:p-3 [&>table_td]:border"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}