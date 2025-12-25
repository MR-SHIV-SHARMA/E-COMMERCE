import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/cart";

const Card = (props) => {
  const { id, title, price, images } = props.data;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
  };

  return (
    <div className="flex flex-col items-center shadow-lg sm:shadow-none my-2 w-full max-w-xs mx-auto">
      <div className="w-full aspect-square md:aspect-[3/4] rounded-t-lg overflow-hidden">
        <Link to={`/ProductOverviews/${id}`}>
          <div className="flex items-center justify-center h-full w-full">
            <img
              src={images}
              alt={title}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
      </div>
      <div className="w-full bg-white flex justify-between items-center p-3 rounded-b-lg shadow-md">
        <h1 className="text-sm sm:text-base font-medium text-black truncate max-w-[60%]">
          {title}
        </h1>
        <div className="flex items-center space-x-2">
          <p className="text-base font-semibold text-black">${price}</p>
          <AiOutlineShoppingCart
            className="text-xl sm:text-2xl text-black cursor-pointer hover:text-gray-600"
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
