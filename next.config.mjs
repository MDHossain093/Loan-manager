import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Force Webpack for Netlify (required for next-pwa)
  webpack: (config) => {
    return config;
  },

  // Disable Turbopack completely
  experimental: {
    turbo: false
  }
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true
})(nextConfig);
