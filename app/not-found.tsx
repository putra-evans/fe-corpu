import { NotFound } from "../components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page | DISKOMINFOTIK ",
};

const ErrorPage = () => {
  return (
    <>
      <NotFound />
    </>
  );
};

export default ErrorPage;
