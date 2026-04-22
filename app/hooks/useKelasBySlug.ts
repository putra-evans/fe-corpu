import useSWR from "swr";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = async (endpoint: string) => {
  console.log("endpoint", endpoint);

  const res = await fetch(`${baseURL}${endpoint}`);

  console.log(res);

  if (!res.ok) {
    throw new Error("Gagal mengambil data");
  }

  const data = await res.json();
  return data;
};

export const useKelasBySlug = (slug: string, initialData?: any) => {
  console.log("ini slug", slug);

  const { data, error } = useSWR(
    `/api/course/${slug}`, // 🔥 sesuaikan endpoint
    fetcher,
    {
      //   fallbackData: initialData,
      revalidateOnFocus: false,
    }
  );

  return {
    course: data?.data ?? null, // 🔥 ambil dari data.data
    isLoading: !data && !error,
    isError: error,
  };
};

// async function getCourseBySlug(slug: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/course/${slug}`
//   );

//   if (!res.ok) return null;

//   const json = await res.json();

//   return json.data; // 🔥 WAJIB
// }
