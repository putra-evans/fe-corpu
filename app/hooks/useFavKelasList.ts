import { KelasType } from "@/types/kelas";
import useSWR from "swr";

interface FavKelasResponse {
  favkelas: KelasType[];
  data: [];
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

  console.log("DATA:", data);

  return {
    favKelasList: data?.data ?? [],
    isLoading: !data && !error,
    isError: error,
  };
};
