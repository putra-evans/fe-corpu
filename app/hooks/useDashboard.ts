import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { keepPreviousData } from "@tanstack/react-query";
import { DashboardResponse } from "@/types/dashboard";

type Params = {
  token?: string;
};

const fetchDashboard = async (params: Params): Promise<DashboardResponse> => {
  const res = await fetch(`/api/proxy/dashboard`, {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  });

  if (res.status === 401) {
    await signOut({ callbackUrl: "/" });
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Gagal mengambil data dashboard");
  }

  const data: DashboardResponse = await res.json();
  return data;
};

export const useDashboard = (params: Params) => {
  const { data, isLoading, isError, error } = useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboard(params),
    enabled: !!params.token,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
