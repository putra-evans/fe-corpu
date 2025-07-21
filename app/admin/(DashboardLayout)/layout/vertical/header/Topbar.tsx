"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import adminmart_logo from "/public/images/logos/logo-adminmart.svg";
import { Dropdown } from "flowbite-react/components/Dropdown";
import Link from "next/link";
import Image from "next/image";

const Topbar = () => {
  return (
    <div className="py-[15px] px-6 z-40 sticky top-0 ">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="md:flex hidden items-center gap-5">
          <Link href="/">Kembali halaman utama</Link>
          <div className="xl:flex items-center gap-4 pl-5 border-l border-opacity-20 border-black hidden">
            <Link
              target="_black"
              href="https://adminmart.com/templates/nextjs/"
              className="flex items-center gap-2 text-black bg-transparent hover:text-[#5d87ff]"
            >
              <Icon icon="solar:window-frame-linear" width={20} />
              <h4 className="text-base font-normal leading-none text-black hover:text-[#5d87ff]">
                Kelas
              </h4>
            </Link>
            <Link
              target="_black"
              href="https://adminmart.com/support/"
              className="flex items-center gap-2 text-black bg-transparent hover:text-[#5d87ff]"
            >
              <Icon icon="solar:question-circle-linear" width={20} />
              <h4 className="text-base font-normal leading-none text-black hover:text-[#5d87ff]">
                Help
              </h4>
            </Link>
            <Link
              target="_black"
              href="https://adminmart.com/hire-us/"
              className="flex items-center gap-2 text-black bg-transparent hover:text-[#5d87ff]"
            >
              <Icon icon="solar:case-round-linear" width={20} />
              <h4 className="text-base font-normal leading-none text-black hover:text-[#5d87ff]">
                Hire Us
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
