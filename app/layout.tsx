import { Poppins } from "next/font/google";
import "./globals.css";
import {FrontLayout} from "../components";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
    display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className}`}>
        {children}
      </body>
    </html>
  );
}
