import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Checklist = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    coursePointRules: false,
    courseRules: false,
    level1Compulsory: false,
    scienceDiscipline: false,
    level1Discipline: false,
    level2Discipline: false,
    level3Discipline: false,
    subjectPrerequisites: false,
    universityMath: false,
  });

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleCheck = () => {
    const selectedItems = Object.entries(checkedItems)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    window.alert("succcess");
    // window.alert("error");
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className={`transition-width duration-300 ease-in-out ${isCollapsed ? 'w-12' : 'w-96'} bg-gray-100 shadow-md h-full`}>
      {/* Collapsed State Button */}
      <div className="flex items-center justify-between p-2">
        {isCollapsed ? (
          <button
            onClick={toggleCollapse}
            className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-full shadow-lg text-sm font-bold transition-transform transform hover:scale-110"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
        ) : (
          <>
            <h2 className="text-xl font-bold">PLAN CHECKLIST</h2>
            <button
              onClick={toggleCollapse}
              className="p-2 rounded-full hover:bg-gray-200"
              aria-label="Toggle Collapse"
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-600" />
            </button>
          </>
        )}
      </div>

      {/* Content */}
      {!isCollapsed && (
        <>
          <hr className="border-t-2 border-black mx-4 mb-4" />
          <div className="overflow-y-auto px-4">
            <ul className="space-y-2">
              <li>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="coursePointRules"
                    checked={checkedItems.coursePointRules}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-lg font-medium">Course Point Rules [0/300]</span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="courseRules"
                    checked={checkedItems.courseRules}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-lg font-medium">Course Rules/Requirements</span>
                </label>
                <ul className="ml-6 space-y-2">
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="level1Compulsory"
                        checked={checkedItems.level1Compulsory}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">Level 1 Compulsory Subject [00/12.5]</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="scienceDiscipline"
                        checked={checkedItems.scienceDiscipline}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">Science Discipline Subjects [00/225]</span>
                    </label>
                    <ul className="ml-6 space-y-1">
                      <li>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="level1Discipline"
                            checked={checkedItems.level1Discipline}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-sm">Level 1 Discipline subjects (Min 00/62.5)</span>
                        </label>
                      </li>
                      <li>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="level2Discipline"
                            checked={checkedItems.level2Discipline}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-sm">Level 2 Discipline subjects (Min 00/62.5)</span>
                        </label>
                      </li>
                      <li>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="level3Discipline"
                            checked={checkedItems.level3Discipline}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-sm">Level 3 Discipline subjects (Min 00/75)</span>
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
                    name="subjectPrerequisites"
                    checked={checkedItems.subjectPrerequisites}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-lg font-medium">Subject Prerequisites</span>
                </label>
                <ul className="ml-6 space-y-2">
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="universityMath"
                        checked={checkedItems.universityMath}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">University Level Mathematics (Min 00/25)</span>
                    </label>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <button 
            onClick={handleCheck} 
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Check Selected
          </button>
        </>
      )}
    </div>
  );
};

export default Checklist;
