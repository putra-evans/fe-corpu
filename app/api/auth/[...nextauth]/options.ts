import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "NIP", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }
        let pass = credentials.password;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_API_URL is not defined");
        }
        const res = await fetch(`${apiUrl}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });
        const data = await res.json();

        console.log("DATA LOGIN", data);
        // if (!res.ok) {
        //   console.log("status false dari backend", data.message);
        //   throw new Error("Gagal terhubung ke server otentikasi");
        // }
        // if (data.status === true && data.data.token != "") {
        //   const user = data.data.user;
        //   console.log("DATA RESPONSE LOGIN", user);

        //   if (!user.nip || !credentials.username || !user.name) {
        //     throw new Error("Data user tidak lengkap");
        //   }
        //   return {
        //     id: credentials.username,
        //     accessToken: data.data.token,
        //     username: credentials.username,
        //     nama_asn: user.name,
        //   };
        // }
        throw new Error(data);
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // Tidak menyetel expires berarti cookie session hilang saat browser ditutup
      },
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.nama_asn = user.nama_asn;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          nama_asn: token.nama_asn,
        },
        accessToken: token.accessToken,
      };
    },
  },
};
