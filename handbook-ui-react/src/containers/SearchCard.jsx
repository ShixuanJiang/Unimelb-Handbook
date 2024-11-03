import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const studyPeriodsOrder = [
  "Summer Term",
  "Semester 1",
  "Winter Term",
  "Semester 2",
];

const SearchCard = ({
  name = "Unknown Subject",
  code = "Unknown Code",
  points = 0,
  studyPeriods = [], // Default to an empty array to avoid `undefined.map` error
  level = "N/A",
  url = "#",
  onClick,
}) => {
  const periods = new Set(studyPeriods);

  return (
    <div
      onClick={onClick}
      className="flex min-h-[200px] w-full transform cursor-pointer flex-col justify-between overflow-hidden rounded-lg border border-gray-300 bg-gray-100 shadow-md transition-transform hover:scale-105 hover:shadow-lg"
    >
      {/* Header */}
      <div
        className="p-2 text-left text-lg font-bold text-white"
        style={{ backgroundColor: "#094183" }}
      >
        {name}
      </div>

      {/* Row for Information Icon, Subject Code, and Points */}
      <div className="mt-2 flex items-center justify-between px-4">
        <div className="flex flex-col">
          <p className="text-lg font-bold">{code}</p>
          <span className="text-sm text-gray-600">{points} Points</span>{" "}
        </div>
        <div
          className="relative flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-gray-200"
          onClick={(event) => {
            event.stopPropagation();
            window.open(url, "_blank");
          }} // Triggers URL opening
        >
          <InformationCircleIcon className="h-6 w-6 cursor-pointer text-gray-500 hover:text-black" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between p-2 px-4">
        <div className="mt-auto flex items-end justify-between">
          {/* Study Periods */}
          <div className="mb-1 grid grid-cols-2 gap-1">
            {studyPeriodsOrder.map((period) => (
              <span
                key={period}
                className={`rounded-full px-2 py-1 text-center text-sm text-white ${periods.has(period) ? "visible" : "invisible"}`}
                style={{ backgroundColor: "#094183" }}
              >
                {period}
              </span>
            ))}
          </div>
          {/* Level Display */}
          <div className="mr-1 text-left text-lg font-bold text-gray-800">
            Level {level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
