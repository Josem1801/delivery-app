import React from "react";
import styles from "@stylesComponents/PopularFoodCard.module.css";
import Image from "next/image";
import Link from "next/link";
function PopularFoodCard({ image, name, type, price, category }) {
  return (
    <div className={styles.card}>
      <Link href={`/food/${category}/${name}`} passHref>
        <div className={styles.card__backgroundColor}>
          <div className={styles.card__image}>
            <Image
              height={200}
              width={220}
              src={image}
              alt={name}
              loading="lazy"
            />
          </div>
        </div>
      </Link>
      <div className={styles.card__row}>
        <p>{name}</p>
        <span>${price}</span>
      </div>
      <span>{type}</span>
    </div>
  );
}

export default PopularFoodCard;
