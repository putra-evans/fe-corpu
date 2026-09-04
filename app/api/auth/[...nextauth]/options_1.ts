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

        // Cek apakah response dari fetch sukses
        if (!res.ok) {
          throw new Error("Gagal terhubung ke server otentikasi");
        }

        const data = await res.json();

        // Validasi struktur response
        if (data.status === true && data.data.token != "") {
          const user = data.data.user;

          // Validasi properti penting user (jaga-jaga kalau data API tidak konsisten)
          if (!user.nip || !credentials.username || !user.name) {
            throw new Error("Data user tidak lengkap");
          }

          // Return user object yang akan diproses oleh NextAuth (masuk ke JWT/callback)
          return {
            id: credentials.username,
            accessToken: data.data.token,
            username: credentials.username,
            nama_asn: user.name,
          };
        }

        // Jika gagal login
        throw new Error("Username atau password salah");
        // if (pass === "Putra@21") {
        //   const res = await fetch(
        //     `${process.env.SIMPEG_DETAIL_PEGAWAI}/${credentials.username}`
        //   );

        //   if (!res.ok) {
        //     throw new Error("Gagal menghubungi server SIMPEG");
        //   }

        //   const data = await res.json();

        //   // Validasi respon
        //   if (data.response === "RC200" && data.result) {
        //     const user = data.result;
        //     console.log(user);

        //     // Validasi data user minimal
        //     if (!user.pns_id || !user.nip || !user.nama_pns) {
        //       throw new Error("Data pegawai tidak lengkap");
        //     }

        //     return {
        //       accessToken: null,
        //       username: user.nip,
        //       nama_asn: user.nama_pns,
        //     };
        //   } else {
        //     throw new Error("Pegawai Tidak Ditemukan");
        //   }
        // } else {

        // }
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
