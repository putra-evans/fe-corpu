// app/courses/page.tsx
"use client";

import UnderDevelopment from "@/components/molecules/UnderDevelopment";
import { FrontLayout } from "../../components";
import Image from "next/image";

const Coaching = () => {
  return (
    <FrontLayout>
      <section id="courses" className="scroll-mt-12 pb-20 mt-12">
        <div className="container">
          <div className="text-center">
            <p className="text-primary text-3xl font-normal tracking-widest uppercase underline">
              Coaching
            </p>
          </div>
          <UnderDevelopment />
        </div>
      </section>
    </FrontLayout>
  );
};

export default Coaching;
