// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["neo.ucb.edu.bo"], // If you just want to allow from this domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neo.ucb.edu.bo",
        port: "", // Empty string for no specific port
        pathname: "**", // '**' means any path
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
