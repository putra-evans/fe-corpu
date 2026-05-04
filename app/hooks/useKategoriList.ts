import { KategoriKelasType } from "@/types/kelas";
import useSWR from "swr";

interface KategoriResponse {
  data: KategoriKelasType[];
}

const fetcher = async (endpoint: string) => {
  const res = await fetch(`/api/proxy${endpoint}`);

  if (!res.ok) {
    throw new Error("Gagal mengambil data");
  }

  return res.json();
};

export const useKategoriList = () => {
  const { data, error } = useSWR<KategoriResponse>(
    "/course-category",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    kategoriList: data?.data ?? [],
    isLoading: !data && !error,
    isError: error,
  };
};
