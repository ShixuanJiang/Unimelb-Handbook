import React from 'react'

const Header = () => {
  return (
    <header className="top-header">
      <div className="header-container">
        <img
          src="https://course-planner.unimelb.edu.au/static/media/logo-with-padding.bc0c2d4ee2b29c3a36403fe9270a5fc7.svg"
          alt="University of Melbourne Logo"
          className="unimelb-logo"
        />
        <a href="/" class="page-title">
          {" "}
          My Course Planner{" "}
        </a>
      </div>
    </header>
  );
};

export default Header