import React, { useState } from "react";

const Button = ({ onCheckEligibility }) => {
  return (
    <>
      <div className="fixed bottom-5 z-50 flex w-full max-w-sm justify-end p-2">
        <button
          onClick={onCheckEligibility}
          className="mr-2 rounded px-3 py-2 text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          style={{ backgroundColor: "#35659E" }}
        >
          Check Eligibility
        </button>
        <button
          className="rounded bg-green-400 px-3 py-2 text-black transition-colors duration-200 hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
          style={{ backgroundColor: "#44DE5B" }}
        >
          Enroll
        </button>
      </div>
    </>
  );
};

export default Button;
