"use client";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "../Header/Logo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import GlobalLoading from "@/app/loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const loginUser = async () => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      username: formik.values.username,
      password: formik.values.password,
      redirect: false,
    });

    setIsLoading(false);
    if (!result?.ok) {
      toast.error(result?.error || "Periksa kembali username atau password");
    } else {
      toast.success("Login Berhasil");
      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: loginUser,
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required("Username wajib diisi...")
        .matches(/^[0-9]+$/, "Username hanya boleh berupa angka")
        .length(18, "Username harus terdiri dari 16 digit"),
      password: Yup.string().required("Password wajib diisi..."),
    }),
  });

  const handleForm = (event: any) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  if (isLoading) {
    return <GlobalLoading />;
  }

  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block">
        <Logo />
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-[22px]">
          <div
            className={`flex items-center rounded-md border px-5 pr-3 bg-[#eaf1ff] transition focus-within:ring-1 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500 focus-within:ring-red-500"
                : "border-gray-200 focus-within:ring-primary"
            }`}
            style={{ height: "48px" }}
          >
            <input
              name="username"
              onChange={handleForm}
              value={formik.values.username}
              pattern="\d*"
              inputMode="numeric"
              placeholder="NIP Pegawai"
              onBlur={formik.handleBlur}
              className="flex-1 px-1 text-base bg-transparent text-black placeholder:text-black/30 border-none focus:ring-0 focus:outline-none"
            />
          </div>

          {formik.touched.username && formik.errors.username && (
            <p className="text-left text-sm text-red-500 mt-1">
              {formik.errors.username}
            </p>
          )}
        </div>
        <div className="mb-[22px] relative">
          <div
            className={`flex items-center rounded-md border px-5 pr-3 bg-[#eaf1ff] transition focus-within:ring-1 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500 focus-within:ring-red-500"
                : "border-gray-200 focus-within:ring-primary"
            }`}
            style={{ height: "48px" }}
          >
            <input
              name="password"
              onChange={handleForm}
              onBlur={formik.handleBlur}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="flex-1 px-1 text-base bg-transparent text-black placeholder:text-black/30 border-none focus:ring-0 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <Icon
                icon={showPassword ? "ion:eye-off" : "ion:eye"}
                width="20"
                height="20"
              />
            </button>
          </div>

          {/* Error Message */}
          {formik.touched.password && formik.errors.password && (
            <p className="text-left text-sm text-red-500 mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="mb-9">
          <button
            type="submit"
            className="bg-primary w-full py-3 rounded-lg text-18 font-medium border text-white border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out"
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
        <div className="mb-10">
          <h5 className="text-red-400 font-semibold text-left">Catatan :</h5>
          <ul className="space-y-0">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>
                {" "}
                <span className="font-semibold">NIP Pegawai</span> dan{" "}
                <span className="font-semibold">Password</span>
                <span> wajib diisi</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>
                Akun sama dengan{" "}
                <span className="font-semibold">ESPJ Online</span>{" "}
              </span>
            </li>
          </ul>
        </div>
      </form>
    </>
  );
};

export default Signin;
