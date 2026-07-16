import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password } = await req.json();
  
  // Сравнение идет ТОЛЬКО на сервере
  if (password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    // Ставим защищенную HTTP-only куку
    response.cookies.set('admin_token', 'authorized', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    });
    return response;
  }
  
  return NextResponse.json({ success: false }, { status: 401 });
}