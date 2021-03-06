import React, { useState } from "react";
import styles from "@stylesComponents/FoodInCart.module.css";
import Image from "next/image";

import { MdClose } from "react-icons/md";
function FoodInCart({ initialCounter = 1, image, name, price, handleDelete }) {
  const [counter, setCounter] = useState(initialCounter);

  return (
    <div className={styles.container}>
      <span className={styles.container__image}>
        {image && (
          <Image src={image} alt={name} width={75} height={75} loading="lazy" />
        )}
      </span>
      <span className={styles.container__name}>{name}</span>
      <span
        className={styles.container__del}
        onClick={() => handleDelete(name)}
      >
        <MdClose cursor="pointer" fontSize={26} />
      </span>
      <div className={styles.container__counter}>
        <button
          className={styles.button}
          onClick={() => counter > 1 && setCounter(counter - 1)}
        >
          -
        </button>
        <span>{counter}</span>
        <button
          className={styles.button}
          onClick={() => setCounter(counter + 1)}
        >
          +
        </button>
      </div>

      <span className={styles.container__price}>
        ${(counter * price).toFixed(1)}
      </span>
    </div>
  );
}

export default FoodInCart;
