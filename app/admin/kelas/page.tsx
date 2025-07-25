"use client";
import React from "react";
import { useSession } from "next-auth/react";
import GlobalLoading from "@/app/loading";

const kelas = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <GlobalLoading />;
  if (!session) return <p>Harap login terlebih dahulu.</p>;
  return (
    <>
      <div>
        <h1>Selamat datang, {session?.user?.username}</h1>
        <pre>{JSON.stringify(session.user, null, 2)}</pre>
      </div>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <h5 className="card-title mb-3">Kelas Page</h5>
        <p className="card-subtitle">This is a Kelas page</p>
      </div>
    </>
  );
};

export default kelas;
