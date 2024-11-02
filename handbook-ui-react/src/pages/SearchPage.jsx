import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";
import SearchPageFilter from "../components/SearchPageFilter";
import SearchCard from "../containers/SearchCard";
import { Link } from "react-router-dom";
import subjectsData from "../data/subjects.json"; // Ensure this path is correct
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSubject, clearPosition } from "../redux/SubjectSlice";

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedPosition = useSelector((state) => state.subject.selectedPosition);
  console.log("SearchPage loaded, selectedPosition:", selectedPosition);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("SearchPage loaded, selectedPosition:", selectedPosition);
  }, [selectedPosition]);

  const handleSubjectSelect = (subject) => {
    console.log("Subject selected:", subject, "Selected position:", selectedPosition);
    if (selectedPosition !== null) {
      dispatch(addSubject({ position: selectedPosition, subject }));
      dispatch(clearPosition());
      navigate("/courseplanner");
    } else {
      console.warn("No position selected; cannot add subject.");
    }
  };

  const [selectedFilters, setSelectedFilters] = useState([]);

  // Function to extract study periods from the "info" field
  const getStudyPeriods = (info) => {
    const periods = [];
    if (info.includes("Semester 1")) periods.push("Semester 1");
    if (info.includes("Semester 2")) periods.push("Semester 2");
    if (info.includes("Summer Term")) periods.push("Summer Term");
    if (info.includes("Winter Term")) periods.push("Winter Term");
    return periods;
  };

  // Function to extract level from the "code" field
  const getLevelFromCode = (code) => {
    return parseInt(code.match(/\d/)[0], 10);
  };

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
            {subjectsData.subjects.map((subject) => (
              <SearchCard
                key={subject.course_id}
                name={subject.title}
                code={subject.code}
                points={subject.credits}
                studyPeriods={getStudyPeriods(subject.info)}
                level={getLevelFromCode(subject.code) || "N/A"}
                url={subject.url}
                onClick={() => handleSubjectSelect(subject)}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default SearchPage;
