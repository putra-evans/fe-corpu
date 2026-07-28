"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { KelasType } from "@/types/kelas";
import { FrontLayout } from "@/components";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useKelasBySlug } from "@/app/hooks/useKelasBySlug";
import GlobalLoading from "@/app/loading";
import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  formatTanggal,
  getStatusPembelajaran,
  getStatusPendaftaran,
} from "@/lib/date";
import { activityConfig, requirementConfig } from "@/lib/syaratKelas";

import {
  DynamicForm,
  Modal,
  NoRequirement,
} from "@/components/molecules/index";
import { log } from "console";

// interface Props {
//   params: {
//     slug: string;
//   };
// }

export default function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const slug = params.slug as string;

  console.log("slug", slug);

  const { course, isLoading } = useKelasBySlug(slug);

  if (isLoading) return <GlobalLoading />;

  if (!course) return <div>Data tidak ditemukan</div>;

  const status = getStatusPembelajaran(course?.start_date, course?.end_date);
  const statusPendaftaran = getStatusPendaftaran(course?.start_date);

  return (
    <FrontLayout>
      <div className="container mx-auto scroll-mt-40 pb-20 mt-40 mb-32 border border-orange-300 rounded-xl p-4 sm:p-6 lg:p-8">
        <Link
          href="/kelas"
          className="flex items-center text-sm text-orange-600 mb-4 cursor-pointer"
        >
          ← Kembali
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {course.title}
        </h1>
        <p className="text-gray-500 text-sm mb-4">
          🏛 {course.category} 📅 Mulai dari {formatTanggal(course.start_date)}{" "}
          - {formatTanggal(course.end_date)}
        </p>
        <hr className="my-6 border-t border-orange-300" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="rounded-xl overflow-hidden mb-6">
              <img
                // src="/images/noimage.png"
                src={course.thumbnail || "/assets/img/no_image.png"}
                alt="Pelatihan Kepemimpinan"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* <div className="text-sm text-white bg-blue-800 px-3 py-1 rounded mb-3 inline-block">
              Kelas
            </div> */}

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-1">Informasi Umum</h2>
              <p
                className="text-gray-700 text-sm text-justify"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Kategori Peserta</h2>
              <div className="flex gap-2">
                <span className="bg-gray-100 px-3 py-1 text-sm rounded">
                  {course.access_type}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Kategori</h2>
              <span className="bg-orange-500 text-white px-3 py-1 text-sm rounded">
                {course.category}
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Syarat Khusus</h2>

              {course?.requirements?.length ? (
                <div className="space-y-4">
                  {course.requirements.map((item, index) => {
                    const config = requirementConfig[item.type] || {
                      icon: "mdi:circle-outline",
                      color: "text-gray-400",
                      bg: "bg-gray-100",
                    };

                    return (
                      <div
                        key={item.id}
                        className="group flex items-start gap-4 p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-primary/40 transition"
                      >
                        {/* Icon */}
                        <div className={`p-2 rounded-full ${config.bg}`}>
                          <Icon
                            icon={config.icon}
                            className={`${config.color} group-hover:scale-110 transition`}
                            width="20"
                            height="20"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            {item.label}
                          </p>

                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md capitalize">
                            {item.type}
                          </span>
                        </div>

                        {/* Badge */}
                        {item.is_required && (
                          <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
                            Wajib
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  Tidak ada syarat khusus
                </p>
              )}
            </div>

            {/* <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Informasi Detail</h2>
              <p className="text-sm text-gray-500">
                Detail Informasi Tidak Ditemukan
              </p>
            </div> */}
            {/* 
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Aktivitas</h2>
              <p className="text-sm text-gray-500 mb-2">
                📅 Sun, 01 Dec 2024 - Wed, 31 Dec 2025
              </p>
              <ul className="text-sm space-y-2">
                <li>📘 Mempelajari Modul - PDF (2 Jam)</li>
                <li>📘 Membaca Modul Berpikir Kritis - PDF (1 Jam)</li>
              </ul>
            </div> */}

            <div>
              <h2 className="text-lg font-semibold mb-2">Tentang Mitra</h2>
              <div className="bg-gray-100 p-4 rounded-xl text-sm">
                <p className="font-semibold">Corporate University - Corpu</p>
                <p className="text-gray-600 mt-2">
                  Corporate University (Corpu) merupakan pendekatan sistem
                  pembelajaran terintegrasi dalam pengembangan kompetensi ASN
                  yang berperan sebagai sarana strategis untuk mendukung
                  pencapaian tujuan pembangunan nasional dalam bentuk penanganan
                  isu-isu strategis melalui proses pembelajaran tematik dan
                  terintegrasi dengan melibatkan instansi pemerintah terkait dan
                  tenaga ahli dari dalam/luar instansi pemerintah.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:flex-shrink-0 lg:sticky top-24 self-start ">
            <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-blue-100">Periode Pembelajaran</p>

                  <div className="mt-1">
                    <p className="text-xl font-bold">
                      {formatTanggal(course?.start_date)}
                    </p>

                    <div className="flex items-center gap-2 text-blue-100">
                      <div className="h-px w-4 bg-blue-200" />
                      <span className="text-xs">sampai</span>
                      <div className="h-px w-4 bg-blue-200" />
                    </div>

                    <p className="text-lg font-semibold">
                      {formatTanggal(course?.end_date)}
                    </p>
                  </div>
                </div>

                <div className="bg-white/20 p-3 rounded-full">
                  <Icon icon="mdi:school-outline" width="28" />
                </div>
              </div>

              <div className="mt-4 bg-white/10 rounded-lg p-3 flex items-center gap-2">
                <Icon icon="mdi:calendar-range" width="50" />
                <p className="text-sm font-semibold">
                  Silahkan persiapkan diri Anda untuk memulai pembelajaran
                </p>
              </div>
            </div>

            <div className="mb-4 p-4 rounded-xl bg-white shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Batas Pendaftaran</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatTanggal(course?.start_date)}
                  </p>
                </div>

                {statusPendaftaran && (
                  <span
                    className={`px-4 py-1 text-white text-sm rounded-full ${statusPendaftaran.color}`}
                  >
                    {statusPendaftaran.status}
                  </span>
                )}
              </div>

              {/* Countdown */}
              {statusPendaftaran && statusPendaftaran.diff > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <Icon
                    icon="mdi:bell-alert"
                    className={statusPendaftaran.text}
                    width="18"
                  />
                  <p className={`text-sm ${statusPendaftaran.text}`}>
                    {statusPendaftaran.diff} hari lagi!
                  </p>
                </div>
              )}
            </div>

            <aside className="lg:col-span-1 border bg-white shadow-sm  border-gray-200  rounded-xl p-4 h-fit">
              <h3 className="text-base font-semibold mb-3">
                Program ini termasuk:
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                {course?.activity_summary?.map((item) => {
                  const config = activityConfig[item.type] || {
                    icon: "mdi:circle-outline",
                    color: "text-gray-400",
                  };

                  return (
                    <li key={item.type} className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-gray-100">
                        <Icon
                          icon={config.icon}
                          className={config.color}
                          width="20"
                          height="20"
                        />
                      </div>
                      <span>
                        {item.total} {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {statusPendaftaran?.status === "Ditutup" ? (
                <div className="flex items-center gap-2 mt-2">
                  <Icon
                    icon="mdi:bell-alert"
                    className={statusPendaftaran.text}
                    width="18"
                  />
                  <p className={`text-sm italic ${statusPendaftaran.text}`}>
                    Kelas sudah tidak tersedia!
                  </p>
                </div>
              ) : (
                <div className="flex justify-between pt-6">
                  <button
                    onClick={() => setOpen(true)}
                    className="bg-primary w-full py-3 rounded-lg text-white"
                  >
                    DAFTAR
                  </button>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          {course.requirements?.length === 0 ? (
            <NoRequirement
              slug={slug}
              id={course.id}
              onClose={() => setOpen(false)}
            />
          ) : (
            <DynamicForm
              fields={course.requirements}
              slug={slug}
              id={course.id}
              onClose={() => setOpen(false)}
            />
          )}
        </Modal>
      )}
    </FrontLayout>
  );
}
