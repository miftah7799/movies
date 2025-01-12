/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  compress: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: process.env.CODESPACES
          ? [
              {
                key: "X-Forwarded-Host",
                value: `${process.env.CODESPACE_NAME}-3000.github.dev`,
              },
              {
                key: "Access-Control-Allow-Origin",
                value: `https://${process.env.CODESPACE_NAME}-3000.github.dev`,
              },
            ]
          : [],
      },
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        `https://${process.env.CODESPACE_NAME}-3000.github.dev`,
      ],
    },
  },
}

export default nextConfig
