import React from "react";
import NewCustomers from "../components/dashboard/NewCustomers";
import ProductRevenue from "../components/dashboard/ProductRevenue";
import DailyActivity from "../components/dashboard/DailyActivity";
import BlogCards from "../components/dashboard/BlogCards";

const page = () => {
  return (
    <>
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
