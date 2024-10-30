import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";
import SearchPageFilter from "../components/SearchPageFilter";
import SearchCard from "../containers/subjectCard/SearchCard";
import { Link } from "react-router-dom";

const SearchPage = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

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

  // Sample subject data
  const subjects = [
    {
      name: "Today's Science, Tomorrow's World",
      code: "SCIE10005",
      points: 12.5,
      studyPeriods: ["Summer Term", "Winter Term", "Semester 1", "Semester 2"],
      level: 1,
    },
    {
      name: "Introduction to Accounting",
      code: "ACCT10004",
      points: 12.5,
      studyPeriods: ["Semester 2"],
      level: 1,
    },
    // Add more subjects as needed
  ];

  return (
    <>
      <header className="flex items-center justify-between bg-[#094183] p-4">
        <div className="container mx-auto flex justify-center">
          <Searchbar />
        </div>
        <Link to="/courseplanner" style={{ marginRight: "300px" }}>
          <button className="text-xl text-white hover:text-[#000F46] transition duration-300 transform hover:scale-110">
            ✖
          </button>
        </Link>
      </header>

      <div style={{ display: "flex", height: "calc(100vh - 64px)" }}>
        <SearchPageFilter 
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          resetFilters={resetFilters}
        />
        
        {/* Main content */}
        <main style={{ width: "80%", padding: "20px", backgroundColor: "#fff" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", padding: "10px 0" }}>
            {subjects.map((subject, index) => (
              <SearchCard
                key={index}
                name={subject.name}
                code={subject.code}
                points={subject.points}
                studyPeriods={subject.studyPeriods}
                level={subject.level}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default SearchPage;
