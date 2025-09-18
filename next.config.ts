import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prd.place',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'gavali-group-products.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'sk-group-products.s3.us-east-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
