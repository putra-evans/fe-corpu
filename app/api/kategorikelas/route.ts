import { NextResponse } from "next/server";

export const GET = () => {
  const kategori = [
    { id_kategori: 1, nama_kategori: "Design" },
    { id_kategori: 2, nama_kategori: "Coding" },
    { id_kategori: 3, nama_kategori: "Public Speaking" },
    { id_kategori: 4, nama_kategori: "Bisnis" },
    { id_kategori: 5, nama_kategori: "Marketing" },
    { id_kategori: 6, nama_kategori: "Fotografi" },
  ];

  return NextResponse.json({ kategori });
};
