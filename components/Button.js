import React from "react";

function Button({
  children,
  margin,
  padding,
  background,
  color,
  borderColor,
  height,
  width,
  ...props
}) {
  return (
    <>
      <button type="submit" {...props} className="button">
        {children}
      </button>
      <style jsx>{`
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          height: ${height ? height : "fit-content"};
          width: ${width ? width : "fit-content"};
          font-size: 16px;
          border: none;
          padding: ${padding};
          background: ${background ? background : "black"};
          color: ${color ? color : "white"};
          margin: ${margin};
          border-radius: 8px;
          ${borderColor ? `border: 1px solid ${borderColor}` : ""};
          cursor: pointer;
          font-weight: 400;
          transition: 0.2s ease-in-out;
        }
        .button:hover {
          background: black;
          color: white;
        }
      `}</style>
    </>
  );
}

export default Button;
