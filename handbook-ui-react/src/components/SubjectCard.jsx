import React from "react";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import { Link } from "react-router-dom";
import AddSubject from "../containers/subjectCard/AddSubject";

const SubjectCard = () => {
  return (
    <div className="flex justify-center py-4">
      <div className="flex w-full flex-col space-y-8">
        {/* Year 2024 */}
        <div>
          <h2 className="mb-2 text-2xl font-bold">2024</h2>
          {/* Semester 1 */}
          <div className="mb-4">
            <h3 className="mb-1 text-base font-bold text-gray-600">
              Semester 1
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AddSubject />
              <AddSubject />
              <AddSubject />
              <AddSubject />
            </div>
          </div>
          {/* Semester 2 */}
          <div className="mb-6">
            <h3 className="mb-1 text-base font-bold text-gray-600">
              Semester 2
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AddSubject />
              <AddSubject />
              <AddSubject />
              <AddSubject />
            </div>
          </div>
        </div>
        {/* Year 2025 */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">2025</h2>
          {/* Semester 1 */}
          <div className="mb-6">
            <h3 className="mb-2 text-base font-bold text-gray-600">
              Semester 1
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AddSubject />
              <AddSubject />
              <AddSubject />
              <AddSubject />
            </div>
          </div>
          {/* Semester 2 */}
          <div className="mb-6">
            <h3 className="mb-2 text-base font-bold text-gray-600">
              Semester 2
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AddSubject />
              <AddSubject />
              <AddSubject />
              <AddSubject />
            </div>
          </div>
        </div>
        {/* Year 2026 */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">2026</h2>
          {/* Semester 1 */}
          <div className="mb-6">
            <h3 className="mb-2 text-base font-bold text-gray-600">
              Semester 1
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AddSubject />
              <AddSubject />
              <AddSubject />
              <AddSubject />
            </div>
          </div>
          {/* Semester 2 */}
          <div className="mb-6">
            <h3 className="mb-2 text-base font-bold text-gray-600">
              Semester 2
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AddSubject />
              <AddSubject />
              <AddSubject />
              <AddSubject />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
