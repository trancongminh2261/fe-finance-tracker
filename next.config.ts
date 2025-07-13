import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',               // 👈 Static Export
  eslint: {
    ignoreDuringBuilds: true,    // 👈 Bỏ qua lỗi ESLint khi build
  },
}

export default nextConfig
