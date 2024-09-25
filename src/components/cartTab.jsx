import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem, { calculateTotalAmount } from "./cartItem";
import { toggleStatusTab } from "../stores/cart";
import { Man } from "../components/Man_Products_Api_Data/Man_Products_Api_Data";
import { Woman } from "../components/Woman_Products_Api_Data/Woman_Products_Api_Data";
import { Kids } from "../components/Kids_Products_Api_Data/Kids_Products_Api_Data";

const CartTab = () => {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const apiData = [...Man, ...Woman, ...Kids];
    const total = calculateTotalAmount(carts, apiData);
    setTotalAmount(total);
  }, [carts]);

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  return (
    <div
      className={`fixed z-20 top-0 right-0 bg-gray-700 shadow-2xl sm:w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500 pt-14
    ${statusTab === false ? "translate-x-full" : ""}
    `}
    >
      <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
      <div className="p-1 sm:p-5 overflow-y-auto h-full scrollbar-hide">
        {carts.map((item, key) => (
          <CartItem key={key} data={item} setTotalAmount={setTotalAmount} />
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
