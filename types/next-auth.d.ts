import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken?: string;
    exp?: number;
    username?: string;
    nama_asn?: string;
  }

  interface Session {
    accessToken?: string;
    accessTokenExpires?: number;

    user: {
      username?: string;
      nama_asn?: string;
    } & DefaultSession["user"];
  }
}
