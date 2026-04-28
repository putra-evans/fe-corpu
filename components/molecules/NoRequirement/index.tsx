"use client";

import { useState } from "react";

const NoRequirement = ({ slug, id, onClose }: any) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/proxy/course/${slug}/daftar`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Gagal daftar");

      alert("Berhasil daftar 🎉");
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center py-8 space-y-4">
      {/* Icon */}
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-50">
        <span className="text-3xl">🎉</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">
        Siap untuk Bergabung!
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 max-w-md">
        Kelas ini tidak memiliki persyaratan khusus. Anda dapat langsung
        melanjutkan proses pendaftaran.
      </p>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#DF6853] text-white px-6 py-2.5 rounded-xl font-medium 
          hover:scale-105 transition disabled:opacity-50"
      >
        {loading ? "Memproses..." : "Daftar Sekarang"}
      </button>
    </div>
  );
};

export default NoRequirement;
