"use client";

import { useState } from "react";
const DynamicForm = ({ fields, slug, onClose }: any) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (id: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      await fetch(`/api/proxy/course/${slug}/daftar`, {
        method: "POST",
        body: form,
      });

      alert("Berhasil daftar 🎉");
      onClose();
    } catch (err) {
      alert("Gagal daftar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {fields.map((item: any) => (
        <div key={item.id}>
          <label className="text-sm font-medium">
            {item.label}
            {item.is_required && "*"}
          </label>

          {item.type === "text" && (
            <input
              className="w-full border px-3 py-2 rounded-lg"
              onChange={(e) => handleChange(item.id, e.target.value)}
            />
          )}

          {item.type === "textarea" && (
            <textarea
              className="w-full border px-3 py-2 rounded-lg"
              onChange={(e) => handleChange(item.id, e.target.value)}
            />
          )}

          {item.type === "file" && (
            <input
              type="file"
              onChange={(e) => handleChange(item.id, e.target.files?.[0])}
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-primary text-white w-full py-3 rounded-lg"
      >
        {loading ? "Mengirim..." : "Kirim"}
      </button>
    </div>
  );
};

export default DynamicForm;
