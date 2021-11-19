import { initializeApp } from "firebase/app";
import "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "delivery-app-7ccb2.appspot.com",
  messagingSenderId: "692813078809",
  appId: "1:692813078809:web:2bfc79d6791d2b56e7a588",
  measurementId: "G-RYVK3SFLJV",
};

const app = initializeApp(firebaseConfig);

export default app;
