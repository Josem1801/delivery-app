export default function setCartLocalStorage(data) {
  if (typeof window !== "undefined")
    window.localStorage.setItem("CART", JSON.stringify(data));
}
