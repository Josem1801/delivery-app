import React from "react";
import Link from "next/link";
import styles from "@stylesComponents/PopularFood.module.css";
import PopularFoodCard from "./PopularFoodCard";
import Chipotle from "../public/chipotle-cheesy-chicken.svg";
import Burger from "../public/burger.svg";
import { AiOutlineRight } from "react-icons/ai";
function PopularFood({ foodName, food }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Popular</span>
        <Link passHref href={`/${foodName}-all`}>
          <a className={styles.viewAll}>
            View all
            <AiOutlineRight fontSize={11} style={{ paddingBottom: 2 }} />
          </a>
        </Link>
      </div>
      <PopularFoodCard image={Chipotle} />
      <PopularFoodCard image={Burger} />
    </div>
  );
}

export default PopularFood;
