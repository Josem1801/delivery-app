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
      return state.cart.filter((name) => name !== payload);
    case "SET_CART":
      return { ...state, cart: payload };
    default:
      break;
  }
}
export default appReducer;
