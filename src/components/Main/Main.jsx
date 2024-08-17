import React from "react";
import { NavLink } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Main() {
  return (
    <div className="relative overflow-hidden min-h-screen w-full">
      {/* Carousel Section */}
      <div className="relative min-h-screen">
        <Carousel
          showArrows={false}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          className="absolute inset-0 -z-10 min-h-screen w-full"
        >
          <div>
            <img
              srcSet="
                ../../../images/pexels-kampus-7857557.jpg 800w,
                ../../../images/pexels-kampus-7857557-large.jpg 1200w
              "
              sizes="(max-width: 768px) 100vw, 50vw"
              src="../../../images/pexels-kampus-7857557.jpg"
              alt="Fashionable clothing display"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <img
              srcSet="
                ../../../images/pexels-tima-miroshnichenko-6169673.jpg 800w,
                ../../../images/pexels-tima-miroshnichenko-6169673-large.jpg 1200w
              "
              sizes="(max-width: 768px) 100vw, 50vw"
              src="../../../images/pexels-tima-miroshnichenko-6169673.jpg"
              alt="Trendy outfits"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <img
              srcSet="
                ../../../images/pexels-tima-miroshnichenko-6169033.jpg 800w,
                ../../../images/pexels-tima-miroshnichenko-6169033-large.jpg 1200w
              "
              sizes="(max-width: 768px) 100vw, 50vw"
              src="../../../images/pexels-tima-miroshnichenko-6169033.jpg"
              alt="Elegant fashion"
              className="object-cover w-full h-full"
            />
          </div>
        </Carousel>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center lg:text-left lg:items-start lg:justify-end px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-t from-black via-transparent to-black">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start lg:mb-0 gap-4 sm:gap-6 md:gap-8 lg:gap-72">
            <div className="mb-16">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                Discover Your Style
              </h3>
              <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl leading-6 sm:leading-7 md:leading-8 lg:leading-9 text-white drop-shadow-lg">
                Shop the latest trends and timeless classics in our exclusive
                collection.
              </p>
            </div>
            <NavLink
              to="/Main"
              className="my-4 text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-9 tracking-tight bg-white rounded-full text-black px-4 sm:px-5 md:px-6 lg:px-8 py-1 duration-200 inline-block shadow-lg hover:bg-gray-200"
            >
              Buy Now
            </NavLink>
          </div>
        </div>
      </div>

      {/* New Section */}
      <div className="relative bg-gray-800 py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8 text-center lg:text-left">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Explore Our Collections
          </h3>
          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl leading-6 sm:leading-7 md:leading-8 lg:leading-9 text-white">
            Find the perfect outfit for any occasion with our diverse range of
            styles.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start">
            <NavLink
              to="/collections"
              className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-9 tracking-tight bg-white rounded-full text-black px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 duration-200 inline-block shadow-lg hover:bg-gray-200"
            >
              View Collections
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
