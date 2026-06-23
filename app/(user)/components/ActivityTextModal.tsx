"use client";

import { X, BookOpen } from "lucide-react";
import { useEffect } from "react";

interface ActivityTextModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string | null;
  content?: string | null;
}

export default function ActivityTextModal({
  open,
  onClose,
  title,
  description,
  content,
}: ActivityTextModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl max-h-[90vh]">
        {/* Header */}
        <div className="flex shrink-0 items-start gap-3 border-b border-slate-100 px-6 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
            <BookOpen size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-slate-800 leading-snug">
              {title || "Detail Materi"}
            </h2>
            {description && (
              <p
                className="mt-0.5 text-sm text-slate-500 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
          {content ? (
            <div
              className="prose prose-slate prose-sm max-w-none
                prose-headings:font-semibold prose-headings:text-slate-800
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-li:text-slate-600
                prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-sm
                prose-blockquote:border-l-teal-400 prose-blockquote:text-slate-500"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
              <BookOpen size={36} className="mb-3 opacity-30" />
              <p className="text-sm">Tidak ada konten materi.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-xs text-slate-400">
            Tekan{" "}
            <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
              Esc
            </kbd>{" "}
            untuk menutup
          </p>
          <button
            onClick={onClose}
            className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
