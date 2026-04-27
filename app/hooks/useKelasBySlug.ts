import useSWR from "swr";

const fetcher = async (endpoint: string) => {
  const res = await fetch(`/api/proxy${endpoint}`);

  if (!res.ok) {
    throw new Error("Gagal mengambil data");
  }

  return res.json();
};

export const useKelasBySlug = (slug: string, initialData?: any) => {
  const { data, error } = useSWR(
    slug ? `/course/${slug}` : null, // 🔥 aman & tanpa /api
    fetcher,
    {
      fallbackData: initialData,
      revalidateOnFocus: false,
    }
  );

  return {
    course: data?.data ?? null,
    isLoading: !data && !error,
    isError: error,
  };
};
