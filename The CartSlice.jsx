// Initial state of the cart
const initialState = {
  cartItems: []
};

// Reducer function
const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_ITEM":
      return addItem(state, action.payload);

    case "REMOVE_ITEM":
      return removeItem(state, action.payload);

    case "UPDATE_QUANTITY":
      return updateQuantity(state, action.payload);

    default:
      return state;
  }
};

/* =========================
   Reducer Helper Functions
   ========================= */

// Add item to cart
const addItem = (state, item) => {
  const existingItem = state.cartItems.find(
    cartItem => cartItem.id === item.id
  );

  if (existingItem) {
    return {
      ...state,
      cartItems: state.cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    };
  }

  return {
    ...state,
    cartItems: [...state.cartItems, { ...item, quantity: 1 }]
  };
};

// Remove item from cart
const removeItem = (state, itemId) => {
  return {
    ...state,
    cartItems: state.cartItems.filter(item => item.id !== itemId)
  };
};

// Update item quantity
const updateQuantity = (state, { itemId, amount }) => {
  return {
    ...state,
    cartItems: state.cartItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    )
  };
};

export default cartReducer;
