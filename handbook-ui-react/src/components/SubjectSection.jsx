// SubjectSection.jsx
import React from 'react';
import SubjectCard from '../containers/SubjectCard';

const SubjectSection = ({ onAddSubject, addedSubjects }) => {
  const years = ['2024', '2025', '2026'];
  const semesters = ['Semester 1', 'Semester 2'];

  return (
    <div>
      {years.map((year) => (
        <div className='mt-3 ' key={year}>
          <h2 className='text-3xl font-bold' >{year}</h2>
          {semesters.map((semester, index) => (
            <div key={index}>
              <h3 className=" mt-1 text-lg font-bold text-gray-600">{semester}</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[0, 1, 2, 3].map((i) => {
                  const position = `${year}-${semester}-${i}`;
                  return (
                    <SubjectCard
                      key={i}
                      position={position}
                      subject={addedSubjects[position]} // Pass the subject if available
                      onAdd={() => onAddSubject(position)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SubjectSection;
