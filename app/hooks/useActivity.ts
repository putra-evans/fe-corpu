import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { keepPreviousData } from "@tanstack/react-query";
import { ActivityResponse } from "@/types/activity";

type Params = {
  course_id: string;
  token?: string;
};

const fetchActivity = async (params: Params): Promise<ActivityResponse> => {
  const res = await fetch(`/api/proxy/course/${params.course_id}/activities`, {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  });

  if (res.status === 401) {
    await signOut({ callbackUrl: "/" });
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Gagal ambil kelas");
  }

  const data: ActivityResponse = await res.json();

  return data;
};

export const useActivity = (params: Params) => {
  console.log("ID course: ", params.course_id);
  console.log("Token: ", params.token);

  return useQuery<ActivityResponse>({
    queryKey: ["kelas-saya", params.course_id],
    queryFn: () => fetchActivity(params),
    enabled: !!params.course_id && !!params.token,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
