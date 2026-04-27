"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import GlobalLoading from "@/app/loading";
import { useUserQuery } from "@/app/hooks/useUserQuery";

const UserDashboardLayout = ({ children }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <GlobalLoading />;
  }

  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "mdi:view-dashboard",
    },
    {
      name: "Data Diri",
      href: "/data-diri",
      icon: "mdi:account",
    },
    {
      name: "Kelas Saya",
      href: "/kelas-saya",
      icon: "mdi:school",
    },
    {
      name: "Sertifikat",
      href: "/sertifikat-saya",
      icon: "mdi:award",
    },
  ];
  return (
    <div className="w-full max-w-[1400px] mx-auto grid grid-cols-12 gap-6 min-h-screen">
      {/* 🔹 Sidebar */}
      <aside className="col-span-12 md:col-span-3">
        <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-md border border-gray-100 h-2/4">
          <p className="text-xs font-semibold text-gray-400 mb-4 tracking-wider">
            MENU
          </p>

          <div className="flex flex-col gap-2">
            {menus.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl 
                transition-all duration-300 ease-out font-medium
                ${
                  isActive
                    ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary shadow-sm"
                    : "text-gray-600 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:text-primary"
                }`}
                >
                  <Icon
                    icon={item.icon}
                    width="18"
                    className={`transition-all ${
                      isActive
                        ? "opacity-100"
                        : "opacity-70 group-hover:opacity-100"
                    }`}
                  />

                  <span className="relative">
                    {item.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    ></span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* 🔹 Content */}
      <div className="col-span-12 md:col-span-9 space-y-6">
        {/* Header Profil */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {session.user.nama_asn.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-gray-500">Selamat Datang</p>
              <h2 className="font-semibold text-gray-800 leading-tight text-lg">
                {session.user.nama_asn}
              </h2>
              <p className=" text-gray-800 leading-tight">
                {session.user.username}
              </p>
              <p className="font-semibold text-gray-800 leading-tight">
                {session.accessToken}
              </p>
            </div>
          </div>
        </div>
        <hr className="text-orange-600" />

        {/* 🔹 Page Content */}
        {children}
      </div>
    </div>
  );
};
export default UserDashboardLayout;
