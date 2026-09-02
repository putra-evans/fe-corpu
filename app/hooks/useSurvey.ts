// app/hooks/useSurvey.ts
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface SurveyOption {
  id: string;
  option_text: string;
  selected: boolean;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  question_type: string | null;
  options: SurveyOption[];
  answer: {
    option_id: string | null;
    answer: string | null;
  };
}

export interface SurveyResponse {
  status: boolean;
  message: string;
  course: { id: string; title: string | null };
  activity: { id: string; title: string; description: string };
  survey: { id: string; title: string; instruction: string };
  progress: {
    progress: number;
    is_completed: boolean;
    completed_at: string | null;
    last_access_at: string | null;
  };
  summary: { total: number; answered: number; remaining: number };
  questions: SurveyQuestion[];
}

async function fetchSurvey(
  courseId: string,
  activityId: string,
  token: string,
): Promise<SurveyResponse> {
  const res = await fetch(
    `/api/proxy/course/${courseId}/activity/${activityId}/survey`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) throw new Error("Gagal mengambil data survey.");
  return res.json();
}

export function useSurvey({
  courseId,
  activityId,
  token,
  enabled = true,
}: {
  courseId: string;
  activityId: string;
  token: string;
  enabled?: boolean;
}) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["survey", courseId, activityId],
    queryFn: () => fetchSurvey(courseId, activityId, token),
    enabled: enabled && !!courseId && !!activityId && !!token,
    staleTime: 1000 * 60 * 5,
  });

  // Invalidate related queries when survey data is successfully fetched
  useEffect(() => {
    if (query.data) {
      queryClient.invalidateQueries({
        queryKey: ["activity", courseId],
      });
      queryClient.invalidateQueries({
        queryKey: ["kelas-saya"],
      });
      queryClient.invalidateQueries({
        queryKey: ["kelas-saya", courseId],
      });
    }
  }, [query.data, queryClient, courseId]);

  return query;
}
