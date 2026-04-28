"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const DynamicForm = ({ fields, slug, id, onClose }: any) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const isLoggedIn = !!session?.accessToken;

  const generateValidationSchema = (fields: any[]) => {
    const shape: any = {};

    fields.forEach((field) => {
      if (field.type === "file") {
        shape[field.id] = field.is_required
          ? Yup.mixed().required(`${field.label} wajib diisi`)
          : Yup.mixed();
      } else {
        shape[field.id] = field.is_required
          ? Yup.string().required(`${field.label} wajib diisi`)
          : Yup.string();
      }
    });

    return Yup.object().shape(shape);
  };

  const initialValues = fields.reduce((acc: any, field: any) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: generateValidationSchema(fields),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const form = new FormData();
        fields.forEach((field: any, index: number) => {
          form.append(`requirements[${index}][id]`, field.id);
          const value = values[field.id];

          if (value instanceof File) {
            form.append(`requirements[${index}][value]`, value);
          } else {
            form.append(`requirements[${index}][value]`, value || "");
          }
        });

        const res = await fetch(`/api/proxy/course/${id}/enroll`, {
          method: "POST",
          body: form,
          headers: session?.accessToken
            ? {
                Authorization: `Bearer ${session.accessToken}`,
              }
            : {},
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || data?.message || "Gagal mendaftar");
        }

        toast.success("Berhasil daftar 🎉");
        onClose();
      } catch (err: any) {
        toast.error(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="flex gap-3 p-4 mt-5 rounded-xl bg-orange-50 border border-orange-100">
        <span className="text-xl">ℹ️</span>

        <p className="text-sm text-gray-700 leading-relaxed">
          Untuk mengikuti kelas ini, ada beberapa persyaratan yang harus Anda
          lengkapi terlebih dahulu. Pastikan semua data diisi dengan benar.
        </p>
      </div>
      {fields.map((item: any) => (
        <div key={item.id} className="space-y-1">
          <label className="text-sm font-medium">
            {item.label}
            {item.is_required && "*"}
          </label>

          {item.type === "text" && (
            <input
              type="text"
              name={item.id}
              value={formik.values[item.id] || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-4 py-2 ${
                formik.touched[item.id] && formik.errors[item.id]
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />
          )}

          {item.type === "textarea" && (
            <textarea
              name={item.id}
              value={formik.values[item.id] || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-4 py-2 ${
                formik.touched[item.id] && formik.errors[item.id]
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />
          )}

          {item.type === "file" && (
            <div className="space-y-2">
              <label
                htmlFor={item.id}
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition 
      ${
        formik.touched[item.id] && formik.errors[item.id]
          ? "border-red-400 bg-red-50"
          : "border-gray-300 hover:border-[#DF6853] hover:bg-gray-50"
      }`}
              >
                <div className="flex flex-col items-center justify-center text-center px-4">
                  {/* Icon */}
                  <span className="text-2xl mb-1">📁</span>

                  {/* Text */}
                  <p className="text-sm font-medium text-gray-700">
                    Klik untuk upload file
                  </p>
                  <p className="text-xs text-gray-400">
                    atau drag & drop (PDF, JPG, PNG)
                  </p>
                </div>

                {/* Hidden input */}
                <input
                  id={item.id}
                  name={item.id}
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    formik.setFieldValue(item.id, e.currentTarget.files?.[0])
                  }
                />
              </label>

              {/* Preview file */}
              {formik.values[item.id] && (
                <div className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2 text-sm">
                  <span className="text-gray-700 truncate">
                    {formik.values[item.id]?.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => formik.setFieldValue(item.id, null)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          )}

          {formik.touched[item.id] && formik.errors[item.id] && (
            <p className="text-red-500 text-xs mt-1">
              {String(formik.errors[item.id])}
            </p>
          )}
        </div>
      ))}

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={() => {
            if (!isLoggedIn) {
              signIn();
            } else {
              formik.handleSubmit();
            }
          }}
          disabled={loading || !formik.isValid}
          className="bg-[#DF6853] text-white px-6 py-2.5 rounded-xl 
  hover:scale-105 transition disabled:opacity-50"
        >
          {!isLoggedIn
            ? "Login untuk mendaftar"
            : loading
            ? "Mengirim..."
            : "Kirim Pendaftaran"}
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
