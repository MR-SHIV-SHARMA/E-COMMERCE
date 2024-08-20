import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Card({ title, price, images }) {
  const [currentImage, setCurrentImage] = useState(0);

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
              src={images[currentImage]}
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
        {users.slice(0, 8).map((user) => (
          <div
            key={user.id}
            className="sm:w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5"
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
