import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getFirestore,
  getDocs,
  getDoc,
  collection,
  setDoc,
  where,
  query,
  doc,
  collectionGroup,
} from "firebase/firestore";
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
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
async function getCategoryFood(db, category = "burgers") {
  const foodCol = collection(db, `categorys/${category}/products`);
  const docs = await getDocs(foodCol);
  const foodCategory = docs.docs.map((category) => category.data());
  return foodCategory;
}

async function loginWithEmailAndPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential;
  } catch (err) {
    return err;
  }
}

async function loginWithGoogle() {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    throw error;
  }
}

async function createUser(email, password, name, lastname) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user) {
      updateProfile(userCredential.user, {
        displayName: `${name} ${lastname}`,
      });
    }
    return userCredential;
  } catch (error) {
    return error;
  }
}

async function getFoodByCollectionAndName(category, name) {
  const foodCol = collection(db, "categorys", category, "products");
  const q = query(foodCol, where("name", "==", name));
  const foodDoc = await getDocs(q);
  const food = foodDoc.docs.map((doc) => {
    return doc.data();
  });
  return food[0];
}
async function getFoodByName(name) {
  try {
    // const foodCol = collection(db, "categorys", "burgers", "products");
    // const foodDoc = doc(foodCol, "Yb49B3vcuHYkezBqimC6");
    // const data = await getDoc(foodDoc);

    const food = query(
      collectionGroup(db, "products"),
      where("name", "==", "Chipotle Cheesy chicken")
    );

    const data = await getDocs(food);
    const result = data.docs.map((data) => data.data());
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function addFoodToCartDB(product) {
  const foodCol = collection(db, "users");
  const userDoc = doc(foodCol, auth.currentUser.uid);
  const data = await setDoc(userDoc, {
    cart: [product],
  });
  console.log(data);
}
export {
  app,
  db,
  storage,
  auth,
  addFoodToCartDB,
  getFoodByName,
  getCategoryFood,
  getFoodByCollectionAndName,
  loginWithEmailAndPassword,
  createUser,
  loginWithGoogle,
};
