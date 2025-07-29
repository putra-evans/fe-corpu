// /hooks/useKategoriList.ts
import { KategoriKelasType } from "@/types/kelas";
import useSWR from "swr";

interface KategoriResponse {
  kategori: KategoriKelasType[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useKategoriList = () => {
  const { data, isLoading, error } = useSWR<KategoriResponse>(
    "/api/kategorikelas",
    fetcher
  );

  return {
    kategoriList: data?.kategori ?? [],
    isLoading,
    error,
  };
};
