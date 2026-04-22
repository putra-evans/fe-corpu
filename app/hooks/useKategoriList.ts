import { KategoriKelasType } from "@/types/kelas";
import useSWR from "swr";

interface KategoriResponse {
  kategori: KategoriKelasType[];
  data: [];
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = async (endpoint: string) => {
  const res = await fetch(`${baseURL}${endpoint}`);

  if (!res.ok) {
    throw new Error("Gagal mengambil data");
  }

  const data = await res.json();

  return data;
};

export const useKategoriList = () => {
  const { data, error } = useSWR<KategoriResponse>(
    "/api/course-category",
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
