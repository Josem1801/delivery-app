import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const options = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/account/login",
    signOut: "/account",
  },
};

export default function (req, res) {
  setNextAuthUrl(req);
  NextAuth(req, res, options);
}
function setNextAuthUrl(req) {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = req.headers["host"];

  if (!host) {
    throw new Error(
      `The request has no host header which breaks authentication and authorization.`
    );
  }

  process.env.NEXTAUTH_URL = `${protocol}://${host}`;

  console.log("set envar NEXTAUTH_URL=%s", process.env.NEXTAUTH_URL);
}
