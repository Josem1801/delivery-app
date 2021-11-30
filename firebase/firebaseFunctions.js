import { db, auth } from "@firebase";
import {
  getDocs,
  getDoc,
  collection,
  setDoc,
  where,
  query,
  doc,
  collectionGroup,
  updateDoc,
  limit,
  startAfter,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

async function getCategoryFood(category = "burgers", limite, lastData) {
  const foodCol = query(
    collection(db, `categorys/${category}/products`),
    limit(limite)
  );
  const foodDocs = await getDocs(foodCol);
  const foodCategory = foodDocs.docs.map((category) => category.data());

  const lastVisible = foodDocs.docs[foodDocs.docs.length - 1];
  if (lastData) {
    const next = query(
      collection(db, `categorys/${category}/products`),
      startAfter(lastVisible),
      limit(limite)
    );
    const nextFood = await getDocs(next);
    const data = nextFood.docs.map((data) => data.data());
    return data;
  }

  return { data: foodCategory, lastVisible };
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
  if (!category && !name) return [];
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
    const food = query(
      collectionGroup(db, "products"),
      where("name", "==", name)
    );
    const data = await getDocs(food);
    const result = data.docs.map((data) => data.data());

    return result;
  } catch (err) {
    console.log(err);
  }
}

async function addFoodToCartDB(product) {
  try {
    const userDoc = doc(db, `users/${auth.currentUser.email}`);
    const currentData = await getUserData();
    const dataExist = currentData.cart.includes(product.name);
    if (dataExist) {
      throw "error";
    }
    const data = currentData.cart ? currentData.cart : "";
    await setDoc(userDoc, {
      ...currentData,
      cart: [product, ...data],
    });
    return product;
  } catch (err) {
    throw err;
  }
}
async function addFoodToFavoritesDB(product) {
  try {
    const userDoc = doc(db, `users/${auth.currentUser.email}`);
    const currentData = await getUserData();

    const data = currentData.favorites ? currentData.favorites : {};
    await setDoc(userDoc, {
      ...currentData,
      favorites: [product, ...data],
    });
    return product;
  } catch (err) {
    throw err;
  }
}
async function getUserData() {
  try {
    const userDoc = doc(db, `users/${auth.currentUser?.email}`);
    const userData = await getDoc(userDoc);
    if (!userData.exists()) {
      await setDoc(doc(db, `users/${auth.currentUser?.email}`), {
        cart: [],
        favorites: [],
      });
      const newUserData = await getDoc(userDoc);
      return newUserData.data();
    }
    return userData.data();
  } catch (err) {
    throw err;
  }
}

async function getFoodCart(dataNoLogin) {
  try {
    let data;
    data = await getUserData();
    if (!auth.currentUser) {
      data = dataNoLogin;
      const listOfFood = await Promise.all(
        data.map(async ({ name }) => {
          const food = await getFoodByName(name);
          return food[0];
        })
      );
      return listOfFood;
    }
    const listOfFood = await Promise.all(
      data.cart.map(async ({ name }) => {
        const food = await getFoodByName(name);
        return food[0];
      })
    );

    return listOfFood;
  } catch (error) {}
}

async function deleteFoodCart(newCart) {
  try {
    const userDoc = doc(db, `users/${auth.currentUser.email}`);
    await updateDoc(userDoc, { cart: newCart });
  } catch (error) {}
}

async function deleteFoodFavoriteDB(newCart) {
  try {
    const userDoc = doc(db, `users/${auth.currentUser.email}`);
    await updateDoc(userDoc, { favorites: newCart });
  } catch (error) {}
}

export {
  deleteFoodCart,
  deleteFoodFavoriteDB,
  addFoodToFavoritesDB,
  addFoodToCartDB,
  getUserData,
  getFoodCart,
  getFoodByName,
  getCategoryFood,
  getFoodByCollectionAndName,
  loginWithEmailAndPassword,
  createUser,
  loginWithGoogle,
};
