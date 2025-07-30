"use client";

import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo";
import { FooterLinkType } from "../../../types/footerlink";

const Footer: FC = () => {
  const [footerlink, SetFooterlink] = useState<FooterLinkType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        SetFooterlink(data.FooterLinkData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="pt-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-6 lg:gap-20 md:gap-24 sm:gap-12 gap-12 pb-10">
          <div className="col-span-2">
            <Logo />
            <p className="text-sm font-medium text-grey my-5 max-w-70%">
              Sistem Pembelajaran Pengembangan Kompetensi Secara Terintegrasi
            </p>
            <div className="flex gap-6 items-center">
              <Link
                href="#"
                className="group bg-white hover:bg-primary rounded-full shadow-xl p-3"
              >
                <Icon
                  icon="fa6-brands:facebook-f"
                  width="16"
                  height="16"
                  className=" group-hover:text-white text-black"
                />
              </Link>
              <Link
                href="#"
                className="group bg-white hover:bg-primary rounded-full shadow-xl p-3"
              >
                <Icon
                  icon="fa6-brands:instagram"
                  width="16"
                  height="16"
                  className=" group-hover:text-white text-black"
                />
              </Link>
              <Link
                href="#"
                className="group bg-white hover:bg-primary rounded-full shadow-xl p-3"
              >
                <Icon
                  icon="fa6-brands:x-twitter"
                  width="16"
                  height="16"
                  className=" group-hover:text-white text-black"
                />
              </Link>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex gap-20"></div>
          </div>
          <div className="col-span-2 sm:col-span-6 md:col-span-2">
            <div className="flex flex-col gap-5">
              <div className="flex">
                <Icon
                  icon="solar:point-on-map-perspective-bold"
                  className="text-primary text-3xl lg:text-2xl inline-block me-2"
                />
                <p className="text-black text-base">
                  Jl. Raya Indarung No.km.12, Padang Besi
                </p>
              </div>
              <Link href="tel:+1(909) 235-9814">
                <div className="flex">
                  <Icon
                    icon="solar:phone-bold"
                    className="text-primary text-3xl lg:text-2xl inline-block me-2"
                  />
                  <p className="text-black/60 hover:text-black text-base">
                    (0751) 72730
                  </p>
                </div>
              </Link>
              <Link href="/">
                <div className="flex">
                  <Icon
                    icon="solar:mailbox-bold"
                    className="text-primary text-3xl lg:text-2xl inline-block me-2"
                  />
                  <p className="text-black/60 hover:text-black text-base">
                    diklat.provsumbar@gmail.com
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-grey/15 py-5 flex flex-col sm:flex-row justify-between sm:items-center gap-5">
          <p className="text-sm text-black/70">
            @2025 - Putra Evans. All Rights Reserved By{" "}
            <Link
              href="https://diskominfotik.sumbarprov.go.id/"
              className="hover:text-primary hover:underline"
            >
              TIM IT Diskominfotik
            </Link>
          </p>

          <div className="">
            <Link
              href="#"
              className="text-sm text-black/70 px-5 border-r border-grey/15 hover:text-primary hover:underline"
            >
              Privacy policy
            </Link>
            <Link
              href="#"
              className="text-sm text-black/70 px-5 hover:text-primary hover:underline"
            >
              Terms & conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
