import React from "react";
import Subheader from "../components/Subheader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Checklist from "../components/Checklist";
import Filter from "../components/Filter";
import SubjectSection from "../components/SubjectSection";
import Button from "../components/Button";


const MainPage = () => {
  return (
    <>
      <Header />
      <Subheader />
      <div className="flex">
        <Filter />

        <div className="mx-4 flex-grow justify-stretch">
          <SubjectSection />
        </div>

        <div className="mr-[317px]">
          <Button />
          <Checklist />
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default MainPage;
