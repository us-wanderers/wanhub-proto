/** @type {import('next').NextConfig} */
export default {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  reactStrictMode: true,
};
