/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    LOGIN_ESPJ: "https://espj.sumbarprov.go.id/sumbarapis/spj/auth/signin",
    NEXTAUTH_SECRET: "DrzkeySDu/sZ7Y6nThjpvP4/FSYkPS1abk0etbeV5O0=",
    NEXTAUTH_URL: "http://localhost:3000/",
  },
};

export default nextConfig;
