import React, { useState, useEffect } from "react";
import axios from "axios";
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



  const [subjects, setSubjects] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      fetchSubjects(); // Only fetch from API in production
    }
  }, [query, selectedFilters]);

<<<<<<< HEAD
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:8001/blog/courses1/");
        setSubjects(response.data.results || []);
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchSubjects();
  }, []);

  // const handleSubjectSelect = (subject) => {
  //   console.log("Subject selected:", subject, "Selected position:", selectedPosition);
  //   if (selectedPosition !== null) {
  //     dispatch(addSubject({ position: selectedPosition, subject }));
  //     dispatch(clearPosition());
  //     navigate("/courseplanner");
  //   } else {
  //     console.warn("No position selected; cannot add subject.");
  //   }
  // };

  const handleSubjectSelect = async (subject) => {
    console.log("Subject selected:", subject, "Selected position:", selectedPosition);
    if (selectedPosition !== null) {
      dispatch(addSubject({ position: selectedPosition, subject }));
      dispatch(clearPosition());
      
      const postData = {
        semester: 1,
        course: [subject.course_id] 
      };
  
      try {
        const response = await axios.post('http://127.0.0.1:8001/blog/api/coursesplan/', postData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        console.log("Response from server:", response.data);
        navigate("/courseplanner");
      } catch (error) {
        console.error("Error posting to server:", error);
     
      }
  
    } else {
      console.warn("No position selected; cannot add subject.");
    }};

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

<<<<<<< HEAD
  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    console.log("choice",value);
    const levelValue = value.includes("Level ") ? value.replace("Level ", "").trim() : value;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }

    try {
          axios.get(`http://localhost:8001/blog/courses1/?level=${levelValue}`).then((response)=>{
            setSubjects(response.data.results || []); 
          })
    } catch (err) {
          console.error("Error fetching subjects with filter:", err);
          setError(err.message);
    }

  };

  const resetFilters = () => setSelectedFilters([]);

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error}</div>; 

=======
>>>>>>> 4371995788165a06c6339695dd81350f8849c2ee
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
<<<<<<< HEAD
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", padding: "10px 0" }}>
            {subjects.map((subject) => (
              <SearchCard
                key={subject.course_id}
=======
          {loading ? (
            <p>Loading...</p> // Show loading indicator when fetching data
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", padding: "10px 0" }}>
              {subjects && subjects.length > 0 ? (
                subjects.map((subject) => (
                  <SearchCard
                    key={subject.course_id}
>>>>>>> 4371995788165a06c6339695dd81350f8849c2ee
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
  