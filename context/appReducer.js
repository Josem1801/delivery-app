function appReducer(state, action) {
  const { type } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_CART":
      return {
        ...state,
        cart: [action.payload, ...state.card],
      };
    default:
      break;
  }
}
