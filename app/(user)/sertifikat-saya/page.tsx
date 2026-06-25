"use client";

import { useState } from "react";
import {
  useCertificateList,
  CertificateItem,
} from "@/app/hooks/Usecertificatelist";
import {
  Award,
  Download,
  Eye,
  Search,
  FileX,
  CalendarDays,
  Star,
  ChevronRight,
} from "lucide-react";
import { useSession } from "next-auth/react";

// Ganti dengan cara ambil token di project kamu

export default function SertifikatPage() {
  const { data: session } = useSession();
  const token = session?.accessToken || "";
  console.log(token, "token");

  const { data, isLoading, isError } = useCertificateList(token);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState<CertificateItem | null>(null);

  const certificates = data?.data ?? [];

  const filtered = certificates.filter(
    (c) =>
      c.course_title.toLowerCase().includes(search.toLowerCase()) ||
      c.certificate_no.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 rounded-lg">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-6 py-6 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Award size={18} className="text-amber-500" />
              <h1 className="text-lg font-bold text-slate-800">
                Sertifikat Saya
              </h1>
            </div>
            <p className="text-[13px] text-slate-400">
              {isLoading
                ? "Memuat..."
                : `${certificates.length} sertifikat diterbitkan`}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Cari pelatihan atau nomor sertifikat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-[13px] rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-2xl border border-slate-100 overflow-hidden"
              >
                <div className="h-36 bg-slate-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <FileX size={36} className="text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">
              Gagal memuat sertifikat
            </p>
            <p className="text-xs text-slate-400">Coba refresh halaman ini.</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <Award size={36} className="text-slate-200" />
            <p className="text-sm font-semibold text-slate-500">
              {search ? "Sertifikat tidak ditemukan" : "Belum ada sertifikat"}
            </p>
            <p className="text-xs text-slate-400 max-w-xs">
              {search
                ? "Coba kata kunci lain."
                : "Selesaikan pelatihan untuk mendapatkan sertifikat."}
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((cert, idx) => (
              <CertificateCard
                key={cert.certificate_no}
                cert={cert}
                index={idx}
                onPreview={() => setPreview(cert)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {preview && (
        <PreviewModal cert={preview} onClose={() => setPreview(null)} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CertificateCard                                                      */
/* ------------------------------------------------------------------ */

function CertificateCard({
  cert,
  index,
  onPreview,
}: {
  cert: CertificateItem;
  index: number;
  onPreview: () => void;
}) {
  const issuedDate = new Date(cert.issued_date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const score = cert.final_score;
  const scoreColor =
    score === null
      ? "text-slate-400"
      : score >= 80
        ? "text-emerald-600"
        : score >= 60
          ? "text-amber-600"
          : "text-red-500";

  const scoreBg =
    score === null
      ? "bg-slate-100"
      : score >= 80
        ? "bg-emerald-50"
        : score >= 60
          ? "bg-amber-50"
          : "bg-red-50";

  return (
    <div
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Thumbnail */}
      <div className="relative h-36 overflow-hidden bg-slate-100">
        <img
          src={cert.course_thumbnail}
          alt={cert.course_title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Score badge */}
        {score !== null && (
          <div
            className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${scoreBg} ${scoreColor}`}
          >
            <Star size={10} fill="currentColor" />
            {score}
          </div>
        )}

        {/* Cert no bottom-left */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-mono text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-md">
            {cert.certificate_no}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-[14px] font-semibold text-slate-800 leading-snug mb-2 line-clamp-2">
          {cert.course_title}
        </h3>

        <div className="flex items-center gap-1.5 text-[12px] text-slate-400 mb-4">
          <CalendarDays size={11} />
          {issuedDate}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPreview}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] font-semibold text-slate-600 hover:bg-slate-100 transition"
          >
            <Eye size={13} />
            Lihat
          </button>
          <a
            href={cert.certificate_pdf}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-2 text-[12px] font-bold text-white shadow-sm shadow-amber-200 hover:from-amber-600 hover:to-orange-600 transition"
          >
            <Download size={13} />
            Unduh PDF
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Preview Modal                                                        */
/* ------------------------------------------------------------------ */

function PreviewModal({
  cert,
  onClose,
}: {
  cert: CertificateItem;
  onClose: () => void;
}) {
  const issuedDate = new Date(cert.issued_date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-amber-500 to-orange-400 px-6 py-5 shrink-0">
          <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/[0.07]" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25 transition text-lg font-bold"
          >
            ✕
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Award size={16} className="text-white/80" />
            <span className="text-[11px] font-medium text-white/80">
              Sertifikat Kelulusan
            </span>
          </div>
          <h2 className="text-base font-bold text-white leading-snug pr-8 line-clamp-2">
            {cert.course_title}
          </h2>
        </div>

        {/* Scrollable */}
        <div className="overflow-y-auto flex-1 px-6 pt-5 pb-2">
          {/* Certificate image */}
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm mb-4">
            <img
              src={cert.certificate_image}
              alt="Sertifikat"
              className="w-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Info rows */}
          <div className="space-y-2">
            <InfoRow
              label="Nomor Sertifikat"
              value={cert.certificate_no}
              mono
            />
            <InfoRow label="Tanggal Terbit" value={issuedDate} />
            {cert.final_score !== null && (
              <InfoRow
                label="Nilai Akhir"
                value={`${cert.final_score} / 100`}
                highlight
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-t border-slate-100 gap-3">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-600 transition"
          >
            Tutup
          </button>
          <div className="flex items-center gap-2">
            <a
              href={cert.certificate_image}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <Eye size={13} />
              Buka Gambar
            </a>
            <a
              href={cert.certificate_pdf}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-[12px] font-bold text-white shadow-sm shadow-amber-100 hover:from-amber-600 hover:to-orange-600 transition"
            >
              <Download size={13} />
              Unduh PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared                                                               */
/* ------------------------------------------------------------------ */

function InfoRow({
  label,
  value,
  mono = false,
  highlight = false,
}: {
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
      <span
        className={`text-[12px] font-semibold uppercase tracking-wide ${highlight ? "text-amber-600" : "text-slate-400"}`}
      >
        {label}
      </span>
      <span
        className={`text-sm font-bold text-right max-w-[60%] break-all ${mono ? "font-mono" : ""} ${highlight ? "text-amber-700" : "text-slate-800"}`}
      >
        {value}
      </span>
    </div>
  );
}
