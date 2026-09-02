// components/SurveyModal.tsx
"use client";

import { useState } from "react";
import { useSurvey, SurveyQuestion } from "@/app/hooks/useSurvey";
import { useSubmitSurvey } from "@/app/hooks/useSubmitSurvey";
import { toast } from "react-toastify";

import {
  X,
  RectangleEllipsis,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileX,
  ChevronLeft,
  ChevronRight,
  Send,
  Check,
  AlertCircleIcon,
} from "lucide-react";
import GlobalLoading from "@/app/loading";

interface SurveyModalProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  activityId: string;
  token: string;
  onCompleted?: () => void;
}

export default function SurveyModal({
  open,
  onClose,
  courseId,
  activityId,
  token,
  onCompleted,
}: SurveyModalProps) {
  const { data, isError } = useSurvey({
    courseId,
    activityId,
    token,
    enabled: open,
  });
  const { mutate: submit, isPending } = useSubmitSurvey();

  // answers: { [question_id]: { option_id, answer } }
  const [answers, setAnswers] = useState<
    Record<string, { option_id: string; answer: string }>
  >({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!open) return null;

  const questions = data?.questions ?? [];
  const survey = data?.survey;
  const progress = data?.progress;
  const totalQ = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPct =
    totalQ > 0 ? Math.round((answeredCount / totalQ) * 100) : 0;

  // Sudah selesai sebelumnya
  const alreadyCompleted = progress?.is_completed;

  const currentQ = questions[currentPage];
  const isLastPage = currentPage === totalQ - 1;
  const isFirstPage = currentPage === 0;
  const currentAnswered = currentQ ? !!answers[currentQ.id]?.option_id : false;

  function handleSelect(
    questionId: string,
    optionId: string,
    optionText: string,
  ) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { option_id: optionId, answer: optionText },
    }));
    setErrorMsg(null);
  }

  function handleNext() {
    if (!currentAnswered) {
      setErrorMsg("Pilih salah satu jawaban terlebih dahulu.");
      return;
    }
    setErrorMsg(null);
    setCurrentPage((p) => p + 1);
  }

  function handlePrev() {
    setErrorMsg(null);
    setCurrentPage((p) => p - 1);
  }

  function handleSubmit() {
    // Cek semua terjawab
    const unanswered = questions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      setErrorMsg(
        `Masih ada ${unanswered.length} pertanyaan yang belum dijawab.`,
      );
      return;
    }

    const payload = Object.entries(answers).map(
      ([question_id, { option_id, answer }]) => ({
        question_id,
        option_id,
        answer,
      }),
    );

    submit(
      { courseId, activityId, token, answers: payload },
      {
        onSuccess: (res) => {
          toast.success(res.message, {
            icon: <Check />,
          });
          setIsCompleted(true);
          setIsLoading(false);
        },
        onError: (err: any) => {
          setErrorMsg(err?.message ?? "Gagal mengirim survey.");
          setIsLoading(false);
        },
      },
    );
  }

  if (isLoading) {
    return <GlobalLoading />;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="flex min-h-full items-start justify-center p-4 py-8">
        <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-violet-600 to-purple-500 px-7 py-6 rounded-t-2xl shrink-0">
            <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/[0.07]" />
            <div className="pointer-events-none absolute -bottom-5 right-10 h-20 w-20 rounded-full bg-white/[0.05]" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25 transition"
            >
              <X size={16} />
            </button>

            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90">
              <RectangleEllipsis size={11} />
              Survey
            </div>

            <h2 className="text-lg font-bold text-white leading-snug pr-8 line-clamp-2">
              {isLoading ? "Memuat survey..." : (survey?.title ?? "Survey")}
            </h2>

            {/* Progress bar */}
            {!isLoading && !isCompleted && !alreadyCompleted && totalQ > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-[11px] text-white/70 mb-1.5">
                  <span>
                    {answeredCount} dari {totalQ} terjawab
                  </span>
                  <span>{progressPct}%</span>
                </div>
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="px-7 pt-6 pb-4">
            {/* Loading */}
            {isLoading && (
              <div className="animate-pulse space-y-4 py-4">
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-11 bg-slate-100 rounded-xl" />
                  ))}
                </div>
              </div>
            )}

            {/* Error fetch */}
            {isError && !isLoading && (
              <div className="flex flex-col items-center py-10 gap-3 text-center">
                <FileX size={32} className="text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">
                  Gagal memuat survey
                </p>
                <p className="text-xs text-slate-400">
                  Coba tutup dan buka kembali.
                </p>
              </div>
            )}

            {/* Sudah selesai sebelumnya */}
            {!isLoading && !isError && alreadyCompleted && !isCompleted && (
              <div className="flex flex-col items-center py-10 gap-3 text-center">
                <CheckCircle2 size={40} className="text-emerald-500" />
                <p className="text-base font-bold text-slate-700">
                  Survey Sudah Diselesaikan
                </p>
                <p className="text-sm text-slate-400 max-w-xs">
                  Kamu sudah mengisi survey ini sebelumnya. Terima kasih atas
                  partisipasinya!
                </p>
              </div>
            )}

            {/* Sukses submit */}
            {isCompleted && (
              <div className="flex flex-col items-center py-10 gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 size={36} className="text-emerald-500" />
                </div>
                <p className="text-base font-bold text-slate-700">
                  Survey Terkirim!
                </p>
                <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                  Terima kasih telah mengisi survey ini. Jawaban kamu sangat
                  berarti untuk peningkatan kualitas pelatihan.
                </p>
              </div>
            )}

            {/* Pertanyaan */}
            {!isLoading &&
              !isError &&
              !alreadyCompleted &&
              !isCompleted &&
              currentQ && (
                <QuestionCard
                  question={currentQ}
                  index={currentPage}
                  total={totalQ}
                  selectedOptionId={answers[currentQ.id]?.option_id ?? null}
                  onSelect={(optId, optText) =>
                    handleSelect(currentQ.id, optId, optText)
                  }
                  errorMsg={errorMsg}
                />
              )}
          </div>

          {/* Footer */}
          <div className="shrink-0 flex items-center justify-between px-7 py-4 border-t border-slate-100 gap-3">
            <p className="text-xs text-slate-400 shrink-0">
              Tekan{" "}
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                Esc
              </kbd>{" "}
              untuk menutup
            </p>

            {/* Navigasi */}
            {!isLoading &&
              !isError &&
              !alreadyCompleted &&
              !isCompleted &&
              totalQ > 0 && (
                <div className="flex items-center gap-2">
                  {!isFirstPage && (
                    <button
                      onClick={handlePrev}
                      disabled={isPending}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
                    >
                      <ChevronLeft size={14} />
                      Sebelumnya
                    </button>
                  )}

                  {!isLastPage ? (
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 px-5 py-2 text-[13px] font-bold text-white shadow-sm shadow-violet-200 hover:from-violet-600 hover:to-purple-600 transition"
                    >
                      Berikutnya
                      <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isPending || answeredCount < totalQ}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2 text-[13px] font-bold text-white shadow-sm shadow-emerald-200 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {isPending ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />{" "}
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send size={14} /> Kirim Survey
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

            {/* Tutup saat sudah selesai */}
            {(isCompleted || alreadyCompleted) && (
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2 text-[13px] font-bold text-white hover:bg-slate-900 transition"
              >
                Tutup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* QuestionCard                                                         */
/* ------------------------------------------------------------------ */

function QuestionCard({
  question,
  index,
  total,
  selectedOptionId,
  onSelect,
  errorMsg,
}: {
  question: SurveyQuestion;
  index: number;
  total: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string, optionText: string) => void;
  errorMsg: string | null;
}) {
  return (
    <div className="space-y-4">
      {/* Nomor soal */}
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-[12px] font-bold text-violet-600">
          {index + 1}
        </span>
        <span className="text-[12px] text-slate-400 font-medium">
          dari {total} pertanyaan
        </span>
      </div>

      {/* Pertanyaan — render HTML dari API */}
      <div
        className="text-[14px] font-medium text-slate-800 leading-relaxed [&_p]:m-0 [&_span]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      {/* Pilihan */}
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const isSelected = selectedOptionId === opt.id;
          const labels = ["A", "B", "C", "D", "E"];
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id, opt.option_text)}
              className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[13px] font-medium transition-all duration-150 ${
                isSelected
                  ? "border-violet-400 bg-violet-50 text-violet-800 shadow-sm shadow-violet-100"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-200 hover:bg-violet-50/50"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                  isSelected
                    ? "bg-violet-500 text-white"
                    : "bg-white border border-slate-200 text-slate-400"
                }`}
              >
                {isSelected ? <CheckCircle2 size={14} /> : (labels[i] ?? i + 1)}
              </span>
              {opt.option_text}
            </button>
          );
        })}
      </div>

      {/* Error */}
      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5">
          <AlertCircle size={13} className="text-red-500 shrink-0" />
          <p className="text-[12px] text-red-700">{errorMsg}</p>
        </div>
      )}
    </div>
  );
}
