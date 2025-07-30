"use client";

import Link from "@/node_modules/next/link";
import Image from "next/image";

const Tentang = () => {
  return (
    <section className="relative" id="aboutus">
      <div className="container px-4">
        <div className="absolute right-0 bottom-[2%] xl:block hidden">
          <Image
            src="/images/Tentang/logo.png"
            alt="burger-image"
            width={300}
            height={522}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 my-16 space-x-5">
          <div className="lg:col-span-6 flex lg:justify-start justify-center">
            <Image
              src="/images/Tentang/tentang.svg"
              alt="nothing"
              width={600}
              height={700}
            />
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-start">
            <p className="text-primary text-lg font-normal mb-3 tracking-widest uppercase lg:text-start text-center">
              Tentang Corporate University
            </p>
            <h2 className="lg:text-start text-center">
              Sistem Pembelajaran Pengembangan Kompetensi ASN
            </h2>
            <p className="text-black/50 text-lg font-normal my-5 text-start">
              <span className="font-bold italic">Corporate University</span>{" "}
              (Corpu) merupakan pendekatan sistem pembelajaran terintegrasi
              dalam pengembangan kompetensi ASN yang berperan sebagai sarana
              strategis untuk mendukung pencapaian tujuan pembangunan nasional
              dalam bentuk penanganan isu-isu strategis melalui proses
              pembelajaran tematik dan terintegrasi.
            </p>
            <p className="text-black/50 text-lg font-normal mb-10 text-start">
              Melibatkan instansi pemerintah terkait dan tenaga ahli dari
              dalam/luar instansi pemerintah
            </p>
            <Link
              href="/tentang"
              className="text-xl font-medium rounded-full text-white py-3 px-8 duration-300 bg-primary w-fit border border-primary hover:bg-transparent hover:text-primary hover:cursor-pointer"
            >
              Selengkapnya...
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tentang;
