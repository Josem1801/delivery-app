import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
function SearchInput({
  width = "100%",
  placeholder,
  center,
  icon,
  type = "text",
  props,
}) {
  const [inputType, setInputType] = useState(type);

  return (
    <>
      <div className="searchInput">
        <span>{icon}</span>
        <input
          autoComplete="true"
          type={inputType}
          placeholder={placeholder}
          className="searchInput__input"
          {...props}
        />
        {type === "password" && (
          <span>
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
      </div>
      <style jsx>{`
        .searchInput {
          display: flex;
          width: ${width ? width : "fit-content"};
          height: 35px;
          color: #667c8a;
          background: #ffffff;
          font-weight: 300;
          border-radius: 5px;
          overflow: hidden;
          ${center ? "margin: 15px auto 0 auto;" : "margin: 0"};
          box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.15);
        }
        .searchInput span {
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
      `}</style>
    </>
  );
}

export default SearchInput;
