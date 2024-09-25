/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core"],
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "skillicons.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
