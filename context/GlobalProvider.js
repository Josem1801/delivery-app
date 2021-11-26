import { useReducer } from "react";
import GlobalContext from "context/GlobalContext";
import appReducer from "context/appReducer";
const initialState = {
  user: false,
  cart: [],
  favorites: [],
};
function UserProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = { state, dispatch };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default UserProvider;
