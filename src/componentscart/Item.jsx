import React, { useContext } from "react";
import  CartContext  from "./Cart";

const Item = (props) => {
  const Cart = useContext(CartContext);
  console.log("Cart", Cart);
  return (
    <div>
      <h4>{props.name}</h4>
      <p>Price: ${props.price}</p>
      <button
        onClick={() =>
          Cart.setItems([
            ...Cart.items,
            { name: props.name, price: props.price },
          ])
        }
      >
        Add To Cart
      </button>
    </div>
  );
};

export default Item;
