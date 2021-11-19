import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
function SearchInput({ width = "100%", placeholder, center, icon }) {
  return (
    <>
      <div className="searchInput">
        {icon}
        <input
          type="text"
          placeholder={placeholder}
          className="searchInput__input"
        />
      </div>
      <style jsx>{`
        .searchInput {
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${width};
          min-width: 200px;
          height: 35px;
          background: #ffffff;
          font-weight: 300;
          padding: 0 8px;
          border-radius: 5px;
          ${center ? "margin: 15px auto 0 auto;" : ""}
          color: #667c8a;
          gap: 8px;
          box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.15);
        }

        .searchInput__input {
          flex: 1;
          height: 100%;
          border: none;
          outline: none;
        }
      `}</style>
    </>
  );
}

export default SearchInput;
