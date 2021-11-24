import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
function SearchInput({
  error,
  errorMessage,
  htmlFor,
  id,
  width = "100%",
  placeholder,
  center = true,
  icon,
  type = "text",
  ...props
}) {
  const [inputType, setInputType] = useState(type);

  return (
    <>
      <div className="container">
        <label htmlFor={htmlFor} className="searchInput">
          <span className="searchInput__icon">{icon}</span>
          <input
            id={id}
            autoComplete="true"
            type={inputType}
            placeholder={placeholder}
            className="searchInput__input"
            {...props}
          />
          {type === "password" && (
            <span className="searchInput__icon">
              {inputType == "text" ? (
                <AiOutlineEye
                  fontSize={18}
                  onClick={() => setInputType("password")}
                  cursor="pointer"
                />
              ) : (
                <AiOutlineEyeInvisible
                  fontSize={18}
                  onClick={() => setInputType("text")}
                  cursor="pointer"
                />
              )}
            </span>
          )}
        </label>
        <span className="searchInput__error">{error && errorMessage}</span>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;

          width: ${width ? width : "fit-content"};
          height: 52px;
          ${center ? "margin:  0 auto;" : "margin: 0"};
        }
        .searchInput {
          display: flex;
          color: #667c8a;
          width: 100%;
          min-height: 35px;
          background: #ffffff;
          font-weight: 300;
          border-radius: 5px;
          overflow: hidden;
          transition: 0.3s ease-in-out;
          border: 1px solid ${error ? "#c8161d " : "transparent"};
          box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.15);
        }
        .searchInpu {
          background: red;
        }
        .searchInput__icon {
          display: grid;
          place-items: center;
          width: fit-content;
          min-width: 30px;
          height: auto;
        }
        .searchInput__input {
          height: 100%;
          border: none;
          outline: none;
          width: 100%;
        }
        .searchInput__error {
          max-height: 12px;
          font-size: 10px;
          font-weight: 500;
          line-height: 16px;
          padding-left: 5px;
          color: #c8161d;
        }
      `}</style>
    </>
  );
}

export default SearchInput;
