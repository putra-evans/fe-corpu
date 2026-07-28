import { useQuery } from "@tanstack/react-query";

export type RequirementStatus = "pending" | "approved" | "revision";
export type RequirementType = "text" | "textarea" | "file";

export interface Requirement {
  id: string;
  requirement_id: string;
  label: string;
  type: RequirementType;
  value: string | null;
  file_url: string | null;
  status: RequirementStatus;
  status_label: string;
  is_editable: boolean;
  review_notes: string | null;
  reviewed_at: string | null;
  updated_at: string;
}

export interface VerificationResponse {
  status: boolean;
  type: string;
  message: string;
  course: { id: string; title: string; progress: number };
  enrollment: {
    id: string;
    status: string;
    status_label: string;
    review_notes: string | null;
    can_resubmit: boolean;
  };
  summary: {
    total: number;
    approved: number;
    pending: number;
    revision: number;
  };
  requirements: Requirement[];
}

async function fetchVerification(
  courseId: string,
  token: string,
): Promise<VerificationResponse> {
  const res = await fetch(`/api/proxy/course/${courseId}/activities`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Gagal mengambil status verifikasi.");
  return res.json();
}

export function useVerification(
  courseId: string,
  token: string,
  enabled = true,
) {
  return useQuery({
    queryKey: ["verification-status", courseId],
    queryFn: () => fetchVerification(courseId, token),
    enabled: enabled && !!courseId && !!token,
    staleTime: 1000 * 30,
  });
}
