import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "delivery-app-7ccb2.appspot.com",
  messagingSenderId: "692813078809",
  appId: "1:692813078809:web:2bfc79d6791d2b56e7a588",
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage();

async function getCategoryFood(db, category = "burgers") {
  const foodCol = collection(db, `categorys/${category}/products`);
  const docs = await getDocs(foodCol);
  const foodCategory = docs.docs.map((category) => category.data());
  return foodCategory;
}

async function getFoodByName(
  db,
  category = "burgers",
  name = "Chipotle Cheesy chicken"
) {
  const foodCol = collection(db, "categorys", category, "products");
  const q = query(foodCol, where("name", "==", name));
  const foodDoc = await getDocs(q);
  const food = foodDoc.docs.map((doc) => {
    return doc.data();
  });
  return food[0];
}

export { app, db, storage, getCategoryFood, getFoodByName };
