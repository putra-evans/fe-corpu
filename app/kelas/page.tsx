const Kelas = () => {
  return (
    <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) p-6 lg:pt-44 pt-16">
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-3 col-span-12 lg:block hidden">
          <h1>Kelas</h1>
        </div>
        {/* <div className="lg:col-span-9 col-span-12">
          <Introduction />
          <PackageStructure />
          <QuickStart />
          <Configuration />
        </div> */}
      </div>
    </div>
  );
};
export default Kelas;
