import React from "react";
import Subheader from "../components/Subheader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Checklist from "../components/Checklist";
import Filter from "../components/Filter";
import SubjectSection from "../components/SubjectSection";
import Button from "../components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { setPosition } from '../redux/SubjectSlice';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addedSubjects = useSelector((state) => state.subject.addedSubjects);

  const handleAddSubjectClick = (position) => {
    dispatch(setPosition(position)); // Sets the selected position in Redux
    navigate('/searchsubject');      // Navigates to SearchPage
  };

  return (
    <>
      <Header />
      <Subheader />
      <div className="flex">
        <Filter />

        <div className="mx-4 flex-grow justify-stretch">
        <SubjectSection onAddSubject={handleAddSubjectClick} addedSubjects={addedSubjects} />
        </div>

        

        <div className="mr-[317px]">
          <Checklist />
        </div>
        <Button />
      </div>
      
      <Footer />
    </>
  );
};

export default MainPage;


