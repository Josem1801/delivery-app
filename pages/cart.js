import FoodInCart from "@components/FoodInCart";
import HeaderBack from "@components/HeaderBack";
import Layout from "@components/Layout";
import { getFoodCart, deleteFoodCart } from "../firebase";
import { useAuthUser } from "next-firebase-auth";
import React, { memo, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Spinner from "@components/Spinner";

function Cart() {
  const authUser = useAuthUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  function handleDelete(food) {
    const filterCart = data.filter(({ name }) => name !== food);
    setData(filterCart);
    const newCart = filterCart.map(({ name }) => name);
    deleteFoodCart(newCart);
  }
  useEffect(() => {
    setLoading(true);
    getFoodCart().then((cart) => {
      setData(cart);
      setLoading(false);
    });
  }, []);
  if (!authUser.id) {
    return (
      <Layout background="white" header={false}>
        <HeaderBack
          white
          iconRight={<BsThreeDotsVertical fontSize={18} />}
          title="Cart"
        />
        <p style={{ textAlign: "center" }}>
          Inicia sesion para agregar cosas al carrito
        </p>
      </Layout>
    );
  }
  return (
    <Layout background="white" header={false}>
      <HeaderBack
        white
        iconRight={<BsThreeDotsVertical fontSize={18} />}
        title="Cart"
      />
      {loading ? (
        <Spinner />
      ) : data.length === 0 ? (
        "Aun no tienes nada en tu carrito :c"
      ) : (
        data.map(({ price, name, image }, idx) => (
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
