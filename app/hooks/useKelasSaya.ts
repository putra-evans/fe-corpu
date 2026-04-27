import { useQuery } from "@tanstack/react-query";

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
    keepPreviousData: true,
  });
};
