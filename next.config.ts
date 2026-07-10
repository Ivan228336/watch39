// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yandex-images.clstorage.net',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'vladivostok.timebit.ru',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.seikowatches.com',
      },
      {
        protocol: 'https',
        hostname: 'img.chrono24.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.mds.yandex.net',
      },
      {
        protocol: 'https',
        hostname: 'bwmersrrozbdhvcorgah.supabase.co',
        pathname: '/storage/v1/object/public/**',
      }
    ],
    unoptimized: true,
  },
};

export default nextConfig;