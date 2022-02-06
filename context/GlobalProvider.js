import { useReducer, useEffect, memo } from "react";
import GlobalContext from "context/GlobalContext";
import appReducer from "context/appReducer";
import { getFoodCartArr, getUserData } from "@firebaseFunctions";
import GetLocalStorage from "./utils/getLocalStorage";
import { KEY_CART, KEY_FAVORITES } from "./utils/types";
import { useAuthUser } from "next-firebase-auth";
const initialState = {
  cart: [],
  favorites: [],
};
function UserProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { email } = useAuthUser();

  function addToCart(food) {
    dispatch({ payload: food, type: "ADD_CART" });
  }
  function removeCart(food) {
    dispatch({ payload: food, type: "REMOVE_CART" });
  }
  function setCart(cart) {
    dispatch({ payload: cart, type: "SET_CART" });
  }
  function setFavorites(favorites) {
    dispatch({ payload: favorites, type: "SET_FAVORITES" });
  }
  async function getCart() {
    try {
      const data = await getFoodCartArr();

      dispatch({ payload: data, type: "SET_CART" });
      if (data !== undefined) {
        console.log(data);
        return data;
      }
    } catch (error) {}
  }
  function addFavorite(food) {
    dispatch({ payload: food, type: "ADD_FAVORITE" });
  }

  function removeFavorite(food) {
    dispatch({ payload: food, type: "REMOVE_FAVORITE" });
  }
  console.log(state);
  useEffect(() => {
    async function getInitialState() {
      const cartData = await getUserData(email);
      setCart(cartData.cart);
      setFavorites(cartData.favorites);
    }
    email && getInitialState();
  }, [email]);
  const value = {
    cart: state.cart,
    favorites: state.favorites,
    addFavorite,
    removeFavorite,
    addFavorite,
    getCart,
    addToCart,
    removeCart,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default memo(UserProvider);
