import React from 'react'
import Subheader from '../components/Subheader'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Checklist from '../components/Checklist'
import Filter from '../components/Filter';
import SubjectCard from '../components/SubjectCard'

const MainPage = () => {
  return (
    <>
      <Header />
      <Subheader />
      <div className="flex">
        <Filter />
        {/* <SubjectCard />
        <Checklist /> */}
      </div>

      <Footer />
    </>

  )
}

export default MainPage