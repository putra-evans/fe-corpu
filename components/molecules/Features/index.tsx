"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { FeaturesType } from "../../../types/features";
// import FeaturesSkeleton from "../../Skeleton/Features";
import { Skeleton } from "../../../components";

const Features = () => {
  const [features, setFeatures] = useState<FeaturesType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFeatures(data.FeaturesData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="features">
      <div className="container ">
        <div className="text-center mb-14">
          <h2 className="font-semibold lg:max-w-60% mx-auto mt-3">
            Apa Yang Akan Kamu Dapatkan?
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-28 gap-x-6 mt-24">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton tipe="features" key={i} />
              ))
            : features.map((items, i) => (
                <div
                  key={i}
                  className="p-8 relative rounded-3xl border border-gray-200 shadow-md hover:scale-105 transition duration-300 ease-in-out hover:cursor-pointer"
                >
                  {/* Lingkaran dengan shadow dan posisi center */}
                  <div className="w-32 h-32 rounded-full shadow-lg bg-white flex items-center justify-center absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <Image
                      src={items.imgSrc}
                      alt={items.imgSrc}
                      width={120}
                      height={120}
                    />
                  </div>

                  {/* Konten */}
                  <p className="text-xl lg:text-2xl text-black font-semibold text-center mt-16">
                    {items.heading}
                  </p>
                  <p className="text-sm lg:text-base font-normal text-black/50 text-center mt-2 leading-6">
                    {items.subheading}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
