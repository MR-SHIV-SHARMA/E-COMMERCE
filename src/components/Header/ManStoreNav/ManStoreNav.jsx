import React from "react";
import { Link } from "react-router-dom";
function ManStoreNav() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-8">
        <div className="sm:grid grid-cols-2 gap-x-8 gap-y-10 py-8">
          <div className="col-start-2 pb-2 grid grid-cols-2 gap-x-8">
            <div className="group relative text-base sm:text-sm">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg"
                  alt="Drawstring top with elastic loop closure and textured interior padding."
                  className="object-cover object-center"
                />
              </div>
              <Link to="/Man" className="mt-6 block font-medium text-gray-900">
                <span
                  className="absolute inset-0 z-10"
                  aria-hidden="true"
                ></span>
                New Arrivals
              </Link>
              <p aria-hidden="true" className="mt-1">
                Shop now
              </p>
            </div>
            <div className="group relative text-base sm:text-sm">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg"
                  alt="Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt."
                  className="object-cover object-center"
                />
              </div>
              <Link to="#" className="mt-6 block font-medium text-gray-900">
                <span
                  className="absolute inset-0 z-10"
                  aria-hidden="true"
                ></span>
                Artwork Tees
              </Link>
              <p aria-hidden="true" className="mt-1">
                Shop now
              </p>
            </div>
          </div>
          <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
            <div>
              <p id="Clothing-heading" className="font-medium text-gray-900">
                <Link to="/Man">Clothing</Link>
              </p>
              <ul
                role="list"
                aria-labelledby="Clothing-heading"
                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
              >
                <li className="flex">
                  <Link
                    to="/Man?category=shirt"
                    className="hover:text-gray-800"
                  >
                    Shirt
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?category=pants"
                    className="hover:text-gray-800"
                  >
                    Pants
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?category=sweaters"
                    className="hover:text-gray-800"
                  >
                    Sweaters
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?category=tshirt"
                    className="hover:text-gray-800"
                  >
                    T-Shirts
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?category=jackets"
                    className="hover:text-gray-800"
                  >
                    Jackets
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?category=activewear"
                    className="hover:text-gray-800"
                  >
                    Activewear
                  </Link>
                </li>
                <li className="flex">
                  <Link to="/Man?category=all" className="hover:text-gray-800">
                    Browse All
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p id="Accessories-heading" className="font-medium text-gray-900">
                Accessories
              </p>
              <ul
                role="list"
                aria-labelledby="Accessories-heading"
                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
              >
                <li className="flex">
                  <Link
                    to="/Man?Accessories=Watches"
                    className="hover:text-gray-800"
                  >
                    Watches
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?Accessories=Wallets"
                    className="hover:text-gray-800"
                  >
                    Wallets
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?Accessories=Bags"
                    className="hover:text-gray-800"
                  >
                    Bags
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?Accessories=Sunglasses"
                    className="hover:text-gray-800"
                  >
                    Sunglasses
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?Accessories=Hats"
                    className="hover:text-gray-800"
                  >
                    Hats
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?Accessories=Belts"
                    className="hover:text-gray-800"
                  >
                    Belts
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p id="Brands-heading" className="font-medium text-gray-900">
                Brands
              </p>
              <ul
                role="list"
                aria-labelledby="Brands-heading"
                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
              >
                <li className="flex">
                  <Link
                    to="/Man?Brand=Re-Arranged"
                    className="hover:text-gray-800"
                  >
                    Re-Arranged
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?Brand=Counterfeit"
                    className="hover:text-gray-800"
                  >
                    Counterfeit
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?Brand=Full-Nelson"
                    className="hover:text-gray-800"
                  >
                    Full Nelson
                  </Link>
                </li>
                <li className="flex">
                  <Link to="/Man?Brand=My-Way" className="hover:text-gray-800">
                    My Way
                  </Link>
                </li>
                <li className="flex">
                  <Link to="/Man?Brand=puma" className="hover:text-gray-800">
                    puma
                  </Link>
                </li>
                <li className="flex">
                  <Link to="/Man?Brand=Adidas" className="hover:text-gray-800">
                    Adidas
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?Brand=Burberry"
                    className="hover:text-gray-800"
                  >
                    Burberry
                  </Link>
                </li>
                <li className="flex">
                  <Link to="/Man?Brand=Nike" className="hover:text-gray-800">
                    Nike
                  </Link>
                </li>
                <li className="flex">
                  <Link to="/Man?Brand=Zara" className="hover:text-gray-800">
                    Zara
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Man?Brand=Louis Vuitton"
                    className="hover:text-gray-800"
                  >
                    Louis Vuitton
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-0 h-px bg-black" />
    </div>
  );
}

export default ManStoreNav;
