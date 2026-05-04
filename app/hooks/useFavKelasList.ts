import { KelasType } from "@/types/kelas";
import useSWR from "swr";

interface FavKelasResponse {
  data: KelasType[];
}

const fetcher = async (endpoint: string) => {
  const res = await fetch(`/api/proxy${endpoint}`);

  if (!res.ok) {
    throw new Error("Gagal mengambil data");
  }

  return res.json();
};

export const useFavKelasList = () => {
  const { data, error } = useSWR<FavKelasResponse>(
    "/course/favorite",
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
