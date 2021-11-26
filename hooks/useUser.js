import { useContext } from "react";
import GlobalContext from "context/GlobalContext";
const useUser = () => {
  const context = useContext(GlobalContext);
  if (context === undefined)
    throw new Error("useUser must be used within a count provider");
  return context;
};

export default useUser;
