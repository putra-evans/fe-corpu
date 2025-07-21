// import HeroSub from '@/app/components/SharedComponent/HeroSub'
// import NotFound from '@/app/components/NotFound'
import { NotFound } from "../components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page | Venus ",
};

const ErrorPage = () => {
  return (
    <>
      <NotFound />
    </>
  );
};

export default ErrorPage;
