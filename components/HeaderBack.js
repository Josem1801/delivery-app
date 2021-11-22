import React from "react";
import Square from "./Square";
import { AiOutlineLeft } from "react-icons/ai";
import Router from "next/router";
function HeaderBack({ iconLeft, title, iconRight, background }) {
  const handleBack = () => {
    Router.back();
  };
  return (
    <>
      <header className="header__back">
        <Square onClick={handleBack}>
          {iconLeft ? iconLeft : <AiOutlineLeft fontSize={22} />}
        </Square>
        <div>{title}</div>
        {iconRight ? <Square>{iconRight}</Square> : ""}
      </header>

      <style jsx>{`
        .header__back {
          position: absolute;
          width: 100%;
          max-width: 500px;
          height: 10vh;
          max-height: 90px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
          background: ${background ? background : "#e5e5e5"};
          z-index: 1;
        }
      `}</style>
    </>
  );
}

export default HeaderBack;
