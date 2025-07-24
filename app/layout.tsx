import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components";
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
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
