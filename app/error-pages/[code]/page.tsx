import { Metadata } from "next";
import { ErrorPage } from "@/components";

// ✅ Gunakan typing langsung inline (hindari `PageProps`)
export function generateMetadata({
  params,
}: {
  params: { code: string };
}): Metadata {
  const code = parseInt(params.code);
  const title = titles[code] || "Error";
  return {
    title: `${title} | Aplikasi Corpu`,
    description: `Halaman error dengan kode ${code}.`,
  };
}

// ✅ Mapping kode ke judul error
const titles: Record<number, string> = {
  400: "400 - Bad Request",
  401: "401 - Unauthorized",
  403: "403 - Forbidden",
  404: "404 - Not Found",
  500: "500 - Server Error",
};

// ✅ Komponen halaman error
export default function ErrorRoutePage({
  params,
}: {
  params: { code: string };
}) {
  const errorCode = parseInt(params.code);
  return <ErrorPage code={isNaN(errorCode) ? 400 : errorCode} />;
}
