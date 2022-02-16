import React, { useRef } from "react";
import Link from "next/link";
import styles from "@stylesComponents/PopularFood.module.css";
import PopularFoodCard from "./PopularFoodCard";
import { AiOutlineRight } from "react-icons/ai";
import Spinner from "./Spinner";
import useLazyFood from "hooks/useLazyFood";
function PopularFood({ loading, foodName, foodData = [], category }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Popular</span>
        <Link passHref href={`/${foodName}-all`}>
          <p className={styles.viewAll}>
            View all
            <AiOutlineRight fontSize={11} style={{ paddingBottom: 2 }} />
          </p>
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
