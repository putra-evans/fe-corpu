// app/courses/page.tsx
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Slider from "react-slick";
import { CardKelas, FrontLayout, Skeleton } from "../../components";
import { useCourses } from "../hooks/useCourse";
import { useKategoriList } from "../hooks/useKategoriList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Courses = () => {
  const [kategoriIds, setKategoriIds] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string | null>("terbaru");

  const {
    courses,
    isLoadingInitialData,
    isLoadingMore,
    setSize,
    hasMore,
    mutate,
  } = useCourses({ kategoriIds, sortBy });

  const { kategoriList, isLoading: isLoadingKategori } = useKategoriList();

  // Reset pagination saat filter berubah
  useEffect(() => {
    setSize(1);
  }, [kategoriIds, sortBy]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCourseRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSize((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoadingMore, hasMore, setSize]
  );

  const handleKategoriChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const checked = e.target.checked;
    setKategoriIds((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleSortChange = (value: string) => {
    setSortBy((prev) => (prev === value ? null : value));
  };

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
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
              Kumpulan Kelas
            </p>
            <h2 className="font-semibold lg:max-w-60% mx-auto mt-3">
              Belajar Jadi Lebih Mudah & Asyik
            </h2>
          </div>
          <Slider {...settings}>
            {isLoadingInitialData
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton tipe="courses" key={i} />
                ))
              : courses
                  .slice(0, 5)
                  .map((item, i) => <CardKelas item={item} key={i} />)}
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
                  {isLoadingKategori ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton tipe="kategori_kelas" key={i} />
                    ))
                  ) : (
                    <>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={kategoriIds.length === 0}
                          onChange={() => setKategoriIds([])}
                        />
                        <span>All</span>
                      </label>
                      {kategoriList.map((kategori) => (
                        <label
                          key={kategori.id_kategori}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            value={kategori.id_kategori}
                            onChange={handleKategoriChange}
                            checked={kategoriIds.includes(kategori.id_kategori)}
                          />
                          <span>{kategori.nama_kategori}</span>
                        </label>
                      ))}
                    </>
                  )}
                </div>

                <h2 className="font-bold text-lg mt-6 mb-4">Filter</h2>
                <div className="space-y-2">
                  {isLoadingKategori ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton tipe="kategori_kelas" key={i} />
                    ))
                  ) : (
                    <>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="baru"
                          checked={sortBy === "baru"}
                          onChange={() => handleSortChange("baru")}
                        />
                        <span>Baru Rilis</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="terpopuler"
                          checked={sortBy === "terpopuler"}
                          onChange={() => handleSortChange("terpopuler")}
                        />
                        <span>Terpopuler</span>
                      </label>
                    </>
                  )}
                </div>
              </div>
            </aside>

            {/* Konten Kelas */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {courses.map((item, i) => {
                  if (i === courses.length - 1) {
                    return (
                      <div ref={lastCourseRef} key={i}>
                        <CardKelas key={i} item={item} />
                      </div>
                    );
                  }
                  return <CardKelas key={i} item={item} />;
                })}
                {isLoadingMore &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton tipe="courses" key={`load-${i}`} />
                  ))}
              </div>
              {!isLoadingInitialData && courses.length === 0 && (
                <div className="text-center text-gray-500 mt-6 text-sm col-span-full">
                  Data tidak ditemukan.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </FrontLayout>
  );
};

export default Courses;
