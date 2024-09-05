import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Man from "../Man_Products_Api_Data/Man_Products_Api_Data";

function Card({ id, title, price, images }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="container flex flex-col items-center">
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
          <AiOutlineShoppingCart className="text-2xl text-black" />
          <p className="text-base font-semibold text-black">${price}</p>
        </div>
      </div>
    </div>
  );
}

function NewCollection() {
  const users = Man;
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
        {users.slice(0, 20).map((user) => (
          <div
            key={user.id}
            className="sm:w-11/12 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
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
