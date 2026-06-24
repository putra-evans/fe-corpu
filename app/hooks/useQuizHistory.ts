// app/hooks/useQuizHistory.ts
import { useQuery } from "@tanstack/react-query";

export interface QuizAttempt {
  attempt_id: string;
  attempt_no: number;
  score: number;
  is_passed: boolean;
  status: string;
  started_at: string;
  submitted_at: string;
  correct_answers: number;
  total_questions: number;
}

export interface QuizHistorySummary {
  attempt_limit: number;
  attempt_used: number;
  attempt_remaining: number;
  best_score: number;
  is_passed: boolean;
}

export interface QuizHistoryResponse {
  status: boolean;
  message: string;
  summary: QuizHistorySummary;
  data: QuizAttempt[];
}

interface UseQuizHistoryParams {
  courseId: string;
  activityId: string;
  token: string;
  enabled?: boolean;
}

async function fetchQuizHistory(
  courseId: string,
  activityId: string,
  token: string,
): Promise<QuizHistoryResponse> {
  const res = await fetch(
    `/api/proxy/course/${courseId}/activity/${activityId}/quiz/history`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (!res.ok) throw new Error("Gagal mengambil riwayat quiz.");
  return res.json();
}

export function useQuizHistory({
  courseId,
  activityId,
  token,
  enabled = true,
}: UseQuizHistoryParams) {
  return useQuery({
    queryKey: ["quiz-history", courseId, activityId],
    queryFn: () => fetchQuizHistory(courseId, activityId, token),
    enabled: enabled && !!courseId && !!activityId && !!token,
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });
}
