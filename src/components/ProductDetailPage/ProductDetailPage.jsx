import React, { useState, useEffect } from "react";
import { Home } from "../Home_Products_Api_Data/Home_Products_Api_Data";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../stores/cart";

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
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="w-full lg:w-1/3  image-container">
          <img
            src={images}
            alt={title}
            className="w-full h-[550px] object-cover rounded-lg shadow-lg zoom-image"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex items-center">
            <span className="text-gray-600 text-lg font-medium pr-2">
              {sub_category}
            </span>
          </div>
          <div className="flex items-center py-2">
            <span className="text-gray-600 text-lg font-medium pr-2">
              Category:
            </span>
            <span
              className="border border-gray-300 px-4 py-1 text-center rounded-full text-gray-800 font-semibold"
              style={{ width: "fit-content" }}
            >
              {category}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-2">
            {title}
          </h2>
          <div className="text-gray-800 font-semibold text-lg mb-2">
            Brand: {brand}
          </div>
          <div className="text-gray-800 font-semibold text-lg mb-4 sm:mb-2">
            Rating: {rating} Reviews
          </div>
          <div className="text-gray-800 font-semibold text-lg mb-4 sm:mb-2">
            Description: {description}
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            ${price}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6 sm:mb-0">
            <label htmlFor="color" className="text-lg font-medium lg:w-1/3">
              Color:
            </label>
            <select
              id="color"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            >
              <option value="gray">Gray</option>
              <option value="brown">Brown</option>
              <option value="black">Black</option>
            </select>
          </div>
          <p className="text-lg font-medium mb-4 sm:mb-0">
            Stock:
            {stock}%
          </p>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6 sm:mb-0">
            <label htmlFor="quantity" className="text-lg font-medium lg:w-1/3">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              defaultValue="1"
              className="border border-gray-300 rounded-lg px-4 py-2 lg:w-1/4 focus:outline-none"
            />
          </div>
          <p className="text-lg font-medium mb-4">
            Discount: {discountPercentage}%
          </p>
          <div className="flex flex-col lg:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              // onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
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
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
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
    <div>
      <div className="flex flex-col items-center pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center pt-2 sm:mt-4">
          Clothing Collection
        </h1>
        <p className="text-base pt-1 font-medium text-center px-4 sm:px-8">
          Explore our curated collection of clothing. Discover the latest trends
          and styles.
        </p>

        <div className="flex flex-row justify-between items-center w-full px-4 sm:px-8 mt-4">
          <div className="text-left flex-grow mb-4 sm:mb-0">
            <h1 className="text-xl">New Stock Collection</h1>
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

                <div className="flex flex-col w-full sm:w-auto">
                  <select
                    id="sub_category"
                    value={selectedsub_category}
                    onChange={handleSubCategoryChange}
                    className="px-3 py-2 bg-white text-black"
                  >
                    <option value="all">All Sub Category</option>
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6">
          {filteredProducts.map((product, Key) => (
            <div
              key={product.id}
              //   className="sm:w-11/12 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
            >
              <ProductDetailPage key={Key} data={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPagePage;
