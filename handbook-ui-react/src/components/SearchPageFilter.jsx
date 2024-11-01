import React, { useState, useEffect } from "react";

const SearchPageFilter = ({ selectedFilters, handleFilterChange, resetFilters }) => {
  const [checkboxState, setCheckboxState] = useState({});
  const [showSubjectLevels, setShowSubjectLevels] = useState(true);
  const [showStudyPeriods, setShowStudyPeriods] = useState(true);
  const [showAreaOfStudy, setShowAreaOfStudy] = useState(true);


  useEffect(() => {
    const initialCheckboxState = selectedFilters.reduce(
      (state, filter) => ({ ...state, [filter]: true }),
      {}
    );
    setCheckboxState(initialCheckboxState);
  }, [selectedFilters]);

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckboxState((prevState) => ({ ...prevState, [value]: checked }));
    handleFilterChange(event);
  };

  // Reset all checkboxes when reset button is clicked
  const handleResetFilters = () => {
    setCheckboxState({}); // Clear all checkbox states
    resetFilters(); // Clear the selected filters in parent component
  };

  return (
    <aside style={{ width: "15%", backgroundColor: "#F1F1F1", padding: "20px", marginLeft: "80px"}}>
      {/* Applied Filters Section */}
      <div style={{ marginBottom: "20px" }}>
        <h4>Filter applied</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "10px 0" }}>
          {selectedFilters.map((filter) => (
            <span key={filter} style={tagStyle}>
              <button
                onClick={() =>
                  handleCheckboxChange({
                    target: { value: filter, checked: false },
                  })
                }
                style={{ marginRight: "5px" }}
              >
                ✖
              </button>
              {filter}
            </span>
          ))}
        </div>
        <button className="transition-transform hover:scale-105 hover:shadow-lg" onClick={handleResetFilters} style={resetButtonStyle}>
          Reset
        </button>
      </div>

      {/* Subject Levels Collapsible Section */}
      <div style={sectionStyle}>
        <div style={toggleHeaderStyle} onClick={() => setShowSubjectLevels(!showSubjectLevels)}>
          <span>Subject Levels</span>
          <span>{showSubjectLevels ? "▲" : "▼"}</span>
        </div>

        {showSubjectLevels && (
          <div style={{ marginTop: "10px" }}>
            {["Level 1", "Level 2", "Level 3", "Honours (Level 4)", "All Graduate Coursework", "All Research"].map(
              (level) => (
                <label key={level} style={checkboxLabelStyle}>
                  <input
                    type="checkbox"
                    value={level}
                    checked={checkboxState[level] || false} // Reflects checkboxState for each checkbox
                    onChange={handleCheckboxChange}
                  />{" "}
                  {level}
                </label>
              )
            )}
          </div>
        )}
      </div>

      {/* Study Periods Collapsible Section */}
      <div style={sectionStyle}>
        <div style={toggleHeaderStyle} onClick={() => setShowStudyPeriods(!showStudyPeriods)}>
          <span>Study Periods</span>
          <span>{showStudyPeriods ? "▲" : "▼"}</span>
        </div>

        {showStudyPeriods && (
          <div style={{ marginTop: "10px" }}>
            {["Semester 1", "Semester 2", "Summer Term", "Winter Term"].map((period) => (
              <label key={period} style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  value={period}
                  checked={checkboxState[period] || false} // Reflects checkboxState for each checkbox
                  onChange={handleCheckboxChange}
                />{" "}
                {period}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Area of Study Collapsible Section */}
      <div style={sectionStyle}>
        <div style={toggleHeaderStyle} onClick={() => setShowAreaOfStudy(!showAreaOfStudy)}>
          <span>Area of Study</span>
          <span>{showAreaOfStudy ? "▲" : "▼"}</span>
        </div>

        {showAreaOfStudy && (
          <div style={{ marginTop: "10px" }}>
            {["Computer Science", "Information Systems"].map((area) => (
              <label key={area} style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  value={area}
                  checked={checkboxState[area] || false} // Reflects checkboxState for each checkbox
                  onChange={handleCheckboxChange}
                />{" "}
                {area}
              </label>
            ))}
          </div>
        )}
      </div>

      
    </aside>
  );
};

const sectionStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "10px",
  marginBottom: "20px",
};

const toggleHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  fontWeight: "bold",
  color: "#333",
};

const checkboxLabelStyle = {
  display: "block",
  padding: "5px 0",
  fontSize: "14px",
  color: "#333",
};

const tagStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#007bff",
  color: "#fff",
  borderRadius: "16px",
  padding: "5px 10px",
  fontSize: "14px",
};

const resetButtonStyle = {
  marginTop: "10px",
  padding: "2px 10px",
  backgroundColor: "#000F46",
  color: "#fff",
  border: "none",
  borderRadius: "9999px",
  cursor: "pointer",
};

export default SearchPageFilter;
