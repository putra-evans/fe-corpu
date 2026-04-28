import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { keepPreviousData } from "@tanstack/react-query";

type Params = {
  status?: string;
  per_page?: number;
  page?: number;
  search?: string;
  sort?: string;
  token?: string;
};

const fetchKelasSaya = async (params: Params) => {
  const query = new URLSearchParams({
    status: params.status || "",
    per_page: String(params.per_page || 10),
    search: params.search || "",
    sort: params.sort || "",
    page: String(params.page || 1),
  });

  const res = await fetch(`/api/proxy/course/my-courses?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  });

  // ✅ HANDLE 401 DI SINI
  if (res.status === 401) {
    await signOut({ callbackUrl: "/" });
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Gagal ambil kelas");
  }

  const data = await res.json();

  return data;
};

export const useKelasSaya = (params: Params) => {
  return useQuery({
    queryKey: [
      "kelas-saya",
      params.page,
      params.per_page,
      params.search,
      params.status,
      params.sort,
    ],
    queryFn: () => fetchKelasSaya(params),
    enabled: !!params.token,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
