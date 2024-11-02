import React from "react";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setPosition } from '../redux/SubjectSlice';
import { useNavigate } from 'react-router-dom';

const SubjectCard = ({ subject, position }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleAddSubject = () => {
    console.log("Add Subject clicked, position:", position); // Log click
    dispatch(setPosition(position)); // Dispatch position to Redux store
    navigate('/searchsubject');
};

if (subject) {
  const { title, code, level, credits, studyPeriods = [] } = subject;

  return (
    <div className="flex flex-col p-4 border rounded-lg bg-gray-100 shadow-md">
      {/* Header */}
      <div className="text-lg font-bold text-white p-2" style={{ backgroundColor: "#094183" }}>
        {title}
      </div>

      {/* Code | Level | Points */}
      <div className="px-4 mt-2">
        <p className="font-bold">
          {code} | Level {level} | {credits} Points
        </p>
      </div>

      {/* Study Periods */}
      <div className="flex mt-auto px-4 py-2">
        {Array.isArray(studyPeriods) && studyPeriods.map((period, index) => (
          <span key={index} className="rounded-full bg-[#FFB3A0] text-black px-2 py-1 mr-2">
            {period}
          </span>
        ))}
      </div>
    </div>
  );
}
  return (
    <div className="flex h-[171px] w-full items-center justify-center rounded-lg bg-gray-200 cursor-pointer" onClick={handleAddSubject}>
        <PlusCircleIcon className="h-10 w-10 transform text-gray-500 transition duration-300 hover:scale-110 hover:text-gray-700" />
    </div>
  )
}

export default SubjectCard
