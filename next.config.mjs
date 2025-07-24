/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    LOGIN_ESPJ: "https://espj.sumbarprov.go.id/sumbarapis/spj/auth/signin",
    SIMPEG_DETAIL_PEGAWAI:
      "https://simpeg.sumbarprov.go.id/webapi/pegawai/asn/detail/token/XBnKaywRCrj05m-XXX-v6DXuZ3FFkUgiw45/nip",
    NEXTAUTH_SECRET: "DrzkeySDu/sZ7Y6nThjpvP4/FSYkPS1abk0etbeV5O0=",
    NEXTAUTH_URL: "http://localhost:3000/",
  },
};

export default nextConfig;
