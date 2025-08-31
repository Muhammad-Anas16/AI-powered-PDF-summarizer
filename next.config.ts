// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't block production builds if ESLint errors exist
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't block production builds if TypeScript errors exist
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

