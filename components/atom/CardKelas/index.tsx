"use client";

import Image from "next/image";
import Link from "next/link";

interface CardKelasProps {
  item: any;
}

const CardKelas = ({ item }: CardKelasProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="h-full">
      <div className="bg-white m-1 p-3 shadow-md rounded-2xl h-full border border-black/10 capitalize flex flex-col">
        {/* IMAGE */}
        <div className="relative rounded-3xl">
          <div className="w-full h-[200px] rounded-2xl overflow-hidden relative">
            <Image
              src={item.thumbnail || "/assets/img/no_image.png"}
              alt="course-image"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute right-0 -bottom-3 bg-secondary rounded-full p-4">
            <p className="text-white bg-primary uppercase text-center text-sm font-medium p-1 rounded">
              {item.type === "E" ? "E-Learning" : "Blended Learning"}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col flex-1">
          {/* TITLE */}
          <h3
            className="font-semibold text-gray-800 line-clamp-2 min-h-[56px]"
            title={item.title}
          >
            {item.title}
          </h3>

          {/* CATEGORY + ACCESS */}
          <div className="text-sm text-gray-500 flex justify-between mt-2">
            <span className="truncate mr-2">{item.category?.name ?? "-"}</span>
            <span className="text-orange-500 font-medium shrink-0">
              {item.access_type}
            </span>
          </div>

          {/* DATE */}
          <div className="text-xs text-gray-400 mt-2">
            Dimulai {formatDate(item.start_date)} - {formatDate(item.end_date)}
          </div>

          {/* BUTTON */}
          <div className="mt-auto pt-6">
            <Link
              href={item.slug ? `/kelas/${item.slug}` : "#"}
              className="block w-full py-2 text-center rounded-full text-[16px] font-medium border border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition duration-300"
              prefetch={true}
            >
              Lihat Kelas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardKelas;
