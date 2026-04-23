"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import HeaderLink from "./Navigation/HeaderLink";
import MobileHeaderLink from "./Navigation/MobileHeaderLink";
import Signin from "../SignIn";
import { Icon } from "@iconify/react/dist/iconify.js";
import { HeaderItem } from "../../../types/menu";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import GlobalLoading from "@/app/loading";
import homeIcon from "@iconify/icons-ion/home";

const Header: React.FC = () => {
  const [headerLink, setHeaderLink] = useState<HeaderItem[]>([]);

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();

  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setHeaderLink(data.HeaderData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    console.log(session?.accessToken);

    fetchData();
  }, []);

  const handleScroll = () => {
    setSticky(window.scrollY >= 20);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen]);

  useEffect(() => {
    if (isSignInOpen || navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSignInOpen, navbarOpen]);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        redirect: "manual",
      });

      toast.success("Logout berhasil");

      // 🔥 kasih jeda dikit biar user “ngeh”
      setTimeout(async () => {
        await signOut({ callbackUrl: "/" });
      }, 800); // 0.8 detik (sweet spot)
    } catch (error) {
      console.error(error);
      toast.error("Gagal logout");
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <GlobalLoading />;
  }
  return (
    <header
      className={`fixed top-0 z-40 py-4 w-full transition-all duration-300 ${
        sticky ? "shadow-lg bg-white" : "shadow-none"
      }`}
    >
      <div>
        <div className="container flex items-center justify-between">
          <div>
            <Logo />
          </div>
          <nav className="hidden lg:flex grow items-center gap-4 xl:gap-6  justify-center">
            {headerLink.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          <div className="flex items-center gap-2 lg:gap-3">
            {status === "loading" ? (
              <div className="w-20 h-6 bg-gray-200 animate-pulse rounded" />
            ) : !session ? (
              // {!session ? (
              <button
                className="hidden lg:block text-primary duration-300 bg-primary/15 hover:text-white hover:bg-primary font-medium text-lg py-2 px-6 rounded-full hover:cursor-pointer"
                onClick={() => {
                  setIsSignInOpen(true);
                }}
              >
                Sign In
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-lg flex font-medium duration-300 text-black/50 hover:text-primary"
                >
                  {session.user.nama_asn}
                </button>
                <div
                  className={`fixed top-0 right-0 h-full w-[340px] z-50 
                bg-white/80 backdrop-blur-xl border-l border-white/20 shadow-2xl
                transform transition-transform duration-300 ease-in-out rounded-s-3xl
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                  {/* Header */}
                  <div className="p-5 border-b border-gray-200/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {session.user.nama_asn.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Selamat Datang</p>
                        <p className="font-semibold text-gray-800 leading-tight">
                          {session.user.nama_asn}
                        </p>
                        <p className="font-semibold text-gray-800 leading-tight">
                          {session.user.username}
                        </p>
                        <p className="font-semibold text-gray-800 leading-tight">
                          {session.accessToken}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-black text-lg"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Menu */}
                  <div className="p-4 space-y-2">
                    <p className="text-xs text-gray-400 font-semibold mb-2 tracking-wide">
                      USER MENU
                    </p>

                    {/* Divider */}
                    <div className="border-t my-3"></div>
                    {/* Dashboard */}
                    <a
                      href="/dashboard"
                      className={`group flex items-center gap-3 px-4 py-3 rounded-xl 
                      transition-all duration-300 ease-out font-medium
                      ${
                        pathname === "/dashboard"
                          ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary shadow-md"
                          : "text-gray-600 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:text-primary hover:shadow-sm"
                      }`}
                    >
                      <Icon
                        icon="mdi:home"
                        width="20"
                        className="opacity-70 group-hover:opacity-100 transition"
                      />
                      <span className="relative">
                        Dashboard
                        <span
                          className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300
                      ${
                        pathname === "/dashboard"
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                        ></span>
                      </span>
                    </a>
                    {/* Data Diri */}
                    <a
                      href="/data-diri"
                      className={`group flex items-center gap-3 px-4 py-3 rounded-xl 
                      transition-all duration-300 ease-out font-medium
                      ${
                        pathname === "/data-diri"
                          ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary shadow-md"
                          : "text-gray-600 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:text-primary hover:shadow-sm"
                      }`}
                    >
                      <Icon
                        icon="mdi:account"
                        width="20"
                        className="opacity-70 group-hover:opacity-100 transition"
                      />
                      <span className="relative">
                        Data Diri
                        <span
                          className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300
                      ${
                        pathname === "/data-diri"
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                        ></span>
                      </span>
                    </a>
                    {/* kelas-saya */}
                    <a
                      href="/kelas-saya"
                      className={`group flex items-center gap-3 px-4 py-3 rounded-xl 
                      transition-all duration-300 ease-out font-medium
                      ${
                        pathname === "/kelas-saya"
                          ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary shadow-md"
                          : "text-gray-600 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:text-primary hover:shadow-sm"
                      }`}
                    >
                      <Icon
                        icon="mdi:school"
                        width="20"
                        className="opacity-70 group-hover:opacity-100 transition"
                      />
                      <span className="relative">
                        Kelas Saya
                        <span
                          className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300
                      ${
                        pathname === "/kelas-saya"
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                        ></span>
                      </span>
                    </a>
                    {/* sertifikat-saya */}
                    <a
                      href="/sertifikat-saya"
                      className={`group flex items-center gap-3 px-4 py-3 rounded-xl 
                      transition-all duration-300 ease-out font-medium
                      ${
                        pathname === "/sertifikat-saya"
                          ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary shadow-md"
                          : "text-gray-600 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:text-primary hover:shadow-sm"
                      }`}
                    >
                      <Icon
                        icon="mdi:award"
                        width="20"
                        className="opacity-70 group-hover:opacity-100 transition"
                      />
                      <span className="relative">
                        Sertifikat Saya
                        <span
                          className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300
                      ${
                        pathname === "/sertifikat-saya"
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                        ></span>
                      </span>
                    </a>
                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="group flex items-center gap-3 px-4 py-3 rounded-xl w-full
                        transition-all duration-300 ease-out font-medium
                        text-red-500 
                        hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-500/5 
                        hover:shadow-sm"
                    >
                      <Icon
                        icon="ri:logout-box-line"
                        width="20"
                        className="opacity-70 group-hover:opacity-100 transition"
                      />

                      <span className="relative">
                        Logout
                        <span className="absolute left-0 -bottom-1 h-[2px] bg-red-500 transition-all duration-300 w-0 group-hover:w-full"></span>
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {isOpen && (
              <div
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition"
              />
            )}

            {isSignInOpen && (
              <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
                <div
                  ref={signInRef}
                  className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg px-8 pt-14 pb-8 text-center bg-white"
                >
                  <button
                    onClick={() => setIsSignInOpen(false)}
                    className="absolute top-0 right-0 mr-4 mt-8 hover:cursor-pointer"
                    aria-label="Close Sign In Modal"
                  >
                    <Icon
                      icon="material-symbols:close-rounded"
                      width={24}
                      height={24}
                      className="text-black hover:text-primary text-24 inline-block me-2"
                    />
                  </button>
                  <Signin />
                </div>
              </div>
            )}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
            </button>
          </div>
        </div>
        {navbarOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40" />
        )}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 max-w-xs ${
            navbarOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
        >
          <div className="flex items-center justify-between gap-2 p-4">
            <div>
              <Logo />
            </div>
            {/*  */}
            <button
              onClick={() => setNavbarOpen(false)}
              className="hover:cursor-pointer"
              aria-label="Close menu Modal"
            >
              <Icon
                icon="material-symbols:close-rounded"
                width={24}
                height={24}
                className="text-black hover:text-primary text-24 inline-block me-2"
              />
            </button>
          </div>
          <nav className="flex flex-col items-start p-4">
            {headerLink.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            <div className="mt-4 flex flex-col space-y-4 w-full">
              {!session ? (
                <button
                  className="bg-primary text-white px-4 py-2 rounded-lg border  border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out"
                  onClick={() => {
                    setIsSignInOpen(true);
                    setNavbarOpen(false);
                  }}
                >
                  Sign In
                </button>
              ) : (
                <></>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
