// components/QuizModal.tsx
"use client";

import { useIntroQuiz } from "@/app/hooks/useIntroQuiz";
import { useStartQuiz } from "@/app/hooks/useStartQuiz";
import { useRouter } from "next/navigation";
import {
  X,
  BookOpen,
  Clock,
  FileText,
  Target,
  RefreshCw,
  Shuffle,
  AlertCircle,
  Loader2,
  AlertCircleIcon,
  Check,
} from "lucide-react";
import GlobalLoading from "@/app/loading";
import { useState } from "react";
import { toast } from "react-toastify";

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  courseId?: string;
  activityId?: string;
  token?: string;
}

export default function QuizModal({
  open,
  onClose,
  title,
  courseId,
  activityId,
  token,
}: QuizModalProps) {
  const router = useRouter();

  const { data: introQuizData } = useIntroQuiz({
    course_id: courseId || "",
    activity_id: activityId || "",
    token: token || "",
  });

  const { mutate: startQuiz, isPending } = useStartQuiz();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!open) return null;

  const quiz = introQuizData?.data;
  const course = introQuizData?.course;
  const activity = introQuizData?.activity;
  const attemptUsed = quiz?.attempt_used ?? 0;
  const attemptLimit = quiz?.attempt_limit ?? 0;
  const attemptPct = attemptLimit > 0 ? (attemptUsed / attemptLimit) * 100 : 0;

  function handleStart() {
    if (!courseId || !activityId || !token) {
      toast.error("Token tidak ditemukan", {
        icon: <AlertCircleIcon />,
      });
      return;
    }
    startQuiz(
      { courseId, activityId, token },
      {
        onSuccess: (res) => {
          if (res.status && res.data) {
            sessionStorage.setItem("quiz_session", JSON.stringify(res.data));
            setIsLoading(true);
            toast.success(res.message, {
              icon: <Check />,
            });
            setTimeout(() => {
              router.push(`/quiz/${res.data.attempt_id}`);
              setIsLoading(false);
            }, 1000);
          } else {
            toast.error(res.message, {
              icon: <AlertCircleIcon />,
            });
            setIsLoading(false);
          }
        },
        onError: () => {
          setIsLoading(false);
          toast.error("Gagal memulai quiz. Coba lagi.", {
            icon: <AlertCircleIcon />,
          });
        },
      },
    );
  }
  if (isLoading) {
    return <GlobalLoading />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 px-7 py-6">
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/[0.07]" />
          <div className="pointer-events-none absolute -bottom-5 right-10 h-20 w-20 rounded-full bg-white/[0.05]" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white transition hover:bg-white/25"
          >
            <X size={16} />
          </button>

          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90">
            <BookOpen size={11} />
            Quiz Pengetahuan
          </div>
          <h2 className="text-xl font-bold text-white leading-snug">Quiz</h2>
        </div>

        {/* Body */}
        <div className="px-7 pt-5 pb-2">
          {isLoading ? (
            <div className="flex flex-col gap-3 animate-pulse">
              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 rounded-xl bg-slate-100" />
                <div className="h-20 rounded-xl bg-slate-100" />
                <div className="h-20 rounded-xl bg-slate-100" />
                <div className="h-20 rounded-xl bg-slate-100" />
              </div>
            </div>
          ) : quiz ? (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <StatCard
                  icon={<Clock size={14} />}
                  label="Batas Waktu"
                  value={quiz.time_limit}
                  unit="menit"
                  highlight
                />
                <StatCard
                  icon={<FileText size={14} />}
                  label="Jumlah Soal"
                  value={quiz.total_questions}
                  unit="soal"
                />
                <StatCard
                  icon={<Target size={14} />}
                  label="Nilai Lulus"
                  value={quiz.passing_grade}
                  unit="/ 100"
                  highlight
                />
                <StatCard
                  icon={<RefreshCw size={14} />}
                  label="Sisa Percobaan"
                  value={quiz.attempt_remaining}
                  unit="kali"
                />
              </div>

              {quiz.shuffle_questions && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <Shuffle size={14} className="shrink-0 text-amber-600" />
                  <span className="text-[13px] text-amber-800">
                    Urutan soal akan diacak setiap percobaan.
                  </span>
                </div>
              )}

              <div className="mb-5">
                <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                  <span>Percobaan digunakan</span>
                  <span className="font-semibold text-slate-700">
                    {attemptUsed} dari {attemptLimit}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500"
                    style={{ width: `${attemptPct}%` }}
                  />
                </div>
              </div>

              {quiz.best_score !== null && (
                <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <span className="text-[13px] text-slate-500">
                    Nilai terbaik kamu
                  </span>
                  <span
                    className={`text-sm font-bold ${quiz.is_passed ? "text-teal-600" : "text-red-500"}`}
                  >
                    {quiz.best_score}{" "}
                    {quiz.is_passed ? "✓ Lulus" : "✗ Belum lulus"}
                  </span>
                </div>
              )}

              {!quiz.can_start && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <AlertCircle size={14} className="shrink-0 text-red-500" />
                  <span className="text-[13px] text-red-700">
                    Percobaan telah habis. Kamu tidak dapat memulai quiz lagi.
                  </span>
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-7 py-4 border-t border-slate-100">
          <button
            onClick={handleStart}
            disabled={isLoading || isPending || !quiz?.can_start}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Memulai...
              </>
            ) : (
              "Mulai Quiz →"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  unit,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  unit?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${highlight ? "border-teal-100 bg-teal-50" : "border-slate-100 bg-slate-50"}`}
    >
      <div
        className={`mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide ${highlight ? "text-teal-600" : "text-slate-400"}`}
      >
        {icon}
        {label}
      </div>
      <div
        className={`text-2xl font-bold leading-none ${highlight ? "text-teal-700" : "text-slate-800"}`}
      >
        {value}
        {unit && (
          <span className="ml-1 text-xs font-normal text-slate-400">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
