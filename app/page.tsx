"use client";

import {
  Contact,
  Cook,
  Expert,
  Features,
  FrontLayout,
  Gallery,
  Hero,
  Newsletter,
} from "../components";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import GlobalLoading from "./loading";

const Home = () => {
  // export default async function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <GlobalLoading />;
      </>
    );
  }

  return (
    <FrontLayout>
      <Hero />
      <Features />
      <Cook />
      <Expert />
      <Gallery />
      <Contact />
      <Newsletter />
    </FrontLayout>
  );
};

export default Home;
