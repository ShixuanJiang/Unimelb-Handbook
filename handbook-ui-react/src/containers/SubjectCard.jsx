import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from 'react-redux';
import { setPosition } from '../redux/SubjectSlice';
import { useNavigate } from 'react-router-dom';

const studyPeriodsOrder = ["Summer Term", "Semester 1", "Winter Term", "Semester 2"];

// Function to extract level from the "code" field
const getLevelFromCode = (code) => {
  return parseInt(code.match(/\d/)[0], 10);
};

// Function to parse study periods from the info string
const extractPeriodsFromInfo = (info) => {
  const periods = new Set();
  studyPeriodsOrder.forEach(period => {
    if (info && info.includes(period)) {
      periods.add(period);
    }
  });
  return periods;
};

const SubjectCard = ({ type, subject, position,}) => {
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

    return (
      <div className="flex flex-col h-[171px] w-full justify-between rounded-lg overflow-hidden border border-gray-300 bg-gray-100 shadow-md">
        {/* Header with Type */}
        <div className="w-full bg-[#FFDCA2] p-1 flex items-center">
          <span className="px-1 text-base font-bold text-black">{type || "N/A"}</span>
        </div>

        {/* Body */}
        <div className="flex-grow px-2 py-2">
          {/* Row for Code | Level | Points */}
          <div className="text-xs font-semibold text-gray-800">
            <span className="font-bold">{code}</span> | Level {level} | {credits} Points
          </div>

          {/* Subject Name */}
          <div className="mt-1 text-lg font-bold text-gray-900 leading-tight line-clamp-2">
            {title}
          </div>
        </div>

        {/* Study Periods */}
        <div className="px-2 pb-2 flex items-end">
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
    <div className="flex h-[171px] w-full items-center justify-center rounded-lg bg-gray-200 cursor-pointer" >
      <PlusCircleIcon className="h-10 w-10 transform text-gray-500 transition duration-300 hover:scale-110 hover:text-gray-700" onClick={handleAddSubject}/>
    </div>
  );
};

export default SubjectCard;
