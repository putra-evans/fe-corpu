"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NoRequirement = ({ slug, id, onClose }: any) => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/proxy/course/${id}/enroll`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        console.log(data);

        throw new Error(data.message || "Gagal daftar");
      }

      toast.success(
        "Berhasil daftar, anda dapat melihatnya di halaman kelas saya",
      );
      router.push("/kelas-saya");
      onClose();
    } catch (err: any) {
      toast.error(err.message);
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
      {status === "unauthenticated" ? (
        <div className="mt-6 border border-red-200 bg-red-50 px-3 py-1 rounded-2xl">
          <p className="text-md text-red-500  font-semibold text-center">
            Silahkan Login Terlebih Dahulu
          </p>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#DF6853] text-white px-6 py-2.5 rounded-xl font-medium 
          hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Daftar Sekarang"}
        </button>
      )}
    </div>
  );
};

export default NoRequirement;
