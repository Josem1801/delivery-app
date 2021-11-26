function appReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };
    case "ADD_CART":
      return { ...state, cart: [...state.cart, payload] };
    default:
      break;
  }
}
export default appReducer;
