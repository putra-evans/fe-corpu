import { useQuery } from "@tanstack/react-query";

const fetchUser = async (username: string) => {
  const res = await fetch(`/api/user/${username}`);

  if (!res.ok) {
    throw new Error("Gagal ambil data user");
  }
  const data = await res.json();

  return data;
};

export const useUserQuery = (username?: string) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => {
      if (!username) throw new Error("Username tidak ada");
      return fetchUser(username);
    },
    enabled: !!username, // 🔥 penting
    staleTime: Infinity, // tidak refetch terus
    cacheTime: 1000 * 60 * 60, // 1 jam
  });
};
