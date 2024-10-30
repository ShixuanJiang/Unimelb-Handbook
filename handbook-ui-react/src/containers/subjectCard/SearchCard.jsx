import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const studyPeriodsOrder = [
  "Summer Term",
  "Semester 1",
  "Winter Term",
  "Semester 2",
];

const SearchCard = ({ name, code, points, studyPeriods, level, url, onClick }) => {
  const periods = new Set(studyPeriods);

  // Function to handle information icon click
  const handleInfoClick = (event) => {
    event.stopPropagation(); // Prevent triggering the card's main click event
    window.open(url, "_blank"); // Open the URL in a new tab
  };

  return (
    <div onClick={onClick} className="flex min-h-[200px] w-full transform flex-col justify-between overflow-hidden rounded-lg border border-gray-300 bg-gray-100 shadow-md transition-transform hover:scale-105 hover:shadow-lg cursor-pointer">
      {/* Header */}
      <div className="p-2 text-left text-lg font-bold text-white" style={{ backgroundColor: "#094183" }}>
        {name}
      </div>

      {/* Row for Information Icon and Subject Code */}
      <div className="flex items-center justify-between px-4 mt-2">
        <p className="text-lg font-bold">{code}</p>
        <InformationCircleIcon 
          onClick={handleInfoClick} // Use handleInfoClick to open the URL
          className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" 
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between p-2 px-4">
        <p className="mb-5 text-sm text-gray-600">{points} Points</p>
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
          <div className="text-left text-lg font-bold text-gray-800">
            Level {level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
