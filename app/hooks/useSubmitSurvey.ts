// app/hooks/useSubmitSurvey.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface SurveyAnswer {
  question_id: string;
  option_id: string;
  answer: string; // teks opsi yang dipilih
}

interface SubmitSurveyPayload {
  courseId: string;
  activityId: string;
  token: string;
  answers: SurveyAnswer[];
}

async function submitSurvey(payload: SubmitSurveyPayload) {
  const { courseId, activityId, token, answers } = payload;
  const res = await fetch(
    `/api/proxy/course/${courseId}/activity/${activityId}/survey/submit`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? "Gagal mengirim survey.");
  }
  return res.json();
}

export function useSubmitSurvey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitSurvey,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["survey", variables.courseId, variables.activityId],
      });
    },
  });
}
