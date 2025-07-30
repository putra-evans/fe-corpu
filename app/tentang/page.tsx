// app/courses/page.tsx
"use client";

import { FrontLayout } from "../../components";
import Image from "next/image";

const Tentang = () => {
  return (
    <FrontLayout>
      <section id="courses" className="scroll-mt-12 pb-20 mt-12">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-primary text-3xl pt-5 font-normal tracking-widest uppercase">
              Tentang <br />{" "}
              <span className="font-bold italic">Corporate University</span>{" "}
              (Corpu)
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-1 gap-10 items-center">
            <div className="col-span-6 flex flex-col gap-8">
              <h2 className="text-midnight_text lg:text-start text-center font-semibold leading-tight capitalize">
                Apa Itu{" "}
                <span className="font-bold italic"> Corporate University</span>{" "}
                (Corpu) ?
              </h2>
              <p className="text-black/70 text-lg lg:text-start text-center max-w-xl capitalize flex flex-wrap">
                Sesuai dengan Peraturan Lembaga Administrasi Negara Republik
                Indonesia (LAN-RI) Nomor 6 Tahun 2023 Tentang Sistem
                Pembelajaran Pengembangan Kompetensi Secara Terintegrasi
                (Corporate University) menjelaskan Corporate University (Corpu)
                merupakan pendekatan sistem pembelajaran terintegrasi dalam
                pengembangan kompetensi ASN yang berperan sebagai sarana
                strategis untuk mendukung pencapaian tujuan pembangunan nasional
                dalam bentuk penanganan isu-isu strategis melalui proses
                pembelajaran tematik dan terintegrasi dengan melibatkan instansi
                pemerintah terkait dan tenaga ahli dari dalam/luar instansi
                pemerintah.
              </p>
            </div>
            <div className="col-span-6 flex justify-center">
              <Image
                src="/images/tentang/asn_tentang.png"
                alt="nothing"
                width={350}
                height={505}
              />
            </div>
          </div>
        </div>
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 my-16 space-x-5">
            <div className="lg:col-span-6 flex lg:justify-start justify-center">
              <Image
                src="/images/Tentang/asn_tentang_2.png"
                alt="nothing"
                width={600}
                height={700}
              />
            </div>
            <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-start">
              <p className="text-primary text-lg font-normal mb-3 tracking-widest uppercase lg:text-start text-center">
                Tentang Corporate University
              </p>
              <p className="text-black/50 text-lg font-normal my-5 text-start">
                Penyelenggaraan
                <span className="font-bold italic">
                  Corporate University
                </span>{" "}
                (Corpu) terdapat 7 unsur yang sebagai berikut:
                <ul className="grid gap-2">
                  <li className=" p-1 rounded-xl border border-orange-400 shadow-sm  transition flex items-start gap-3">
                    <span className="text-lg pl-4">1.</span>
                    <span>Struktur ASN Corpu</span>
                  </li>
                  <li className=" p-1 rounded-xl shadow-sm border border-orange-400  transition flex items-start gap-3">
                    <span className="text-lg pl-4">2.</span>
                    <span>Manajemen Pengetahuan</span>
                  </li>
                  <li className=" p-1 rounded-xl shadow-sm border border-orange-400  transition flex items-start gap-3">
                    <span className="text-lg pl-4">3.</span>
                    <span> Forum pembelajaran</span>
                  </li>
                  <li className=" p-1 rounded-xl shadow-sm border border-orange-400  transition flex items-start gap-3">
                    <span className="text-lg pl-4">4.</span>
                    <span> Sistem Pembelajaran</span>
                  </li>
                  <li className=" p-1 rounded-xl shadow-sm border border-orange-400  transition flex items-start gap-3">
                    <span className="text-lg pl-4">5.</span>
                    <span> Strategi Pembelajaran</span>
                  </li>
                  <li className=" p-1 rounded-xl shadow-sm border border-orange-400  transition flex items-start gap-3">
                    <span className="text-lg pl-4">6.</span>
                    <span> Teknologi Pembelajaran</span>
                  </li>
                  <li className=" p-1 rounded-xl shadow-sm border border-orange-400  transition flex items-start gap-3">
                    <span className="text-lg pl-4">7.</span>
                    <span> Integrasi Sistem</span>
                  </li>
                </ul>
              </p>
              <p className="text-black/50 text-lg font-normal mb-10 text-start">
                Teknologi Pembelajaran dalam unsur Corpu tersebut adalah media
                pembelajaran dengan mengoptimalkan pemanfaatan teknologi
                informasi dan komunikasi untuk mendukung keberhasilan pencapaian
                tujuan pembelajaran. Teknologi pembelajaran ini dapat
                dikembangkan dalam bentuk sistem manajemen pembelajaran yang
                disebut Learning Management System (LMS) yang terintegrasi
                dengan sistem informasi manajemen ASN.
              </p>
            </div>
          </div>
        </div>
      </section>
    </FrontLayout>
  );
};

export default Tentang;
