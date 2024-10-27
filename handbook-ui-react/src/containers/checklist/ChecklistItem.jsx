import React from 'react'


const ChecklistItem = ({ subject, isOpen, onToggle }) => {
  return (
    <div className="border rounded-lg shadow-md mb-4">
      <div
        className="flex justify-between items-center bg-blue-600 text-white p-4 cursor-pointer"
        onClick={onToggle}
      >
        <h3 className="text-lg font-semibold">{subject.name} Checklist</h3>
        <span className="text-xl">{isOpen ? "▼" : "▲"}</span>
      </div>

      {isOpen && (
        <ul className="p-4 space-y-3">
          {subject.requirements.map((req) => (
            <li key={req.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-800">
                {req.name} <span className="text-sm text-gray-500">[Min Points: {req.minPoints}]</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ChecklistItem

