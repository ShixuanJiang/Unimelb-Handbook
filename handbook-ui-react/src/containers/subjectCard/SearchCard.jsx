import React from "react";

const studyPeriodsOrder = [
  "Summer Term",
  "Semester 1",
  "Winter Term",
  "Semester 2",
];

const SearchCard = ({ name, code, points, studyPeriods, level }) => {
  const periods = new Set(studyPeriods);

  return (
    <div className="flex min-h-[200px] w-full transform flex-col justify-between overflow-hidden rounded-lg border border-gray-300 bg-gray-100 shadow-md transition-transform hover:scale-105 hover:shadow-lg">
      {/* Header */}
      <div
        className="p-2 text-left text-lg font-bold text-white"
        style={{ backgroundColor: "#094183" }}
      >
        {name}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between p-2 px-4">
        {/* Subject Code and Points */}
        <div className="text-left">
          <p className="text-lg font-bold">{code}</p>
          <p className="mb-5 text-sm text-gray-600">{points} Points</p>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto flex items-end justify-between">
          {/* Fixed-position Study Periods in the bottom left */}
          <div className="mb-1 grid grid-cols-2 gap-1">
            {studyPeriodsOrder.map((period) => (
              <span
                key={period}
                className={`rounded-full px-2 py-1 text-center text-sm text-white ${
                  periods.has(period) ? "visible" : "invisible"
                }`}
                style={{ backgroundColor: "#094183" }}
              >
                {period}
              </span>
            ))}
          </div>

          {/* Level in the bottom right */}
          <div className="text-left text-lg font-bold text-gray-800">
            Level {level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
