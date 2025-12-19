import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrease = (item) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, amount: 1 } });
  };

  const handleDecrease = (item) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, amount: -1 } });
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>

                <div className="quantity-controls">
                  <button onClick={() => handleDecrease(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item)}>+</button>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <h2>Total Cost: ${totalCost}</h2>

          <div className="cart-actions">
            <button onClick={() => navigate("/products")}>
              Continue Shopping
            </button>
            <button className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
//css
.cart-container {
  padding: 20px;
}

.cart-card {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
}

.cart-card img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-details {
  flex: 1;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.quantity-controls button {
  padding: 5px 10px;
  font-size: 18px;
}

.delete-btn {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.cart-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cart-actions button {
  padding: 10px 20px;
  font-size: 16px;
}

.checkout-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
}
addItem(state, action) {
  const item = state.items.find(i => i.id === action.payload.id);
  if (item) {
    item.quantity += 1;
  } else {
    state.items.push({ ...action.payload, quantity: 1 });
  }
},

removeItem(state, action) {
  state.items = state.items.filter(item => item.id !== action.payload);
},

updateQuantity(state, action) {
  const item = state.items.find(i => i.id === action.payload.id);
  if (item) {
    item.quantity += action.payload.amount;
    if (item.quantity <= 0) {
      state.items = state.items.filter(i => i.id !== item.id);
    }
  }
}
