// app/hooks/useCertificate.ts
import { useQuery } from "@tanstack/react-query";

export interface CertificateData {
  certificate_no: string;
  issued_date: string;
  verification_code: string;
  file_url: string;
}

interface CertificateResponse {
  status: boolean;
  data: CertificateData | null;
}

interface UseCertificateParams {
  courseId: string;
  token: string;
  enabled?: boolean;
}

async function fetchCertificate(
  courseId: string,
  token: string,
): Promise<CertificateResponse> {
  console.log("halaman hook", courseId);
  console.log("halaman hook", token);
  const res = await fetch(`/api/proxy/course/${courseId}/certificate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data sertifikat.");
  }

  return res.json();
}

export function useCertificate({
  courseId,
  token,
  enabled = true,
}: UseCertificateParams) {
  return useQuery({
    queryKey: ["certificate", courseId],
    queryFn: () => fetchCertificate(courseId, token),
    enabled: enabled && !!courseId && !!token,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 menit
  });
}
