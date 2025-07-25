// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      username?: string | null;
      nama_asn?: string;
    };
  }
}
