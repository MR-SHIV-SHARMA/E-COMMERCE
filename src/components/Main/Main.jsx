import React from "react";
import { NavLink } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Main() {
  return (
    <>
      <div className="relative overflow-hidden h-[500px] lg:h-[600px] xl:h-[650px] w-full">
        {/* Carousel Section */}
        <div className="relative h-[500px] lg:h-[600px] xl:h-[650px]">
          <Carousel
            showArrows={false}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            className="absolute inset-0 -z-10 h-[500px] lg:h-[600px] xl:h-[650px] w-full"
          >
            {/* Image for small devices */}
            <div className="relative h-[554px] sm:h-auto">
              <img
                srcSet="
                ../../../images/pexels-kampus-7857557.jpg 800w,
                ../../../images/pexels-kampus-7857557.jpg 1200w
              "
                sizes="(max-width: 768px) 100vw, 50vw"
                src="../../../images/pexels-kampus-7857557.jpg"
                alt="Handsome man in black shirt with wristwatch"
                className="object-cover w-full h-full sm:h-auto"
              />
            </div>
            {/* Image for medium to large devices */}
            <div className="relative h-[554px] sm:h-auto">
              <img
                srcSet="
                ../../../images/pexels-tima-miroshnichenko-6169673.jpg 800w,
                ../../../images/pexels-tima-miroshnichenko-6169673.jpg 1200w
              "
                sizes="(max-width: 768px) 100vw, 50vw"
                src="../../../images/pexels-tima-miroshnichenko-6169673.jpg"
                alt="Fashionable clothing display"
                className="object-cover w-full h-full sm:h-auto"
              />
            </div>
            {/* Image for medium to large devices */}
            <div className="relative h-[554px] sm:h-auto">
              <img
                srcSet="
                ../../../images/pexels-thirdman-8485721.jpg 800w,
                ../../../images/pexels-thirdman-8485721.jpg 1200w
              "
                sizes="(max-width: 768px) 100vw, 50vw"
                src="../../../images/pexels-thirdman-8485721.jpg"
                alt="Trendy outfits"
                className="object-cover w-full h-full sm:h-auto"
              />
            </div>
          </Carousel>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-end text-center lg:text-left lg:items-start px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-t from-black via-transparent to-black">
            <div className="flex flex-col sm:mb-20 sm:flex-row justify-between w-full lg:items-start ">
              <div className="">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                  Discover Your Style
                </h3>
                <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl leading-6 sm:leading-7 md:leading-8 lg:leading-9 text-white drop-shadow-lg">
                  Shop the latest trends and timeless classics in our exclusive
                  collection.
                </p>
              </div>
              <NavLink
                to="/ProductDetailPagePage"
                className="my-4 text-sm sm:text-base lg:text- font-bold leading-6 sm:leading-9 md:leading-9 lg:leading-9 tracking-tight bg-white rounded-full text-black px-4 sm:px-5 md:px-6 lg:px-8 py-1 duration-200 inline-block shadow-lg hover:bg-gray-200"
              >
                Buy Now
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20 w-full bg-white flex items-center justify-center">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-black drop-shadow-lg text-center">
          Unleash Your Style with Our Exclusive Collection
        </h1>
      </div>

      {/* New Section */}
      <div className="relative bg-white text-black py-10 sm:py-12 md:py-16 lg:py-20 bg-cover bg-center bg-[url('/images/pexels-shvetsa-6593778.jpg')]">
        <div className="absolute inset-0 bg-black opacity-25"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8 text-center lg:text-left">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Explore Our Collections
          </h3>
          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl leading-6 sm:leading-7 md:leading-8 lg:leading-9 text-white">
            Find the perfect outfit for any occasion with our diverse range of
            styles.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start">
            <NavLink
              to="/ProductDetailPagePage"
              className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-9 tracking-tight bg-white rounded-full text-black px-4 sm:px-5 md:px-6 lg:px-8 py-2 duration-200 inline-block shadow-lg hover:bg-gray-200"
            >
              View Collections
            </NavLink>
          </div>
        </div>
      </div>

      <hr className="text-orange-500 font-bold text-3xl border-2" />
    </>
  );
}
