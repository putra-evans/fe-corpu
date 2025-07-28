"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { KelasType } from "../../types/kelas";
import { CardKelas, FrontLayout, Skeleton } from "../../components";

const Courses = () => {
  const [course, setCourse] = useState<KelasType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCourse(data.CourseData);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    speed: 500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <FrontLayout>
      <section id="courses" className="scroll-mt-12 pb-20 mt-12">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-primary text-3xl font-normal tracking-widest uppercase underline">
              Katalog Kelas
            </p>
            <h2 className="font-semibold lg:max-w-60% mx-auto mt-3">
              Belajar Jadi Lebih Mudah & Asyik
            </h2>
          </div>
          <Slider {...settings}>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton tipe="courses" key={i} />
                ))
              : course
                  .slice(0, 5)
                  .map((items, i) => <CardKelas item={items} key={i} />)}
          </Slider>
        </div>
      </section>
      <section className="scroll-mt-12 pb-20 mt-12 bg-white">
        <div className="max-w-screen-2xl mx-auto sm:px-6 lg:px-1">
          <div className="flex flex-col lg:flex-row gap-2">
            {/* Sidebar */}
            <aside className="w-[250px] lg:flex-shrink-0 lg:sticky top-24 self-start">
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="font-bold text-lg mb-4">Kategori Kelas</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>All</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Design</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Coding</span>
                  </label>
                </div>

                <h2 className="font-bold text-lg mt-6 mb-4">Filter</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="sort" />
                    <span>Baru Rilis</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="sort" />
                    <span>Terpopuler</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="sort" />
                    <span>Sedang Promo</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Konten Kelas */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton tipe="courses" key={i} />
                    ))
                  : course.map((items, i) => (
                      <CardKelas item={items} key={i} />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </FrontLayout>
  );
};

export default Courses;
