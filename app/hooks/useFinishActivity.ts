// hooks/useFinishActivity.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export const useFinishActivity = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async ({
      courseId,
      activityId,
    }: {
      courseId: string;
      activityId: string;
    }) => {
      const res = await fetch(
        `/api/proxy/course/${courseId}/activity/${activityId}/complete`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );
      console.log("res", res);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal menyelesaikan modul");
      }

      return res.json();
    },

    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({
        queryKey: ["activity", courseId],
      });

      queryClient.invalidateQueries({
        queryKey: ["kelas-saya"],
      });

      queryClient.invalidateQueries({
        queryKey: ["kelas-saya", courseId],
      });
    },
  });
};
