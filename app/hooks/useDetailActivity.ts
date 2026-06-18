import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { keepPreviousData } from "@tanstack/react-query";
import { DetailActivityResponse } from "@/types/activity";

type Params = {
  course_id: string;
  activity_id: string;
  token?: string;
};

const fetchDetailActivity = async (
  params: Params,
): Promise<DetailActivityResponse> => {
  const res = await fetch(
    `/api/proxy/course/${params.course_id}/activity/${params.activity_id}`,
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

  const data: DetailActivityResponse = await res.json();

  return data;
};

export const useDetailActivity = (params: Params) => {
  console.log("ID course: ", params.course_id);
  console.log("ID activity: ", params.activity_id);
  console.log("Token: ", params.token);

  return useQuery<DetailActivityResponse>({
    queryKey: ["kelas-saya", params.course_id, params.activity_id],
    queryFn: () => fetchDetailActivity(params),
    enabled: !!params.course_id && !!params.activity_id && !!params.token,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
