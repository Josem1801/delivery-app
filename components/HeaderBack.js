import React from "react";
import Square from "./Square";
import { AiOutlineLeft } from "react-icons/ai";
import Router from "next/router";
function HeaderBack({ iconLeft, title, iconRight, background, white = false }) {
  const handleBack = () => {
    Router.back();
  };
  return (
    <>
      <header className="header" style={{ backgroundColor: white && "white" }}>
        <Square onClick={handleBack}>
          {iconLeft ? iconLeft : <AiOutlineLeft fontSize={22} />}
        </Square>
        <div className="header__title">{title}</div>
        <div className="header__right">
          {iconRight ? <Square>{iconRight}</Square> : ""}
        </div>
      </header>

      <style jsx>{`
        .header {
          width: 100%;
          max-width: 500px;
          height: 10vh;
          max-height: 90px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-areas: 1fr;
          align-items: center;
          text-align: center;
          padding: 0 15px;
          background: ${background ? background : "#e5e5e5"};
          z-index: 1;
        }
        .header__title {
          font-size: 23px;
          font-weight: 600;
        }
        .header__right {
          justify-self: end;
        }
      `}</style>
    </>
  );
}

export default HeaderBack;
