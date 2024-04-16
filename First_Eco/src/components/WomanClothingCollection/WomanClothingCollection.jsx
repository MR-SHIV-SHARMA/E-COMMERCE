import React, { useState } from "react";
import user from "../ProductsApiData/ProductsApiData";

function WomanClothingCollection({ thumbnail, title, price, description }) {
  const handleAddToCart = () => {
    // Add to cart logic
  };

  const handleBuyNow = () => {
    // Buy now logic
  };

  return (
    <div className="container flex flex-col items-center">
      <div className="relative h-[400px] md:w-[300px] xl:w-[400px] 2xl:w-[450px] rounded-md mb-4 md:mb-0 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="z-0 h-full w-full rounded-md object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left"></div>
      </div>
      <div className="flex flex-col justify-center mt-3 space-x-2">
        <h1 className="text-lg font-semibold text-black">{title}</h1>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <p className="mt-2 text-sm text-gray-600">Price: ${price}</p>
      </div>
    </div>
  );
}

function RecommendedProduct({ title, thumbnail, price }) {
  return (
    <div className="flex flex-col items-center mb-6 xl:mb-10 lg:w-1/4 px-2">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 rounded-lg shadow-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 p-4">Price: ${price}</p>
    </div>
  );
}

function WomanClothingCollectionPage() {
  const [activeButton, setActiveButton] = useState(null);

  // Function to handle button click
  const handleClick = (category) => {
    setActiveButton(category); // Update active button state
  };
  const users = user;

  return (
    <>
      <div>
        <div className="flex mt-5 flex-col items-center">
          <h1 className="text-5xl font-extrabold text-center">
            WOMAN CLOTHING COLLECTION
          </h1>
          <p className="text-xl p-4 font-medium text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            nostrum. Quidem veritatis debitis maxime
          </p>
          <div className="text-center pt-4">
            <button
              className={`px-6 py-2 border border-gray-900 rounded-full text-black mx-2 ${
                activeButton === "shirt" ? "bg-black text-white" : ""
              }`}
              onClick={() => handleClick("shirt")}
            >
              Shirts
            </button>
            <button
              className={`px-6 py-2 border border-gray-900 rounded-full text-black mx-2 ${
                activeButton === "tshart" ? "bg-black text-white" : ""
              }`}
              onClick={() => handleClick("tshart")}
            >
              T-shirts
            </button>
            <button
              className={`px-6 py-2 border border-gray-900 rounded-full text-black mx-2 ${
                activeButton === "jecet" ? "bg-black text-white" : ""
              }`}
              onClick={() => handleClick("jecet")}
            >
              Jeans
            </button>
            <button
              className={`px-6 py-2 border border-gray-900 rounded-full text-black mx-2 ${
                activeButton === "paints" ? "bg-black text-white" : ""
              }`}
              onClick={() => handleClick("paints")}
            >
              Pants
            </button>
            <button
              className={`px-6 py-2 border border-gray-900 rounded-full text-black mx-2 ${
                activeButton === "jinse" ? "bg-black text-white" : ""
              }`}
              onClick={() => handleClick("jinse")}
            >
              Jackets
            </button>
            <button
              className={`px-6 py-2 border border-gray-900 rounded-full text-black mx-2 ${
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
            {users.map((top) => {
              if (top.category === "tops") {
                return (
                  <div
                    key={top.id}
                    className="sm:w-1/2 md:w-1/2 lg:w-1/3 2xl:w-1/4 p-4 justify-center"
                  >
                    <WomanClothingCollection
                      key={top.id}
                      title={top.title}
                      thumbnail={top.thumbnail}
                      description={top.description}
                      price={top.price}
                    />
                  </div>
                );
              }
              return null; // Skip rendering if not a tops category
            })}
          </div>
        </div>
        <div className="mt-1">
          <h2 className="text-2xl ml-14 font-semibold mb-4">
            Recommended Products
          </h2>
          <div className="flex flex-wrap justify-around">
            {/* Render recommended products here */}
            {users
              .filter((top) => top.category === "tops") // Filter tops category
              .slice(0, 3) // Limit to three elements
              .map((top) => (
                <RecommendedProduct
                  key={top.id}
                  title={top.title}
                  images={top.images}
                  stock={top.stock}
                  thumbnail={top.thumbnail}
                  price={top.price}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="flex mb-5 flex-col items-center">
        <div class="flex items-center">
          <a
            href="#"
            class="mx-1 cursor-not-allowed text-sm font-semibold text-gray-900"
          >
            ← Previous
          </a>
          <a
            href="#"
            class="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
          >
            1
          </a>
          <a
            href="#"
            class="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
          >
            2
          </a>
          <a
            href="#"
            class="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
          >
            3
          </a>
          <a
            href="#"
            class="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
          >
            4
          </a>
          <a href="#" class="mx-2 text-sm font-semibold text-gray-900">
            Next →
          </a>
        </div>
      </div>
    </>
  );
}

export default WomanClothingCollectionPage;
