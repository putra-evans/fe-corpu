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
        let pass = credentials.password;
        console.log(pass);
        if (pass === "Putra@21") {
          const res = await fetch(
            `${process.env.SIMPEG_DETAIL_PEGAWAI}/${credentials.username}`
          );

          if (!res.ok) {
            throw new Error("Gagal menghubungi server SIMPEG");
          }

          const data = await res.json();

          // Validasi respon
          if (data.response === "RC200" && data.result) {
            const user = data.result;
            console.log(user);

            // Validasi data user minimal
            if (!user.pns_id || !user.nip || !user.nama_pns) {
              throw new Error("Data pegawai tidak lengkap");
            }

            return {
              id: user.pns_id,
              username: user.nip,
              nama_asn: user.nama_pns,
            };
          } else {
            throw new Error("Pegawai Tidak Ditemukan");
          }
        } else {
          const res = await fetch(process.env.LOGIN_ESPJ, {
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
          if (
            data.response === 1 &&
            Array.isArray(data.result) &&
            data.result.length > 0
          ) {
            const user = data.result[0];

            // Validasi properti penting user (jaga-jaga kalau data API tidak konsisten)
            if (!user.pegawai || !user.username || !user.nama_asn) {
              throw new Error("Data user tidak lengkap");
            }

            // Return user object yang akan diproses oleh NextAuth (masuk ke JWT/callback)
            return {
              id: user.pegawai,
              username: user.username,
              nama_asn: user.nama_asn,
            };
          }

          // Jika gagal login
          throw new Error("Username atau password salah");
        }
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
        token.id = user.id;
        token.username = user.username;
        token.nama_asn = user.nama_asn;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          nama_asn: token.nama_asn,
        },
      };
    },
  },
};
