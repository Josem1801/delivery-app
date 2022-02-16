import FoodInCart from "@components/FoodInCart";
import HeaderBack from "@components/HeaderBack";
import Layout from "@components/Layout";
import { getFoodCart, deleteFoodCart, getUserData } from "@firebaseFunctions";
import Script from "next/script";
import React, { memo, useContext, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Spinner from "@components/Spinner";
import GlobalContext from "context/GlobalContext";
import Button from "@components/Button";
import { AuthAction, useAuthUser, withAuthUserSSR } from "next-firebase-auth";
export const getServerSideProps = withAuthUserSSR({
  whenAuthed: AuthAction.RENDER,
})(async (user) => {
  const userData = await getUserData(user.AuthUser.email);
  if (!userData) {
    return {
      props: {
        cart: [],
      },
    };
  }
  console.log(userData);
  return {
    props: {
      cart: userData.cart,
    },
  };
});
function Cart({ cart }) {
  const authUser = useAuthUser();
  const [userCartData, setUserCartData] = useState(cart);
  const { removeCart } = useContext(GlobalContext);
  if (!authUser.id) {
    return (
      <Layout>
        <div style={{ textAlign: "center" }}>
          Inicia sesion para agregar cosas al carrito
        </div>
      </Layout>
    );
  }

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
      },
    });
  }
  async function handleDelete(food) {
    const filterCart = userCartData.filter(({ name }) => name !== food);
    removeCart(filterCart);
    setUserCartData(filterCart);
    await deleteFoodCart(filterCart);
  }

  return (
    <Layout background="white" header={false}>
      <Script strategy="lazyOnload" src="https://sdk.mercadopago.com/js/v2" />
      <HeaderBack
        white
        iconRight={<BsThreeDotsVertical fontSize={18} />}
        title="Cart"
      />
      {userCartData.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Aun no tienes nada en tu carrito :c
        </p>
      ) : (
        userCartData.map(({ price, name, image, amount }, idx) => (
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
      {userCartData.length > 0 && (
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
