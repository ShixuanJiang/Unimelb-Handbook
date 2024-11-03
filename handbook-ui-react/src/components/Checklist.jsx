import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Checklist = ({ toggleExpand }) => {
  // Set the initial state to false to show the expanded checklist on load
  const [showChecklist, setShowChecklist] = useState(false);

  const toggleChecklist = () => {
    const newShowChecklist = !showChecklist;
    setShowChecklist(newShowChecklist);
    toggleExpand(!newShowChecklist); // Pass the new state back to MainPage
  };

  return (
    <div className={`transition-width duration-300 ease-in-out ${showChecklist ? 'w-12' : 'w-96'} bg-gray-100 shadow-md h-full`}>
      {/* Collapsed State Button */}
      <div className="flex items-center justify-between p-2">
        {showChecklist ? (
          <button
            onClick={toggleChecklist}
            className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-full shadow-lg text-sm font-bold transition-transform transform hover:scale-110"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
        ) : (
          <>
            <h2 className="text-xl font-bold">PLAN CHECKLIST</h2>
            <button
              onClick={toggleChecklist}
              className="p-2 rounded-full hover:bg-gray-200"
              aria-label="Toggle Collapse"
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-600" />
            </button>
          </>
        )}
      </div>

      {/* Content */}
      {!showChecklist && (
        <>
          <hr className="border-t-2 border-black mx-4 mb-4" />
          <div className="overflow-y-auto px-4">
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
                      <span className="text-sm">Level 1 Compulsory Subject [00/12.5]</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">Science Discipline Subjects [00/225]</span>
                    </label>
                    <ul className="ml-6 space-y-1">
                      <li>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-sm">
                            Level 1 Discipline subjects (Min 00/62.5)
                          </span>
                        </label>
                      </li>
                      <li>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-sm">
                            Level 2 Discipline subjects (Min 00/62.5)
                          </span>
                        </label>
                      </li>
                      <li>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-sm">
                            Level 3 Discipline subjects (Min 00/75)
                          </span>
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
                      <span className="text-sm">
                        University Level Mathematics (Min 00/25)
                      </span>
                    </label>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Checklist;
