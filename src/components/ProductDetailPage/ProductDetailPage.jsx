import React, { useState, useEffect } from "react";
import { Home } from "../Home_Products_Api_Data/Home_Products_Api_Data";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../stores/cart";
import { Link } from "react-router-dom";

function ProductDetailPage(props) {
  const carts = useSelector((store) => store.cart.items);
  const {
    id,
    title,
    price,
    images,
    slug,
    sub_category,
    category,
    brand,
    rating,
    description,
    stock,
    discountPercentage,
  } = props.data;
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
    <>
      <div className="w-full p-2">
        <div className="flex flex-col md:flex-row gap-4 rounded-lg shadow-lg p-3 border-r border-l border-t border-b border-gray-300">
          <div className="w-full md:w-1/2">
            <Link to={`/ProductOverviews/${id}`}>
              <div className="image-container">
                <img
                  src={images}
                  alt={title}
                  className="w-full h-[350px] object-contain rounded-lg shadow-lg zoom-image"
                />
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <div className="flex flex-col space-y-2 h-[300px]">
              <div className="flex items-center">
                <span className="text-gray-600 text-xs font-medium pr-1">
                  {sub_category}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-xs font-medium pr-1">
                  Category:
                </span>
                <span
                  className="border border-gray-300 px-2 py-0.5 text-center rounded-full text-gray-800 font-semibold text-xs"
                  style={{ width: "fit-content" }}
                >
                  {category}
                </span>
              </div>
              <h2 className="text-sm font-bold text-gray-900">{title}</h2>
              <div className="text-gray-800 font-semibold text-xs">
                Brand: {brand}
              </div>
              <div className="text-gray-800 font-semibold text-xs">
                Rating: {rating} reviews
              </div>
              <div className="text-gray-800 font-semibold text-xs line-clamp-2">
                Description: {description}
              </div>
              <p className="text-sm font-bold text-gray-900">${price}</p>
              <div className="flex items-center gap-2">
                <label htmlFor="color" className="text-xs font-medium w-1/4">
                  Color:
                </label>
                <select
                  id="color"
                  className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none text-xs w-3/4"
                >
                  <option value="gray">Gray</option>
                  <option value="brown">Brown</option>
                  <option value="black">Black</option>
                </select>
              </div>
              <p className="text-xs font-medium">Stock: {stock}%</p>
              <div className="flex items-center gap-2">
                <label htmlFor="quantity" className="text-xs font-medium w-1/4">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  defaultValue="1"
                  className="border border-gray-300 rounded-lg px-2 py-1 w-1/4 focus:outline-none text-xs"
                />
              </div>
              <p className="text-xs font-medium">
                Discount: {discountPercentage}%
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 text-xs w-1/2 font-semibold shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Add to Cart
                </button>
                <button className="bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-2 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 text-xs w-1/2 font-semibold shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-500 my-4 mx-6" />
    </>
  );
}

