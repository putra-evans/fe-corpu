// app/courses/page.tsx
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Slider from "react-slick";
import { CardKelas, FrontLayout, Skeleton } from "../../components";
import { useCourses } from "../hooks/useCourse";
import { useKategoriList } from "../hooks/useKategoriList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFavKelasList } from "../hooks/useFavKelasList";

const Courses = () => {
  const [kategoriIds, setKategoriIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string | null>("desc");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string | null>();

  const { courses, total, isLoading } = useCourses({
    page,
    kategoriIds,
    sortBy,
    search,
    type,
  });

  const { kategoriList, isLoading: isLoadingKategori } = useKategoriList();
  const {
    favKelasList,
    isLoading: isLoadingFavKelas,
    isError,
  } = useFavKelasList();

  // Reset pagination saat filter berubah
  useEffect(() => {
    setPage(1);
  }, [kategoriIds, sortBy, search]);

  const totalPages = Math.ceil(total / 6);

  const handleKategoriChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setKategoriIds((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleSortChange = (value: string) => {
    setSortBy((prev) => (prev === value ? null : value));
  };

  const handleTypeChange = (value: string) => {
    setType((prev) => (prev === value ? null : value));
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
            {isLoadingFavKelas
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton tipe="courses" key={i} />
                ))
              : favKelasList
                  .slice(0, 5)
                  .map((item) => <CardKelas item={item} key={item.id} />)}
          </Slider>
        </div>
      </section>

      <section className="scroll-mt-12 pb-20 mt-12 bg-white">
        <div className="max-w-screen-2xl mx-auto sm:px-6 lg:px-1">
          <div className="flex flex-col lg:flex-row gap-2">
            {/* Sidebar */}
            <aside className="w-[250px] lg:flex-shrink-0 lg:sticky top-24 self-start">
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="font-bold text-lg  mb-4">Jenis</h2>
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
                          value="E"
                          checked={type === "E"}
                          onChange={(e) => handleTypeChange(e.target.value)}
                        />
                        <span>E-learning</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="B"
                          checked={type === "B"}
                          onChange={(e) => handleTypeChange(e.target.value)}
                        />
                        <span>Blended Learning</span>
                      </label>
                    </>
                  )}
                </div>
                <h2 className="font-bold text-lg mb-4 mt-6">Kategori Kelas</h2>
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
                      {kategoriList.map((item) => (
                        <label
                          key={item.id}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            value={item.id}
                            onChange={handleKategoriChange}
                            checked={kategoriIds.includes(item.id)}
                          />
                          <span>{item.name}</span>
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
                          value="desc"
                          checked={sortBy === "desc"}
                          onChange={(e) => handleSortChange(e.target.value)}
                        />
                        <span>Baru Rilis</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="asc"
                          checked={sortBy === "asc"}
                          onChange={(e) => handleSortChange(e.target.value)}
                        />
                        <span>Terlama</span>
                      </label>
                    </>
                  )}
                </div>
              </div>
            </aside>

            {/* Konten Kelas */}

            <div className="flex-1">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Cari kelas berdasarkan judul..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton tipe="courses" key={i} />
                    ))
                  : courses.map((item) => (
                      <CardKelas key={item.id} item={item} />
                    ))}
              </div>

              {/* INI KHUSUS HALAMAN PAGINATION */}

              {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2 flex-wrap">
                  <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-3 py-1 border rounded ${
                        page === i + 1 ? "bg-primary text-white" : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              )}

              {!isLoading && courses.length === 0 && (
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
