// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string | null;
      username?: string | null;
      nama_asn?: string;
    } & DefaultSession["user"];
  }
  interface User {
    id?: string | null;
    username?: string | null;
    nama_asn?: string | null;
  }
}
