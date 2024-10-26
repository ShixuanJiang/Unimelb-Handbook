import React from "react";
import Searchbar from "../components/Searchbar";
import {useState} from "react";

const SearchPage = () => {
  const [showSubjectLevels, setShowSubjectLevels] = useState(true);
  const [showStudyPeriods, setShowStudyPeriods] = useState(true);
  const [showAreaOfStudy, setShowAreaOfStudy] = useState(true);

    // State to store selected filters
    const [selectedFilters, setSelectedFilters] = useState([]);

  // Handle checkbox change
  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  // Reset filters
  const resetFilters = () => setSelectedFilters([]);

  // Toggle the visibility of the subject levels
  const toggleSubjectLevels = () => {
    setShowSubjectLevels(!showSubjectLevels);
  };
  const toggleStudyPeriods = () => setShowStudyPeriods(!showStudyPeriods);
  const toggleAreaOfStudy = () => setShowAreaOfStudy(!showAreaOfStudy);

  return (
    <>
      <header className="bg-blue-900 p-4">
        <div className="container mx-auto flex justify-center">
          <Searchbar />
        </div>
      </header>

      <div
        style={{
          display: "flex",
          height: "calc(100vh - 64px)", // Adjust based on header height
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: "20%", // Takes up 1/4 of the width
            backgroundColor: "#F1F1F1",
            padding: "20px",
          }}
        >
          {/* Applied Filters Section */}
          <div style={{ marginBottom: "20px" }}>
            <h4>Filter applied</h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                margin: "10px 0",
              }}
            >
              {selectedFilters.map((filter) => (
                <span key={filter} style={tagStyle}>
                  <button
                    onClick={() =>
                      handleFilterChange({
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
            <button onClick={resetFilters} style={resetButtonStyle}>
              Reset
            </button>
          </div>
          
          {/* Subject Levels Collapsible Section */}
          <div style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "20px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              fontWeight: "bold",
              color: "#333",
            }} onClick={toggleSubjectLevels}>
              <span>Subject Levels</span>
              <span>{showSubjectLevels ? "▲" : "▼"}</span>
            </div>
            
            {showSubjectLevels && (
              <div style={{ marginTop: "10px" }}>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" value="Level 1" onChange={handleFilterChange} /> Level 1
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" value="Level 2" onChange={handleFilterChange} /> Level 2
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" value="Level 3" onChange={handleFilterChange} /> Level 3
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" value="Honours (Level 4)" onChange={handleFilterChange} /> Honours (Level 4)
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" value="All Graduate Coursework" onChange={handleFilterChange} /> All Graduate Coursework
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" value="All Research" onChange={handleFilterChange} /> All Research
                </label>
              </div>
            )}
          </div>

          {/* Study Periods Collapsible Section */}
          <div style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "20px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              fontWeight: "bold",
              color: "#333",
            }} onClick={toggleStudyPeriods}>
              <span>Study Periods</span>
              <span>{showStudyPeriods ? "▲" : "▼"}</span>
            </div>
            
            {showStudyPeriods && (
              <div style={{ marginTop: "10px" }}>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" value="Semester 1" onChange={handleFilterChange} /> Semester 1
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" value="Semester 2" onChange={handleFilterChange} /> Semester 2
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" value="Summer Term" onChange={handleFilterChange} /> Summer Term
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" value="Winter Term" onChange={handleFilterChange} /> Winter Term
                </label>
              </div>
            )}
          </div>

          {/* Area of Study Collapsible Section */}
          <div style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "20px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              fontWeight: "bold",
              color: "#333",
            }} onClick={toggleAreaOfStudy}>
              <span>Area of Study</span>
              <span>{showAreaOfStudy ? "▲" : "▼"}</span>
            </div>
            
            {showAreaOfStudy && (
              <div style={{ marginTop: "10px" }}>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" value="Computer Science" onChange={handleFilterChange} /> Computer Science
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" value="Information Systems" onChange={handleFilterChange} /> Information Systems
                </label>
              </div>
            )}
          </div>

          {/* Placeholder for filter options */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              height: "100%",
            }}
          >
            <p style={{ color: "#666", textAlign: "center" }}>
              Additional filters
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main
          style={{
            width: "80%",
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          {/* Grid layout for subjects */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",

              gap: "10px", // Space between boxes
              padding: "10px 0",
            }}
          >
            {/* Example boxes for subjects */}
            <div style={boxStyle}>Subject 1</div>
            <div style={boxStyle}>Subject 2</div>
            <div style={boxStyle}>Subject 3</div>
            <div style={boxStyle}>Subject 4</div>
            <div style={boxStyle}>Subject 5</div>
            <div style={boxStyle}>Subject 6</div>
            <div style={boxStyle}>Subject 7</div>
            <div style={boxStyle}>Subject 8</div>
            <div style={boxStyle}>Subject 9</div>
            <div style={boxStyle}>Subject 10</div>
            <div style={boxStyle}>Subject 11</div>
          </div>
        </main>
      </div>
    </>
  );
};


const boxStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    height: '160px',
    textAlign: 'center',
  };

const checkboxLabelStyle = {
    display: "block",
    padding: "5px 0",
    fontSize: "14px",
    color: "#333",
  };

const tagStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '16px',
    padding: '5px 10px',
    fontSize: '14px',
  };

// Styling for reset button
const resetButtonStyle = {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

export default SearchPage;
