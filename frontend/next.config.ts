import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://i.natgeofe.com/k/d2701667-c426-4a1b-8d75-d01bdc387fdc/vietnam-ha-long-bay_16x9.jpg?w=1200"),
      new URL("https://www.thaievisa.go.th/static/media/dummy_passport.f34bd0bb.jpg"),
      new URL("https://cdn4.iconfinder.com/data/icons/flat-pro-business-set-1/32/people-customer-unknown-512.png"),
    ],
  },
  styledComponents: true,
};

export default nextConfig;
