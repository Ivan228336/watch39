// app/admin/layout.tsx
'use client';

export const dynamic = 'force-dynamic';

import { Refine } from '@refinedev/core';
import type { AuthProvider } from '@refinedev/core'; // ← 1. Импортируем тип AuthProvider
import { dataProvider, liveProvider } from '@refinedev/supabase';
import { ConfigProvider, App as AntdApp } from 'antd';
import { supabaseClient } from '@/lib/supabaseClient';
import routerProvider from "@refinedev/nextjs-router";

// ← 2. Указываем, что константа строго соответствует типу AuthProvider
const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      return { 
        success: false, 
        // ← 3. Refine ожидает объект с name и message, а не просто строку
        error: {
          name: "Ошибка авторизации",
          message: error.message,
        }
      };
    }
    
    return { success: true, redirectTo: '/admin/brand' }; // Перенаправляем внутрь админки
  },
  logout: async () => {
    await supabaseClient.auth.signOut();
    return { success: true, redirectTo: '/login' };
  },
  check: async () => {
    const { data } = await supabaseClient.auth.getSession();
    return { authenticated: !!data.session };
  },
  getPermissions: async () => null,
  // ← 4. Явно указываем тип для error (any или Error), чтобы TS не ругался
  onError: async (error: any) => ({ error }), 
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <AntdApp>
        <Refine
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          authProvider={authProvider}
          routerProvider={routerProvider}
          resources={[
            { 
              name: 'brand', 
              meta: { tableName: 'Brand' }, // 👈 Указываем точное имя таблицы из Prisma
              list: '/admin/brand',
              create: '/admin/brand/create',
              edit: '/admin/brand/edit/:id',
            },
            { 
              name: 'category', 
              meta: { tableName: 'Category' }, // 👈
              list: '/admin/category',
              create: '/admin/category/create',
              edit: '/admin/category/edit/:id',
            },
            { 
              name: 'watch', 
              meta: { tableName: 'Watch' }, // 👈
              list: '/admin/watch',
              create: '/admin/watch/create',
              edit: '/admin/watch/edit/:id',
            },
            { 
              name: 'post', 
              meta: { tableName: 'Post' }, // 👈
              list: '/admin/post',
              create: '/admin/post/create',
              edit: '/admin/post/edit/:id',
            },
          ]}
        >
          {children}
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}