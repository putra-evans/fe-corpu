"use client";
import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();
  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };
  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={`text-lg flex font-medium duration-300  ${
          path === item.href
            ? "text-primary "
            : " text-black/50  hover:text-primary"
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>
      {submenuOpen && (
        <div
          className="
      absolute left-0 top-full z-50 pt-3
      w-72
      rounded-2xl
      border border-slate-100
      bg-white
      p-2
      shadow-[0_15px_40px_rgba(0,0,0,0.12)]
      ring-1 ring-black/5
    "
        >
          <div className="px-4 pb-2 pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Platform Pembelajaran
            </p>
          </div>

          <div className="space-y-1">
            {item.submenu?.map((subItem, index) => (
              <Link
                key={index}
                href={subItem.href}
                target={subItem.targetBlank ? "_blank" : undefined}
                rel={subItem.targetBlank ? "noopener noreferrer" : undefined}
                className="
            group flex items-center justify-between
            rounded-xl px-4 py-3
            text-[15px] font-medium
            text-slate-700
            transition-all duration-200
            hover:bg-primary/10
            hover:text-primary
          "
              >
                <span>{subItem.label}</span>

                {subItem.targetBlank && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                  >
                    <path
                      d="M14 5H19V10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 14L19 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 14V19H5V5H10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
