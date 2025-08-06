import { useState, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const newCart = { ...state.cart };
      if (newCart[action.data.id]) {
        if (newCart[action.data.id].qty >= 10) {
          return state;
        }

        newCart[action.data.id] = {
          ...newCart[action.data.id],
          qty: newCart[action.data.id].qty + 1,
        };
      } else {
        newCart[action.data.id] = action.data;
      }

      const totalPrice = Object.values(newCart).reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
      const updatedPrice =
        totalPrice > 100
          ? Math.floor(totalPrice - (totalPrice * 10) / 100)
          : totalPrice;

      return {
        ...state,
        cart: newCart,
        totalPrice: updatedPrice,
      };
    }

    case "REMOVE":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return 0;
  }
}

const initialState = {
  cart: {},
  items: [
    { id: "1", name: "Shirt", price: 20 },
    { id: "2", name: "Pants", price: 50 },
    { id: "3", name: "Hat", price: 15 },
  ],
  totalPrice: 0,
};

function ShoppingCart() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAdd = (pro) => {
    dispatch({ type: "ADD", data: { id: pro.id, price: pro.price, qty: 1 } });
  };

  console.log(state);

  return (
    <div>
      {state.items.map((it) => (
        <Product handleAdd={handleAdd} pro={it} />
      ))}
      <h1>Total Price: {state.totalPrice}/-</h1>
    </div>
  );
}

function Product({ pro, handleAdd }) {
  return (
    <div className="flex flex-col border border-gray-600 p-2 w-[300px] rounded-md mt-2">
      <h1>{pro.name}</h1>
      <span>💲{pro.price}</span>
      <button onClick={(e) => handleAdd(pro)}>Add to cart</button>
    </div>
  );
}

export default ShoppingCart;
