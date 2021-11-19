import React from "react";

function Button({
  children,
  margin,
  padding,
  background,
  color,
  borderColor,
  ...props
}) {
  return (
    <>
      <div {...props} className="button">
        {children}
      </div>
      <style jsx>{`
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: fit-content;
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
