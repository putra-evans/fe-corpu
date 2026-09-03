"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useKelasSaya } from "@/app/hooks/useKelasSaya";
import { useRouter } from "next/navigation";
import { Keania_One } from "next/font/google";
import { formatTanggal, getStatusPendaftaran } from "@/lib/date";
import { Icon } from "@iconify/react";
import VerificationModal from "../components/Verificationmodal";

const KelasSaya = () => {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [courseId, setCourseId] = useState<string>("");

  const router = useRouter();

  const { data, isLoading, error } = useKelasSaya({
    token: session?.accessToken,
    page,
    per_page: 5,
    search: debouncedSearch,
    status,
    sort,
    type,
  });
  const meta = data?.meta;
  const kelasList = data?.data ?? [];
  const lastPage = meta?.last_page ?? 1;

  console.log(data, "data");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  if (error) {
    return <div className="text-center text-red-500">Gagal memuat data 😢</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-gray-800">Kelas Saya</h1>
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        {/* 🔍 Search */}
        <div className="relative w-full md:max-w-sm">
          <input
            type="text"
            placeholder="Cari kelas..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
            🔍
          </span>
        </div>

        <p className="text-xs text-gray-400 mb-1">Filter</p>
        <div className="flex gap-2">
          {/* Tipe Kelas */}
          <select
            value={type}
            onChange={(e) => {
              setPage(1);
              setType(e.target.value);
            }}
            className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Tipe Kelas</option>
            <option value="E">E-Learning</option>
            <option value="B">Blended Learning</option>
          </select>
          {/* 🎯 Status */}
          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
            className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Status Kelas</option>
            <option value="completed">Selesai</option>
            <option value="expired">Berakhir</option>
            <option value="running">Sedang Berjalan</option>
            <option value="upcoming">Mendatang</option>
            <option value="pending">Pending</option>
          </select>

          {/* 🔃 Sort */}
          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value);
            }}
            className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Urutkan</option>
            <option value="desc">Terbaru</option>
            <option value="asc">Terlama</option>
          </select>
          <button
            onClick={() => {
              setSearch("");
              setStatus("");
              setSort("");
              setPage(1);
            }}
            className="text-sm text-primary"
          >
            Reset
          </button>
        </div>
      </div>
      {/* 🔹 List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-100 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          Tidak ada kelas ditemukan
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {kelasList.map((kelas) => {
              const statusPendaftaran = getStatusPendaftaran(kelas.start_date);
              return (
                <div
                  key={kelas.enrollment_id}
                  className="relative bg-white border border-gray-200 rounded-2xl p-6 flex justify-between items-start shadow-sm hover:shadow-md transition"
                >
                  {/* Glow subtle */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50/40 to-transparent rounded-2xl pointer-events-none" />

                  {/* Left */}
                  <div className="flex gap-5 items-center z-10">
                    {/* Logo */}
                    <div className="w-24 h-w-24 md:w-24 md:h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-inner">
                      {kelas.thumbnail ? (
                        <img
                          src={kelas.thumbnail}
                          alt={kelas.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-500">
                          {kelas.title?.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-2 max-w-xl">
                      {/* Badge */}
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          {kelas.timeline_status === "upcoming" && (
                            <span className="capitalize text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">
                              mendatang
                            </span>
                          )}
                          {kelas.timeline_status === "running" && (
                            <span className="capitalize text-xs bg-orange-400 text-yellow-50 px-3 py-1 rounded-full font-medium">
                              sedang berjalan
                            </span>
                          )}
                          {kelas.timeline_status === "completed" && (
                            <span className="capitalize text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                              selesai
                            </span>
                          )}
                          {(kelas.timeline_status === "pending" ||
                            kelas.timeline_status === "revision") && (
                            <span className="capitalize text-xs bg-red-500 text-white px-3 py-1 rounded-full font-medium">
                              {kelas.timeline_status}
                            </span>
                          )}
                          {kelas.timeline_status === "expired" && (
                            <span className="capitalize text-xs bg-red-500 text-white px-3 py-1 rounded-full font-medium">
                              Berakhir
                            </span>
                          )}
                        </span>

                        {/* <span className="capitalize text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                        {kelas.status}
                      </span> */}
                        <span className="flex items-center gap-1">
                          {kelas.type === "E" ? (
                            <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                              E-Learning
                            </span>
                          ) : (
                            <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
                              Blended Learning
                            </span>
                          )}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-semibold text-gray-800 leading-snug">
                        {kelas.title}
                      </h2>

                      {/* Category */}
                      <p className="text-sm text-gray-500">{kelas.category}</p>

                      {/* Info */}
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          📅 Terdaftar {formatTanggal(kelas.registered_at)}
                        </span>
                        <span className="flex items-center gap-1">📘 ASN</span>
                        {kelas.start_date && (
                          <span className="flex items-center gap-1">
                            ⏰ Dimulai {formatTanggal(kelas.start_date)} -{" "}
                            {formatTanggal(kelas.end_date)}
                          </span>
                        )}
                      </div>

                      {/* Progress */}
                      <div className="mt-3">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-2 bg-orange-500 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(kelas.progress || 0, 100)}%`,
                            }}
                          />
                        </div>

                        <p className="text-xs text-gray-400 mt-1">
                          Progress {kelas.progress}
                        </p>
                      </div>
                      {/* terkahir di akses */}
                      {statusPendaftaran && statusPendaftaran.diff > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <Icon
                            icon="mdi:bell-alert"
                            className={statusPendaftaran.text}
                            width="18"
                          />
                          <p className={`text-sm ${statusPendaftaran.text}`}>
                            Kelas dimulai {statusPendaftaran.diff}{" "}
                            {statusPendaftaran.label}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right */}
                  {kelas.timeline_status === "upcoming" ? (
                    <div className="z-10 flex flex-col items-end gap-3">
                      <span className="text-sm text-red-500">Belum Mulai</span>
                    </div>
                  ) : kelas.timeline_status === "completed" ? (
                    <div className="z-10 flex flex-col items-end gap-3">
                      <button
                        className="bg-green-500 text-yellow-50 px-5 py-2 rounded-xl text-sm font-medium"
                        onClick={() => router.push(`/kelas-saya/${kelas.slug}`)}
                      >
                        Selesai
                      </button>
                    </div>
                  ) : kelas.timeline_status === "running" ? (
                    <div className="z-10 flex flex-col items-end gap-3">
                      <button
                        className="bg-orange-400 text-yellow-50 px-5 py-2 rounded-xl text-sm font-medium"
                        onClick={() => router.push(`/kelas-saya/${kelas.slug}`)}
                      >
                        Lanjutkan Belajar
                      </button>
                    </div>
                  ) : kelas.timeline_status === "pending" ||
                    kelas.timeline_status === "revision" ? (
                    <div className="z-10 flex flex-col items-end gap-3">
                      <button
                        className="bg-orange-500 text-white px-5 py-2 rounded-xl text-sm font-medium shadow hover:scale-105 transition"
                        onClick={() => {
                          setCourseId(kelas.course_id);
                          setShowVerification(true);
                          console.log(kelas.course_id, "course_id");
                        }}
                      >
                        Verifikasi Berkas
                      </button>
                    </div>
                  ) : kelas.timeline_status === "expired" ? (
                    <div className="z-10 flex flex-col items-end gap-3">
                      <button
                        className="bg-red-500 text-white px-5 py-2 rounded-xl text-sm font-medium shadow hover:scale-105 transition"
                        onClick={() => router.push(`/kelas-saya/${kelas.slug}`)}
                      >
                        Kelas Berakhir
                      </button>
                    </div>
                  ) : (
                    <div className="z-10 flex flex-col items-end gap-3">
                      <span className="text-sm text-red-500">Out Of Rules</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 🔹 Pagination (Seperti gambar 🔥) */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {/* Prev */}
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-2 rounded-lg border disabled:opacity-50"
            >
              {"<"}
            </button>

            {/* Pages */}
            {Array.from({ length: meta?.last_page || 1 }, (_, i) => i + 1)
              .slice(0, 5)
              .map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-lg border ${
                    page === p
                      ? "bg-orange-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}

            {/* Ellipsis */}
            {(meta?.last_page ?? 0) > 5 && <span className="px-2">...</span>}

            {/* Last */}
            {(meta?.last_page ?? 0) > 5 && (
              <button onClick={() => setPage(lastPage)}>{lastPage}</button>
            )}

            {/* Next */}
            <button
              disabled={page === lastPage}
              onClick={() => setPage(lastPage)}
              className="px-3 py-2 rounded-lg border disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        </>
      )}
      {showVerification && (
        <VerificationModal
          open={showVerification}
          onClose={() => setShowVerification(false)}
          courseId={courseId}
          token={session?.accessToken ?? ""}
        />
      )}
    </div>
  );
};

export default KelasSaya;
