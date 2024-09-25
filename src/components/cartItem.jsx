import React, { useState, useEffect } from "react";
import { Man } from "../components/Man_Products_Api_Data/Man_Products_Api_Data";
import { Woman } from "../components/Woman_Products_Api_Data/Woman_Products_Api_Data";
import { Kids } from "../components/Kids_Products_Api_Data/Kids_Products_Api_Data";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity } from "../stores/cart";

export const calculateTotalAmount = (carts, apiData) => {
  return carts.reduce((sum, item) => {
    const itemDetail = apiData.find((product) => product.id === item.productId);
    return sum + (itemDetail ? itemDetail.price * item.quantity : 0);
  }, 0);
};

const CartItem = (props) => {
  const apiData = [...Man, ...Woman, ...Kids];
  const { productId, quantity } = props.data;
  const [detail, setDetail] = useState(null);
  const dispatch = useDispatch();
  const carts = useSelector((store) => store.cart.items);

  useEffect(() => {
    const findDetail = apiData.find((product) => product.id === productId);
    setDetail(findDetail || {});
  }, [productId]);

  useEffect(() => {
    const total = calculateTotalAmount(carts, apiData);
    props.setTotalAmount(total);
  }, [carts, apiData]);

  const handleMinusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity - 1,
      })
    );
  };

  const handlePlusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity + 1,
      })
    );
  };

  return (
    <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-2 sm:gap-5 rounded-md">
      {detail && (
        <>
          <img src={detail.images} alt="" className="w-12" />
          <h3>{detail.title}</h3>
          <p>${detail.price * quantity}</p>
        </>
      )}
      <div className="w-20 flex justify-between gap-2">
        <button
          className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600"
          onClick={handleMinusQuantity}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600"
          onClick={handlePlusQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
