import React from "react";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import { Link } from 'react-router-dom';

const AddSubject = () => {
  return (
    <div className="flex h-[171px] w-full items-center justify-center rounded-lg bg-gray-200">
      <Link to="/searchsubject">
        <PlusCircleIcon className="h-10 w-10 text-gray-500 hover:text-gray-700" />
      </Link>
    </div>
  );
};

export default AddSubject;
