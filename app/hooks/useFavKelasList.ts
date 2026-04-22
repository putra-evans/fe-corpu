import { KelasType } from "@/types/kelas";
import useSWR from "swr";

interface FavKelasResponse {
  favkelas: KelasType[];
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

export const useFavKelasList = () => {
  const { data, error } = useSWR<FavKelasResponse>(
    "/api/course/favorite",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    favKelasList: data?.data ?? [],
    isLoading: !data && !error,
    isError: error,
  };
};
