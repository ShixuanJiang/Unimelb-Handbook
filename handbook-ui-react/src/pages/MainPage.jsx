import React, { useState } from "react";
import Subheader from "../components/Subheader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Checklist from "../components/Checklist";
import Filter from "../components/Filter";
import SubjectSection from "../components/SubjectSection";
// import Button from "../components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { setPosition } from '../redux/SubjectSlice';
import { useNavigate } from 'react-router-dom';
import prerequisitesData from "../data/prerequisites.json";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addedSubjects = useSelector((state) => state.subject.addedSubjects);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleAddSubjectClick = (position) => {
    dispatch(setPosition(position));
    navigate('/searchsubject');
  };

  const toggleExpand = (expanded) => {
    setIsExpanded(expanded);
  };

  return (
    <>
      <Header />
      <Subheader />
      <div className="flex">
        <Filter toggleExpand={toggleExpand} />
        <div className="mx-4 flex-grow justify-stretch">
          <SubjectSection
            onAddSubject={handleAddSubjectClick}
            addedSubjects={addedSubjects}
            isExpanded={isExpanded}
            prerequisites={prerequisitesData}
            showPrerequisites={!isExpanded}  // Show prerequisites when collapsed
          />
        </div>
        <div className="mr-[317px]">
          <Checklist toggleExpand={toggleExpand} />
        </div>
        {/* <Button /> */}
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
