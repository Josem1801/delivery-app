function appReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };
    case "ADD_CART":
      if (payload === undefined) return { ...state };
      if (state.cart.includes(payload)) return { ...state };
      return { ...state, cart: [...state.cart, payload] };
    case "REMOVE_CART":
      return { ...state, cart: payload };
    case "SET_CART":
      return { ...state, cart: payload };
    default:
    case "SET_FAVORITES":
      return { ...state, favorites: payload };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: payload,
      };
    case "ADD_FAVORITE":
      if (payload === undefined) return { ...state };
      if (state.favorites.includes(payload.favorite)) return { ...state };
      return { ...state, favorites: [...state.favorites, payload] };
  }
}
export default appReducer;
