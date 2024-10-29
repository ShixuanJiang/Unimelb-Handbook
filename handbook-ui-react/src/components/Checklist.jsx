import React from "react";

const Checklist = () => {
  return (
    <div className="rounded-lg bg-gray-100 p-4 shadow-md">
      <h2 className="mb-4 text-xl font-bold">PLAN CHECKLIST</h2>
      <ul className="space-y-2">
        <li>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm font-medium">
              Course Point Rules [0/300]
            </span>
          </label>
        </li>
        <li>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm font-medium">
              Course Rules/Requirements
            </span>
          </label>
          <ul className="ml-6 space-y-2 text-sm">
            <li>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <span>Level 1 Compulsory Subject</span>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <span>Science Discipline Subjects</span>
              </label>
              <ul className="ml-6 space-y-1">
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span>Level 1 Discipline subjects</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span>Level 2 Discipline subjects</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span>Level 3 Discipline subjects</span>
                  </label>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <span>Subject Prerequisites</span>
          </label>
          <ul className="ml-6 space-y-2 text-sm">
            <li>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <span>University Level Mathematics</span>
              </label>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Checklist;
