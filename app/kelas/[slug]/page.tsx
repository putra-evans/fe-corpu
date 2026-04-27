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
import { DynamicForm } from "@/components/molecules/index";

interface Props {
  params: {
    slug: string;
  };
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long", // Senin
    day: "2-digit", // 20
    month: "long", // April
    year: "numeric", // 2026
  });
};

export default function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const slug = params.slug as string;

  const { course, isLoading } = useKelasBySlug(slug);

  if (isLoading) return <GlobalLoading />;

  if (!course) return <div>Data tidak ditemukan</div>;

  console.log(course);

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
          🏛 {course.category} 📅 {formatDate(course.start_date)} -{" "}
          {formatDate(course.end_date)}
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

            <div className="text-sm text-white bg-blue-800 px-3 py-1 rounded mb-3 inline-block">
              Kelas
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-1">Informasi Umum</h2>
              <p className="text-gray-700 text-sm">{course.description}</p>
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
              <h2 className="text-lg font-semibold mb-2">Syarat Pendaftaran</h2>
              <table className="w-full text-sm border">
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium">
                      Minimal Kelengkapan Profile
                    </td>
                    <td className="p-2">Hanya Mandatory</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Minimal Pendidikan</td>
                    <td className="p-2">Bebas</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Jurusan</td>
                    <td className="p-2">Bebas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Informasi Detail</h2>
              <p className="text-sm text-gray-500">
                Detail Informasi Tidak Ditemukan
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Aktivitas</h2>
              <p className="text-sm text-gray-500 mb-2">
                📅 Sun, 01 Dec 2024 - Wed, 31 Dec 2025
              </p>
              <ul className="text-sm space-y-2">
                <li>📘 Mempelajari Modul - PDF (2 Jam)</li>
                <li>📘 Membaca Modul Berpikir Kritis - PDF (1 Jam)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Tentang Mitra</h2>
              <div className="bg-gray-100 p-4 rounded-xl text-sm">
                <p className="font-semibold">
                  ASN BERPIJAR - Lembaga Administrasi Negara
                </p>
                <p className="text-gray-600 mt-2">
                  ASN Berpijar merupakan program pengembangan kapasitas yang
                  diselenggarakan berkat kerjasama Pijar Learning dengan Lembaga
                  Administrasi Negara (LAN). Program ini diharapkan mampu
                  memberikan kesempatan belajar mandiri dan bisa bagi ASN untuk
                  meningkatkan kapasitasnya dalam mewujudkan inovasi kebijakan
                  dan pelayanan publik.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:flex-shrink-0 lg:sticky top-24 self-start ">
            <aside className="lg:col-span-1 border border-orange-300  rounded-xl p-4 h-fit">
              <h3 className="text-base font-semibold mb-3">
                Program ini termasuk:
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✅ Sertifikat Kelulusan</li>
                <li>⏱ Aktivitas: 0.03 Jam 0 Menit</li>
                <li>📝 1 Kuis</li>
                <li>📄 2 PDF</li>
                <li>♾ Akses Selamanya</li>
              </ul>
              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-primary w-full py-3 rounded-lg text-white"
                >
                  DAFTAR
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
      {/* {open && (
        <Modal onClose={() => setOpen(false)}>
          <DynamicForm
            fields={course.requirements}
            slug={course.slug}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )} */}
    </FrontLayout>
  );
}
