"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Field = {
  id: string;
  label: string;
  type: "text" | "textarea" | "file";
  is_required: boolean;
};

const dummyFields: Field[] = [
  {
    id: "1",
    label: "Upload SK Pimpinan",
    type: "file",
    is_required: true,
  },
  {
    id: "2",
    label: "Alasan Mengikuti Pelatihan",
    type: "textarea",
    is_required: true,
  },
  {
    id: "3",
    label: "Nomor Surat",
    type: "text",
    is_required: true,
  },
];

export default function Page() {
  const { slug } = useParams();
  const router = useRouter();

  const [fields, setFields] = useState<Field[]>(dummyFields); // nanti dari API
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // 🔥 handle input
  const handleChange = (id: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 🔥 submit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      const res = await fetch("/api/proxy/course/daftar", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Gagal daftar");

      alert("Berhasil daftar 🎉");
      router.push("/kelas-saya");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      {/* 🔹 Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Form Pendaftaran
        </h1>
        <p className="text-sm text-gray-500">
          Lengkapi data berikut untuk mendaftar pelatihan
        </p>
      </div>

      {/* 🔹 Form Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-5">
        {fields.map((item) => (
          <div key={item.id} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {item.label}
              {item.is_required && <span className="text-red-500"> *</span>}
            </label>

            {/* TEXT */}
            {item.type === "text" && (
              <input
                type="text"
                placeholder={`Masukkan ${item.label}`}
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/30"
                onChange={(e) => handleChange(item.id, e.target.value)}
              />
            )}

            {/* TEXTAREA */}
            {item.type === "textarea" && (
              <textarea
                rows={4}
                placeholder={`Masukkan ${item.label}`}
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/30"
                onChange={(e) => handleChange(item.id, e.target.value)}
              />
            )}

            {/* FILE */}
            {item.type === "file" && (
              <input
                type="file"
                className="w-full border rounded-xl px-3 py-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-primary file:text-white file:rounded-lg"
                onChange={(e) => handleChange(item.id, e.target.files?.[0])}
              />
            )}
          </div>
        ))}
      </div>

      {/* 🔹 Action */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Kirim Pendaftaran"}
        </button>
      </div>
    </div>
  );
}
