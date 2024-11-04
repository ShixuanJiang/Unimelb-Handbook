import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from 'react-redux';
import { setPosition } from '../redux/SubjectSlice';
import { useNavigate } from 'react-router-dom';

const studyPeriodsOrder = ["Summer Term", "Semester 1", "Winter Term", "Semester 2"];

const getLevelFromCode = (code) => parseInt(code.match(/\d/)[0], 10);

const extractPeriodsFromInfo = (info) => {
  const periods = new Set();
  studyPeriodsOrder.forEach(period => {
    if (info && info.includes(period)) {
      periods.add(period);
    }
  });
  return periods;
};

const SubjectCard = ({ type, subject, position, showPrerequisites, prerequisites }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddSubject = () => {
    dispatch(setPosition(position));
    navigate('/searchsubject');
  };

  if (subject) {
    const { title, code, credits, info } = subject;
    const level = code ? getLevelFromCode(code) : "N/A";
    const periods = extractPeriodsFromInfo(info);

    // Split prerequisites into two columns with max 2 items in each column
    const firstColumn = prerequisites.slice(0, 2);
    const secondColumn = prerequisites.slice(2);

    return (
      <div className="flex flex-col h-[200px] w-full justify-between rounded-lg overflow-hidden border border-gray-300 bg-gray-100 shadow-md p-2 relative">
        {/* Header with Type */}
        <div className="absolute top-0 left-0 right-0 bg-[#FFDCA2] p-2">
          <span className="text-base font-bold text-black">{type || "N/A"}</span>
        </div>

        {/* Body */}
        <div className="mt-8 flex-grow px-2 py-2">
          {/* Row for Code | Level | Points */}
          <div className="text-xs font-semibold text-gray-800">
            <span className="font-bold">{code}</span> | Level {level} | {credits} Points
          </div>

          {/* Subject Name */}
          <div className="mt-1 text-lg font-bold text-gray-900 leading-tight line-clamp-2">
            {title}
          </div>
        </div>

        {/* Prerequisites Button in Two-Column Layout */}
        {showPrerequisites && prerequisites.length > 0 && (
          <button className="absolute bottom-4 left-4 bg-white border border-gray-300 rounded-md p-2 shadow-md text-left w-48 hover:bg-gray-200">
            <p className="text-sm font-bold">Prerequisites:</p>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="list-disc pl-4 text-xs space-y-1">
                {firstColumn.map((prereq, idx) => (
                  <li key={idx} className="text-gray-800">{prereq}</li>
                ))}
              </ul>
              <ul className="list-disc pl-4 text-xs space-y-1">
                {secondColumn.map((prereq, idx) => (
                  <li key={idx} className="text-gray-800">{prereq}</li>
                ))}
              </ul>
            </div>
          </button>
        )}

        {/* Study Periods in a 2x2 grid */}
        <div className={`absolute bottom-4 ${showPrerequisites && prerequisites.length > 0 ? 'right-4' : 'left-4'}`}>
          <div className="grid grid-cols-2 gap-1">
            {studyPeriodsOrder.map((period) => (
              <span
                key={period}
                className={`rounded-full px-2 py-1 text-center text-xs text-black ${periods.has(period) ? "visible" : "invisible"}`}
                style={{ backgroundColor: "#FFB3A0" }}
              >
                {period}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Placeholder card if no subject is selected
  return (
    <div className="flex h-[200px] w-full items-center justify-center rounded-lg bg-gray-200 cursor-pointer" onClick={handleAddSubject}>
      <PlusCircleIcon className="h-10 w-10 transform text-gray-500 transition duration-300 hover:scale-110 hover:text-gray-700" />
    </div>
  );
};

export default SubjectCard;
