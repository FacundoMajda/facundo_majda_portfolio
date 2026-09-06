import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
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
  // Note: with `output: "export"`, `headers()` is ignored. Configure caching at the
  // hosting edge (Vercel, Cloudflare, Netlify) for `/_next/static/*` and `/icons/*`.
};

export default nextConfig;
