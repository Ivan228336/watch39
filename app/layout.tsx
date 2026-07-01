import { Analytics } from '@vercel/analytics/next';
import { Footer } from '@/components/Footer';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Watch39 — Интернет-магазин оригинальных часов в Калининграде",
    template: "%s | Watch39"
  },
  description: "Купить оригинальные наручные часы в Калининграде. Японские Casio, Seiko, Orient и швейцарские Tissot, Certina. Официальная гарантия, бесплатная примерка на дом.",
  keywords: ["купить часы калининград", "наручные часы", "оригинальные часы", "casio", "tissot", "seiko", "orient", "certina", "интернет магазин часов"],
  authors: [{ name: "Watch39" }],
  creator: "Watch39",
  publisher: "Watch39",
  metadataBase: new URL('https://watch39.ru'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://watch39.ru',
    siteName: 'Watch39',
    title: 'Watch39 — Интернет-магазин оригинальных часов в Калининграде',
    description: 'Купить оригинальные наручные часы в Калининграде. Японские Casio, Seiko, Orient и швейцарские Tissot, Certina. Официальная гарантия, бесплатная примерка на дом.',
    images: [
      {
        url: '/placeholder.png',
        width: 1200,
        height: 630,
        alt: 'Watch39 — магазин оригинальных часов'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Watch39 — Интернет-магазин оригинальных часов в Калининграде',
    description: 'Купить оригинальные наручные часы в Калининграде. Официальная гарантия, бесплатная примерка на дом.',
    images: ['/placeholder.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Добавьте сюда коды верификации когда получите их:
    // google: 'ваш-код-google-search-console',
    // yandex: 'ваш-код-yandex-webmaster',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
