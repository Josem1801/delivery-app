import FoodInCart from "@components/FoodInCart";
import HeaderBack from "@components/HeaderBack";
import Layout from "@components/Layout";
import { getFoodCart, deleteFoodCart } from "../firebase";
import { useAuthUser } from "next-firebase-auth";
import React, { memo, useContext, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Spinner from "@components/Spinner";
import setLocalStorage from "context/utils/setLocalStorage";
import { KEY_CART } from "context/utils/types";
import GlobalContext from "context/GlobalContext";

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { removeCart, cart } = useContext(GlobalContext);
  function handleDelete(food) {
    const filterCart = data.filter(({ name }) => name !== food);
    setData(filterCart);
    const newCart = filterCart.map(({ name }) => name);
    deleteFoodCart(newCart);
    removeCart(filterCart);
    setLocalStorage(KEY_CART, newCart);
  }
  useEffect(() => {
    setLoading(true);
    const getCart = async () => {
      const food = await getFoodCart(cart);
      setData(food);
      setLoading(false);
    };

    getCart();
  }, [cart]);

  return (
    <Layout background="white" header={false}>
      <HeaderBack
        white
        iconRight={<BsThreeDotsVertical fontSize={18} />}
        title="Cart"
      />
      {loading ? (
        <Spinner />
      ) : data?.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Aun no tienes nada en tu carrito :c
        </p>
      ) : (
        data?.map(({ price, name, image }, idx) => (
          <FoodInCart
            key={idx}
            price={price}
            name={name}
            image={image}
            handleDelete={handleDelete}
          />
        ))
      )}
    </Layout>
  );
}

export default memo(Cart);
