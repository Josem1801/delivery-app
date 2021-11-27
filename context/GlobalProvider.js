import { useReducer } from "react";
import GlobalContext from "context/GlobalContext";
import appReducer from "context/appReducer";
import { getFoodCartArr } from "../firebase";
import GetLocalStorage from "./utils/getLocalStorage";
import { KEY_CART, KEY_FAVORITES } from "./utils/types";

function UserProvider({ children }) {
  const initialState = {
    user: false,
    cart: GetLocalStorage(KEY_CART),
    favorites: GetLocalStorage(KEY_FAVORITES),
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  function addToCart(food) {
    dispatch({ payload: food, type: "ADD_CART" });
  }
  function removeCart(food) {
    dispatch({ payload: food, type: "REMOVE_CART" });
  }
  async function getCart() {
    try {
      const data = await getFoodCartArr();

      dispatch({ payload: data, type: "SET_CART" });
      if (data !== undefined) return data;
    } catch (error) {}
  }
  function addFavorites(food) {
    dispatch({ payload: food, type: "ADD_FAVORITES" });
  }
  function getFavorites(food) {
    dispatch({ payload: food, type: "ADD_FAVORITES" });
  }
  function removeFavorites(food) {
    dispatch({ payload: food, type: "ADD_FAVORITES" });
  }
  const value = {
    cart: state.cart,
    favorites: state.favorites,
    getFavorites,
    removeFavorites,
    addFavorites,
    getCart,
    addToCart,
    removeCart,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default UserProvider;
