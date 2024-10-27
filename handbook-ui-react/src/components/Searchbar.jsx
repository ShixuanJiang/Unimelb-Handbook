import React from 'react'
import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Icons for search and close

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "25px",
        padding: "5px 10px",
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <FaSearch style={{ color: "#007bff", marginRight: "8px" }} />

      <input
        type="text"
        placeholder="Search Subjects"
        value={query}
        onChange={handleInputChange}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontSize: "16px",
        }}
      />

      {query && (
        <FaTimes
          onClick={handleClearSearch}
          style={{ color: "#007bff", cursor: "pointer", marginLeft: "8px" }}
        />
      )}
    </div>
  );
};

export default Searchbar