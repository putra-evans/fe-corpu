"use client";

import {
    Contact,
    Cook,
    Expert,
    Features, FrontLayout,
    Gallery,
    Hero,
    Newsletter,
} from "../components";
import { Metadata } from "next";

const Home = () => {
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