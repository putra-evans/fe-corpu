"use client";

import React from "react";
import Lottie from "lottie-react";
import loading from "@assets/loading.json"; // pastikan ini sesuai path-mu

export default function GlobalLoading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <Lottie
        animationData={loading}
        loop
        autoplay
        style={{ height: 200, width: 200 }}
      />
      <p className="text-lg text-gray-600">Memuat halaman, mohon tunggu...</p>
    </div>
  );
}
