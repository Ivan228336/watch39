import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Функция теперь называется proxy
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Игнорируем логин и статику, чтобы не зациклиться
  if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Проверяем наличие куки
  const token = req.cookies.get('admin_token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

// Конфигурация остается прежней, она говорит Next.js, какие пути обрабатывать через этот прокси
export const config = {
  matcher: '/admin/:path*',
};