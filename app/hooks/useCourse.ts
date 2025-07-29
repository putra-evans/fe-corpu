// /hooks/useCourses.ts
import { KategoriKelasType, KelasType } from "@/types/kelas";
import useSWRInfinite from "swr/infinite";

interface CourseResponse {
  data: KelasType[];
  hasMore: boolean;
  total: number;
  kategori: KategoriKelasType[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCourses = ({
  kategoriIds,
  sortBy,
}: {
  kategoriIds: number[];
  sortBy: string | null;
}) => {
  const getKey = (
    pageIndex: number,
    previousPageData: CourseResponse | null
  ) => {
    if (previousPageData && !previousPageData.hasMore) return null;

    const params = new URLSearchParams();
    params.set("page", String(pageIndex + 1));
    params.set("limit", "6");

    if (kategoriIds.length > 0) {
      params.set("kategori", kategoriIds.join(","));
    }

    if (sortBy) {
      params.set("sort", sortBy);
    }

    return `/api/kelas?${params.toString()}`;
  };

  const { data, size, setSize, mutate, isLoading, isValidating } =
    useSWRInfinite<CourseResponse>(getKey, fetcher);

  const courses = data ? data.flatMap((page) => page.data) : [];
  const hasMore = data?.[data.length - 1]?.hasMore ?? false;
  const kategoriList = data?.[0]?.kategori ?? [];

  return {
    courses,
    kategoriList,
    isLoadingInitialData: !data && isLoading,
    isLoadingMore:
      isLoading || (size > 0 && data && typeof data[size - 1] === "undefined"),
    size,
    setSize,
    hasMore,
    mutate,
  };
};
