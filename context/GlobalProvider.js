import { useReducer, useEffect, memo } from "react";
import GlobalContext from "context/GlobalContext";
import appReducer from "context/appReducer";
import { getFoodCartArr } from "@firebaseFunctions";
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
  function addFavorite(food) {
    dispatch({ payload: food, type: "ADD_FAVORITE" });
  }

  function removeFavorite(food) {
    dispatch({ payload: food, type: "REMOVE_FAVORITE" });
  }
  
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
