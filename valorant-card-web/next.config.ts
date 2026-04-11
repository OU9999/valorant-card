import type { NextConfig } from "next";

const allowedDevOrigins = process.env.ALLOWED_DEV_ORIGINS?.split(",") ?? [];

const nextConfig: NextConfig = {
  allowedDevOrigins,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.valorant-api.com",
      },
    ],
  },
  headers: async () => [
    {
      source: "/api/valorant/content",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=3600, stale-while-revalidate=600",
        },
      ],
    },
    {
      source: "/api/valorant/status",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=60, stale-while-revalidate=30",
        },
      ],
    },
  ],
};

export default nextConfig;
