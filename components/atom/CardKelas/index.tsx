"use client";
import Image from "next/image";
import Link from "next/link";
// import { Icon } from "@iconify/react";
// import { useEffect, useState } from "react";
// import { FeaturesType } from "../../../types/features";
// // import FeaturesSkeleton from "../../Skeleton/Features";
// import { Skeleton } from "../../../components";
// import { KelasType } from "@/types/kelas";
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
    <div>
      <div className="bg-white m-1 px-3 pt-3 pb-12 shadow-md rounded-2xl h-full border border-black/10 capitalize">
        <div className="relative rounded-3xl">
          <div className="w-full h-[200px] rounded-2xl overflow-hidden relative">
            <Image
              src={item.thumbnail || "/assets/img/no_image.png"}
              // src="/images/noimage.png"
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
        <div className="p-4 flex flex-col gap-2">
          {/* TITLE */}
          <h3
            className="font-semibold text-gray-800 line-clamp-2"
            title={item.title}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.title}
          </h3>

          {/* CATEGORY + ACCESS */}
          <div className="text-sm text-gray-500 flex justify-between">
            <span>{item.category.name}</span>
            <span className="text-orange-500 font-medium">
              {item.access_type}
            </span>
          </div>

          {/* DATE */}
          <div className="text-xs text-gray-400">
            {formatDate(item.start_date)} - {formatDate(item.end_date)}
          </div>

          <div className="flex justify-between pt-6">
            <Link
              href={item.slug ? `/kelas/${item.slug}` : "#"}
              className="bg-primary w-full py-3 text-center rounded-lg text-18 font-medium border text-white border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out"
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
