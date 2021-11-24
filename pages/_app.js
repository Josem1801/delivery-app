import "../styles/globals.css";

import initAuth from "../initAuth"; // the module you created above
import { withAuthUser } from "next-firebase-auth";

initAuth();
function MyApp({ Component, pageProps: { ...pageProps } }) {
  return <Component {...pageProps} />;
}

export default withAuthUser()(MyApp);
