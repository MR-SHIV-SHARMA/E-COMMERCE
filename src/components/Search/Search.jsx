import React, { useState, useEffect } from "react";
import { Man } from "../../components/Man_Products_Api_Data/Man_Products_Api_Data";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../stores/cart";

function Search(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || ""; // Search query from URL
  const carts = useSelector((store) => store.cart.items);
  const { id, title, price, images, slug, brand, sub_category, category } =
    props.data;
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
    <div className="container flex flex-col items-center bg-zinc-300">
      <div className="w-[300px] sm:w-[230px] sm:h-[350px] rounded-t-md overflow-hidden image-container">
        <Link to={`/ProductOverviews/${id}`}>
          <div className="flex items-center justify-center h-[350px] w-full rounded-t-md overflow-hidden">
            <img
              src={images}
              alt={title}
              className="w-full h-full object-cover zoom-image"
            />
          </div>
        </Link>
      </div>
      <div className="w-[300px] sm:w-[230px] h-[60px] bg-white flex justify-between p-2 rounded-b-md mb-4">
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
}

function getProducts() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || ""; // Search query from URL

  const [filteredProducts, setFilteredProducts] = useState(Man); // Initial state with all products

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    let filtered = Man;

    if (searchQuery) {
      filtered = filtered.filter((item) => {
        const title = item.title ? item.title.toLowerCase() : "";
        const brand = item.brand ? item.brand.toLowerCase() : "";
        const sub_category = item.sub_category
          ? item.sub_category.toLowerCase()
          : "";
        const category = item.category ? item.category.toLowerCase() : "";
        const accessories = item.Accessories
          ? item.Accessories.toLowerCase()
          : "";
        return (
          title.includes(searchQuery.toLowerCase()) ||
          brand.includes(searchQuery.toLowerCase()) ||
          sub_category.includes(searchQuery.toLowerCase()) ||
          category.includes(searchQuery.toLowerCase()) ||
          accessories.includes(searchQuery.toLowerCase())
        );
      });
    }

    const shuffledFiltered = shuffleArray(filtered);
    setFilteredProducts(shuffledFiltered);
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [searchQuery]);

  const shuffleArray = (array) => {
    return array.map((item) => ({ item })).map(({ item }) => item);
  };

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-zinc-300">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-center pt-2 sm:mt-4">
          Search
        </h1>
        <p className="text-base pt-1 font-medium text-center px-4 sm:px-8">
          Here's the results of your search
        </p>
      </div>

      <div className="flex items-center justify-center px-5 bg-zinc-300 pt-9">
        <input
          type="text"
          placeholder="Search..."
          className="border-2 border-gray-300 bg-white h-10 sm:h-14 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-around pt-8 pb-4 bg-zinc-300">
        {currentItems.map((product, Key) => (
          <div
            key={product.id}
            className="sm:w-11/12 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
          >
            <Search key={Key} data={product} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center bg-zinc-300 space-x-2 pb-4 px-8">
        <span className="text-black">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex space-x-2">
          <button
            className="flex items-center px-4 py-2 text-black border border-black rounded hover:bg-black hover:text-white transition duration-300 ease-in-out active:scale-95"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            {/* Left Arrow Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Prev
          </button>
          <button
            className="flex items-center px-4 py-2 text-black border border-black rounded hover:bg-black hover:text-white transition duration-300 ease-in-out active:scale-95"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            {/* Right Arrow Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default getProducts;
