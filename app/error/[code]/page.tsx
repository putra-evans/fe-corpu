// app/error/[code]/page.tsx
import { Metadata } from "next";
import { ErrorPage } from "../../../components";

const titles: Record<number, string> = {
  400: "400 - Bad Request",
  401: "401 - Unauthorized",
  403: "403 - Forbidden",
  404: "404 - Not Found",
  500: "500 - Server Error",
};

export async function generateMetadata({
  params,
}: {
  params: { code: string };
}): Promise<Metadata> {
  const code = parseInt(params.code);
  const title = titles[code] || "Error";
  return {
    title: `${title} | Aplikasi Corpu`,
    description: `Halaman error dengan kode ${code}.`,
  };
}

export default function ErrorRoutePage({
  params,
}: {
  params: { code: string };
}) {
  const errorCode = parseInt(params.code);
  return <ErrorPage code={isNaN(errorCode) ? 400 : errorCode} />;
}
