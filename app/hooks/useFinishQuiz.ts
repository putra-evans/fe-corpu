// hooks/useFinishActivity.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useFinishQuiz = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async ({
      courseId,
      activityId,
      payload,
    }: {
      courseId: string;
      activityId: string;
      payload: {
        attempt_id: string;
        answers: {
          question_id: string;
          selected_option_id: string;
        }[];
      };
    }) => {
      const res = await fetch(
        `/api/proxy/course/${courseId}/activity/${activityId}/quiz/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(payload),
        },
      );
      console.log("res", res);

      if (!res.ok) {
        throw new Error("Gagal menyelesaikan modul");
      }

      return res.json();
    },

    onSuccess: (_, { courseId, activityId }) => {
      // daftar aktivitas
      queryClient.invalidateQueries({
        queryKey: ["kelas-saya", courseId],
      });

      // detail aktivitas yang sedang dikerjakan
      queryClient.invalidateQueries({
        queryKey: ["kelas-saya", courseId, activityId],
      });

      // intro quiz
      queryClient.invalidateQueries({
        queryKey: ["intro-quiz", activityId],
      });

      // daftar aktivitas
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
