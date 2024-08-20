import React, { useState } from "react";
import user from "../ProductsApiData/ProductsApiData";
import { AiOutlineShoppingCart } from "react-icons/ai";

function KidsClothingCollection({ title, description, price, images }) {
  const handleAddToCart = () => {
    // Add to cart logic
  };

  const handleBuyNow = () => {
    // Buy now logic
  };

  return (
    <div className="container flex flex-col items-center">
      <div className="relative w-[300px] h-[450px] rounded-md mb-4 md:mb-8 overflow-hidden">
        <a href="/ProductOverviews">
          <div
            style={{
              height: "400px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderStartStartRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <img
              src={images}
              alt={title}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </a>
        <div className="w-full h-[50px] bg-slate-200 flex justify-between p-2 rounded-b-md">
          <div className="flex flex-col justify-start">
            <h1 className="text-sm font-semibold text-black">{title}</h1>
            <p className="mb- text-sm text-gray-600">${price}</p>
          </div>
          <AiOutlineShoppingCart className="text-2xl text-gray-700" />
        </div>
      </div>
    </div>
  );
}

function RecommendedProduct({ title, images, price }) {
  return (
    <div className="container flex flex-col items-center sm:w-11/12 md:w-1/2 lg:w-1/4 xl:w-1/5">
      <div className="relative w-[250px] h-[250px] rounded-md mb-4 overflow-hidden">
        <div
          style={{
            height: "200px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderStartStartRadius: "0.5rem",
            overflow: "hidden",
          }}
        >
          <img
            src={images}
            alt={title}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="w-full h-[50px] bg-slate-200 flex justify-between p-2 rounded-b-md">
          <div className="flex flex-col justify-start">
            <h1 className="text-sm font-semibold text-black">{title}</h1>
            <p className="mb- text-sm text-gray-600">${price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getProducts() {
  const [activeButton, setActiveButton] = useState(null);

  // Function to handle button click
  const handleClick = (category) => {
    setActiveButton(category); // Update active button state
  };
  const users = user;
  return (
    <>
      <div className="flex mt-2 sm:mt-4 flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center">
          KIDS CLOTHING COLLECTION
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

      <div className="flex flex-wrap justify-around mt-1">
        {users.map((hoodie) => {
          if (hoodie.category === "hoodie") {
            return (
              <div
                key={hoodie.id}
                className="sm:w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5"
              >
                <KidsClothingCollection
                  key={hoodie.id}
                  title={hoodie.title}
                  images={hoodie.images}
                  description={hoodie.description}
                  price={hoodie.price}
                />
              </div>
            );
          }
          return null; // Skip rendering if not a hoodie
        })}
      </div>

      <div>
        <h2 className="text-2xl ml-5 font-semibold mb-4">
          Recommended Products
        </h2>
        <div className="flex flex-wrap justify-start my-4">
          {/* Render recommended products here */}
          {users
            .filter((hoodie) => hoodie.category === "hoodie") // Filter hoodie category
            .slice(0, 3) // Limit to three elements
            .map((hoodie) => (
              <RecommendedProduct
                key={hoodie.id}
                title={hoodie.title}
                images={hoodie.images}
                stock={hoodie.stock}
                price={hoodie.price}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
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

export default getProducts;
