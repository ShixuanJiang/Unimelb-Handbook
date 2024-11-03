import React from "react";
import {
  EllipsisVerticalIcon,
  ShareIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

const Subheader = () => {
  return (
    <div style={{ backgroundColor: "#012A58" }}>
      <header className="relative flex flex-col  pb-6 pt-4 mx-[317px]">
        {/* First Line */}
        <div className="flex items-center space-x-4">
          <span className="shrink-0 text-lg font-semibold text-white">
            My Course Plan
          </span>
          <button>
            <EllipsisVerticalIcon className="h-6 w-6 text-white" />
          </button>

          <button className="shrink-0 rounded-md bg-blue-500 px-3 py-1 text-sm text-blue-50">
            Clear Plan
          </button>
        </div>

        {/* Second Line */}
        <div className="flex space-x-3 py-2 text-4xl pt-5 font-bold text-white">
          <span>Bachelor of Science</span>
          <button className="underline hover:text-blue-500">Computing and Software Systems</button>
        </div>

        {/* Buttons */}
        <div className="absolute bottom-2 right-1 flex space-x-2 p-3">
          <button>
            <ShareIcon className="h-5 w-5 text-white" />
          </button>

          <button>
            <PrinterIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Subheader;

