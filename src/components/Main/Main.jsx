import React from "react"; // React library ko import kar rahe hain
import { NavLink } from "react-router-dom"; // NavLink ko react-router-dom se import kar rahe hain
import { Carousel } from "react-responsive-carousel"; // Carousel component ko import kar rahe hain
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel ke styles ko import kar rahe hain

export default function Main() {
  // Main function ko export kar rahe hain
  return (
    // JSX return kar rahe hain
    <>
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden h-[500px] lg:h-[600px] xl:h-[650px] w-full">
          {/* Container div for carousel */}
          {/* Carousel Section */}
          <div className="relative h-[500px] lg:h-[600px] xl:h-[650px]">
            {/* Carousel ki height set kar rahe hain */}
            <Carousel
              showArrows={false} // Arrows nahi dikhana
              autoPlay={true} // Carousel ko auto play karna
              infiniteLoop={true} // Infinite loop enable karna
              showThumbs={false} // Thumbnails nahi dikhana
              className="absolute inset-0 -z-10 h-[500px] lg:h-[600px] xl:h-[650px] w-full" // Carousel ka styling
            >
              {/* Image for small devices */}
              <div className="relative h-[554px] sm:h-auto">
                {/* Image container */}
                <img
                  srcSet=" // Different resolutions ke liye image source set kar rahe hain
                ../../../images/pexels-kampus-7857557.jpg 800w,
                ../../../images/pexels-kampus-7857557.jpg 1200w
              "
                  sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizes set kar rahe hain
                  src="../../../images/pexels-kampus-7857557.jpg" // Default image source
                  alt="Handsome man in black shirt with wristwatch" // Image ka alt text
                  className="object-cover w-full h-full sm:h-auto" // Image ka styling
                />
              </div>
              {/* Image for medium to large devices */}
              <div className="relative h-[554px] sm:h-auto">
                {/* Image container */}
                <img
                  srcSet=" // Different resolutions ke liye image source set kar rahe hain
                ../../../images/pexels-tima-miroshnichenko-6169673.jpg 800w,
                ../../../images/pexels-tima-miroshnichenko-6169673.jpg 1200w
              "
                  sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizes set kar rahe hain
                  src="../../../images/pexels-tima-miroshnichenko-6169673.jpg" // Default image source
                  alt="Fashionable clothing display" // Image ka alt text
                  className="object-cover w-full h-full sm:h-auto" // Image ka styling
                />
              </div>
              {/* Image for medium to large devices */}
              <div className="relative h-[554px] sm:h-auto">
                {/* Image container */}
                <img
                  srcSet=" // Different resolutions ke liye image source set kar rahe hain
                ../../../images/pexels-thirdman-8485721.jpg 800w,
                ../../../images/pexels-thirdman-8485721.jpg 1200w
              "
                  sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizes set kar rahe hain
                  src="../../../images/pexels-thirdman-8485721.jpg" // Default image source
                  alt="Trendy outfits" // Image ka alt text
                  className="object-cover w-full h-full sm:h-auto" // Image ka styling
                />
              </div>
            </Carousel>
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-end text-center lg:text-left lg:items-start px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-t from-black via-transparent to-black">
              {/* Overlay content ka styling */}
              <div className="flex flex-col sm:mb-20 sm:flex-row justify-between w-full lg:items-start ">
                {/* Content layout */}
                <div className="">
                  {/* Text container */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                    {/* Heading */}
                    Discover Your Style
                  </h3>
                  <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl leading-6 sm:leading-7 md:leading-8 lg:leading-9 text-white drop-shadow-lg">
                    {/* Paragraph */}
                    Shop the latest trends and timeless classics in our
                    exclusive collection.
                  </p>
                </div>
                <NavLink
                  to="/ProductDetailPagePage" // Link destination
                  className="my-4 text-sm sm:text-base lg:text- font-bold leading-6 sm:leading-9 md:leading-9 lg:leading-9 tracking-tight bg-white rounded-full text-black px-4 sm:px-5 md:px-6 lg:px-8 py-1 duration-200 inline-block shadow-lg hover:bg-gray-200" // Button styling
                >
                  {/* Buy Now */}
                  Explore Now
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="h-20 w-full bg-white flex items-center justify-center">
          {/* Bottom section */}
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-black drop-shadow-lg text-center">
            {/* Heading */}
            Unleash Your Style with Our Exclusive Collection
          </h1>
        </div>

        {/* New Section */}
        <div className="relative bg-white text-black py-10 sm:py-12 md:py-16 lg:py-20 bg-cover bg-center bg-[url('/images/pexels-shvetsa-6593778.jpg')]">
          {/* New section with background image */}
          <div className="absolute inset-0 bg-black opacity-25"></div>{" "}
          {/* Overlay for background image */}
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8 text-center lg:text-left">
            {/* Content container */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {/* Heading */}
              Explore Our Collections
            </h3>
            <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl leading-6 sm:leading-7 md:leading-8 lg:leading-9 text-white">
              {/* Paragraph */}
              Find the perfect outfit for any occasion with our diverse range of
              styles.
            </p>
            <div className="mt-6 flex justify-center lg:justify-start">
              {/* Button container */}
              <NavLink
                to="/ProductDetailPagePage" // Link destination
                className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-9 tracking-tight bg-white rounded-full text-black px-4 sm:px-5 md:px-6 lg:px-8 py-2 duration-200 inline-block shadow-lg hover:bg-gray-200" // Button styling
              >
                View Collections
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </> // JSX fragment ka end
  );
} // Main function ka end
