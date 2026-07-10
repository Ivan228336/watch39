'use client';

import React, { useMemo } from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  HomeOutlined, 
  EyeOutlined, 
  AppstoreOutlined, 
  TagsOutlined, 
  FileTextOutlined, 
  ShopOutlined 
} from '@ant-design/icons';
import type { BreadcrumbProps } from 'antd';

const { Header, Content } = Layout;

// Выносим карту путей за пределы компонента для чистоты
const BREADCRUMB_MAP: Record<string, string> = {
  '/admin': 'Главная',
  '/admin/watch': 'Товары',
  '/admin/watch/create': 'Создание',
  '/admin/brand': 'Бренды',
  '/admin/categories': 'Категории',
  '/admin/post': 'Посты',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const breadcrumbItems: BreadcrumbProps['items'] = useMemo(() => {
    const pathSnippets = pathname.split('/').filter((i) => i);
    
    const items = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      
      // Логика определения метки
      let label = BREADCRUMB_MAP[url];
      
      // Если URL содержит edit или цифры/UUID, но не задан в мапе — помечаем как "Редактирование"
      if (!label) {
        if (url.includes('/edit')) label = 'Редактирование';
        else label = url.split('/').pop() || 'Страница';
      }

      // Если это последний элемент - он не кликабелен, иначе ссылка
      const isLast = index === pathSnippets.length - 1;

      return {
        key: url,
        title: isLast ? label : <Link href={url}>{label}</Link>,
      };
    });

    return [
      {
        key: '/admin',
        title: <Link href="/admin"><HomeOutlined /> Админка</Link>,
      },
      ...items.filter(item => item.key !== '/admin'), // Убираем дубль
    ];
  }, [pathname]);

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        background: '#fff', 
        borderBottom: '1px solid #f0f0f0',
        padding: '0 24px' 
      }}>
        <Breadcrumb items={breadcrumbItems} />
        
        <Link href="/" target="_blank" rel="noopener noreferrer">
          <Button icon={<EyeOutlined />}>Перейти на сайт</Button>
        </Link>
      </Header>
      
      <nav style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: '24px' }}>
        <Link href="/admin/watch"><ShopOutlined /> Товары</Link>
        <Link href="/admin/brand"><AppstoreOutlined /> Бренды</Link>
        <Link href="/admin/category"><TagsOutlined /> Категории</Link>
        <Link href="/admin/post"><FileTextOutlined /> Посты</Link>
      </nav>
      
      <Content style={{ padding: '24px' }}>
        {children}
      </Content>
    </Layout>
  );
}