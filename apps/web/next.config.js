/** @type {import("next").NextConfig} */
module.exports = {
  async headers() {
    return [
      {
        source: "/api/public/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "false",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/db"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "robohash.org",
      },
    ],
  },
};
