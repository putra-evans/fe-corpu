// "use client";

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

// const Home = () => {
export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
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
}

// export default Home;
