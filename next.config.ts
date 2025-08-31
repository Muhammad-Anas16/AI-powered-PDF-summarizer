// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
<<<<<<< HEAD
    // Don't block production builds if ESLint errors exist
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't block production builds if TypeScript errors exist
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

=======
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
>>>>>>> b13b040ad3b491fbe3f9f90a5f7b60294a51321f
