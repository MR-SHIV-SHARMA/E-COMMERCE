import React from "react"; // Importing React for building UI components
import { AiOutlineShoppingCart } from "react-icons/ai"; // Importing the shopping cart icon for adding to cart functionality
import { Link } from "react-router-dom"; // Importing Link for routing to product overview page
import { useSelector, useDispatch } from "react-redux"; // Importing useSelector and useDispatch for state management
import { addToCart } from "../../stores/cart"; // Importing the action creator for adding to cart

const Card = (props) => {
  // Using useSelector to get the cart items from the Redux store
  const carts = useSelector((store) => store.cart.items);
  // Destructuring props.data to get product details
  const { id, title, price, images, slug } = props.data;
  // Using useDispatch to get the dispatch function for dispatching actions
  const dispatch = useDispatch();
  // Function to handle adding a product to the cart
  const handleAddToCart = () => {
    // Dispatching the addToCart action with product ID and quantity
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
  };
  // JSX for rendering the product card
  return (
    <div className="container flex flex-col items-center shadow-2xl sm:shadow-none my-2 image-container">
      <div className="w-[300px] sm:w-[230px] sm:h-[350px] rounded-t-md overflow-hidden">
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
      <div className="w-[300px] sm:w-[230px] h-[60px] bg-white flex justify-between p-2 rounded-b-md">
        <h1 className="text-sm font-semibold text-black">{title}</h1>
        <div className="flex flex-col justify-start">
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
