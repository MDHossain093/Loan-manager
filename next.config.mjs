import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force Webpack (required for next-pwa)
  webpack: (config) => {
    return config;
  }
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
