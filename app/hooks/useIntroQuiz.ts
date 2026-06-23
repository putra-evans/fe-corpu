import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { keepPreviousData } from "@tanstack/react-query";
import { IntroQuizResponse } from "@/types/quiz";

type Params = {
  course_id: string;
  activity_id: string;
  token?: string;
};

const fetchIntroQuiz = async (params: Params): Promise<IntroQuizResponse> => {
  const res = await fetch(
    `/api/proxy/course/${params.course_id}/activity/${params.activity_id}/quiz`,
    {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    },
  );

  if (res.status === 401) {
    await signOut({ callbackUrl: "/" });
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Gagal ambil kelas");
  }

  const data: IntroQuizResponse = await res.json();
  return data;
};

export const useIntroQuiz = (params: Params) => {
  return useQuery<IntroQuizResponse>({
    queryKey: ["intro-quiz", params.activity_id],
    queryFn: () => fetchIntroQuiz(params),
    enabled: !!params.activity_id && !!params.token,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