function ProductDetailPagePage() {
  // State for selected filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedsub_category, setSelectedsub_category] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedRange, setSelectedRange] = useState("all"); // Price range filter
  const [selectedDiscount, setSelectedDiscount] = useState("all"); // Discount range filter
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState(Home);

  // Effect hook for updating filtered and recommended products when filters change
  useEffect(() => {
    let filtered = Home;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Filter by sub_category
    if (selectedsub_category !== "all") {
      filtered = filtered.filter(
        (item) => item.sub_category === selectedsub_category
      );
    }

    // Filter by brand
    if (selectedBrand !== "all") {
      filtered = filtered.filter((item) => item.brand === selectedBrand);
    }

    // Filter by price range
    if (selectedRange !== "all") {
      filtered = filtered.filter((item) => {
        const price = item.price;
        let minPrice = 0;
        let maxPrice = Infinity;

        switch (selectedRange) {
          case "0":
            minPrice = 0;
            maxPrice = 500;
            break;
          case "500":
            minPrice = 500;
            maxPrice = 1000;
            break;
          case "1000":
            minPrice = 1000;
            maxPrice = 1500;
            break;
          case "1500":
            minPrice = 1500;
            maxPrice = 2000;
            break;
          case "2000":
            minPrice = 2000;
            maxPrice = 2500;
            break;
          case "2500":
            minPrice = 2500;
            maxPrice = 3000;
            break;
          case "3000":
            minPrice = 3000;
            maxPrice = Infinity;
            break;
          default:
            return true;
        }

        return price >= minPrice && price < maxPrice;
      });
    }

    // Filter by discount range
    if (selectedDiscount !== "all") {
      filtered = filtered.filter((item) => {
        const discount = item.discountPercentage || 0;
        switch (selectedDiscount) {
          case "10":
            return discount >= 10;
          case "25":
            return discount >= 25;
          case "35":
            return discount >= 35;
          case "50":
            return discount >= 50;
          case "60":
            return discount >= 60;
          case "70":
            return discount >= 70;
          default:
            return true;
        }
      });
    }

    const shuffledFiltered = shuffleArray(filtered);
    setFilteredProducts(shuffledFiltered);
  }, [
    selectedCategory,
    selectedBrand,
    selectedRange,
    selectedDiscount,
    selectedsub_category,
  ]);

  // Helper function to shuffle an array
  const shuffleArray = (array) => {
    return array.map((item) => ({ item })).map(({ item }) => item);
  };

  // Handle dropdown changes
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubCategoryChange = (event) => {
    setSelectedsub_category(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  const handleDiscountChange = (event) => {
    setSelectedDiscount(event.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col items-center pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center pt-2 sm:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse font-['Playfair_Display']">
          Clothing Collection
        </h1>
        <p className="text-base pt-1 font-medium text-center px-4 sm:px-8 text-gray-700 leading-relaxed tracking-wide font-['Montserrat']">
          Explore our curated collection of clothing. Discover the latest trends
          and styles.
        </p>

        <div className="flex flex-row justify-between items-center w-full px-4 sm:px-8 mt-4">
          <div className="text-left flex-grow mb-4 sm:mb-0 relative">
            <h1 className="text-2xl font-bold text-gray-800 font-['Poppins'] tracking-wide animate-fade-in-up">
              New Stock Collection
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </h1>
          </div>
          <div className="text-right animate-pulse relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-50 blur-md animate-pulse"></div>
            <button
              className="relative text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 transition duration-300 ease-in-out px-6 py-2 rounded-full font-['Montserrat'] font-semibold shadow-xl transform hover:scale-105 animate-bounce"
              onClick={toggleDropdown}
            >
              Add Filters
            </button>
          </div>
        </div>

        {isDropdownOpen && (
          <div className="w-full px-4 sm:px-8 mt-4 mb-8">
            <div className="py-6 rounded-xl shadow-2xl">
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex-1">
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full px-4 py-2 bg-white text-gray-800 rounded-full border-2 border-purple-400 focus:border-purple-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 font-['Playfair Display'] text-sm appearance-none cursor-pointer shadow-md"
                  >
                    <option value="all">✨ All Categories</option>
                    <option value="shirt">👔 Elegant Shirts</option>
                    <option value="tshirt">👕 Trendy T-shirts</option>
                    <option value="jeans">👖 Stylish Jeans</option>
                    <option value="pants">🩳 Chic Pants</option>
                    <option value="jackets">🧥 Luxe Jackets</option>
                    <option value="hoodie">🦸 Cool Hoodies</option>
                  </select>
                </div>

                <div className="flex-1">
                  <select
                    id="brand"
                    value={selectedBrand}
                    onChange={handleBrandChange}
                    className="w-full px-4 py-2 bg-white text-gray-800 rounded-full border-2 border-pink-400 focus:border-pink-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 font-['Playfair Display'] text-sm appearance-none cursor-pointer shadow-md"
                  >
                    <option value="all">🌟 All Brands</option>
                    <option value="puma">🐾 Puma</option>
                    <option value="Adidas">⚡ Adidas</option>
                    <option value="Louis Vuitton">👜 Louis Vuitton</option>
                    <option value="Burberry">🧣 Burberry</option>
                    <option value="Nike">✔️ Nike</option>
                    <option value="Zara">👚 Zara</option>
                  </select>
                </div>

                <div className="flex-1">
                  <select
                    id="range"
                    value={selectedRange}
                    onChange={handleRangeChange}
                    className="w-full px-4 py-2 bg-white text-gray-800 rounded-full border-2 border-red-400 focus:border-red-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 font-['Playfair Display'] text-sm appearance-none cursor-pointer shadow-md"
                  >
                    <option value="all">💎 All Prices</option>
                    <option value="0">💸 $0 - $500</option>
                    <option value="500">💰 $500 - $1000</option>
                    <option value="1000">💰💰 $1000 - $1500</option>
                    <option value="1500">💰💰💰 $1500 - $2000</option>
                    <option value="2000">💰💰💰💰 $2000 - $2500</option>
                    <option value="2500">💰💰💰💰💰 $2500 - $3000</option>
                    <option value="3000">👑 $3000+</option>
                  </select>
                </div>

                <div className="flex-1">
                  <select
                    id="discount"
                    value={selectedDiscount}
                    onChange={handleDiscountChange}
                    className="w-full px-4 py-2 bg-white text-gray-800 rounded-full border-2 border-orange-400 focus:border-orange-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 font-['Playfair Display'] text-sm appearance-none cursor-pointer shadow-md"
                  >
                    <option value="all">🎉 All Discounts</option>
                    <option value="10">🔥 10% Off+</option>
                    <option value="25">🔥🔥 25% Off+</option>
                    <option value="35">🔥🔥🔥 35% Off+</option>
                    <option value="50">💥 50% Off+</option>
                    <option value="60">💥💥 60% Off+</option>
                    <option value="70">💥💥💥 70% Off+</option>
                  </select>
                </div>

                <div className="flex-1">
                  <select
                    id="sub_category"
                    value={selectedsub_category}
                    onChange={handleSubCategoryChange}
                    className="w-full px-4 py-2 bg-white text-gray-800 rounded-full border-2 border-green-400 focus:border-green-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 font-['Playfair Display'] text-sm appearance-none cursor-pointer shadow-md"
                  >
                    <option value="all">🌈 All</option>
                    <option value="Man">🤵 Men</option>
                    <option value="Woman">👰 Women</option>
                    <option value="Kids">👶 Kids</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {filteredProducts.map((product, Key) => (
            <div key={product.id} className="w-full lg:w-1/2">
              <ProductDetailPage key={Key} data={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductDetailPagePage;
