// app/hooks/useCertificateList.ts
import { useQuery } from "@tanstack/react-query";

export interface CertificateItem {
  id: number;
  certificate_no: string;
  course_id: string;
  course_thumbnail: string;
  course_title: string;
  issued_date: string;
  final_score: number | null;
  certificate_image: string;
  certificate_pdf: string;
}

export interface CertificateListResponse {
  status: boolean;
  message: string;
  data: CertificateItem[];
}

async function fetchCertificateList(
  token: string,
): Promise<CertificateListResponse> {
  const res = await fetch("/api/proxy/course/my-certificates", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal mengambil daftar sertifikat.");
  return res.json();
}

export function useCertificateList(token: string) {
  return useQuery({
    queryKey: ["certificate-list"],
    queryFn: () => fetchCertificateList(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
}
