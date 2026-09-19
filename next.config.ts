import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export removed: now using SSR with Node.js server
  // (required for /api routes, Better Auth, and proxy.ts).
  // Deploy to Vercel, Railway, Fly.io, or any Node.js host.
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack(config, { dev }) {
    config.module.rules.push({
      test: /\.wgsl$/,
      loader: "@vgpu/wgsl/loader-webpack",
    });
    if (dev) {
      // OneDrive keeps touching file metadata while it syncs, which makes
      // webpack's watcher think files changed and reload forever.
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules", "**/.git", "**/.next"],
      };
      // OneDrive also locks webpack's on-disk pack cache mid-write (ENOENT on
      // rename), corrupting the dev build. Memory cache sidesteps the writes.
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
