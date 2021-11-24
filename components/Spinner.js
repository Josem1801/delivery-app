import React from "react";
function Spinner({ size, color, strokeWidth, margin }) {
  return (
    <>
      <div className={`spinner spinner--${size}`}></div>
      <style jsx>
        {`
          .spinner {
            background: transparent;
            border-radius: 50%;
            border: ${strokeWidth}px solid ${color};
            border-left-color: transparent;
            margin: ${margin ? margin : "20px auto"};
            animation: spinner 1s infinite cubic-bezier(0.27, 0.6, 0.54, 0.38);
          }
          .spinner--small {
            width: 22px;
            height: 22px;
          }
          .spinner--medium {
            width: 30px;
            height: 30px;
          }
          .spinner--large {
            width: 55px;
            height: 55px;
          }
          @keyframes spinner {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
}
Spinner.defaultProps = {
  size: "large",
  color: "#c8161d",
  strokeWidth: 5,
};
export default Spinner;
