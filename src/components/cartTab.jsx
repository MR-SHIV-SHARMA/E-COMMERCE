import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../stores/cart";
import { Home } from "../components/Home_Products_Api_Data/Home_Products_Api_Data";
import { Man } from "../components/Man_Products_Api_Data/Man_Products_Api_Data";
import { Woman } from "../components/Woman_Products_Api_Data/Woman_Products_Api_Data";
import { Kids } from "../components/Kids_Products_Api_Data/Kids_Products_Api_Data";
import { changeQuantity } from "../stores/cart";
import { Link } from "react-router-dom";

// ... existing code ...
const CartTab = () => {
  // Redux store se cart items aur statusTab ko select karna
  // 'carts' variable mein store se cart ki items ko lete hain
  const carts = useSelector((store) => store.cart.items);

  // 'statusTab' variable mein store se current tab status ko lete hain
  const statusTab = useSelector((store) => store.cart.statusTab);

  // Redux dispatch function ko use karne ke liye hook
  const dispatch = useDispatch();

  // Total amount aur discount ke liye state variables
  // 'totalAmount' ko initial value 0 se set karte hain
  const [totalAmount, setTotalAmount] = useState(0);

  // 'priceAfterDiscount' ko initial value 0 se set karte hain
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);

  // Effect hook jo cart items ya apiData change hone par total amount aur discount calculate karta hai
  useEffect(() => {
    // 'apiData' mein sabhi product data ko ek array mein store karte hain
    const apiData = [...Man, ...Woman, ...Kids, ...Home];

    // 'calculateTotalAmount' function ko call karke total amount calculate karte hain
    const total = calculateTotalAmount(carts, apiData);

    // 'calculateDiscountAmount' function ko call karke discount calculate karte hain
    const discount = calculateDiscountAmount(carts, apiData);

    // Total amount ko state mein update karte hain
    setTotalAmount(total);

    // Discounted price ko state mein update karte hain
    setPriceAfterDiscount(discount);
  }, [carts]); // 'carts' ke change hone par ye effect chalega

  // Total quantity ke liye state variable
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Effect hook jo cart items change hone par total quantity calculate karta hai
  useEffect(() => {
    let total = 0; // Total quantity ko track karne ke liye variable
    // Har item ki quantity ko add karte hain
    carts.forEach((item) => (total += item.quantity));

    // Total quantity ko state mein update karte hain
    setTotalQuantity(total);
  }, [carts]); // 'carts' ke change hone par ye effect chalega

  // Cart tab ko close karne ke liye function
  const handleCloseTabCart = () => {
    // Redux action dispatch karte hain jo tab status ko toggle karega
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

// Total amount calculate karne ke liye function
export const calculateTotalAmount = (carts, apiData) => {
  // 'carts' array ko reduce method se iterate karte hain
  return carts.reduce((sum, item) => {
    // 'apiData' se item ki details ko dhoondte hain
    const itemDetail = apiData.find((product) => product.id === item.productId);

    // Agar itemDetail milta hai, to uski price aur quantity ka multiplication karte hain
    // Agar nahi milta, to 0 return karte hain
    return sum + (itemDetail ? itemDetail.price * item.quantity : 0);
  }, 0); // Initial sum ki value 0 hai
};

// Discount amount calculate karne ke liye function
export const calculateDiscountAmount = (carts, apiData) => {
  // 'carts' array ko reduce method se iterate karte hain
  return carts
    .reduce((sum, item) => {
      // 'apiData' se item ki details ko dhoondte hain
      const itemDetail = apiData.find(
        (product) => product.id === item.productId
      );

      // Agar itemDetail milta hai, to discount calculate karte hain
      return (
        sum +
        (itemDetail
          ? (itemDetail.price *
              item.quantity *
              (100 - itemDetail.discountPercentage)) /
            100 // Discounted price calculate karna
          : 0) // Agar nahi milta, to 0 return karte hain
      );
    }, 0) // Initial sum ki value 0 hai
    .toFixed(2); // Result ko 2 decimal places tak round karte hain
};

// Cart item ko represent karne ke liye component
export const CartItem = (props) => {
  // API se product data ko ek array mein store karte hain
  const apiData = [...Man, ...Woman, ...Kids, ...Home];

  // Props se productId aur quantity ko destructure karte hain
  const { productId, quantity } = props.data;

  // Item detail ko store karne ke liye state variable
  const [detail, setDetail] = useState(null);

  // Redux dispatch function ko use karne ke liye hook
  const dispatch = useDispatch();

  // Redux store se cart items ko select karna
  const carts = useSelector((store) => store.cart.items);

  // Effect hook jo productId change hone par item detail ko dhoondta hai
  useEffect(() => {
    // 'apiData' se product ki detail ko dhoondte hain
    const findDetail = apiData.find((product) => product.id === productId);

    // Detail ko state mein set karte hain
    setDetail(findDetail || {}); // Agar nahi milta, to empty object set karte hain
  }, [productId]); // productId ke change hone par ye effect chalega

  // Effect hook jo cart items ya apiData change hone par total amount ko update karta hai
  useEffect(() => {
    // Total amount calculate karte hain
    const total = calculateTotalAmount(carts, apiData);

    // Parent component ko total amount update karne ke liye call karte hain
    props.setTotalAmount(total);
  }, [carts, apiData]); // carts ya apiData ke change hone par ye effect chalega

  // Quantity ko kam karne ke liye function
  const handleMinusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId, // Product ID ko pass karte hain
        quantity: quantity - 1, // Quantity ko 1 se kam karte hain
      })
    );
  };

  // Quantity ko remove karne ke liye function
  const handleRemoveQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId, // Product ID ko pass karte hain
      })
    );
  };

  // Quantity ko badhane ke liye function
  const handlePlusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId, // Product ID ko pass karte hain
        quantity: quantity + 1, // Quantity ko 1 se badhate hain
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
