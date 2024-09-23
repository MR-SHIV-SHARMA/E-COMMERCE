import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./cartItem";
import { toggleStatusTab } from "../stores/cart";

const CartTab = () => {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();
  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };
  const totalAmount = carts.reduce((total, item) => {
    const itemPrice = item.price
      ? parseFloat(item.price.toString().replace("$", ""))
      : 0;
    const itemQuantity = item.quantity || 0;
    return total + itemPrice * itemQuantity;
  }, 0);

  return (
    <div
      className={`fixed z-20 top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500 pt-14
    ${statusTab === false ? "translate-x-full" : ""}
    `}
    >
      <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
      <div className="p-5 overflow-y-auto h-full scrollbar-hide">
        {carts.map((item, key) => (
          <CartItem key={key} data={item} />
        ))}
      </div>
      <div className="p-5 text-white text-xl">
        Total Amount: ${totalAmount.toFixed(2)}
      </div>
      <div className="grid grid-cols-2">
        <button
          className="bg-black text-white p-3"
          onClick={handleCloseTabCart}
        >
          CLOSE
        </button>
        <button className="bg-amber-600 text-white p-3">CHECKOUT</button>
      </div>
    </div>
  );
};

export default CartTab;
