"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function UnderDevelopment() {
  const router = useRouter();
  const [pct, setPct] = useState(0);
  const targetPct = 20;
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 2000;
    let start: number | null = null;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min(
        Math.round(((ts - start) / duration) * targetPct),
        targetPct,
      );
      setPct(progress);
      if (progress < targetPct) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, 400);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center text-center max-w-md w-full">
        {/* Gear illustration */}
        <div className="relative w-40 h-40 mb-8">
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* Main gear */}
            <g
              className="animate-float-1"
              style={{ transformOrigin: "80px 80px" }}
            >
              <g
                className="animate-spin-gear-main"
                style={{ transformOrigin: "80px 85px" }}
              >
                <path
                  d="M80 50 L86 56 L94 54 L98 62 L106 64 L106 72 L112 78 L108 86 L112 92 L106 98 L106 106 L98 108 L94 116 L86 114 L80 120 L74 114 L66 116 L62 108 L54 106 L54 98 L48 92 L52 86 L48 78 L54 72 L54 64 L62 62 L66 54 L74 56 Z"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="1.5"
                />
                <circle
                  cx="80"
                  cy="85"
                  r="14"
                  fill="#F8FAFC"
                  stroke="#CBD5E1"
                  strokeWidth="1.5"
                />
                <circle cx="80" cy="85" r="4" fill="#CBD5E1" />
              </g>
            </g>

            {/* Small gear top-right */}
            <g
              className="animate-float-2"
              style={{ transformOrigin: "118px 46px" }}
            >
              <g
                className="animate-spin-gear-rev"
                style={{ transformOrigin: "118px 46px" }}
              >
                <path
                  d="M118 28 L121 31 L125 30 L127 34 L131 35 L131 39 L134 42 L132 46 L134 50 L131 53 L131 57 L127 58 L125 62 L121 61 L118 64 L115 61 L111 62 L109 58 L105 57 L105 53 L102 50 L104 46 L102 42 L105 39 L105 35 L109 34 L111 30 L115 31 Z"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="1.2"
                />
                <circle
                  cx="118"
                  cy="46"
                  r="8"
                  fill="#F8FAFC"
                  stroke="#CBD5E1"
                  strokeWidth="1.2"
                />
                <circle cx="118" cy="46" r="2.5" fill="#CBD5E1" />
              </g>
            </g>

            {/* Tiny gear left */}
            <g
              className="animate-float-3"
              style={{ transformOrigin: "34px 57px" }}
            >
              <g
                className="animate-spin-gear-tiny"
                style={{ transformOrigin: "34px 57px" }}
              >
                <path
                  d="M34 44 L36.5 46.5 L39.5 46 L41 49 L44 50 L44 53 L46.5 55 L45 58 L46.5 61 L44 64 L44 67 L41 68 L39.5 71 L36.5 70.5 L34 73 L31.5 70.5 L28.5 71 L27 68 L24 67 L24 64 L21.5 61 L23 58 L21.5 55 L24 53 L24 50 L27 49 L28.5 46 L31.5 46.5 Z"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                />
                <circle
                  cx="34"
                  cy="57.5"
                  r="6"
                  fill="#F8FAFC"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                />
                <circle cx="34" cy="57.5" r="2" fill="#CBD5E1" />
              </g>
            </g>

            {/* Decorative shapes */}
            <g className="animate-float-2">
              <circle
                cx="120"
                cy="110"
                r="8"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
            </g>
            <g className="animate-float-1">
              <rect
                x="22"
                y="100"
                width="14"
                height="14"
                rx="3"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>

        {/* Badge */}
        <div className="animate-fade-in-1 mb-3">
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1 rounded-full border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse inline-block" />
            Dalam Pengembangan
          </span>
        </div>

        {/* Title & description */}
        <h1 className="animate-fade-in-2 text-[22px] font-semibold text-slate-800 mt-3 mb-2 leading-snug">
          Fitur ini sedang kami kerjakan
        </h1>
        <p className="animate-fade-in-3 text-[15px] text-slate-500 leading-relaxed mb-8 max-w-sm">
          Halaman ini belum tersedia untuk saat ini. Tim kami sedang bekerja
          keras untuk menghadirkan pengalaman terbaik untukmu.
        </p>

        {/* Progress card */}
        <div className="animate-fade-in-4 w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] text-slate-500">
              Progress pengembangan
            </span>
            <span className="text-[13px] font-semibold text-slate-700">
              {pct}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-white rounded-full overflow-hidden mb-4 relative">
            <div
              className="h-full rounded-full bg-indigo-500 transition-none"
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Stage chips */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl py-2 px-1">
              <div className="text-emerald-600 text-base mb-0.5">✓</div>
              <div className="text-[11px] text-emerald-700 font-medium">
                Desain
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl py-2 px-1">
              <div className="text-indigo-600 text-base mb-0.5">⌨︎</div>
              <div className="text-[11px] text-indigo-700 font-medium">
                Coding
              </div>
            </div>
            <div className="bg-slate-100 border border-slate-200 rounded-xl py-2 px-1">
              <div className="text-slate-400 text-base mb-0.5">⚗</div>
              <div className="text-[11px] text-slate-400 font-medium">
                Testing
              </div>
            </div>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="animate-fade-in-4 inline-flex items-center gap-2 text-[13px] text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Kembali ke halaman sebelumnya
        </button>
      </div>

      <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(2deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-7px) rotate(-2deg);
          }
          66% {
            transform: translateY(-13px) rotate(1deg);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-16px);
          }
        }
        @keyframes spinGear {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spinGearRev {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float-1 {
          animation: float1 4s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float2 5s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float3 6s ease-in-out infinite;
        }
        .animate-spin-gear-main {
          animation: spinGear 7s linear infinite;
        }
        .animate-spin-gear-rev {
          animation: spinGearRev 4.5s linear infinite;
        }
        .animate-spin-gear-tiny {
          animation: spinGear 3s linear infinite;
        }
        .animate-fade-in-1 {
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
          animation-delay: 0.1s;
        }
        .animate-fade-in-2 {
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
          animation-delay: 0.25s;
        }
        .animate-fade-in-3 {
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
          animation-delay: 0.4s;
        }
        .animate-fade-in-4 {
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
          animation-delay: 0.55s;
        }
      `}</style>
    </div>
  );
}
