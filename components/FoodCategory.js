import React, { useState } from "react";
import styles from "@stylesComponents/FoodCategory.module.css";
import { AiFillRightCircle } from "react-icons/ai";
import Image from "next/image";
function FoodCategory({ data, handleCategory, currentCategory }) {
  const [touch, setTouch] = useState(false);

  return (
    <div
      onTouchStart={() => setTouch(true)}
      onTouchEnd={() => setTouch(false)}
      className={`${styles.container} ${touch ? styles.down : styles.up}`}
    >
      {data.map((category, id) => (
        <div
          key={id}
          onClick={() => handleCategory(category.name)}
          className={`${styles.category} ${
            currentCategory === category.name.toLowerCase() &&
            styles.categorySelected
          }`}
        >
          <div className={styles.category__image}>
            <Image src={category.image} alt={category.name} />
          </div>
          <span>{category.name}</span>
          <AiFillRightCircle fontSize={22} />
        </div>
      ))}
    </div>
  );
}

export default FoodCategory;
