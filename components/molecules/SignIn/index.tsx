"use client";
import Link from "next/link";
import Logo from "../Header/Logo";

const Signin = () => {
  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block">
        <Logo />
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="NIP Pegawai"
            className="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-primary focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-primary focus-visible:shadow-none text-black"
          />
        </div>
        <div className="mb-9">
          <button
            type="submit"
            className="bg-primary w-full py-3 rounded-lg text-18 font-medium border text-white border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out"
          >
            Sign In
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
