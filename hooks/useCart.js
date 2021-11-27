import { useContext, useEffect } from "react";
import GlobalContext from "context/GlobalContext";

function useCart() {
  const { state, dispatch } = useContext(GlobalContext);
  useEffect(() => {}, []);
  return { state, addFoodToCart };
}

export default useCart;
