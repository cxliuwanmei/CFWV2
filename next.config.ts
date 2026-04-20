import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 确保静态资源正确处理
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // 环境变量验证
  env: {
    // 确保所有必需的环境变量都已配置
    HAS_FIREBASE_CONFIG: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'true' : 'false',
  },
};

export default nextConfig;