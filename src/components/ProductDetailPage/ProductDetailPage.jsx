import React, { useState } from "react";
import user from "../ProductsApiData/ProductsApiData";

function ProductDetailPage({
  images,
  title,
  price,
  description,
  stock,
  brand,
  category,
  discountPercentage,
  rating,
}) {
  const handleAddToCart = () => {
    // Add to cart logic
  };

  const handleBuyNow = () => {
    // Buy now logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 lg:pr-8">
          {/* Product Image */}
          <img
            src={images}
            alt={title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-1/2 lg:pl-8 pt-6 lg:pt-0">
          {/* Product Title */}
          <div className="flex gap-3 text-xl font-semibold items-center">
            <p>Category: </p>
            <p
              className="border border-black border-l px-5 py-1 text-center rounded-full text-black font-medium"
              style={{ width: "fit-content" }}
            >
              {category}
            </p>
          </div>
          <h2 className="text-3xl font-semibold mb-4">{title}</h2>
          {/* Product Rating */}
          <div className="text-black font-semibold text-2xl mb-1">
            Brand {brand}
          </div>
          <div className="text-black font-semibold text-2xl mb-1">
            {rating} Reviews
          </div>
          {/* Product Description */}
          <p className="text-2xl font-medium">Description</p>
          <p className="text-lg text-gray-600 font-semibold mb-4">
            {description}
          </p>
          {/* Product Price */}
          <p className="text-xl font-semibold mb-4">${price}</p>
          {/* Options */}
          <div className="flex flex-col lg:flex-row lg:items-center mb-4">
            <label htmlFor="color" className="font-semibold lg:w-1/3 lg:mr-4">
              Color:
            </label>
            <select
              id="color"
              className="border rounded-lg px-3 py-2 focus:outline-none"
            >
              <option value="gray">Gray</option>
              <option value="brown">Brown</option>
              <option value="black">Black</option>
            </select>
          </div>
          <p className="text-2xl font-medium">stock: {stock}%</p>
          <div className="flex flex-col lg:flex-row lg:items-center mb-4">
            <label
              htmlFor="quantity"
              className="font-semibold lg:w-1/3 lg:mr-4"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              defaultValue="1"
              className="border rounded-lg px-3 py-2 lg:w-1/4 focus:outline-none"
            />
          </div>
          <p className="text-2xl font-medium">
            discount: {discountPercentage}%
          </p>
          {/* Add to Cart and Buy Now buttons */}
          <div className="flex justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg mr-3 mt-2 hover:bg-blue-600 focus:outline-none"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-500 text-white px-3 py-3 rounded-lg mt-2 hover:bg-green-600 focus:outline-none"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendedProduct({ title, images, price }) {
  return (
    <div className="flex flex-col items-center mb-6 lg:mb-0 lg:w-1/4 px-2">
      <img
        src={images}
        alt={title}
        className="w-full h-48 rounded-lg shadow-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 p-4">Price: ${price}</p>
    </div>
  );
}

function ProductDetailPagePage() {
  const [activeButton, setActiveButton] = useState(null);
  const handleClick = (category) => {
    setActiveButton(category); // Update active button state
  };

  const users = user;

  return (
    <div>
      <div className="flex mt-2 sm:mt-4 flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center">
          CLOTHING COLLECTION
        </h1>
        <p className="text-base pt-1 font-medium text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
          nostrum. Quidem veritatis debitis maxime
        </p>
        <div className="text-center pt-2">
          <button
            className={`px-3 py-1 border border-gray-900 rounded-full text-black mx-1 mb-2 ${
              activeButton === "shirt" ? "bg-black text-white" : ""
            }`}
            onClick={() => handleClick("shirt")}
          >
            Shirts
          </button>
          <button
            className={`px-3 py-1 border border-gray-900 rounded-full text-black mx-1 mb-2 ${
              activeButton === "tshart" ? "bg-black text-white" : ""
            }`}
            onClick={() => handleClick("tshart")}
          >
            T-shirts
          </button>
          <button
            className={`px-3 py-1 border border-gray-900 rounded-full text-black mx-1 mb-2 ${
              activeButton === "jecet" ? "bg-black text-white" : ""
            }`}
            onClick={() => handleClick("jecet")}
          >
            Jeans
          </button>
          <button
            className={`px-3 py-1 border border-gray-900 rounded-full text-black mx-1 mb-2 ${
              activeButton === "paints" ? "bg-black text-white" : ""
            }`}
            onClick={() => handleClick("paints")}
          >
            Pants
          </button>
          <button
            className={`px-3 py-1 border border-gray-900 rounded-full text-black mx-1 mb-2 ${
              activeButton === "jinse" ? "bg-black text-white" : ""
            }`}
            onClick={() => handleClick("jinse")}
          >
            Jackets
          </button>
          <button
            className={`px-3 py-1 border border-gray-900 rounded-full text-black mx-1 mb-2 ${
              activeButton === "hoodie" ? "bg-black text-white" : ""
            }`}
            onClick={() => handleClick("hoodie")}
          >
            Hoodies
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-around">
          {users.map((hoodie) => {
            if (hoodie.category === "hoodie") {
              return (
                <ProductDetailPage
                  key={hoodie.id}
                  title={hoodie.title}
                  brand={hoodie.brand}
                  category={hoodie.category}
                  images={hoodie.images}
                  stock={hoodie.stock}
                  // images={hoodie.images}
                  discountPercentage={hoodie.discountPercentage}
                  rating={hoodie.rating}
                  description={hoodie.description}
                  price={hoodie.price}
                />
              );
            }
            return null; // Skip rendering if not a hoodies category
          })}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl ml-14 font-semibold mb-4">
          Recommended Products
        </h2>
        <div className="flex flex-wrap justify-around">
          {/* Render recommended products here */}
          {users
            .filter((hoodie) => hoodie.category === "hoodie") // Filter hoodies category
            .slice(0, 3) // Limit to three elements
            .map((hoodie) => (
              <RecommendedProduct
                key={hoodie.id}
                title={hoodie.title}
                images={hoodie.images}
                stock={hoodie.stock}
                // images={hoodie.images}
                price={hoodie.price}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPagePage;
