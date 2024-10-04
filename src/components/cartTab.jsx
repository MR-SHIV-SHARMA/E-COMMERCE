import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../stores/cart";
import { Man } from "../components/Man_Products_Api_Data/Man_Products_Api_Data";
import { Woman } from "../components/Woman_Products_Api_Data/Woman_Products_Api_Data";
import { Kids } from "../components/Kids_Products_Api_Data/Kids_Products_Api_Data";
import { changeQuantity } from "../stores/cart";
import { Link } from "react-router-dom";

const CartTab = () => {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);

  useEffect(() => {
    const apiData = [...Man, ...Woman, ...Kids];
    const total = calculateTotalAmount(carts, apiData);
    const discount = calculateDiscountAmount(carts, apiData);
    setTotalAmount(total);
    setPriceAfterDiscount(discount);
  }, [carts]);

  const [totalQuantity, setTotalQuantity] = useState(0);
  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]);

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  return (
    <>
      <div class="mx-auto max-w-7xl px-2 lg:px-0">
        <div class="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              class="rounded-lg bg-white lg:col-span-8"
            >
              {carts.map((item, key) => (
                <CartItem
                  key={key}
                  data={item}
                  setTotalAmount={setTotalAmount}
                />
              ))}
            </section>

            <section
              aria-labelledby="summary-heading"
              class="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                class=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl class=" space-y-1 px-2 py-4">
                  <div class="flex items-center justify-between">
                    <dt class="text-sm text-gray-800">
                      Price ({totalQuantity} item)
                    </dt>
                    <dd class="text-sm font-medium text-gray-900">
                      $ {totalAmount.toFixed(2)}
                    </dd>
                  </div>
                  <div class="flex items-center justify-between pt-4">
                    <dt class="flex items-center text-sm text-gray-800">
                      <span>Discount</span>
                    </dt>
                    <dd class="text-sm font-medium text-green-700">
                      - $ {(totalAmount - priceAfterDiscount).toFixed(2)}
                    </dd>
                  </div>
                  <div class="flex items-center justify-between py-4">
                    <dt class="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd class="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div class="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt class="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd class="text-base font-medium text-gray-900">
                      ${priceAfterDiscount}
                    </dd>
                  </div>
                </dl>
                <div class="px-2 pb-4 font-medium text-green-700">
                  You will save ${" "}
                  {(totalAmount - priceAfterDiscount).toFixed(2)} on this order
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 sm:px-6">
                <div className="mt-6">
                  <Link
                    to="CheckOutPage"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <button
                      type="button"
                      className="font-medium pl-2 pb-4 text-indigo-600 hover:text-indigo-500"
                    >
                      <Link to="OrderDetailsForm">Continue Shopping</Link>
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default CartTab;

export const calculateTotalAmount = (carts, apiData) => {
  return carts.reduce((sum, item) => {
    const itemDetail = apiData.find((product) => product.id === item.productId);
    return sum + (itemDetail ? itemDetail.price * item.quantity : 0);
  }, 0);
};

export const calculateDiscountAmount = (carts, apiData) => {
  return carts
    .reduce((sum, item) => {
      const itemDetail = apiData.find(
        (product) => product.id === item.productId
      );
      return (
        sum +
        (itemDetail
          ? (itemDetail.price *
              item.quantity *
              (100 - itemDetail.discountPercentage)) /
            100
          : 0)
      );
    }, 0)
    .toFixed(2);
};

export const CartItem = (props) => {
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

  const handleRemoveQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId,
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
    <>
      <h2 id="cart-heading" class="sr-only">
        Items in your shopping cart
      </h2>
      <ul role="list" class="divide-y divide-gray-200">
        <div class="">
          {detail && (
            <li class="flex py-6 sm:py-6 ">
              <div class="flex-shrink-0">
                <img
                  src={detail.images}
                  alt="Nike Air Force 1 07 LV8"
                  class="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                />
              </div>
              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a href="#" class="font-semibold text-black">
                          {detail.title}
                        </a>
                      </h3>
                    </div>
                    <div class="mt-1 flex text-sm">
                      <p class="text-sm text-gray-500">Orange</p>
                      <p class="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                        8 UK
                      </p>
                    </div>
                    <div class="mt-1 flex items-end">
                      <p class="text-xs font-medium text-gray-500 line-through">
                        $ {detail.price * quantity}
                      </p>
                      <p class="text-sm font-medium text-gray-900 px-2">
                        {(
                          detail.price -
                          (detail.price * detail.discountPercentage) / 100
                        ).toFixed(2)}
                      </p>
                      <p class="text-sm font-medium text-green-500">
                        {detail.discountPercentage}% Off
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )}
          <div class="mb-2 flex">
            <div class="min-w-24 flex">
              <button
                type="button"
                class="h-7 w-7"
                onClick={handleMinusQuantity}
              >
                -
              </button>
              <input
                type="text"
                class="mx-1 h-7 w-9 rounded-md border text-center"
                value={quantity}
              />
              <button
                type="button"
                class="flex h-7 w-7 items-center justify-center"
                onClick={handlePlusQuantity}
              >
                +
              </button>
            </div>
            <div class="ml-6 flex text-sm">
              <button
                type="button"
                class="flex items-center space-x-1 px-2 py-1 pl-0"
                onClick={handleRemoveQuantity}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-red-500"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                <span class="text-xs font-medium text-red-500">Remove</span>
              </button>
            </div>
          </div>
        </div>
      </ul>
      <hr className="border-gray-600" />
    </>
  );
};
