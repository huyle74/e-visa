import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://i.natgeofe.com/k/d2701667-c426-4a1b-8d75-d01bdc387fdc/vietnam-ha-long-bay_16x9.jpg?w=1200")],
  },
  styledComponents: true,
};

export default nextConfig;
