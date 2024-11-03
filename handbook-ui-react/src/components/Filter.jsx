import React, { useState } from 'react';

const Filter = ({ toggleExpand }) => {
  const [showFilter, setShowFilter] = useState(true);

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

  const [sections, setSections] = useState({
    faculty: true,
    subjectLevel: true,
    studyPeriods: true,
  });

  const sectionConfig = [
    {
      key: 'faculty',
      label: 'FACULTY',
      checkboxes: facultyCheckboxes,
      handler: setFacultyCheckboxes,
    },
    {
      key: 'subjectLevel',
      label: 'SUBJECT LEVEL',
      checkboxes: subjectLevelCheckboxes,
      handler: setSubjectLevelCheckboxes,
    },
    {
      key: 'studyPeriods',
      label: 'STUDY PERIODS',
      checkboxes: studyPeriodCheckboxes,
      handler: setStudyPeriodCheckboxes,
    },
  ];

  const handleCheckboxChange = (sectionKey, checkboxKey) => {
    const section = sectionConfig.find(sec => sec.key === sectionKey);
    section.handler(prevState => ({
      ...prevState,
      [checkboxKey]: !prevState[checkboxKey]
    }));
  };

  const toggleSection = (sectionKey) => {
    setSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
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
          {sectionConfig.map(({ key, label, checkboxes }) => (
            <div key={key} className="mb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-black">{label}</h3>
                <button
                  onClick={() => toggleSection(key)}
                  className="text-gray-500"
                >
                  {sections[key] ? "−" : "+"}
                </button>
              </div>
              {sections[key] && (
                <ul className="space-y-1">
                  {Object.entries(checkboxes).map(([checkboxKey, checkboxValue]) => (
                    <li key={checkboxKey} className="rounded-md p-1 hover:bg-gray-100">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={checkboxValue}
                          onChange={() => handleCheckboxChange(key, checkboxKey)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm">{checkboxKey}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </aside>
      )}
    </div>
  );
};

export default Filter;
