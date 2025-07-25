// app/error/[code]/page.tsx

import { Metadata } from "next";
import { ErrorPage } from "../../../components";

// ✅ Properti params sudah benar
interface PageProps {
  params: { code: string };
}

const titles: Record<number, string> = {
  400: "400 - Bad Request",
  401: "401 - Unauthorized",
  403: "403 - Forbidden",
  404: "404 - Not Found",
  500: "500 - Server Error",
};

// ✅ Perbaikan di sini: fungsi async return Promise<Metadata>
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const code = parseInt(params.code);
  const title = titles[code] || "Error";
  return {
    title: `${title} | Aplikasi Corpu`,
    description: `Halaman error dengan kode ${code}.`,
  };
}

// ✅ Komponen utama error page
export default function ErrorRoutePage({ params }: PageProps) {
  const errorCode = parseInt(params.code);
  return <ErrorPage code={isNaN(errorCode) ? 400 : errorCode} />;
}
