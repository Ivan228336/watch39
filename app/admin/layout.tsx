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
                name: 'Brand', 
                list: '/admin/brand', 
                create: '/admin/brand/create', 
                edit: '/admin/brand/edit/:id' 
              },
              { 
                name: 'Category', 
                list: '/admin/category', 
                create: '/admin/category/create', 
                edit: '/admin/category/edit/:id' 
              },
              { 
                name: 'Watch',  // ← точно как в БД
                list: '/admin/watch', 
                create: '/admin/watch/create', 
                edit: '/admin/watch/edit/:id' 
              },
              { 
                name: 'Post', 
                list: '/admin/post', 
                create: '/admin/post/create', 
                edit: '/admin/post/edit/:id' 
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