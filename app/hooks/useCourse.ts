import { KategoriKelasType, KelasType } from "@/types/kelas";
import useSWR from "swr";

interface CourseResponse {
  data: KelasType[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total_data: number;
  };
  kategori: KategoriKelasType[];
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = async (endpoint: string) => {
  const res = await fetch(`${baseURL}${endpoint}`);

  if (!res.ok) {
    throw new Error("Gagal mengambil data");
  }

  return res.json();
};

export const useCourses = ({
  page,
  perPage = 6,
  kategoriIds,
  type,
  search,
  sortBy = "desc",
}: {
  page: number;
  perPage?: number;
  kategoriIds: string[];
  type?: string | null;
  search?: string;
  sortBy?: string | null;
}) => {
  const params = new URLSearchParams();

  // wajib
  params.set("page", String(page));
  params.set("per_page", String(perPage));

  // optional
  if (kategoriIds.length > 0) {
    params.set("category_id", kategoriIds.join(","));
  }

  if (type) {
    params.set("type", type);
  }

  if (search) {
    params.set("search", search);
  }

  if (sortBy) {
    params.set("sort", sortBy);
  }

  const { data, error, isLoading, mutate } = useSWR<CourseResponse>(
    `/api/course?${params.toString()}`,
    fetcher
  );

  const url = `/api/course?${params.toString()}`;

  return {
    courses: data?.data ?? [],
    kategoriList: data?.kategori ?? [],
    total: data?.meta?.total_data ?? 0, // 🔥 FIX
    totalPages: data?.meta?.last_page ?? 1, // 🔥 LANGSUNG DARI API
    isLoading,
    isError: error,
    mutate,
  };
};
