import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

const fetchUser = async (username: string) => {
  const res = await fetch(`/api/user/${username}`);

  if (res.status === 401) {
    await signOut({ callbackUrl: "/" });
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Gagal ambil data user");
  }
  const json = await res.json();
  return json.result;
};

export const useUserQuery = (username?: string) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => {
      if (!username) throw new Error("Username tidak ada");
      return fetchUser(username);
    },
    enabled: !!username,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
};
