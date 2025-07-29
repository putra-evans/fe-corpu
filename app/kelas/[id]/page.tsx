// /app/courses/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { KelasType } from "@/types/kelas";
import { FrontLayout } from "@/components";
import Link from "next/link";

const CourseData: KelasType[] = [
  {
    id: 1,
    id_kategori: 1,
    heading: "(MERN) Full-Stack Development",
    name: "James Nolan",
    imgSrc: "/images/courses/mern.webp",
    students: 150,
    classes: 12,
    price: 20,
    rating: 4.4,
    created_at: "2025-07-29T10:00:00Z",
  },
  {
    id: 2,
    id_kategori: 2,
    heading: "Design Systems with React",
    name: "Elena Brooks",
    imgSrc: "/images/courses/react.webp",
    students: 130,
    classes: 12,
    price: 20,
    rating: 4.5,
    created_at: "2025-07-29T10:00:00Z",
  },
  {
    id: 3,
    id_kategori: 1,
    heading: "Create Stunning Banners in Figma",
    name: "Aria Kim",
    imgSrc: "/images/courses/UiUx.webp",
    students: 120,
    classes: 12,
    price: 20,
    rating: 5.0,
    created_at: "2025-07-29T10:00:00Z",
  },
  {
    id: 4,
    id_kategori: 2,
    heading: "Build & Launch a Webflow Website",
    name: "Marcus Lee",
    imgSrc: "/images/courses/webflow.webp",
    students: 150,
    classes: 12,
    price: 20,
    rating: 5.0,
    created_at: "2025-07-28T10:00:00Z",
  },
  {
    id: 5,
    id_kategori: 2,
    heading: "Explore The World",
    name: "Diego Lee",
    imgSrc: "/images/courses/adventure.jpg",
    students: 150,
    classes: 12,
    price: 20,
    rating: 5.0,
    created_at: "2025-07-28T10:00:00Z",
  },
  {
    id: 6,
    id_kategori: 2,
    heading: "Kembangkan Bisnismu Ke Seluruh Dunia",
    name: "Cristiano hwa",
    imgSrc: "/images/courses/bisnis.png",
    students: 500,
    classes: 23,
    price: 20000,
    rating: 3.0,
    created_at: "2024-06-20T08:00:00Z",
  },
  {
    id: 7,
    id_kategori: 1,
    heading: "Tutorial Dasar dan Pergerakan Flexibel Dance yang Popular",
    name: "Messi Lionel",
    imgSrc: "/images/courses/dance.jpg",
    students: 30,
    classes: 28,
    price: 100000,
    rating: 4.5,
    created_at: "2024-10-20T08:00:00Z",
  },
  {
    id: 8,
    id_kategori: 3,
    heading: "Rekomendasi Desain Studio dengan Modern Desain yang Terbaru",
    name: "Joni Bernard",
    imgSrc: "/images/courses/desain_studio.jpg",
    students: 37,
    classes: 78,
    price: 150000,
    rating: 4.7,
    created_at: "2024-08-20T08:00:00Z",
  },
  {
    id: 9,
    id_kategori: 1,
    heading: "Explore Dunia Dengan Penuh Semangat dan Kehangatan",
    name: "Bernard",
    imgSrc: "/images/courses/explore.jpg",
    students: 57,
    classes: 71,
    price: 200000,
    rating: 4.4,
    created_at: "2025-06-20T08:00:00Z",
  },
  {
    id: 10,
    id_kategori: 3,
    heading: "Tutorial Panduan Praktis Awal Untuk Pemula Mendaki Gunung",
    name: "Bernard Kennedy",
    imgSrc: "/images/courses/hiking.jpg",
    students: 100,
    classes: 89,
    price: 250000,
    rating: 4.5,
    created_at: "2025-02-20T08:00:00Z",
  },
  {
    id: 11,
    id_kategori: 2,
    heading: "Berfikir Kritis dalam menyelesaikan permasalahan yang ada",
    name: "Thomas Edison",
    imgSrc: "/images/courses/kreatifitas.jpg",
    students: 140,
    classes: 90,
    price: 220000,
    rating: 4.1,
    created_at: "2025-03-20T08:00:00Z",
  },
  {
    id: 12,
    id_kategori: 1,
    heading: "Tips-Trik dalam menghadapi forum pada saat melaksanakan meeting",
    name: "Edison Alfa",
    imgSrc: "/images/courses/meeting.jpg",
    students: 99,
    classes: 30,
    price: 210000,
    rating: 3.4,
    created_at: "2025-05-20T08:00:00Z",
  },
  {
    id: 13,
    id_kategori: 3,
    heading:
      "Fakta Menarik dengan sepeda kita berhasil menurunkan berat badan dengan cepat",
    name: "Alfa Anwar",
    imgSrc: "/images/courses/sepeda.jpg",
    students: 87,
    classes: 80,
    price: 150000,
    rating: 5.0,
    created_at: "2025-01-21T08:00:00Z",
  },
  {
    id: 14,
    id_kategori: 2,
    heading: "Belajar Skateboard dengan cepat untuk pemula",
    name: "Joko Anwar",
    imgSrc: "/images/courses/skateboard.jpg",
    students: 20,
    classes: 150,
    price: 120000,
    rating: 4.0,
    created_at: "2025-07-10T08:00:00Z",
  },
];

interface Props {
  params: {
    id: string;
  };
}

export default function CourseDetail({ params }: Props) {
  const courseId = parseInt(params.id);
  const course = CourseData.find((item) => item.id === courseId);

  if (!course) return notFound();

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
          {course.heading}
        </h1>
        <p className="text-gray-500 text-sm mb-4">
          🏛 Lembaga Administrasi Negara · 📅 Sun, 01 Dec 2024 - Wed, 31 Dec 2025
        </p>
        <hr className="my-6 border-t border-orange-300" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="rounded-xl overflow-hidden mb-6">
              <img
                src={course.imgSrc}
                alt="Pelatihan Kepemimpinan"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="text-sm text-white bg-blue-800 px-3 py-1 rounded mb-3 inline-block">
              Kelas
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-1">Informasi Umum</h2>
              <p className="text-gray-700 text-sm">
                Mata Pelatihan ini membekali Peserta dengan kemampuan dalam
                mengembangkan pola pikir kritis dan inovatif dalam menjalankan
                perannya sebagai pemimpin sehingga mampu menerapkan dalam
                memberikan pelayanan publik.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Kategori Peserta</h2>
              <div className="flex gap-2">
                <span className="bg-gray-100 px-3 py-1 text-sm rounded">
                  ASN
                </span>
                <span className="bg-gray-100 px-3 py-1 text-sm rounded">
                  NON ASN
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Kategori Inovasi</h2>
              <span className="bg-orange-500 text-white px-3 py-1 text-sm rounded">
                Pelatihan Struktural Kepemimpinan
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
                <Link
                  href=""
                  className="bg-primary w-full py-3 text-center rounded-lg text-18 font-medium border text-white border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out"
                >
                  DAFTAR
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </FrontLayout>
  );
}
