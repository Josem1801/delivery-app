import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { getFoodByCollectionAndName, addFoodToCartDB } from "../../../firebase";
import Layout from "@components/Layout";
import HeaderBack from "@components/HeaderBack";
import { BiHeart } from "react-icons/bi";
import styles from "@stylesPages/Food.module.css";
import Image from "next/image";
import Square from "@components/Square";
import { FiShoppingBag } from "react-icons/fi";
import { useAuthUser } from "next-firebase-auth";
import Spinner from "@components/Spinner";
import useCart from "hooks/useCart";
function Food() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [counter, setCounter] = useState(1);
  const [multiplierNumber, setMultiplierNumber] = useState(0);
  const authUser = useAuthUser();

  const food = useRouter().query.food;
  const category = useRouter().query.category;
  function handleSquare(symbol, price) {
    setSelectedSize(symbol);
    setMultiplierNumber(price);
  }
  function handleAddToCart() {
    if (authUser.id) {
      addFoodToCartDB(data.name).then(console.log);
    }
  }
  useEffect(() => {
    setLoader(true);
    getFoodByCollectionAndName(category, food)
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
            {data.image && (
              <Image
                src={data.image}
                alt={data.name}
                width={180}
                height={180}
              />
            )}
          </div>
          {foodSize.map(({ size, symbol, price }) => (
            <Square
              key={symbol}
              onClick={() => handleSquare(symbol, price)}
              className={`${styles[size]} ${
                symbol == selectedSize && styles.squareSelected
              } ${styles.square}`}
            >
              {symbol}
            </Square>
          ))}
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
        <button className={styles.addToCart} onClick={handleAddToCart}>
          <FiShoppingBag /> Add to Cart
        </button>

        <span className={styles.price}>
          {loader ? (
            <Spinner size="small" margin="0 10px" strokeWidth={3} />
          ) : (
            <>
              {`$ ${data.price + multiplierNumber} ~`}
              <span className={styles.sumBuy}>
                {((data.price + multiplierNumber) * counter)?.toFixed(1)}
              </span>
            </>
          )}
        </span>
      </div>
    </Layout>
  );
}

export default Food;
const foodSize = [
  {
    size: "small",
    symbol: "S",
    price: -2,
  },
  {
    size: "medium",
    symbol: "M",
    price: 0,
  },
  {
    size: "large",
    symbol: "L",

    price: 1, // eslint-disable-line
  },
];
