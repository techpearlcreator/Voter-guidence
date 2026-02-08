import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Voter-guidence",
  assetPrefix: "/Voter-guidence/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "/Voter-guidence",
  },
};

export default nextConfig;
