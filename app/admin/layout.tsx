'use client';

import { Suspense } from 'react';
import { Refine } from '@refinedev/core';
import type { AuthProvider } from '@refinedev/core';
import { dataProvider, liveProvider } from '@refinedev/supabase';
import { ConfigProvider, App as AntdApp } from 'antd';
import { supabaseClient } from '@/lib/supabaseClient';
import routerProvider from "@refinedev/nextjs-router";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      return { 
        success: false, 
        error: {
          name: "Ошибка авторизации",
          message: error.message,
        }
      };
    }
    
    return { success: true, redirectTo: '/admin/brand' };
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
  onError: async (error: any) => ({ error }), 
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <AntdApp>
        {/* Оборачиваем весь Refine провайдер в Suspense */}
        <Suspense fallback={<div>Инициализация панели...</div>}>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerProvider}
            options={{
              disableTelemetry: true, // Вот правильное свойство!
              syncWithLocation: true,
            }}
            resources={[
              { 
                name: 'brand', 
                list: '/admin/brand',
                create: '/admin/brand/create',
                edit: '/admin/brand/edit/:id',
                meta: { 
                  tableName: 'Brand' // 👈 Напишите ТАК, как она называется в Supabase (например 'Brand' или 'brands')
                }
              },
              { 
                name: 'category', 
                list: '/admin/category',
                create: '/admin/category/create',
                edit: '/admin/category/edit/:id',
                meta: { 
                  tableName: 'Category' // 👈 Точное имя таблицы
                }
              },
              { 
                name: 'watch', 
                list: '/admin/watch',
                create: '/admin/watch/create',
                edit: '/admin/watch/edit/:id',
                meta: { 
                  tableName: 'Watch' // 👈 Например, если в базе с большой буквы
                }
              },
              { 
                name: 'post', 
                list: '/admin/post',
                create: '/admin/post/create',
                edit: '/admin/post/edit/:id',
                meta: { 
                  tableName: 'Post' // 👈 Точное имя таблицы
                }
              },
            ]}
          >
            {children}
          </Refine>
        </Suspense>
      </AntdApp>
    </ConfigProvider>
  );
}