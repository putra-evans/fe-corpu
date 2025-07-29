"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { FeaturesType } from "../../../types/features";
// import FeaturesSkeleton from "../../Skeleton/Features";
import { Skeleton } from "../../../components";
import { KelasType } from "@/types/kelas";
interface CardKelasProps {
  item: KelasType;
  key: number;
}

const CardKelas = ({ item, key }: CardKelasProps) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return (
      <div>
        {Array.from({ length: fullStars }).map((_, index) => (
          <Icon
            key={`full-${index}`}
            icon="tabler:star-filled"
            className="text-yellow-500 text-xl inline-block"
          />
        ))}

        {halfStars > 0 && (
          <Icon
            key="half-star"
            icon="tabler:star-half-filled"
            className="text-yellow-500 text-xl inline-block"
          />
        )}

        {Array.from({ length: emptyStars }).map((_, index) => (
          <Icon
            key={`empty-${index}`}
            icon="tabler:star-filled"
            className="text-gray-400 text-xl inline-block"
          />
        ))}
      </div>
    );
  };

  return (
    <div key={key}>
      <div className="bg-white m-1 px-3 pt-3 pb-12 shadow-md rounded-2xl h-full border border-black/10 capitalize">
        <div className="relative rounded-3xl">
          <div className="w-full h-[200px] rounded-2xl overflow-hidden relative">
            <Image
              src={item.imgSrc}
              alt="course-image"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute right-5 -bottom-3 bg-secondary rounded-full p-4">
            <p className="text-white uppercase text-center text-sm font-medium">
              best seller
            </p>
          </div>
        </div>

        <div className="px-3 pt-6">
          <Link href="#">
            <p className="text-black text-base max-w-75% inline-block hover:text-primary h-[50px]">
              {item.heading}
            </p>
          </Link>
          <p className="text-base font-normal pt-6 text-black/75">
            {item.name}
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 border-b gap-4">
            <div className="flex items-center gap-4">
              <p className="text-red-700 text-2xl font-medium">
                {item.rating.toFixed(1)}
              </p>
              <div className="flex">{renderStars(item.rating)}</div>
            </div>
            <p className="text-3xl font-medium">${item.price}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-6">
            <div className="flex items-center gap-2">
              <Icon
                icon="solar:notebook-minimalistic-outline"
                className="text-primary text-xl"
              />
              <p className="text-base font-medium text-black/75">
                {item.classes} classes
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                icon="solar:users-group-rounded-linear"
                className="text-primary text-xl"
              />
              <p className="text-base font-medium text-black/75">
                {item.students} Peserta
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Link
              href={`/kelas/${item.id}`}
              className="bg-primary w-full py-3 text-center rounded-lg text-18 font-medium border text-white border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out"
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
