import React from "react";
import Link from "next/link";
import styles from "@stylesComponents/PopularFood.module.css";
import PopularFoodCard from "./PopularFoodCard";
import { AiOutlineRight } from "react-icons/ai";
import Spinner from "./Spinner";
function PopularFood({ loading, foodName, foodData = [], category, ref }) {
  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.header}>
        <span>Popular</span>
        <Link passHref href={`/${foodName}-all`}>
          <a className={styles.viewAll}>
            View all
            <AiOutlineRight fontSize={11} style={{ paddingBottom: 2 }} />
          </a>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        foodData.map(({ image, name, type, price }, idx) => (
          <PopularFoodCard
            key={idx}
            image={image}
            name={name}
            type={type}
            price={price}
            category={category}
          />
        ))
      )}
    </div>
  );
}

export default PopularFood;
