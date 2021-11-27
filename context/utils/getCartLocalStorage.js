import { useEffect, useState } from "react";

export default function GetCartLocalStorage() {
  if (typeof window !== "undefined") {
    const cart = window.localStorage.getItem("CART");
    if (cart) {
      return JSON.parse(cart);
    } else {
      window.localStorage.setItem("CART", JSON.stringify([]));
    }
  }
}
