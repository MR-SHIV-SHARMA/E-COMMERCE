import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

function Card({ id, title, price, images }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="container flex flex-col items-center">
      <div className="relative w-[200px] h-[350px] rounded-md mb-4 md:mb-8 overflow-hidden image-container">
        <Link to={`/ProductOverviews/${id}`}>
          <div
            style={{
              height: "300px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderStartStartRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <img
              src={images[currentImage]}
              alt={title}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              className="zoom-image"
            />
          </div>
        </Link>
        <div className="w-full h-[70px] bg-slate-200 flex justify-between p-2 rounded-b-md">
          <h1 className="text-sm font-semibold text-black">{title}</h1>
          <div className="flex flex-col justify-start">
            <AiOutlineShoppingCart className="text-2xl text-gray-700" />
            <p className="mb- text-sm text-gray-600 pb-4">${price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import user from "../ProductsApiData/ProductsApiData";

function NewCollection() {
  const users = user;
  return (
    <div>
      <div className="text-center mt-10 mb-5">
        <h1 className="text-4xl font-extrabold">Create a new collection</h1>
        <p className="text-1xl p-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa fuga eum
          soluta, nulla accusantium error ullam
        </p>
      </div>
      <div className="flex flex-wrap justify-around my-6">
        {users.slice(0, 18).map((user) => (
          <div
            key={user.id}
            className="sm:w-11/12 md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-1/8"
          >
            <Card
              id={user.id}
              title={user.title}
              price={user.price}
              images={user.images}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewCollection;
