const Skeleton = ({ tipe }: any) => {
  if (tipe == "expertchief") {
    return (
      <div>
        <div
          role="status"
          className="max-w-md animate-pulse overflow-hidden m-3 my-10 p-10 text-center backdrop-blur-md bg-white/50 rounded-3xl"
        >
          <svg
            className="w-30 h-30 mx-auto text-gray-200 my-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
          <div className="mt-20">
            <div className="h-2 w-48 mx-auto bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 w-36 mx-auto bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (tipe == "gallery") {
    return (
      <>
        <div className="w-full">
          <div
            role="status"
            className="animate-pulse overflow-hidden my-5 p-8 relative rounded-3xl bg-linear-to-b from-primary/10 to-white shadow-md w-full"
          >
            <svg
              className="w-30 h-30 mx-auto text-gray-200 my-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </>
    );
  }
  if (tipe == "features") {
    return (
      <>
        <div>
          <div
            role="status"
            className="max-w-md animate-pulse overflow-hidden p-8 relative rounded-3xl bg-linear-to-b from-primary/10 to-white shadow-md"
          >
            <svg
              className="w-30 h-30 mx-auto text-gray-200 my-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (tipe == "courses") {
    return (
      <>
        <div
          role="status"
          className="max-w-md animate-pulse overflow-hidden bg-linear-to-b from-primary/10 to-white bg-white m-3 mb-12 px-3 pt-3 pb-12 shadow-lg rounded-2xl h-full"
        >
          <svg
            className="w-30 h-30 mx-auto text-gray-200 my-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
          <div className="mt-20">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </>
    );
  }
  if (tipe == "kategori_kelas") {
    return (
      <>
        <div className="animate-pulse flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded w-24" />
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  }
};

export default Skeleton;
