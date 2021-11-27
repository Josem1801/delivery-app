import { useReducer } from "react";
import GlobalContext from "context/GlobalContext";
import appReducer from "context/appReducer";
import { getFoodCartArr } from "../firebase";
import GetCartLocalStorage from "./utils/getCartLocalStorage";

function UserProvider({ children }) {
  const initialState = {
    user: false,
    cart: GetCartLocalStorage(),
    favorites: [],
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
  const value = {
    cart: state.cart,
    getCart,
    addToCart,
    removeCart,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default UserProvider;
