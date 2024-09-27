import React, { useState, useEffect, useRef } from "react";
import { Man } from "../../components/Man_Products_Api_Data/Man_Products_Api_Data";
import { Woman } from "../Woman_Products_Api_Data/Woman_Products_Api_Data";
import { Kids } from "../Kids_Products_Api_Data/Kids_Products_Api_Data";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../stores/cart";

// Function to handle the search functionality
function Search(props) {
  // Get the current page location using React Router's useLocation hook.
  const location = useLocation();
  // Extract the URL parameters using URLSearchParams.
  const queryParams = new URLSearchParams(location.search);
  // Get the search query parameter from the URL, defaulting to an empty string if not found.
  const searchQuery = queryParams.get("query") || "";
  // Retrieve the cart items from the Redux store.
  const carts = useSelector((store) => store.cart.items);
  // Destructure the props data into individual properties.
  const { id, title, price, images, slug, brand, sub_category, category } =
    props.data;
  // Get the dispatch function from Redux to dispatch actions.
  const dispatch = useDispatch();
  // Define a handler function to add a product to the cart.
  const handleAddToCart = () => {
    // Dispatch the addToCart action with the product ID and quantity.
    dispatch(
      addToCart({
        productId: id, // The product ID
        quantity: 1, // The quantity is set to 1
      })
    );
  };

  return (
    <div className="container flex flex-col items-center shadow-2xl sm:shadow-none my-2 image-container">
      <div className="w-[300px] sm:w-[230px] sm:h-[350px] rounded-t-md overflow-hidden">
        <Link to={`/ProductOverviews/${id}`}>
          <div className="flex items-center justify-center h-[350px] w-full rounded-t-md overflow-hidden">
            <img
              src={images}
              alt={title}
              className="w-full h-full object-contain zoom-image"
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
}

// Function to get products based on search query
function getProducts() {
  // Using the useLocation hook to get the current location object
  const location = useLocation();
  // Creating a new URLSearchParams object from the location.search string
  const queryParams = new URLSearchParams(location.search);
  // Extracting the search query from the URL parameters, defaulting to an empty string if not found
  const searchQuery = queryParams.get("query") || ""; // Extracting search query from URL

  // Initializing state for filtered products with all products initially
  const [filteredProducts, setFilteredProducts] = useState(Man); // Initial state with all products

  // Initializing state for the current page number
  const [currentPage, setCurrentPage] = useState(1);
  // Setting the number of items to display per page
  const itemsPerPage = 10;

  // Effect to filter products based on search query
  useEffect(() => {
    // Initializing filtered products with all products
    let filtered = Man;

    // If there is a search query, filter products based on it
    if (searchQuery) {
      // Filtering products based on search query
      filtered = filtered.filter((item) => {
        // Converting product properties to lowercase for case-insensitive comparison
        const title = item.title ? item.title.toLowerCase() : "";
        const brand = item.brand ? item.brand.toLowerCase() : "";
        const sub_category = item.sub_category
          ? item.sub_category.toLowerCase()
          : "";
        const category = item.category ? item.category.toLowerCase() : "";
        const accessories = item.Accessories
          ? item.Accessories.toLowerCase()
          : "";
        // Checking if any of the product properties contain the search query
        return (
          title.includes(searchQuery.toLowerCase()) ||
          brand.includes(searchQuery.toLowerCase()) ||
          sub_category.includes(searchQuery.toLowerCase()) ||
          category.includes(searchQuery.toLowerCase()) ||
          accessories.includes(searchQuery.toLowerCase())
        );
      });
    }

    // Shuffling the filtered products array
    const shuffledFiltered = shuffleArray(filtered);
    // Updating the state with the shuffled filtered products
    setFilteredProducts(shuffledFiltered);
    // Resetting the current page to 1 whenever filters change
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [searchQuery]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    // Shuffling the array by mapping each item to an object, then mapping back to the original item
    return array.map((item) => ({ item })).map(({ item }) => item);
  };

  // Calculating the total number of items
  const totalItems = filteredProducts.length;
  // Calculating the total number of pages based on items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // Calculating the start index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  // Slicing the filtered products array to get the current page items
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Function to go to the next page
  const goToNextPage = () => {
    // Updating the current page to the next page, ensuring it doesn't exceed the total pages
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Function to go to the previous page
  const goToPreviousPage = () => {
    // Updating the current page to the previous page, ensuring it doesn't go below 1
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // State for the search query input
  const [searchQuerySearch, setSearchQuery] = useState("");

  // Function to handle input change and key press for search
  const handleInputChange = (e) => {
    // Updating the search query state with the input value
    setSearchQuery(e.target.value);
    // Converting the search query to lowercase for case-insensitive comparison
    const searchQuerySearch = e.target.value.toLowerCase();
    // Filtering data based on the search query
    const filteredData = [...Man, ...Woman, ...Kids].filter((item) => {
      if (item) {
        // Converting product properties to lowercase for case-insensitive comparison
        const title = item.title ? item.title.toLowerCase() : "";
        const brand = item.brand ? item.brand.toLowerCase() : "";
        const subCategory = item.sub_category
          ? item.sub_category.toLowerCase()
          : "";
        const category = item.category ? item.category.toLowerCase() : "";
        // Checking if any of the product properties contain the search query
        return (
          title.includes(searchQuerySearch) ||
          brand.includes(searchQuerySearch) ||
          subCategory.includes(searchQuerySearch) ||
          category.includes(searchQuerySearch)
        );
      }
      return false;
    });
    // If Enter key is pressed and there are filtered data, redirect to the search page with the query
    if (filteredData.length > 0 && e.key === "Enter") {
      const url = `/search?query=${searchQuerySearch}`; // Redirect to search page with query
      window.location.href = url;
    } else if (e.key === "Enter" && filteredData.length === 0) {
      console.log("No results found.");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-white">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-center pt-2 sm:mt-4">
          Search
        </h1>
        <p className="text-base pt-1 font-medium text-center px-4 sm:px-8">
          Here's the results of your search
        </p>
      </div>

      <div className="flex items-center justify-center px-5 bg-white pt-9">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuerySearch}
          onChange={handleInputChange}
          onKeyDown={handleInputChange}
          className="border-2 border-gray-300 bg-white h-10 sm:h-14 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
        />
      </div>

      <div className="flex flex-wrap justify-around pt-8 pb-4 bg-white">
        {currentItems.map((product, Key) => (
          <div
            key={product.id}
            className="sm:w-11/12 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
          >
            <Search key={Key} data={product} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center bg-white space-x-2 pb-4 px-8">
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
