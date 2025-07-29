// /app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { KelasType } from "@/types/kelas";

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

export const GET = (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const kategori = searchParams.get("kategori");
  const search = searchParams.get("search")?.toLowerCase() || "";
  const sort = searchParams.get("sort") || "baru";

  let filtered = [...CourseData];

  if (kategori) {
    const kategoriIds = kategori.split(",").map(Number);
    filtered = filtered.filter((item) =>
      kategoriIds.includes(item.id_kategori)
    );
  }

  if (search) {
    filtered = filtered.filter((item) =>
      item.heading.toLowerCase().includes(search)
    );
  }

  if (sort === "baru") {
    filtered.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } else if (sort === "terpopuler") {
    filtered.sort((a, b) => b.students - a.students);
  }

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);
  const hasMore = start + limit < filtered.length;

  return NextResponse.json({
    data: paginated,
    hasMore,
    total: filtered.length,
  });
};
