import { createContext, useContext } from "react";
import useFirebaseAuth from "";
const AuthUserContext = createContext({
  authUser: null,
  loading: false,
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
