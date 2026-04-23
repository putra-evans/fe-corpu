import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const res = await fetch(
      `${process.env.SIMPEG_DETAIL_PEGAWAI}/${params.username}`,
      {
        // optional caching
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Gagal ambil data user" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
