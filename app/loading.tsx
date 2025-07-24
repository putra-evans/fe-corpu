"use client";

import React from "react";
import Lottie from "lottie-react";
import loading from "@assets/loading.json"; // pastikan ini sesuai path-mu

export default function GlobalLoading() {
  return (
    // <div className="flex h-screen flex-col items-center justify-center bg-white">
    //   <Lottie
    //     animationData={loading}
    //     loop
    //     autoplay
    //     style={{ height: 200, width: 200 }}
    //   />
    //   <p className="text-lg text-gray-600">Memuat halaman, mohon tunggu...</p>
    // </div>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-32 h-32">
          <Lottie animationData={loading} loop autoplay />
        </div>
        <p className="text-gray-600 text-sm font-medium">
          Memuat halaman, mohon tunggu...
        </p>
      </div>
    </div>
  );
}
