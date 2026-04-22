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
    type: "e",
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
