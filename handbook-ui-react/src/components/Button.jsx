import React from "react";

const Button = () => {
  return (
    <>
      <div className="z-10 mr-[317px] flex justify-center">
        <button
          className="rounded px-3 mr-2 text-white"
          style={{ backgroundColor: "#35659E" }}
        >
          Check Eligibility
        </button>
        <button
          className="rounded bg-green-400 px-3 text-black"
          style={{ backgroundColor: "#44DE5B" }}
        >
          Enroll
        </button>
      </div>
    </>
  );
};

export default Button;
