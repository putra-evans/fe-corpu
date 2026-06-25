// app/hooks/useCertificateList.ts
//  const { data: session } = useSession();
//   const token = session?.accessToken || "";
//   console.log(token, "token");
import { useQuery } from "@tanstack/react-query";

export interface CertificateItem {
  id: string;
  certificate_no: string;
  course_id: string;
  course_thumbnail: string;
  course_title: string;
  issued_date: string;
  final_score: number | null;
  certificate_image: string;
  certificate_pdf: string;
}

export interface CertificatePagination {
  current_page: number;
  data: CertificateItem[];
  from: number;
  to: number;
  total: number;
  last_page: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export interface CertificateListResponse {
  status: boolean;
  message: string;
  data: CertificatePagination;
}

async function fetchCertificateList(
  token: string,
  page: number,
): Promise<CertificateListResponse> {
  const res = await fetch(`/api/proxy/course/my-certificates?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal mengambil daftar sertifikat.");
  return res.json();
}

export function useCertificateList(token: string, page: number = 1) {
  return useQuery({
    queryKey: ["certificate-list", page],
    queryFn: () => fetchCertificateList(token, page),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
