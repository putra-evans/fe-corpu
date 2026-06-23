import { StartQuizResponse, StartQuizPayload } from "@/types/startquiz";
import { useMutation } from "@tanstack/react-query";

async function startQuiz({
  courseId,
  activityId,
  token,
}: StartQuizPayload): Promise<StartQuizResponse> {
  const res = await fetch(
    `/api/proxy/course/${courseId}/activity/${activityId}/quiz/start`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  if (!res.ok) throw new Error("Gagal memulai quiz");
  return res.json();
}

export function useStartQuiz() {
  return useMutation({
    mutationFn: startQuiz,
  });
}
