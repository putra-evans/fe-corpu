// app/layout.tsx
import "./css/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth/next";

import { options } from "@/app/api/auth/[...nextauth]/options";
import AuthProvider from "./context/AuthProvider";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Header from "./layout/vertical/header/Header";
import Topbar from "./layout/vertical/header/Topbar";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import customTheme from "../admin/utils/theme/custom-theme";
import "simplebar-react/dist/simplebar.min.css";
import ClientOnly from "./components/ClientOnly";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Corpu",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options); // ✅ ambil session dari server

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <ClientOnly>
          <ThemeModeScript mode="auto" />
        </ClientOnly>
      </head>
      <body className={`${font.className}`} suppressHydrationWarning={true}>
        <AuthProvider session={session}>
          <Flowbite theme={{ theme: customTheme }}>
            <div className="flex w-full min-h-screen">
              <div className="page-wrapper flex w-full">
                <Sidebar />
                <div className="body-wrapper w-full bg-white dark:bg-dark">
                  <Topbar />
                  <Header />
                  <div className="bg-lightgray mr-3 rounded-page min-h-[90vh]">
                    <div className={`container mx-auto py-30`}>{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </Flowbite>
        </AuthProvider>
      </body>
    </html>
  );
}
