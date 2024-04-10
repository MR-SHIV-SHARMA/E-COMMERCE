import React from "react";
import { NavLink } from "react-router-dom";

export default function Main() {
  return (
    <div className="relative overflow-hidden min-h-screen w-full">
      <div className="min-h-screen">
        <img
          src="https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="absolute inset-0 -z-10 min-h-screen w-full"
        />
      </div>
      {/* Additional content at the bottom */}
      <div className="absolute bottom-10 left-0 w-full">
        <div id="content" className="mx-auto lg:mx-16 max-w-7xl px-6 lg:px-8 relative">
          {/* Add your additional content here */}
          <div className="mb-20 text-center lg:text-left">
            <h3 className="text-4xl lg:text-6xl font-bold text-white">
              Additional Section Title
            </h3>
            <p className="mt-4 text-lg lg:text-3xl leading-7 text-white">
              Additional section content goes here.
            </p>
          </div>
          {/* Start Tour button */}
          <div className="lg:mt-12 lg:absolute lg:bottom-6 lg:right-0 w-full lg:w-auto">
            <NavLink
              to="/Main"
              className="text-lg lg:text-2xl font-bold leading-9 tracking-tight bg-white rounded-full text-black px-4 lg:px-6 py-2 lg:py-3 duration-200 inline-block"
            >
              Buy Now
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
