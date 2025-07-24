import { ErrorPage } from "../components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page | Not Found ",
};

export default function NotFoundPage() {
  return <ErrorPage code={404} />;
}
