import React, { useState, useEffect } from "react";
import user from "../ProductsApiData/ProductsApiData";
import { AiOutlineShoppingCart } from "react-icons/ai";

function ManClothingCollection({ images, title, price }) {
  return (
    <div className="container flex flex-col items-center">
      <div className="w-[300px] sm:w-[230px] sm:h-[350px] rounded-t-md overflow-hidden image-container">
        <a href="/ProductOverviews">
          <div className="flex items-center justify-center h-[350px] w-full rounded-t-md overflow-hidden">
            <img
              src={images}
              alt={title}
              className="w-full h-full object-cover zoom-image"
            />
          </div>
        </a>
      </div>
      <div className="w-[300px] sm:w-[230px] h-[60px] bg-white flex justify-between p-2 rounded-b-md mb-4">
        <h1 className="text-sm font-semibold text-black">{title}</h1>
        <div className="flex flex-col justify-start">
          <AiOutlineShoppingCart className="text-2xl text-black" />
          <p className="text-base font-semibold text-black">${price}</p>
        </div>
      </div>
    </div>
  );
}

function getProducts() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedRange, setSelectedRange] = useState("all");
  const [selectedDiscount, setSelectedDiscount] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState(user);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    let filtered = user;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (selectedBrand !== "all") {
      filtered = filtered.filter((item) => item.brand === selectedBrand);
    }

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
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [selectedCategory, selectedBrand, selectedRange, selectedDiscount]);

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center pt-2 sm:mt-4">
          MAN CLOTHING COLLECTION
        </h1>
        <p className="text-base pt-1 font-medium text-center px-4 sm:px-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
          nostrum. Quidem veritatis debitis maxime
        </p>

        <div className="flex flex-row justify-between items-center w-full px-4 sm:px-8 mt-4">
          <div className="text-left flex-grow mb-4 sm:mb-0">
            <h1 className="text-xl">New Stock Clothing</h1>
          </div>
          <div className="text-right">
            <button
              className="text-black border border-black px-4 py-2 rounded"
              onClick={toggleDropdown}
            >
              Add Filters
            </button>
          </div>
        </div>

        {isDropdownOpen && (
          <div className="w-full px-4 sm:px-8 mt-2 mb-8">
            <div className="py-2 border bg-white rounded">
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <div className="flex flex-col w-full sm:w-auto">
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="px-3 py-2 bg-white text-black"
                  >
                    <option value="all">All Category</option>
                    <option value="shirt">Shirts</option>
                    <option value="tshirt">T-shirts</option>
                    <option value="jeans">Jeans</option>
                    <option value="pants">Pants</option>
                    <option value="jackets">Jackets</option>
                    <option value="hoodie">Hoodies</option>
                  </select>
                </div>

                <div className="flex flex-col w-full sm:w-auto">
                  <select
                    id="brand"
                    value={selectedBrand}
                    onChange={handleBrandChange}
                    className="px-3 py-2 bg-white text-black"
                  >
                    <option value="all">All Brand</option>
                    <option value="puma">Puma</option>
                    <option value="Adidas">Adidas</option>
                    <option value="Louis Vuitton">Louis Vuitton</option>
                    <option value="Burberry">Burberry</option>
                    <option value="Nike">Nike</option>
                    <option value="Zara">Zara</option>
                  </select>
                </div>

                <div className="flex flex-col w-full sm:w-auto">
                  <select
                    id="range"
                    value={selectedRange}
                    onChange={handleRangeChange}
                    className="px-3 py-2 bg-white text-black"
                  >
                    <option value="all">All Range</option>
                    <option value="0">$0 to $500</option>
                    <option value="500">$500 to $1000</option>
                    <option value="1000">$1000 to $1500</option>
                    <option value="1500">$1500 to $2000</option>
                    <option value="2000">$2000 to $2500</option>
                    <option value="2500">$2500 to $3000</option>
                    <option value="3000">$3000 to $Infinity</option>
                  </select>
                </div>

                <div className="flex flex-col w-full sm:w-auto">
                  <select
                    id="discount"
                    value={selectedDiscount}
                    onChange={handleDiscountChange}
                    className="px-3 py-2 bg-white text-black"
                  >
                    <option value="all">All Discount</option>
                    <option value="10">10% Off or More</option>
                    <option value="25">25% Off or More</option>
                    <option value="35">35% Off or More</option>
                    <option value="50">50% Off or More</option>
                    <option value="60">60% Off or More</option>
                    <option value="70">70% Off or More</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-around pt-8 pb-4 bg-zinc-300">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="sm:w-11/12 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
          >
            <ManClothingCollection
              key={item.id}
              title={item.title}
              images={item.images}
              description={item.description}
              price={item.price}
            />
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
