import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['sanity'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
