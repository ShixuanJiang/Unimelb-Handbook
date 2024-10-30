import React, { useState } from "react";

const Checklist = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="rounded-lg bg-gray-100 p-4 shadow-md w-80">
      {/* Header with Collapse Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">PLAN CHECKLIST</h2>
        <button onClick={toggleCollapse} className="text-lg font-bold">
          X
        </button>
      </div>
      <hr className="my-3 border-t-2 border-black" />

      {/* Checklist Content */}
      {!isCollapsed && (
        <ul className="space-y-2">
          <li>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-lg font-medium">Course Point Rules [0/300]</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-lg font-medium">Course Rules/Requirements</span>
            </label>
            <ul className="ml-6 space-y-2">
              <li>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm">Level 1 Compulsory Subject</span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm">Science Discipline Subjects</span>
                </label>
                <ul className="ml-6 space-y-1">
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">Level 1 Discipline subjects</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">Level 2 Discipline subjects</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">Level 3 Discipline subjects</span>
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
              <span className="text-lg font-medium">Subject Prerequisites</span>
            </label>
            <ul className="ml-6 space-y-2">
              <li>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm">University Level Mathematics</span>
                </label>
              </li>
            </ul>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Checklist;
