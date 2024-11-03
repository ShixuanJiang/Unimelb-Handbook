import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";
import SearchPageFilter from "../components/SearchPageFilter";
import SearchCard from "../containers/SearchCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSubject, clearPosition } from "../redux/SubjectSlice";
import subjectsData from "../data/subjects.json"; // Local test data

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedPosition = useSelector((state) => state.subject.selectedPosition);

  const [query, setQuery] = useState(""); // Search term state
  const [selectedFilters, setSelectedFilters] = useState([]); // Selected filters state
  const [subjects, setSubjects] = useState(subjectsData.subjects); // Initialize with mock data
  const [loading, setLoading] = useState(false);


  const handleSubjectSelect = (subject) => {
    if (selectedPosition !== null) {
      dispatch(addSubject({ position: selectedPosition, subject }));
      dispatch(clearPosition());
      navigate("/courseplanner");
    }
  };

  // Filtering subjects locally based on search and filter selections
  const filterSubjectsLocally = () => {
    setLoading(true);
    let filteredSubjects = subjectsData.subjects;

    // Apply search query filter
    if (query) {
      filteredSubjects = filteredSubjects.filter(
        (subject) =>
          subject.title.toLowerCase().includes(query.toLowerCase()) ||
          subject.code.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply selected filters (e.g., levels and study periods)
    selectedFilters.forEach((filter) => {
      if (filter.startsWith("Level")) {
        const level = parseInt(filter.replace("Level ", ""), 10);
        filteredSubjects = filteredSubjects.filter((subject) => getLevelFromCode(subject.code) === level);
      } else if (filter) {
        filteredSubjects = filteredSubjects.filter((subject) => subject.info.includes(filter));
      }
    });

    setSubjects(filteredSubjects);
    setLoading(false);
  };

  // Update results whenever search or filters change
  useEffect(() => {
    filterSubjectsLocally();
  }, [query, selectedFilters]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFilters((prevFilters) =>
      checked ? [...prevFilters, value] : prevFilters.filter((filter) => filter !== value)
    );
  };

  const resetFilters = () => setSelectedFilters([]);

  const getStudyPeriods = (info) => {
    const periods = [];
    if (info.includes("Semester 1")) periods.push("Semester 1");
    if (info.includes("Semester 2")) periods.push("Semester 2");
    if (info.includes("Summer Term")) periods.push("Summer Term");
    if (info.includes("Winter Term")) periods.push("Winter Term");
    return periods;
  };

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
        
        <main style={{ width: "80%", padding: "20px", backgroundColor: "#fff" }}>
          {loading ? (
            <p>Loading...</p>
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
                <p>No subjects found.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default SearchPage;
