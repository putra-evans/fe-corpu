"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Slider from "react-slick";
import { KategoriKelasType, KelasType } from "../../types/kelas";
import { CardKelas, FrontLayout, Skeleton } from "../../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Courses = () => {
  const [course, setCourse] = useState<KelasType[]>([]);
  const [kategoriList, SetkategoriList] = useState<KategoriKelasType[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedKategori, setSelectedKategori] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string | null>("terbaru");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCourseRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const checked = e.target.checked;
    setLoading(true);
    setSelectedKategori((prev) => {
      const updated = checked
        ? [...prev, value]
        : prev.filter((id) => id !== value);
      setPage(1); // Reset pagination
      setCourse([]); // Reset data
      setHasMore(true);
      setTimeout(() => setLoading(false), 300);
      return updated;
    });
  };

  const handleSortChange = (value: string) => {
    setSortBy((prev) => (prev === value ? null : value));
    setPage(1);
    setCourse([]);
    setHasMore(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/data?page=${page}&limit=6`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        // Filter di sisi klien jika kategori aktif
        const filtered = data.CourseData.filter((item: KelasType) =>
          selectedKategori.length === 0
            ? true
            : selectedKategori.includes(item.id_kategori)
        );

        const sorted = [...filtered].sort((a, b) => {
          if (sortBy === "terpopuler") return b.students - a.students;
          if (sortBy === "baru")
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          return 0;
        });

        if (page === 1) {
          setCourse(sorted);
        } else {
          setCourse((prev) => [...prev, ...sorted]);
        }

        SetkategoriList(data.KategoriKelas);

        if (sorted.length < 6) setHasMore(false);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };
    fetchData();
  }, [page, selectedKategori, sortBy]);

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
              Katalog Kelas
            </p>
            <h2 className="font-semibold lg:max-w-60% mx-auto mt-3">
              Belajar Jadi Lebih Mudah & Asyik
            </h2>
          </div>
          <Slider {...settings}>
            {initialLoading
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
                  {initialLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton tipe="kategori_kelas" key={i} />
                    ))
                  ) : (
                    <>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedKategori.length === 0}
                          onChange={() => {
                            setSelectedKategori([]);
                            setPage(1);
                            setCourse([]);
                            setHasMore(true);
                          }}
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

                <h2 className="font-bold text-lg mt-6 mb-4">Filter</h2>
                <div className="space-y-2">
                  {initialLoading ? (
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
                {course.map((item, i) => {
                  if (i === course.length - 1) {
                    return (
                      <div ref={lastCourseRef} key={i}>
                        <CardKelas item={item} />
                      </div>
                    );
                  } else {
                    return <CardKelas item={item} key={i} />;
                  }
                })}
                {loading &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton tipe="courses" key={`load-${i}`} />
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
