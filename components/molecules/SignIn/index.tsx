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
      }, 1500);
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
          <input
            name="username"
            onChange={handleForm}
            value={formik.values.username}
            pattern="\d*"
            inputMode="numeric"
            placeholder="NIP Pegawai"
            onBlur={formik.handleBlur}
            className={`w-full rounded-md border px-5 py-3 text-base text-black bg-transparent transition placeholder:text-black/30 focus:outline-none focus:ring-1 
      ${
        formik.touched.username && formik.errors.username
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-200 focus:ring-primary"
      }
    `}
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-left text-sm text-red-500 mt-1">
              {formik.errors.username}
            </p>
          )}
        </div>
        <div className="mb-[22px] relative">
          <input
            name="password"
            onChange={handleForm}
            onBlur={formik.handleBlur}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`w-full rounded-md border px-5 py-3 pr-12 text-base text-black bg-[#eaf1ff] transition placeholder:text-black/30 focus:outline-none focus:ring-1 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:ring-primary"
            }`}
          />

          {/* Eye Icon */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <Icon
              icon={showPassword ? "ion:eye-off" : "ion:eye"}
              width="20"
              height="20"
            />
          </button>

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
