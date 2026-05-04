import useSWR from "swr";
import { DetailKelasType } from "@/types/kelas";

type CourseDetailResponse = {
  data: DetailKelasType;
};

const fetcher = async (endpoint: string) => {
  const res = await fetch(`/api/proxy${endpoint}`);

  if (!res.ok) {
    throw new Error("Gagal mengambil data");
  }

  return res.json();
};

export const useKelasBySlug = (
  slug: string,
  initialData?: CourseDetailResponse
) => {
  const { data, error } = useSWR<CourseDetailResponse>(
    slug ? `/course/${slug}` : null,
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
