// components/CertificateModal.tsx
"use client";

import { useCertificate } from "@/app/hooks/useCertificate";
import {
  X,
  Award,
  CalendarDays,
  Hash,
  ShieldCheck,
  ExternalLink,
  Download,
  FileX,
} from "lucide-react";

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  token: string;
}

export default function CertificateModal({
  open,
  onClose,
  courseId,
  token,
}: CertificateModalProps) {
  const { data, isLoading, isError } = useCertificate({
    courseId,
    token,
    enabled: open,
  });

  if (!open) return null;

  const cert = data?.data;

  const issuedDate = cert?.issued_date
    ? new Date(cert.issued_date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  console.log("cert", cert);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-amber-500 to-orange-400 px-7 py-6">
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/[0.07]" />
          <div className="pointer-events-none absolute -bottom-5 right-10 h-20 w-20 rounded-full bg-white/[0.05]" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white transition hover:bg-white/25"
          >
            <X size={16} />
          </button>

          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90">
            <Award size={11} />
            Sertifikat Kelulusan
          </div>

          <h2 className="text-xl font-bold text-white leading-snug">
            {isLoading
              ? "Memuat sertifikat..."
              : cert
                ? "Selamat! Kamu Lulus 🎉"
                : "Sertifikat"}
          </h2>

          {cert && (
            <p className="mt-1 text-sm text-white/75">
              Sertifikat kamu telah berhasil diterbitkan.
            </p>
          )}
        </div>

        {/* Body */}
        <div className="px-7 pt-5 pb-2">
          {/* Loading skeleton */}
          {isLoading && (
            <div className="animate-pulse space-y-3">
              <div className="h-48 rounded-xl bg-slate-100" />
              <div className="h-12 rounded-xl bg-slate-100" />
              <div className="h-12 rounded-xl bg-slate-100" />
              <div className="h-12 rounded-xl bg-slate-100" />
            </div>
          )}

          {/* Error state */}
          {isError && !isLoading && (
            <EmptyState
              icon={<FileX size={32} className="text-slate-300" />}
              title="Gagal memuat sertifikat"
              description="Terjadi kesalahan saat mengambil data. Coba tutup dan buka kembali."
            />
          )}

          {/* Sertifikat belum tersedia */}
          {!isLoading && !isError && !cert && (
            <EmptyState
              icon={<Award size={32} className="text-slate-300" />}
              title="Sertifikat belum tersedia"
              description="Selesaikan semua materi dan lulus quiz untuk mendapatkan sertifikat."
            />
          )}

          {/* Sertifikat tersedia */}
          {!isLoading && cert && (
            <>
              {/* Preview gambar */}
              {cert.file_url && (
                <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                  <img
                    src={cert.file_url}
                    alt="Sertifikat"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Info */}
              <div className="grid grid-cols-1 gap-2">
                <InfoRow
                  icon={<Hash size={14} />}
                  label="Nomor Sertifikat"
                  value={cert.certificate_no}
                  mono
                />
                <InfoRow
                  icon={<CalendarDays size={14} />}
                  label="Tanggal Terbit"
                  value={issuedDate}
                />
                <InfoRow
                  icon={<ShieldCheck size={14} />}
                  label="Kode Verifikasi"
                  value={cert.verification_code}
                  mono
                  highlight
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-7 py-4 border-t border-slate-100 gap-3 mt-3">
          {cert?.file_url && (
            <div className="flex items-center gap-2">
              {/* <a
                href={cert.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ExternalLink size={14} />
                Buka
              </a> */}
              <a
                href={cert.file_url}
                download
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-sm font-bold text-white shadow-md shadow-amber-200 transition hover:from-amber-600 hover:to-orange-600"
              >
                <Download size={14} />
                Unduh JPEG
              </a>
              <a
                href={cert.file_pdf}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 px-5 py-2 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:from-green-600 hover:to-blue-600"
              >
                <Download size={14} />
                Unduh PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                       */
/* ------------------------------------------------------------------ */

function InfoRow({
  icon,
  label,
  value,
  mono = false,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
        highlight
          ? "border-amber-100 bg-amber-50"
          : "border-slate-100 bg-slate-50"
      }`}
    >
      <div
        className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide ${
          highlight ? "text-amber-600" : "text-slate-400"
        }`}
      >
        {icon}
        {label}
      </div>
      <span
        className={`text-sm font-bold break-all text-right max-w-[60%] ${
          mono ? "font-mono" : ""
        } ${highlight ? "text-amber-700" : "text-slate-800"}`}
      >
        {value}
      </span>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
      {icon}
      <p className="text-sm font-semibold text-slate-600">{title}</p>
      <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
        {description}
      </p>
    </div>
  );
}
