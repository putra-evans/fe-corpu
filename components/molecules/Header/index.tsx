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

const Header: React.FC = () => {
  const [headerLink, setHeaderLink] = useState<HeaderItem[]>([]);

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();

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
            {!session ? (
              <button
                className="hidden lg:block text-primary duration-300 bg-primary/15 hover:text-white hover:bg-primary font-medium text-lg py-2 px-6 rounded-full hover:cursor-pointer"
                onClick={() => {
                  setIsSignInOpen(true);
                }}
              >
                Sign In
              </button>
            ) : (
              // <h5>{session.user.nama_asn}</h5>
              <Link
                href="/admin"
                className="text-lg flex font-medium duration-300  text-black/50  hover:text-primary"
              >
                {session.user.nama_asn}
              </Link>
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
              <button
                className="bg-primary text-white px-4 py-2 rounded-lg border  border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out"
                onClick={() => {
                  setIsSignInOpen(true);
                  setNavbarOpen(false);
                }}
              >
                Sign In
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
