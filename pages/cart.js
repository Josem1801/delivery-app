import FoodInCart from "@components/FoodInCart";
import HeaderBack from "@components/HeaderBack";
import Layout from "@components/Layout";
import { getFoodByName } from "../firebase";
import { useAuthUser } from "next-firebase-auth";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Spinner from "@components/Spinner";

function Cart() {
  const authUser = useAuthUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getFoodByName().then((food) => {
      setData(food);
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
      {loading && data[0] ? (
        <Spinner />
      ) : (
        data.map(({ price, name, image }, idx) => (
          <FoodInCart key={idx} price={price} name={name} image={image} />
        ))
      )}
    </Layout>
  );
}

export default Cart;
