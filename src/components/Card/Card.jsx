import React from "react"; // React ko UI components banane ke liye import kiya gaya hai
import { AiOutlineShoppingCart } from "react-icons/ai"; // Shopping cart icon ko import kiya gaya hai, jo cart mein product add karne ke liye use hota hai
import { Link } from "react-router-dom"; // Product overview page par routing ke liye Link ko import kiya gaya hai

import { useSelector, useDispatch } from "react-redux"; // Redux store se state management ke liye useSelector aur useDispatch ko import kiya gaya hai

import { addToCart } from "../../stores/cart"; // Cart mein product add karne ke liye action creator ko import kiya gaya hai

const Card = (props) => {
  // Card component ko define kiya gaya hai, jo product details ko display karega

  // // Redux store se cart items ko prapt karne ke liye useSelector ka istemal kiya gaya hai

  // const carts = useSelector((store) => store.cart.items); // Cart items ko store se prapt karne ka code comment kiya gaya hai

  // props.data se product details ko destructure kiya gaya hai

  const { id, title, price, images, slug } = props.data; // Product ke id, title, price, images, aur slug ko prapt kiya gaya hai

  // Dispatch function ko prapt karne ke liye useDispatch ka istemal kiya gaya hai

  const dispatch = useDispatch(); // Dispatch function ko prapt kiya gaya hai, jo actions ko dispatch karne ke liye use hota hai
  // Cart mein product add karne ke liye function define kiya gaya hai

  const handleAddToCart = () => {
    // handleAddToCart function ko define kiya gaya hai

    // Product ID aur quantity ke saath addToCart action ko dispatch kiya gaya hai
    dispatch(
      addToCart({
        // addToCart action ko call kiya gaya hai

        productId: id, // Product ID ko pass kiya gaya hai

        quantity: 1, // Quantity ko 1 set kiya gaya hai
      })
    );
  };

  return (
    <div className="container flex flex-col items-center shadow-2xl sm:shadow-none my-2 image-container">
      <div className="h-[350px] rounded-t-md overflow-hidden">
        <Link to={`/ProductOverviews/${id}`}>
          <div className="flex items-center justify-center h-[350px] w-full rounded-t-md overflow-hidden">
            <img
              src={images}
              alt={title}
              className="w-full h-full object-contain sm:zoom-image"
            />
          </div>
        </Link>
      </div>
      <div className="w-[300px] sm:w-[230px] h-[60px] bg-white flex justify-between p-2 rounded-b-md shadow-md transition duration-300 ease-in-out transform hover:scale-110">
        <h1 className="text-sm font-semibold text-black">{title}</h1>
        <div className="flex flex-col justify-start items-end">
          <AiOutlineShoppingCart
            className="text-2xl text-black cursor-pointer"
            onClick={handleAddToCart}
          />
          <p className="text-base font-semibold text-black">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
