import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { db, getFoodByName } from "../../../firebase";
import Layout from "@components/Layout";
import HeaderBack from "@components/HeaderBack";
import { BiHeart } from "react-icons/bi";
import styles from "@stylesPages/Food.module.css";
import Image from "next/image";
import Square from "@components/Square";
import { FiShoppingBag } from "react-icons/fi";
import Spinner from "@components/Spinner";
function Food() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [counter, setCounter] = useState(1);
  const food = useRouter().query.food;
  const category = useRouter().query.category;

  useEffect(() => {
    setLoader(true);
    getFoodByName(db, category, food)
      .then((food) => {
        setData(food);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, [food, category]);
  return (
    <Layout className={styles.container} header={false} navbar={false}>
      <HeaderBack
        background="white"
        iconRight={<BiHeart fontSize={24} color="#C8161D" />}
      />
      {loader ? (
        <Spinner margin="350px auto 0 auto" />
      ) : (
        <div className={styles.text}>
          <h1>{data.name}</h1>
          <p>{data.description}</p>

          <div className={styles.image}>
            <Image src={data.image} alt={data.name} width={180} height={180} />
          </div>
          <Square className={`${styles.small} ${styles.square}`}>S</Square>
          <Square className={`${styles.medium} ${styles.square}`}>M</Square>
          <Square className={`${styles.large} ${styles.square}`}>L</Square>
        </div>
      )}
      <div className={styles.counter}>
        <button
          onClick={() => counter > 1 && setCounter(counter - 1)}
          className={styles.circle}
        >
          -
        </button>
        <span>{counter}</span>
        <button
          onClick={() => setCounter(counter + 1)}
          className={styles.circle}
        >
          +
        </button>
      </div>
      <div className={styles.bottom}>
        <span className={styles.textPrice}>Price</span>
        <button className={styles.addToCart}>
          <FiShoppingBag /> Go to Cart
        </button>

        <span className={styles.price}>
          {loader ? (
            <Spinner size="small" margin="0 10px" strokeWidth={3} />
          ) : (
            `$ ${data.price}`
          )}
        </span>
      </div>
    </Layout>
  );
}

export default Food;
