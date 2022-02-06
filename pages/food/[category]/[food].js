import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import {
  getFoodByCollectionAndName,
  addFoodToCartDB,
  addFoodToFavoritesDB,
  deleteFoodFavoriteDB,
  getUserData,
} from "@firebaseFunctions";
import Layout from "@components/Layout";
import HeaderBack from "@components/HeaderBack";
import { BiHeart } from "react-icons/bi";
import styles from "@stylesPages/Food.module.css";
import Image from "next/image";
import Square from "@components/Square";
import { FiShoppingBag } from "react-icons/fi";
import { useAuthUser } from "next-firebase-auth";
import GlobalContext from "context/GlobalContext";
import { FaHeart } from "react-icons/fa";
import { collectionGroup, getDocs } from "@firebase/firestore";
import { db } from "@firebase";

export const getStaticPaths = async () => {
  const foodGroup = collectionGroup(db, "products");
  const foodDocs = await getDocs(foodGroup);
  const foodSlug = foodDocs.docs.map((food) => ({
    params: {
      category: food.data().category,
      food: food.data().name,
    },
  }));

  return {
    paths: foodSlug,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  try {
    const category = params?.category;
    const name = params?.food;
    if (typeof category !== "string" || typeof name !== "string") {
      return {
        notFound: true,
      };
    }
    const foodData = await getFoodByCollectionAndName(category, name);
    return {
      props: {
        data: foodData,
      },
      notFound: false,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

function Food({ data }) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [counter, setCounter] = useState(1);
  const [multiplierNumber, setMultiplierNumber] = useState(0);

  const authUser = useAuthUser();
  const { addFavorite, favorites, cart, addToCart, removeFavorite } =
    useContext(GlobalContext);

  async function handleFavoriteRemove() {
    const filterFavorite = favorites.filter(({ name }) => name !== data.name);
    if (authUser.id) {
      await deleteFoodFavoriteDB(filterFavorite);
      removeFavorite(filterFavorite);
    }
  }

  async function handleAddFavorite() {
    if (authUser.id) {
      addFavorite({ name: data.name, category: data.category });
      await addFoodToFavoritesDB({ name: data.name, category: data.category });
      return;
    }
    alert("Inicia sesion para agregar favoritos");
  }

  async function handleAddToCart() {
    if (!itsInCart()) {
      const dataToCart = {
        name: data.name,
        amount: counter,
        price: (data.price + multiplierNumber)?.toFixed(1),
        image: data.image,
      };
      if (authUser.id) {
        addToCart(dataToCart);
        await addFoodToCartDB(dataToCart);
        return;
      }
      alert("inicia sesion para agregar al carrito");
    }
  }

  function itsInFavorite() {
    return favorites?.some(({ name }) => name === data.name);
  }

  function itsInCart() {
    return cart?.some(({ name }) => name === data.name);
  }

  function handleSquare(symbol, price) {
    setSelectedSize(symbol);
    setMultiplierNumber(price);
  }

  return (
    <Layout className={styles.container} header={false} navbar={false}>
      <HeaderBack
        background="white"
        iconRight={
          itsInFavorite() ? (
            <FaHeart
              onClick={handleFavoriteRemove}
              fontSize={23}
              color="#C8161D"
            />
          ) : (
            <BiHeart
              onClick={handleAddFavorite}
              fontSize={24}
              color="#C8161D"
            />
          )
        }
      />

      <div className={styles.text}>
        <h1>{data.name}</h1>
        <p>{data.description}</p>

        <div className={styles.image}>
          {data.image && (
            <Image src={data.image} alt={data.name} width={180} height={180} />
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
          disabled={itsInCart()}
          className={styles.addToCart}
          onClick={handleAddToCart}
        >
          {itsInCart() ? (
            "Añadido"
          ) : (
            <>
              <FiShoppingBag /> Add to Cart
            </>
          )}
        </button>

        <span className={styles.price}>
          {`$ ${data.price + multiplierNumber} ~`}
          <span className={styles.sumBuy}>
            {((data.price + multiplierNumber) * counter)?.toFixed(1)}
          </span>
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
