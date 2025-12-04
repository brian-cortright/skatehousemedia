/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  skipTrailingSlashRedirect: true,
  images: { unoptimized: true },
  compiler: { styledComponents: true },
};

module.exports = nextConfig;
