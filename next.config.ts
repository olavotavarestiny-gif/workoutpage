import type { NextConfig } from 'next';

const nextConfig: NextConfig = process.env.DEPLOY_TARGET === 'static'
  ? { output: 'export', images: { unoptimized: true } }
  : {};

export default nextConfig;
