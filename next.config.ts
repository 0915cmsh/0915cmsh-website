import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/53', destination: '/about/greeting' },
      { source: '/46', destination: '/about/greeting' },
      { source: '/56', destination: '/about/org' },
      { source: '/54', destination: '/about/overview' },
      { source: '/84', destination: '/about/contact' },
      { source: '/57', destination: '/business/dispatch' },
      { source: '/59', destination: '/business/outsourcing' },
      { source: '/60', destination: '/business/headhunting' },
      { source: '/61', destination: '/business/rpo' },
      { source: '/notice01', destination: '/notice' },
    ];
  },
};

export default nextConfig;
