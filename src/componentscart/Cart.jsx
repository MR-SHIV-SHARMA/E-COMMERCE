import React, { useContext } from "react";

const Cart = () => {
  const Cart = useContext(CartContext);
  const total = Cart.items.reduce((a, b) => a + b.price, 0);
  return (
    <div>
      <h1>Cart</h1>
      {Cart &&
        Cart.items.map((item) => (
          <li>
            {item.name} - ${item.price}
          </li>
        ))}

      <h5>Total Bill: $</h5>
    </div>
  );
};
export default Cart;
