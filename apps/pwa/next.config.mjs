/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@pkrbt/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "api.pkrbt.id",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
