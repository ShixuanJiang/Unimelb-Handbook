import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";
import SearchPageFilter from "../components/SearchPageFilter";
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
  backgroundColor: "#f9f9f9",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  height: "160px",
  textAlign: "center",
};

export default SearchPage;
