import React from 'react'
import './index.css'
import logo from './assets/images/unimelb-logo.png';



const App = () => {
    return (
        <>

                {/* Navbar */}
                <header className="w-full bg-blue-950 p-9">
                    <div className="flex justify-between items-center">
                        <div className="text-white font-bold text-lg">
                            <img
                                className="inline-block h-10 mr-2"
                                src={logo}
                                alt="University Logo"
                                
                            />
                            <span>Student Course Planner</span>
                        </div>
                        {/* Navbar Links */}
                        <nav className="text-white">
                            <ul className="flex space-x-6">
                                <li><a href="#new-students">New Students</a></li>
                                <li><a href="#your-course">Your Course</a></li>
                                <li><a href="#academic-skills">Academic Skills</a></li>
                                <li><a href="#student-support">Student Support</a></li>
                                <li><a href="#student-life">Student Life</a></li>
                                <li><a href="#careers">Careers</a></li>
                                <li><a href="#search">Search</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>

                {/* Main Section */}
                <main className="flex-grow flex flex-col items-center text-center p-20">
                    <h1 className="text-4xl font-bold text-black mb-4">Course Planner</h1>
                    <p className="text-xl text-black mb-6">Plan. Manage. Enrol.</p>

                    {/* Blue Box */}
                    <div className="bg-blue-700 text-white py-8 px-16 rounded-lg w-full max-w-3xl">
                    <ul className="text-left space-y-2">
                        <li><strong>Plan</strong> your course</li>
                        <li><strong>Manage</strong> your subjects</li>
                        <li><strong>Enrol</strong> in subjects</li>
                    </ul>
                        <p className="mt-4 text-sm">
                            * If you are unsure about your plan, consult the <a href="https://handbook.unimelb.edu.au/search" target = "_blank" className="underline">University Handbook</a>.<br />
                            If you remain unsure, contact a <a href="https://students.unimelb.edu.au/student-support/advice-and-help/stop-1/categories/course-planning" target = "_blank" className="underline">course adviser</a>.
                        </p>
                    </div>

                    {/* Student Log In Button */}
                    <button className="bg-blue-950 text-white px-20 py-2 mt-8">
                        Student Log In
                    </button>
                    <a href="https://course-planner.unimelb.edu.au/" className="mt-2 text-black underline">Not a Current Student?</a>
                </main>

        </>

    )
}

export default App

