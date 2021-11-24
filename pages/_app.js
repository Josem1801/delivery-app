import "../styles/globals.css";

import initAuth from "../initAuth"; // the module you created above

initAuth();
function MyApp({ Component, pageProps: { ...pageProps } }) {
  return <Component {...pageProps} />;
}

export default MyApp;
