import FoodInCart from "@components/FoodInCart";
import HeaderBack from "@components/HeaderBack";
import Layout from "@components/Layout";
import { getFoodCart, deleteFoodCart } from "@firebaseFunctions";
import Script from "next/script";
import React, { memo, useContext, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Spinner from "@components/Spinner";
import setLocalStorage from "context/utils/setLocalStorage";
import { KEY_CART } from "context/utils/types";
import GlobalContext from "context/GlobalContext";
import Button from "@components/Button";
import { useAuthUser } from "next-firebase-auth";
function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { removeCart, cart } = useContext(GlobalContext);
  const authUser = useAuthUser();
  let mercadopago;

  function handleCheckout(e) {
    mercadopago = new MercadoPago(
      process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_API,
      {
        locale: "es-MX", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
      }
    );
    e.preventDefault();
    const orderData = {
      quantity: 1,
      description: "Beautiful product",
      price: "10",
    };
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        return res.json();
      })
      .then((preference) => {
        createCheckoutButton(preference.id);
      })
      .catch((err) => {
        alert("Error");
        console.log(err);
      });
  }
  function createCheckoutButton(preferenceId) {
    mercadopago.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: ".checkout",
        label: "Pagar",
      },
    });
  }
  function handleDelete(food) {
    const filterCart = data.filter(({ name }) => name !== food);
    setData(filterCart);
    const newCart = filterCart.map(({ name }) => name);
    deleteFoodCart(newCart);
    removeCart(filterCart);
    setLocalStorage(KEY_CART, newCart);
  }

  return (
    <Layout background="white" header={false}>
      <Script strategy="lazyOnload" src="https://sdk.mercadopago.com/js/v2" />
      <HeaderBack
        white
        iconRight={<BsThreeDotsVertical fontSize={18} />}
        title="Cart"
      />
      {loading ? (
        <Spinner />
      ) : cart?.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Aun no tienes nada en tu carrito :c
        </p>
      ) : (
        cart?.map(({ price, name, image, amount }, idx) => (
          <FoodInCart
            key={idx}
            price={price}
            name={name}
            image={image}
            initialCounter={amount}
            handleDelete={handleDelete}
          />
        ))
      )}
      {cart?.length > 0 && (
        <>
          <form onSubmit={handleCheckout}>
            <Button className="checkout" width="100%" height="50px">
              Pagar
            </Button>
          </form>
        </>
      )}
    </Layout>
  );
}

export default memo(Cart);
