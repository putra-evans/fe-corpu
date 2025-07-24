import { Configuration } from "./Configuration";
import { DocNavigation } from "./DocNavigation";
import { Introduction } from "./Introduction";
import { PackageStructure } from "./PackageStructure";
import { QuickStart } from "./QuickStart";
import { FrontLayout } from "../../components";

const Documentation = () => {
  return (
    <FrontLayout>
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) p-6 lg:pt-44 pt-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-3 col-span-12 lg:block hidden">
            <DocNavigation />
          </div>
          <div className="lg:col-span-9 col-span-12">
            <Introduction />
            <PackageStructure />
            <QuickStart />
            <Configuration />
          </div>
        </div>
      </div>
    </FrontLayout>
  );
};
export default Documentation;
