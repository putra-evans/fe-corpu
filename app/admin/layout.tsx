import React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "simplebar-react/dist/simplebar.min.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import customTheme from "../admin/utils/theme/custom-theme";

import "../admin/css/globals.css";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Corpu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <ThemeModeScript />
      </head>
      <body className={`${font.className}`}>
        <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
      </body>
    </html>
  );
}
