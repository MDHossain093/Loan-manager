import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Force Webpack – REQUIRED for next-pwa on Netlify
  webpack: (config) => {
    return config;
  },

  // Disable Turbopack fully
  experimental: {
    turbo: false
  }
};

// Wrap PWA correctly
export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
