import React, { useState } from "react";

function Card({ title, description, price, images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="container flex flex-col items-center">
      <div className="relative h-[400px] md:w-[300px] xl:w-[400px] 2xl:w-[450px] rounded-md mb-4 md:mb-0 overflow-hidden">
        <img
          src={images[currentImage]}
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

import user from "../ProductsApiData/ProductsApiData";

function NewCollection() {
  // card api looping calling
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
        {users.slice(0, 6).map((user) => (
          <div
            key={user.id}
            className="sm:w-1/2 md:w-1/2 lg:w-1/3  p-4 justify-center"
          >
            <Card
              id={user.id}
              title={user.title}
              description={user.description}
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
