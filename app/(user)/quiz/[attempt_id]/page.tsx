// app/quiz/[attempt_id]/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useFinishQuiz } from "@/app/hooks/useFinishQuiz";
import { toast } from "react-toastify";
import GlobalLoading from "@/app/loading";

interface QuizOption {
  id: string;
  option_text: string;
}

interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: "multiple_choice";
  weight: number;
  options: QuizOption[];
}

interface QuizSession {
  attempt_id: string;
  attempt_no: number;
  started_at: string;
  time_limit: number;
  passing_grade: number;
  total_questions: number;
  course_id: string;
  activity_id: string;
  questions: QuizQuestion[];
}

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();

  const attemptId = params.attempt_id as string;

  const [session, setSession] = useState<QuizSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // { question_id: option_id }
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session_user } = useSession();
  const { mutate: finishQuiz, isPending: isSubmitting } = useFinishQuiz();

  // Load session from sessionStorage
  useEffect(() => {
    setIsLoading(true);
    const raw = sessionStorage.getItem("quiz_session");
    if (!raw) {
      setIsLoading(false);
      router.replace("/");
      return;
    }
    const data: QuizSession = JSON.parse(raw);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setSession(data);

    // Hitung sisa waktu berdasarkan started_at
    const startedAt = new Date(data.started_at).getTime();
    const endsAt = startedAt + data.time_limit * 60 * 1000;
    const remaining = Math.max(0, Math.floor((endsAt - Date.now()) / 1000));
    setSecondsLeft(remaining);
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) {
      handleSubmit(true);
      return;
    }
    timerRef.current = setTimeout(
      () => setSecondsLeft((s) => (s ?? 1) - 1),
      1000,
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [secondsLeft]);

  async function handleSubmit(autoSubmit = false) {
    if (!session) return;
    setShowConfirm(false);

    // Build payload
    const payload = {
      attempt_id: session.attempt_id,
      answers: Object.entries(answers).map(
        ([question_id, selected_option_id]) => ({
          question_id,
          selected_option_id,
        }),
      ),
    };

    finishQuiz(
      {
        courseId: session.course_id,
        activityId: session.activity_id,
        payload,
      },
      {
        onSuccess: (res) => {
          console.log("res", res);
          setIsLoading(true);
          if (res.data.status === "success") {
            toast.success(res.data.message);
            setTimeout(() => {
              setIsLoading(false);
              sessionStorage.removeItem("quiz_session");
              router.push(`/kelas-saya/${res.data.slug}`);
            }, 1000);
          } else {
            toast.error(res.data.message);
            setTimeout(() => {
              setIsLoading(false);
              router.push(`/kelas-saya/${res.data.slug}`);
            }, 1000);
          }
        },
        onError: (err) => {
          console.error(err);
          setIsLoading(true);
          toast.error("Gagal menyelesaikan kuis");
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.removeItem("quiz_session");
            router.back();
          }, 1000);
        },
      },
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
      </div>
    );
  }

  if (isLoading) {
    return <GlobalLoading />;
  }

  const question = session.questions[currentIndex];
  const totalQ = session.questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQ - answeredCount;

  const minutes = Math.floor((secondsLeft ?? 0) / 60);
  const seconds = (secondsLeft ?? 0) % 60;
  const isWarning = (secondsLeft ?? 999) <= 60;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">
              Percobaan #{session.attempt_no}
            </span>
            {/* <span
              className="text-sm font-semibold text-slate-700 truncate max-w-[200px]"
              dangerouslySetInnerHTML={{ __html: question.question_text }}
            /> */}
            <span>
              Silahkan selesaikan kuis ini, mohon kerjakan dengan
              sungguh-sungguh karena ini akan mempengaruhi nilai akhir anda
            </span>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-base font-bold transition-colors ${
              isWarning
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-teal-50 text-teal-700 border border-teal-100"
            }`}
          >
            <Clock size={15} className={isWarning ? "animate-pulse" : ""} />
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQ) * 100}%` }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Question number dots */}
        <div className="mb-6 flex flex-wrap gap-2">
          {session.questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(i)}
              className={`h-8 w-8 rounded-lg text-xs font-semibold transition ${
                i === currentIndex
                  ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                  : answers[q.id]
                    ? "bg-teal-100 text-teal-700"
                    : "bg-white border border-slate-200 text-slate-400 hover:border-teal-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Question card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 mb-5">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-teal-600">
            Soal {currentIndex + 1} dari {totalQ}
          </div>
          <p
            className="text-base font-medium text-slate-800 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: question.question_text }}
          />

          <div className="flex flex-col gap-3">
            {question.options.map((opt) => {
              const selected = answers[question.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [question.id]: opt.id }))
                  }
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition ${
                    selected
                      ? "border-teal-500 bg-teal-50 text-teal-800"
                      : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50/30"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition ${
                      selected
                        ? "border-teal-500 bg-teal-500 text-white"
                        : "border-slate-300 text-slate-400"
                    }`}
                  >
                    {selected ? "✓" : ""}
                  </span>
                  {opt.option_text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Sebelumnya
          </button>

          {currentIndex < totalQ - 1 ? (
            <button
              onClick={() =>
                setCurrentIndex((i) => Math.min(totalQ - 1, i + 1))
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Selanjutnya
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:from-orange-600 hover:to-orange-700"
            >
              <CheckCircle2 size={16} />
              Selesai & Kumpulkan
            </button>
          )}
        </div>
      </div>

      {/* Confirm submit modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
              <AlertTriangle size={22} className="text-amber-500" />
            </div>
            <h3 className="mb-2 text-base font-bold text-slate-800">
              Kumpulkan Jawaban?
            </h3>
            <p className="mb-1 text-sm text-slate-500">
              Kamu telah menjawab{" "}
              <span className="font-semibold text-slate-700">
                {answeredCount} dari {totalQ}
              </span>{" "}
              soal.
            </p>
            {unansweredCount > 0 && (
              <p className="mb-4 text-sm text-amber-600 font-medium">
                {unansweredCount} soal belum dijawab.
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Kembali
              </button>
              <button
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-teal-600 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700 disabled:opacity-60"
              >
                {isSubmitting ? "Mengumpulkan..." : "Ya, Kumpulkan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
