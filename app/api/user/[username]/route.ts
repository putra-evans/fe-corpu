import { NextResponse } from "next/server";
import { User } from "@/types/user";

export async function GET(
  req: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;
    const res = await fetch(
      `${process.env.SIMPEG_DETAIL_PEGAWAI}/${username}`,
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

    const data: User = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
