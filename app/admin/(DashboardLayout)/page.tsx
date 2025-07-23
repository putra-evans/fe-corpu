"use client";
import React from "react";
import BlogCards from "../components/dashboard/BlogCards";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Harap login terlebih dahulu.</p>;
  return (
    <>
      <div>
        <h1>Selamat datang, {session.user.username}</h1>
        <pre>{JSON.stringify(session.user, null, 2)}</pre>
      </div>
      <div className="grid grid-cols-12 gap-30">
        <div className="col-span-12">
          <BlogCards />
        </div>
        <div className="col-span-12 text-center">
          <p className="text-base">Design and Developed by Diskominfotik</p>
        </div>
      </div>
    </>
  );
};

export default page;
