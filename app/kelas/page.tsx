"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { KategoriKelasType, KelasType } from "../../types/kelas";
import { CardKelas, FrontLayout, Skeleton } from "../../components";

const Courses = () => {
  const [course, setCourse] = useState<KelasType[]>([]);
  const [kategoriList, SetkategoriList] = useState<KategoriKelasType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKategori, setSelectedKategori] = useState<number[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string | null>("terbaru");

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10); // pastikan ini number
    const checked = e.target.checked;
    setLoading(true);
    setSelectedKategori((prev) => {
      const updated = checked
        ? [...prev, value]
        : prev.filter((id) => id !== value);

      // Simulasi delay loading (misal 300ms), bisa dihapus kalau ambil data dari server
      setTimeout(() => setLoading(false), 300);
      return updated;
    });
  };
  const handleSortChange = (value: string) => {
    setSortBy((prev) => (prev === value ? null : value));
  };

  // AMBIL DATA KELAS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCourse(data.CourseData);
        SetkategoriList(data.KategoriKelas);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCourse = [...course]
    .filter((item) =>
      selectedKategori.length === 0
        ? true
        : selectedKategori.includes(item.id_kategori)
    )
    .sort((a, b) => {
      if (sortBy === "terpopuler") return b.students - a.students;
      if (sortBy === "baru")
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      return 0;
    });

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
                  <div className="space-y-2">
                    {initialLoading ? (
                      // hanya skeleton saat pertama kali halaman dibuka
                      Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="animate-pulse flex items-center gap-2"
                        >
                          <div className="w-4 h-4 bg-gray-300 rounded" />
                          <div className="h-4 bg-gray-300 rounded w-24" />
                        </div>
                      ))
                    ) : (
                      <>
                        {/* Checkbox "All" */}
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedKategori.length === 0}
                            onChange={() => setSelectedKategori([])}
                          />
                          <span>All</span>
                        </label>

                        {/* Loop semua kategori */}
                        {kategoriList.map((kategori) => (
                          <label
                            key={kategori.id_kategori}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              value={kategori.id_kategori}
                              onChange={handleCheckboxChange}
                              checked={selectedKategori.includes(
                                kategori.id_kategori
                              )}
                            />
                            <span>{kategori.nama_kategori}</span>
                          </label>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <h2 className="font-bold text-lg mt-6 mb-4">Filter</h2>
                <div className="space-y-2">
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
                </div>
              </div>
            </aside>

            {/* Konten Kelas */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton tipe="courses" key={i} />
                    ))
                  : filteredCourse.map((items, i) => (
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
