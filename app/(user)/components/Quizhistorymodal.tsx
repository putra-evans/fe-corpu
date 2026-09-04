// components/QuizHistoryModal.tsx
"use client";

import { useQuizHistory, QuizAttempt } from "@/app/hooks/useQuizHistory";
import {
  X,
  History,
  CheckCircle2,
  XCircle,
  Trophy,
  Clock,
  FileX,
  Target,
  RefreshCw,
  ListChecks,
} from "lucide-react";

interface QuizHistoryModalProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  activityId: string;
  token: string;
}

export default function QuizHistoryModal({
  open,
  onClose,
  courseId,
  activityId,
  token,
}: QuizHistoryModalProps) {
  const { data, isLoading, isError } = useQuizHistory({
    courseId,
    activityId,
    token,
    enabled: open,
  });

  if (!open) return null;

  const summary = data?.summary;
  const attempts = data?.data ?? [];
  const attemptPct =
    summary && summary.attempt_limit > 0
      ? (summary.attempt_used / summary.attempt_limit) * 100
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-500 px-7 py-6 shrink-0">
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/[0.07]" />
          <div className="pointer-events-none absolute -bottom-5 right-10 h-20 w-20 rounded-full bg-white/[0.05]" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white transition hover:bg-white/25"
          >
            <X size={16} />
          </button>

          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90">
            <History size={11} />
            Riwayat Quiz
          </div>

          <h2 className="text-xl font-bold text-white leading-snug">
            {isLoading ? "Memuat riwayat..." : "Riwayat Percobaan"}
          </h2>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-7 pt-5 pb-2">
          {/* Loading skeleton */}
          {isLoading && (
            <div className="animate-pulse space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 rounded-xl bg-slate-100" />
                <div className="h-16 rounded-xl bg-slate-100" />
                <div className="h-16 rounded-xl bg-slate-100" />
              </div>
              <div className="h-2 rounded-full bg-slate-100 mt-4" />
              <div className="h-20 rounded-xl bg-slate-100 mt-4" />
              <div className="h-20 rounded-xl bg-slate-100" />
              <div className="h-20 rounded-xl bg-slate-100" />
            </div>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
              <FileX size={32} className="text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">
                Gagal memuat riwayat
              </p>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Terjadi kesalahan saat mengambil data. Coba tutup dan buka
                kembali.
              </p>
            </div>
          )}

          {/* Content */}
          {!isLoading && !isError && summary && (
            <>
              {/* Summary cards */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <SummaryCard
                  icon={<Trophy size={14} />}
                  label="Nilai Terbaik"
                  value={summary.best_score}
                  color={summary.is_passed ? "teal" : "slate"}
                />
                <SummaryCard
                  icon={<Target size={14} />}
                  label="Status"
                  value={summary.is_passed ? "Lulus" : "Belum"}
                  color={summary.is_passed ? "teal" : "red"}
                />
                <SummaryCard
                  icon={<RefreshCw size={14} />}
                  label="Sisa Coba"
                  value={summary.attempt_remaining}
                  color={summary.attempt_remaining === 0 ? "red" : "slate"}
                />
              </div>

              {/* Progress percobaan */}
              <div className="mb-5">
                <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                  <span>Percobaan digunakan</span>
                  <span className="font-semibold text-slate-700">
                    {summary.attempt_used} dari {summary.attempt_limit}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-500 transition-all duration-500"
                    style={{ width: `${attemptPct}%` }}
                  />
                </div>
              </div>

              {/* Attempt list */}
              {attempts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
                  <ListChecks size={28} className="text-slate-300" />
                  <p className="text-sm text-slate-400">Belum ada percobaan.</p>
                </div>
              ) : (
                <div className="space-y-2 mb-2">
                  {attempts.map((attempt) => (
                    <AttemptCard key={attempt.attempt_id} attempt={attempt} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-end px-7 py-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AttemptCard                                                          */
/* ------------------------------------------------------------------ */

function AttemptCard({ attempt }: { attempt: QuizAttempt }) {
  const passed = attempt.is_passed;

  const formatDate = (str: string) =>
    new Date(str).toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Hitung durasi
  const durationMs =
    new Date(attempt.submitted_at).getTime() -
    new Date(attempt.started_at).getTime();
  const durationMin = Math.floor(durationMs / 60000);
  const durationSec = Math.floor((durationMs % 60000) / 1000);
  const durationLabel =
    durationMin > 0
      ? `${durationMin} mnt ${durationSec} dtk`
      : `${durationSec} dtk`;

  return (
    <div
      className={`rounded-xl border p-4 ${
        passed
          ? "border-teal-100 bg-teal-50/50"
          : "border-slate-100 bg-slate-50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Kiri: nomor + status */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              passed
                ? "bg-teal-100 text-teal-700"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            {attempt.attempt_no}
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-700">
              Percobaan ke-{attempt.attempt_no}
              {passed ? (
                <CheckCircle2 size={13} className="text-teal-500" />
              ) : (
                <XCircle size={13} className="text-red-400" />
              )}
            </div>
            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-slate-400">
              <Clock size={10} />
              {formatDate(attempt.started_at)} · {durationLabel}
            </div>
          </div>
        </div>

        {/* Kanan: skor */}
        <div className="text-right shrink-0">
          <div
            className={`text-2xl font-bold leading-none ${
              passed ? "text-teal-600" : "text-red-500"
            }`}
          >
            {attempt.score}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">/ 100</div>
        </div>
      </div>

      {/* Bottom: jawaban benar */}
      <div className="mt-3 flex items-center gap-1.5 text-[12px] text-slate-500">
        <ListChecks size={12} className="shrink-0" />
        Jawaban benar:{" "}
        <span className="font-semibold text-slate-700">
          {attempt.correct_answers} / {attempt.total_questions}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SummaryCard                                                          */
/* ------------------------------------------------------------------ */

type CardColor = "teal" | "red" | "slate";

const colorMap: Record<
  CardColor,
  { wrap: string; label: string; value: string }
> = {
  teal: {
    wrap: "border-teal-100 bg-teal-50",
    label: "text-teal-600",
    value: "text-teal-700",
  },
  red: {
    wrap: "border-red-100 bg-red-50",
    label: "text-red-400",
    value: "text-red-600",
  },
  slate: {
    wrap: "border-slate-100 bg-slate-50",
    label: "text-slate-400",
    value: "text-slate-800",
  },
};

function SummaryCard({
  icon,
  label,
  value,
  color = "slate",
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color?: CardColor;
}) {
  const c = colorMap[color];
  return (
    <div className={`rounded-xl border p-3 ${c.wrap}`}>
      <div
        className={`mb-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide ${c.label}`}
      >
        {icon}
        {label}
      </div>
      <div className={`text-xl font-bold leading-none ${c.value}`}>{value}</div>
    </div>
  );
}
