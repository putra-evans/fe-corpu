import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ResubmitPayload {
  courseId: string;
  enrollment_id: string;
  id: string;
  token: string;
  requirementId: string; // requirement_id (bukan id)
  type: "text" | "textarea" | "file";
  value?: string; // untuk type text / textarea
  file?: File; // untuk type file
}

async function resubmitRequirement(payload: ResubmitPayload): Promise<void> {
  const {
    courseId,
    enrollment_id,
    id,
    token,
    requirementId,
    type,
    value,
    file,
  } = payload;

  console.log("payload", payload);

  let body: FormData | string;
  let headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (type === "file" && file) {
    const fd = new FormData();
    fd.append(`requirements[${id}]`, file);
    body = fd;
    // Jangan set Content-Type — browser otomatis set boundary
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify({
      requirements: {
        [id]: value,
      },
    });
  }

  const res = await fetch(
    `/api/proxy/course/my-courses/${enrollment_id}/resubmit`,
    {
      method: "POST",
      headers,
      body,
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? "Gagal mengirim ulang persyaratan.");
  }
}

export function useResubmitRequirement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resubmitRequirement,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["verification-status", variables.id],
      });
    },
  });
}
