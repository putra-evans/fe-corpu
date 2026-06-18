"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

interface ImageViewerProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function ImageViewer({
  src,
  alt = "image",
  className,
}: ImageViewerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <div
        className={`cursor-pointer relative ${className}`}
        onClick={() => setOpen(true)}
      >
        <Image src={src} alt={alt} fill className="object-cover rounded-2xl" />
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          {/* Tombol Close */}
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-white text-black"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
