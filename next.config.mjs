/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
    buildActivityPosition: "bottom-right",
  },

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
