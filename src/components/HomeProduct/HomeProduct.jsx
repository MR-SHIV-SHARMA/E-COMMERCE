// import { Man } from "../Man_Products_Api_Data/Man_Products_Api_Data";
import { Home } from "../Home_Products_Api_Data/Home_Products_Api_Data";
import React from "react";
import Card from "../Card/Card";

function HomeProduct() {
  return (
    <div>
      <div className="text-center mt-10 mb-5">
        <h1 className="text-4xl font-extrabold">Create a new collection</h1>
        <p className="text-1xl p-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa fuga eum
          soluta, nulla accusantium error ullam
        </p>
      </div>
      <div className="sm:flex flex-wrap justify-around my-6">
        {Home.slice(0, 20).map((product, key) => (
          <div
            key={product.id}
            className="sm:w-11/12 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-4"
          >
            <Card key={key} data={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeProduct;
