import React from "react";
import SubjectCard from "../containers/subjectCard/SubjectCard";

const SubjectSection = () => {
  return (
    <div className="flex justify-center py-4">
      <div className="flex w-full flex-col space-y-6">
        {/* Year 2024 */}
        <div>
          <h2 className="text-3xl font-bold">2024</h2>
          {/* Semester 1 */}
          <div className="mb-3">
            <h3 className=" text-lg font-bold text-gray-600">
              Semester 1
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
            </div>
          </div>
          {/* Semester 2 */}
          <div>
            <h3 className="text-lg font-bold text-gray-600">
              Semester 2
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
            </div>
          </div>
        </div>
        {/* Year 2025 */}
        <div>
          <h2 className="text-3xl font-bold">2025</h2>
          {/* Semester 1 */}
          <div className="mb-3">
            <h3 className=" text-lg font-bold text-gray-600">
              Semester 1
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
            </div>
          </div>
          {/* Semester 2 */}
          <div>
            <h3 className="text-lg font-bold text-gray-600">
              Semester 2
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
            </div>
          </div>
        </div>
        {/* Year 2026 */}
        <div>
          <h2 className="text-3xl font-bold">2026</h2>
          {/* Semester 1 */}
          <div className="mb-3">
            <h3 className=" text-lg font-bold text-gray-600">
              Semester 1
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
            </div>
          </div>
          {/* Semester 2 */}
          <div>
            <h3 className="text-lg font-bold text-gray-600">
              Semester 2
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectSection;
