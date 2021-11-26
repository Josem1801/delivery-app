import { useContext } from "react";
import GlobalContext from "context/GlobalContext";

function useCart() {
  const { state, dispatch } = useContext(GlobalContext);
  function addFoodToCart(foodName) {
    dispatch({ payload: foodName, type: "ADD_CART" });
  }

  return { state, addFoodToCart };
}

export default useCart;
