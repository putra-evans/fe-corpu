// components/VerificationModal.tsx
"use client";

import { useRef, useState } from "react";
import { useVerification, Requirement } from "@/app/hooks/useVerification";
import { useResubmitRequirement } from "@/app/hooks/useResubmitRequirement";
import {
  X,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileUp,
  Eye,
  Loader2,
  FileText,
  AlignLeft,
  Type,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface VerificationModalProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  token: string;
}

export default function VerificationModal({
  open,
  onClose,
  courseId,
  token,
}: VerificationModalProps) {
  const { data, isLoading, isError } = useVerification(courseId, token, open);
  const { mutate: resubmit, isPending: isSubmitting } =
    useResubmitRequirement();

  // State edit per requirement_id
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [editFiles, setEditFiles] = useState<Record<string, File>>({});
  const [successIds, setSuccessIds] = useState<Set<string>>(new Set());
  const [errorIds, setErrorIds] = useState<Record<string, string>>({});
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  if (!open) return null;

  const enrollment = data?.enrollment;
  const summary = data?.summary;
  const requirements = data?.requirements ?? [];
  const hasRevision = (summary?.revision ?? 0) > 0;

  const enrollmentStatus = enrollment?.status ?? "pending";
  const headerStyle =
    {
      pending: "from-indigo-700 via-indigo-600 to-violet-500",
      approved: "from-emerald-700 via-emerald-600 to-teal-500",
      revision: "from-rose-700 via-rose-600 to-orange-500",
    }[enrollmentStatus] ?? "from-indigo-700 via-indigo-600 to-violet-500";

  function handleResubmit(req: Requirement) {
    const val = editValues[req.requirement_id];
    const file = editFiles[req.requirement_id];

    if (req.type === "file" && !file) {
      setErrorIds((p) => ({
        ...p,
        [req.requirement_id]: "Pilih file terlebih dahulu.",
      }));
      return;
    }
    if ((req.type === "text" || req.type === "textarea") && !val?.trim()) {
      setErrorIds((p) => ({
        ...p,
        [req.requirement_id]: "Isi kolom ini terlebih dahulu.",
      }));
      return;
    }

    setErrorIds((p) => {
      const n = { ...p };
      delete n[req.requirement_id];
      return n;
    });

    resubmit(
      {
        courseId,
        enrollment_id: enrollment?.id ?? "",
        id: req.id,
        token,
        requirementId: req.requirement_id,
        type: req.type,
        value: req.type !== "file" ? val : undefined,
        file: req.type === "file" ? file : undefined,
      },
      {
        onSuccess: () => {
          setSuccessIds((p) => new Set(p).add(req.requirement_id));
          setEditValues((p) => {
            const n = { ...p };
            delete n[req.requirement_id];
            return n;
          });
          setEditFiles((p) => {
            const n = { ...p };
            delete n[req.requirement_id];
            return n;
          });
        },
        onError: (err: any) => {
          setErrorIds((p) => ({
            ...p,
            [req.requirement_id]: err?.message ?? "Gagal mengirim.",
          }));
        },
      },
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="flex min-h-full items-start justify-center p-4 py-8">
        <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <div
            className={`relative overflow-hidden bg-gradient-to-br ${headerStyle} px-8 py-7 shrink-0`}
          >
            <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/[0.07]" />
            <div className="pointer-events-none absolute -bottom-5 right-10 h-20 w-20 rounded-full bg-white/[0.05]" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25 transition"
            >
              <X size={16} />
            </button>

            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90">
              <ShieldCheck size={11} />
              Verifikasi Persyaratan
            </div>

            <h2 className="text-lg font-bold text-white leading-snug pr-8 line-clamp-2">
              {isLoading ? "Memuat..." : data?.course.title}
            </h2>

            {enrollment && (
              <div className="mt-2 flex items-center gap-2">
                <StatusBadge
                  status={enrollmentStatus}
                  label={enrollment.status_label}
                />
                {hasRevision && (
                  <span className="text-[11px] text-white/70">
                    {summary?.revision} item perlu diperbaiki
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="px-8 pt-6 pb-4">
            {/* Loading */}
            {isLoading && (
              <div className="animate-pulse space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-14 rounded-xl bg-slate-100" />
                  ))}
                </div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 rounded-xl bg-slate-100" />
                ))}
              </div>
            )}

            {/* Error */}
            {isError && !isLoading && (
              <div className="flex flex-col items-center py-10 gap-2 text-center">
                <AlertCircle size={32} className="text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">
                  Gagal memuat data
                </p>
                <p className="text-xs text-slate-400">
                  Coba tutup dan buka kembali.
                </p>
              </div>
            )}

            {!isLoading && !isError && data && (
              <>
                {/* Summary cards */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <SummaryCard
                    label="Total"
                    value={summary?.total ?? 0}
                    color="slate"
                  />
                  <SummaryCard
                    label="Disetujui"
                    value={summary?.approved ?? 0}
                    color="teal"
                  />
                  <SummaryCard
                    label="Revisi"
                    value={summary?.revision ?? 0}
                    color="rose"
                  />
                </div>

                {/* Review notes enrollment */}
                {enrollment?.review_notes && (
                  <div className="mb-4 flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                    <AlertCircle
                      size={14}
                      className="shrink-0 text-amber-600 mt-0.5"
                    />
                    <div>
                      <p className="text-[12px] font-semibold text-amber-700 mb-0.5">
                        Catatan Admin
                      </p>
                      <p className="text-[12px] text-amber-800 leading-relaxed">
                        {enrollment.review_notes}
                      </p>
                    </div>
                  </div>
                )}

                {/* Requirement list */}
                <div className="space-y-3">
                  {requirements.map((req) => (
                    <RequirementItem
                      key={req.id}
                      req={req}
                      isExpanded={expandedIds.has(req.id)}
                      onToggle={() =>
                        setExpandedIds((prev) => {
                          const next = new Set(prev);
                          next.has(req.id)
                            ? next.delete(req.id)
                            : next.add(req.id);
                          return next;
                        })
                      }
                      editValue={editValues[req.requirement_id] ?? ""}
                      onEditValue={(v) =>
                        setEditValues((p) => ({
                          ...p,
                          [req.requirement_id]: v,
                        }))
                      }
                      editFile={editFiles[req.requirement_id]}
                      onEditFile={(f) =>
                        setEditFiles((p) => ({ ...p, [req.requirement_id]: f }))
                      }
                      isSuccess={successIds.has(req.requirement_id)}
                      errorMsg={errorIds[req.requirement_id]}
                      isSubmitting={isSubmitting}
                      onSubmit={() => handleResubmit(req)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 flex items-center justify-end px-8 py-4 border-t border-slate-100">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* RequirementItem                                                      */
/* ------------------------------------------------------------------ */

function RequirementItem({
  req,
  isExpanded,
  onToggle,
  editValue,
  onEditValue,
  editFile,
  onEditFile,
  isSuccess,
  errorMsg,
  isSubmitting,
  onSubmit,
}: {
  req: Requirement;
  isExpanded: boolean;
  onToggle: () => void;
  editValue: string;
  onEditValue: (v: string) => void;
  editFile?: File;
  onEditFile: (f: File) => void;
  isSuccess: boolean;
  errorMsg?: string;
  isSubmitting: boolean;
  onSubmit: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isRevision = req.status === "revision";
  const isApproved = req.status === "approved";

  const typeIcon = {
    text: <Type size={12} />,
    textarea: <AlignLeft size={12} />,
    file: <FileText size={12} />,
  }[req.type];

  const statusConfig = {
    pending: {
      icon: <Clock size={12} />,
      text: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      label: req.status_label,
    },
    approved: {
      icon: <CheckCircle2 size={12} />,
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      label: req.status_label,
    },
    revision: {
      icon: <AlertCircle size={12} />,
      text: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
      label: req.status_label,
    },
  }[req.status] ?? {
    icon: <Clock size={12} />,
    text: "text-slate-500",
    bg: "bg-slate-50",
    border: "border-slate-100",
    label: req.status_label,
  };

  return (
    <div
      className={`rounded-xl border overflow-hidden ${isRevision ? "border-rose-200" : "border-slate-100"}`}
    >
      {/* Row header — selalu tampil */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition ${
          isRevision
            ? "bg-rose-50/50 hover:bg-rose-50"
            : "bg-slate-50 hover:bg-slate-100"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`flex-none flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide ${statusConfig.text}`}
          >
            {typeIcon}
          </span>
          <span className="text-sm font-semibold text-slate-700 truncate">
            {req.label}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isSuccess && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
              Terkirim ✓
            </span>
          )}
          <span
            className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
          >
            {statusConfig.icon}
            {statusConfig.label}
          </span>
          {isExpanded ? (
            <ChevronUp size={14} className="text-slate-400" />
          ) : (
            <ChevronDown size={14} className="text-slate-400" />
          )}
        </div>
      </button>

      {/* Expanded body */}
      {isExpanded && (
        <div className="px-5 py-4 border-t border-slate-100 bg-white space-y-4">
          {/* Nilai saat ini */}
          {req.type === "file" && req.file_url ? (
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] text-slate-500">File saat ini</span>
              <a
                href={req.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 transition"
              >
                <Eye size={13} />
                Lihat file
              </a>
            </div>
          ) : req.value ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
                Nilai saat ini
              </p>
              <p className="text-[13px] text-slate-700 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100 leading-relaxed">
                {req.value}
              </p>
            </div>
          ) : null}

          {/* Review notes */}
          {req.review_notes && (
            <div className="flex gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2">
              <AlertCircle
                size={12}
                className="shrink-0 text-rose-500 mt-0.5"
              />
              <div>
                <p className="text-[11px] font-semibold text-rose-700 mb-0.5">
                  Catatan Revisi
                </p>
                <p className="text-[12px] text-rose-700 leading-relaxed">
                  {req.review_notes}
                </p>
              </div>
            </div>
          )}

          {/* Form revisi — hanya jika status revision */}
          {isRevision && !isSuccess && (
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-rose-500">
                Perbaikan
              </p>

              {req.type === "file" ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onEditFile(f);
                    }}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-rose-200 bg-rose-50/50 py-3 text-[13px] font-semibold text-rose-600 hover:bg-rose-50 transition"
                  >
                    <FileUp size={15} />
                    {editFile ? editFile.name : "Pilih file baru"}
                  </button>
                  {editFile && (
                    <p className="text-[11px] text-slate-400 mt-1">
                      {(editFile.size / 1024).toFixed(0)} KB
                    </p>
                  )}
                </div>
              ) : req.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={editValue}
                  onChange={(e) => onEditValue(e.target.value)}
                  placeholder={`Tulis ulang ${req.label.toLowerCase()}...`}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent resize-none transition"
                />
              ) : (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => onEditValue(e.target.value)}
                  placeholder={`Isi ulang ${req.label.toLowerCase()}...`}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition"
                />
              )}

              {/* Error */}
              {errorMsg && (
                <p className="text-[12px] text-rose-600 flex items-center gap-1">
                  <AlertCircle size={11} />
                  {errorMsg}
                </p>
              )}

              {/* Submit */}
              <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 py-2.5 text-[13px] font-bold text-white shadow-sm shadow-rose-200 hover:from-rose-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Mengirim...
                  </>
                ) : (
                  <>
                    <RotateCcw size={14} /> Kirim Ulang
                  </>
                )}
              </button>
            </div>
          )}

          {/* Sudah berhasil dikirim */}
          {isSuccess && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5">
              <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
              <p className="text-[12px] font-semibold text-emerald-700">
                Berhasil dikirim. Menunggu verifikasi admin.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                       */
/* ------------------------------------------------------------------ */

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "slate" | "teal" | "rose";
}) {
  const styles = {
    slate: {
      wrap: "border-slate-100 bg-slate-50",
      label: "text-slate-400",
      value: "text-slate-700",
    },
    teal: {
      wrap: "border-teal-100 bg-teal-50",
      label: "text-teal-600",
      value: "text-teal-700",
    },
    rose: {
      wrap: "border-rose-100 bg-rose-50",
      label: "text-rose-400",
      value: "text-rose-600",
    },
  }[color];

  return (
    <div className={`rounded-xl border px-4 py-4 text-center ${styles.wrap}`}>
      <div className={`text-3xl font-bold ${styles.value}`}>{value}</div>
      <div className={`text-[12px] font-semibold mt-1 ${styles.label}`}>
        {label}
      </div>
    </div>
  );
}

function StatusBadge({ status, label }: { status: string; label: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-emerald-100 text-emerald-700",
    revision: "bg-rose-100 text-rose-700",
  };
  return (
    <span
      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${styles[status] ?? "bg-white/20 text-white"}`}
    >
      {label}
    </span>
  );
}
