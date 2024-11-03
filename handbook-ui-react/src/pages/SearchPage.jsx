import React, { useState, useEffect } from "react";
import axios from "axios"; // 导入axios
import Searchbar from "../components/Searchbar";
import SearchPageFilter from "../components/SearchPageFilter";
import SearchCard from "../containers/SearchCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSubject, clearPosition } from "../redux/SubjectSlice";

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedPosition = useSelector((state) => state.subject.selectedPosition);
  console.log("SearchPage loaded, selectedPosition:", selectedPosition);

  const [subjects, setSubjects] = useState([]); // 新增状态来存储获取的课程
  const [loading, setLoading] = useState(true); // 处理加载状态
  const [error, setError] = useState(null); // 处理错误状态

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("SearchPage loaded, selectedPosition:", selectedPosition);
  }, [selectedPosition]);

  useEffect(() => {
    // 获取课程数据
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:8001/blog/courses1/");
        setSubjects(response.data.results || []); // 假设接口返回的数据结构中有subjects
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError(err.message); // 记录错误信息
      } finally {
        setLoading(false); // 无论成功或失败都设置加载完成
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
      
      // 定义要发送的数据
      const postData = {
        semester: 1, // 默认为1
        course: [subject.course_id] // 将course_id放入数组
      };
  
      try {
        // 发送POST请求到服务器
        const response = await axios.post('http://127.0.0.1:8001/blog/api/coursesplan/', postData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        console.log("Response from server:", response.data);
        navigate("/courseplanner");
      } catch (error) {
        console.error("Error posting to server:", error);
        // 可以添加一些错误处理逻辑，如弹窗通知用户
      }
  
    } else {
      console.warn("No position selected; cannot add subject.");
    }
  };

  const [selectedFilters, setSelectedFilters] = useState([]);

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

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    console.log("choice",value);
    const levelValue = value.includes("Level ") ? value.replace("Level ", "").trim() : value;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }

    // 发起请求更新课程数据
    try {
          axios.get(`http://localhost:8001/blog/courses1/?level=${levelValue}`).then((response)=>{
            setSubjects(response.data.results || []); // 假设接口返回的数据结构中有results
          })
    } catch (err) {
          console.error("Error fetching subjects with filter:", err);
          setError(err.message);
    }

  };

  const resetFilters = () => setSelectedFilters([]);

  if (loading) return <div>Loading...</div>; // 显示加载状态
  if (error) return <div>Error: {error}</div>; // 显示错误信息

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
        
        <main style={{ width: "80%", padding: "20px", backgroundColor: "#fff" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", padding: "10px 0" }}>
            {subjects.map((subject) => (
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
