import "../styles/globals.css";
import initAuth from "../initAuth"; // the module you created above
import { withAuthUser } from "next-firebase-auth";
import UserProvider from "context/GlobalProvider";

initAuth();
function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default withAuthUser()(MyApp);
