import React, { useContext, useEffect, useState } from "react";
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
import GlobalContext from "context/GlobalContext";
import { FaHeart } from "react-icons/fa";
import setLocalStorage from "context/utils/setLocalStorage";
import { KEY_CART, KEY_FAVORITES } from "context/utils/types";

function Food() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [counter, setCounter] = useState(1);
  const [multiplierNumber, setMultiplierNumber] = useState(0);

  const authUser = useAuthUser();
  const { addToCart, cart, favorites, removeFavorite, addFavorite } =
    useContext(GlobalContext);
  const food = useRouter().query.food;
  const category = useRouter().query.category;

  async function handleFavorite() {
    if (authUser.id) {
      await addFoodToFavoritesDB({ name: data.name, category });
    }
    addFavorite({ name: data.name, category });
    setLocalStorage(KEY_FAVORITES, [
      ...favorites,
      { name: data.name, category },
    ]);
  }

  function itsInFavorite(nameFood) {
    return favorites?.some(({ name }) => name === nameFood);
  }
  async function handleFavoriteRemove() {
    const filterFavorite = favorites.filter(({ name }) => name !== data.name);

    if (authUser.id) {
      deleteFoodCart(newCart);
    }

    removeFavorite(data.name);
    setLocalStorage(KEY_FAVORITES, filterFavorite);
  }
  function handleSquare(symbol, price) {
    setSelectedSize(symbol);
    setMultiplierNumber(price);
  }

  async function handleAddToCart() {
    if (authUser.id) {
      await addFoodToCartDB(data.name);
    }
    addToCart(data.name);
    setLocalStorage(KEY_CART, [...cart, data.name]);
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
        iconRight={
          itsInFavorite(data.name) ? (
            <FaHeart
              onClick={handleFavoriteRemove}
              fontSize={23}
              color="#C8161D"
            />
          ) : (
            <BiHeart onClick={handleFavorite} fontSize={24} color="#C8161D" />
          )
        }
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
        <button
          disabled={cart?.includes(data.name)}
          className={styles.addToCart}
          onClick={handleAddToCart}
        >
          {cart?.includes(data.name) ? (
            "Añadido"
          ) : (
            <>
              <FiShoppingBag /> Add to Cart
            </>
          )}
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
