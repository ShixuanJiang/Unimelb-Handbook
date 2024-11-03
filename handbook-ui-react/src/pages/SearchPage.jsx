import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";
import SearchPageFilter from "../components/SearchPageFilter";
import SearchCard from "../containers/SearchCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSubject, clearPosition } from "../redux/SubjectSlice";
import axios from "axios";
// import subjectsData from "../data/subjects.json"; // Import the JSON file for testing

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedPosition = useSelector((state) => state.subject.selectedPosition);

  const [query, setQuery] = useState(""); // State to hold the search term
  const [selectedFilters, setSelectedFilters] = useState([]); // State to hold selected filters
  const [subjects, setSubjects] = useState(subjectsData.subjects); // Initialize with JSON data for testing
  const [loading, setLoading] = useState(false); // State to manage loading status



  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      fetchSubjects(); // Only fetch from API in production
    }
  }, [query, selectedFilters]);

  const handleSubjectSelect = (subject) => {
    if (selectedPosition !== null) {
      dispatch(addSubject({ position: selectedPosition, subject }));
      dispatch(clearPosition());
      navigate("/courseplanner");
    }
  };

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      let params = new URLSearchParams();
      if (query) params.append("search", query);

      selectedFilters.forEach((filter) => {
        if (filter.startsWith("Level")) {
          const levelNumber = filter.replace("Level ", "");
          params.append(`level${levelNumber}`, "true");
        } else {
          params.append(filter.toLowerCase().replace(" ", "_"), "true");
        }
      });

      const response = await axios.get(`/blog/courses1/?${params.toString()}`);
      setSubjects(response.data.subjects || []); // Ensure subjects is an array
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
      setSubjects([]); // Set subjects to an empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery.toLowerCase());
  };

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFilters((prevFilters) =>
      checked ? [...prevFilters, value] : prevFilters.filter((filter) => filter !== value)
    );
  };

  const resetFilters = () => setSelectedFilters([]);

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

  return (
    <>
      <header className="flex items-center justify-between bg-[#094183] p-4">
        <div className="container mx-auto flex justify-center">
          <Searchbar onSearch={handleSearch} />
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
          {loading ? (
            <p>Loading...</p> // Show loading indicator when fetching data
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", padding: "10px 0" }}>
              {subjects && subjects.length > 0 ? (
                subjects.map((subject) => (
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
                ))
              ) : (
                <p>No subjects found.</p> // Display message if no subjects are returned
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default SearchPage;
  