import React from "react";
import Subheader from "../components/Subheader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Checklist from "../components/Checklist";
import Filter from "../components/Filter";
import SubjectCard from "../components/SubjectCard";

const MainPage = () => {
  return (
    <>
      <Header />
      <Subheader />
      <div className="flex">
        <Filter />

        <div className="mx-4 flex-grow justify-stretch">
          <SubjectCard />
        </div>

        <div className="mr-[317px]">
          <Checklist />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
