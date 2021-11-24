import { useReducer } from "react";
import GlobalContext from "context/GlobalContext";
useReducer;
const initialState = {
  user: false,
  cart: [],
  favorites: [],
};
function GlobalProvider({ children }) {
  const [state, payload] = useReducer(appReducer, initialState);
  const value = { state, payload };
  
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalProvider;
