import React from "react";
import styles from "@stylesComponents/PopularFoodCard.module.css";
import Image from "next/image";
function PopularFoodCard({ image }) {
  return (
    <div className={styles.card}>
      <div className={styles.card__backgroundColor}>
        <div className={styles.card__image}>
          <Image src={image} alt="Chipotle" />
        </div>
      </div>
      <div className={styles.card__row}>
        <p>Chipotle Cheesy chicken</p>
        <span>$20.95</span>
      </div>
      <span>Chicken Burger</span>
    </div>
  );
}

export default PopularFoodCard;
