import React, { useState } from "react";

const Filter = ({ toggleExpand }) => {
  const [showFilter, setShowFilter] = useState(true);
  const [sections, setSections] = useState({
    faculty: true,
    subjectLevel: true,
    studyPeriods: true,
  });

  const [subjectLevelCheckboxes, setSubjectLevelCheckboxes] = useState({
    undergraduate: false,
    level1: false,
    level2: false,
    level3: false,
    honours: false,
    graduate: false,
    research: false,
  });

  const [studyPeriodCheckboxes, setStudyPeriodCheckboxes] = useState({
    mainSemester1: false,
    semester1: false,
    semester1Early: false,
    semester1Extended: false,
    mainSemester2: false,
    semester2: false,
    semester2Early: false,
    semester2Extended: false,
    mainYearLong: false,
    yearLong: false,
    yearLongExtended: false,
    firstHalfYear: false,
    secondHalfYear: false,
    otherIntensives: false,
  });

  // Define facultyCheckboxes state here
  const [facultyCheckboxes, setFacultyCheckboxes] = useState({
    architecture: false,
    arts: false,
    businessEconomics: false,
    education: false,
    engineeringIT: false,
    fineArtsMusic: false,
    law: false,
    medicineDentistry: false,
    melbourneBusiness: false,
    science: false,
  });

  const handleFacultyCheckboxChange = (checkbox) => {
    setFacultyCheckboxes((prev) => ({
      ...prev,
      [checkbox]: !prev[checkbox],
    }));
  };

  const handleSubjectLevelMainCheckboxChange = (
    mainCheckbox,
    nestedCheckboxes,
  ) => {
    setSubjectLevelCheckboxes((prev) => {
      const newState = { ...prev };
      const isMainChecked = !prev[mainCheckbox];

      newState[mainCheckbox] = isMainChecked;
      nestedCheckboxes.forEach((checkbox) => {
        newState[checkbox] = isMainChecked;
      });

      return newState;
    });
  };

  const handleSubjectLevelNestedCheckboxChange = (
    mainCheckbox,
    checkbox,
    nestedCheckboxes,
  ) => {
    setSubjectLevelCheckboxes((prev) => {
      const newState = { ...prev };
      newState[checkbox] = !prev[checkbox];

      // Uncheck main if any nested checkbox is unchecked
      const areAllNestedChecked = nestedCheckboxes.every(
        (nestedCheckbox) => newState[nestedCheckbox],
      );
      newState[mainCheckbox] = areAllNestedChecked;

      return newState;
    });
  };

  const handleStudyPeriodMainCheckboxChange = (
    mainCheckbox,
    nestedCheckboxes,
  ) => {
    setStudyPeriodCheckboxes((prev) => {
      const newState = { ...prev };
      const isMainChecked = !prev[mainCheckbox];

      newState[mainCheckbox] = isMainChecked;
      nestedCheckboxes.forEach((checkbox) => {
        newState[checkbox] = isMainChecked;
      });

      return newState;
    });
  };

  const handleStudyPeriodNestedCheckboxChange = (
    mainCheckbox,
    checkbox,
    nestedCheckboxes,
  ) => {
    setStudyPeriodCheckboxes((prev) => {
      const newState = { ...prev };
      newState[checkbox] = !prev[checkbox];

      // Uncheck main if any nested checkbox is unchecked
      const areAllNestedChecked = nestedCheckboxes.every(
        (nestedCheckbox) => newState[nestedCheckbox],
      );
      newState[mainCheckbox] = areAllNestedChecked;

      return newState;
    });
  };

  const toggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = () => {
    const newShowFilter = !showFilter;
    setShowFilter(newShowFilter);
    toggleExpand(newShowFilter);
  }

  return (
    <div style={{ marginLeft: "317px" }}>
      <button
        onClick={toggleFilter}
        className="mb-3 mt-3 flex items-center text-sm font-semibold text-black hover:text-gray-700"
      >
        <span className="text-lg">◧</span>&nbsp;
        <span>{showFilter ? "HIDE FILTERS" : "SHOW FILTERS"}</span>
      </button>

      {showFilter && <hr className="border-t-2 border-gray-800" />}

      {/* Filter Content */}
      {showFilter && (
        <aside className="w-64 py-4 pr-5">
          {/* Faculty Filter Section */}
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">FACULTY</h3>
              <button
                onClick={() => toggleSection("faculty")}
                className="text-gray-500"
              >
                {sections.faculty ? "−" : "+"}
              </button>
            </div>
            {sections.faculty && (
              <ul className="space-y-1">
                {/* Faculty Options */}
                <li className="rounded-md p-1 hover:bg-gray-100">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={facultyCheckboxes.architecture}
                      onChange={() =>
                        handleFacultyCheckboxChange("architecture")
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">
                      Architecture, Building and Planning
                    </span>
                  </label>
                </li>
                <li className="rounded-md p-1 hover:bg-gray-100">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={facultyCheckboxes.arts}
                      onChange={() => handleFacultyCheckboxChange("arts")}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">Arts</span>
                  </label>
                </li>
                <li className="rounded-md p-1 hover:bg-gray-100">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={facultyCheckboxes.businessEconomics}
                      onChange={() =>
                        handleFacultyCheckboxChange("businessEconomics")
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">Business and Economics</span>
                  </label>
                </li>
                <li className="rounded-md p-1 hover:bg-gray-100">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={facultyCheckboxes.education}
                      onChange={() => handleFacultyCheckboxChange("education")}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">Education</span>
                  </label>
                </li>
                <li className="rounded-md p-1 hover:bg-gray-100">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={facultyCheckboxes.engineeringIT}
                      onChange={() =>
                        handleFacultyCheckboxChange("engineeringIT")
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">Engineering and IT</span>
                  </label>
                </li>
                <li className="rounded-md p-1 hover:bg-gray-100">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={facultyCheckboxes.fineArtsMusic}
                      onChange={() =>
                        handleFacultyCheckboxChange("fineArtsMusic")
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">Fine Arts and Music</span>
                  </label>
                </li>
                <li className="rounded-md p-1 hover:bg-gray-100">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={facultyCheckboxes.law}
                      onChange={() => handleFacultyCheckboxChange("law")}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">Law</span>
                  </label>
                </li>
                <li className="rounded-md p-1 hover:bg-gray-100">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={facultyCheckboxes.medicineDentistry}
                      onChange={() =>
                        handleFacultyCheckboxChange("medicineDentistry")
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">
                      Medicine, Dentistry and Health Sciences
                    </span>
                  </label>
                </li>
                <li className="rounded-md p-1 hover:bg-gray-100">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={facultyCheckboxes.melbourneBusiness}
                      onChange={() =>
                        handleFacultyCheckboxChange("melbourneBusiness")
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">Melbourne Business School</span>
                  </label>
                </li>
                <li className="rounded-md p-1 hover:bg-gray-100">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={facultyCheckboxes.science}
                      onChange={() => handleFacultyCheckboxChange("science")}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">Science</span>
                  </label>
                </li>
              </ul>
            )}
          </div>

          {/* Subject Level Filter Section */}
          <div className="mb-4">
            <hr className="mb-2 border-t border-gray-300" />
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">SUBJECT LEVEL</h3>
              <button
                onClick={() => toggleSection("subjectLevel")}
                className="text-gray-500"
              >
                {sections.subjectLevel ? "−" : "+"}
              </button>
            </div>
            {sections.subjectLevel && (
              <ul className="space-y-1">
                {/* All Undergraduate Coursework */}
                <li className="p-1">
                  <div className="rounded-md hover:bg-gray-100">
                    <label className="flex items-center space-x-2 p-1 font-semibold">
                      <input
                        type="checkbox"
                        checked={subjectLevelCheckboxes.undergraduate}
                        onChange={() =>
                          handleSubjectLevelMainCheckboxChange(
                            "undergraduate",
                            ["level1", "level2", "level3"],
                          )
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">
                        All Undergraduate Coursework
                      </span>
                    </label>
                  </div>
                  <ul className="ml-5 space-y-1">
                    <li>
                      <div className="rounded-md p-1 hover:bg-gray-200">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={subjectLevelCheckboxes.level1}
                            onChange={() =>
                              handleSubjectLevelNestedCheckboxChange(
                                "undergraduate",
                                "level1",
                                ["level1", "level2", "level3"],
                              )
                            }
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-sm">Level 1</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="rounded-md p-1 hover:bg-gray-200">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={subjectLevelCheckboxes.level2}
                            onChange={() =>
                              handleSubjectLevelNestedCheckboxChange(
                                "undergraduate",
                                "level2",
                                ["level1", "level2", "level3"],
                              )
                            }
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-sm">Level 2</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="rounded-md p-1 hover:bg-gray-200">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={subjectLevelCheckboxes.level3}
                            onChange={() =>
                              handleSubjectLevelNestedCheckboxChange(
                                "undergraduate",
                                "level3",
                                ["level1", "level2", "level3"],
                              )
                            }
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <span className="text-sm">Level 3</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="p-1">
                  <div className="rounded-md hover:bg-gray-100">
                    <label className="flex items-center space-x-2 p-1 font-semibold">
                      <input
                        type="checkbox"
                        checked={subjectLevelCheckboxes.honours}
                        onChange={() =>
                          handleSubjectLevelNestedCheckboxChange(
                            "undergraduate",
                            "honours",
                            ["honours"],
                          )
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">Honours (Level 4)</span>
                    </label>
                  </div>
                </li>
              </ul>
            )}
          </div>

          {/* Study Periods Filter Section */}
          <div className="mb-4">
            <hr className="mb-2 border-t border-gray-300" />
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">STUDY PERIODS</h3>
              <button
                onClick={() => toggleSection("studyPeriods")}
                className="text-gray-500"
              >
                {sections.studyPeriods ? "−" : "+"}
              </button>
            </div>
            {sections.studyPeriods && (
              <ul className="space-y-1">
                {/* Semester 1 */}
                <li className="p-1">
                  <div className="rounded-md hover:bg-gray-100">
                    <label className="flex items-center space-x-2 p-1 font-semibold">
                      <input
                        type="checkbox"
                        checked={studyPeriodCheckboxes.mainSemester1}
                        onChange={() =>
                          handleStudyPeriodMainCheckboxChange("mainSemester1", [
                            "semester1",
                            "semester1Early",
                            "semester1Extended",
                          ])
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">Semester 1</span>
                    </label>
                  </div>
                  <ul className="ml-5 space-y-1">
                    <li>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={studyPeriodCheckboxes.semester1}
                          onChange={() =>
                            handleStudyPeriodNestedCheckboxChange(
                              "mainSemester1",
                              "semester1",
                              [
                                "semester1",
                                "semester1Early",
                                "semester1Extended",
                              ],
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm">Semester 1</span>
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={studyPeriodCheckboxes.semester1Early}
                          onChange={() =>
                            handleStudyPeriodNestedCheckboxChange(
                              "mainSemester1",
                              "semester1Early",
                              [
                                "semester1",
                                "semester1Early",
                                "semester1Extended",
                              ],
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm">
                          Semester 1 (Early-Start)
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={studyPeriodCheckboxes.semester1Extended}
                          onChange={() =>
                            handleStudyPeriodNestedCheckboxChange(
                              "mainSemester1",
                              "semester1Extended",
                              [
                                "semester1",
                                "semester1Early",
                                "semester1Extended",
                              ],
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm">Semester 1 (Extended)</span>
                      </label>
                    </li>
                  </ul>
                </li>

                {/* Semester 2 */}
                <li className="p-1">
                  <div className="rounded-md hover:bg-gray-100">
                    <label className="flex items-center space-x-2 p-1 font-semibold">
                      <input
                        type="checkbox"
                        checked={studyPeriodCheckboxes.mainSemester2}
                        onChange={() =>
                          handleStudyPeriodMainCheckboxChange("mainSemester2", [
                            "semester2",
                            "semester2Early",
                            "semester2Extended",
                          ])
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">Semester 2</span>
                    </label>
                  </div>
                  <ul className="ml-5 space-y-1">
                    <li>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={studyPeriodCheckboxes.semester2}
                          onChange={() =>
                            handleStudyPeriodNestedCheckboxChange(
                              "mainSemester2",
                              "semester2",
                              [
                                "semester2",
                                "semester2Early",
                                "semester2Extended",
                              ],
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm">Semester 2</span>
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={studyPeriodCheckboxes.semester2Early}
                          onChange={() =>
                            handleStudyPeriodNestedCheckboxChange(
                              "mainSemester2",
                              "semester2Early",
                              [
                                "semester2",
                                "semester2Early",
                                "semester2Extended",
                              ],
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm">
                          Semester 2 (Early-Start)
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={studyPeriodCheckboxes.semester2Extended}
                          onChange={() =>
                            handleStudyPeriodNestedCheckboxChange(
                              "mainSemester2",
                              "semester2Extended",
                              [
                                "semester2",
                                "semester2Early",
                                "semester2Extended",
                              ],
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm">Semester 2 (Extended)</span>
                      </label>
                    </li>
                  </ul>
                </li>

                {/* Year Long */}
                <li className="p-1">
                  <div className="rounded-md hover:bg-gray-100">
                    <label className="flex items-center space-x-2 p-1 font-semibold">
                      <input
                        type="checkbox"
                        checked={studyPeriodCheckboxes.mainYearLong}
                        onChange={() =>
                          handleStudyPeriodMainCheckboxChange("mainYearLong", [
                            "yearLong",
                            "yearLongExtended",
                          ])
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">Year Long</span>
                    </label>
                  </div>
                  <ul className="ml-5 space-y-1">
                    <li>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={studyPeriodCheckboxes.yearLong}
                          onChange={() =>
                            handleStudyPeriodNestedCheckboxChange(
                              "mainYearLong",
                              "yearLong",
                              ["yearLong", "yearLongExtended"],
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm">Year Long</span>
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={studyPeriodCheckboxes.yearLongExtended}
                          onChange={() =>
                            handleStudyPeriodNestedCheckboxChange(
                              "mainYearLong",
                              "yearLongExtended",
                              ["yearLong", "yearLongExtended"],
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm">Year Long (Extended)</span>
                      </label>
                    </li>
                  </ul>
                </li>

                {/* Additional Study Periods */}
                <li className="p-1">
                  <label className="flex items-center space-x-2 rounded-md p-1 font-semibold hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={studyPeriodCheckboxes.firstHalfYear}
                      onChange={() =>
                        setStudyPeriodCheckboxes((prev) => ({
                          ...prev,
                          firstHalfYear: !prev.firstHalfYear,
                        }))
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">
                      First half year teaching start
                    </span>
                  </label>
                </li>

                <li className="p-1">
                  <label className="flex items-center space-x-2 rounded-md p-1 font-semibold hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={studyPeriodCheckboxes.secondHalfYear}
                      onChange={() =>
                        setStudyPeriodCheckboxes((prev) => ({
                          ...prev,
                          secondHalfYear: !prev.secondHalfYear,
                        }))
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">
                      Second half year teaching start
                    </span>
                  </label>
                </li>

                <li className="p-1">
                  <label className="flex items-center space-x-2 rounded-md p-1 font-semibold hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={studyPeriodCheckboxes.otherIntensives}
                      onChange={() =>
                        setStudyPeriodCheckboxes((prev) => ({
                          ...prev,
                          otherIntensives: !prev.otherIntensives,
                        }))
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">
                      Other (including intensives)
                    </span>
                  </label>
                </li>
              </ul>
            )}
          </div>
        </aside>
      )}
    </div>
  );
};

export default Filter;
