import React from "react";
import { Link } from "react-router-dom";

function KidStoreNav() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-8">
        <div className="sm:grid grid-cols-2 gap-x-8 gap-y-10 py-8">
          <div className="col-start-2 pb-2 grid grid-cols-2 gap-x-8">
            <div className="group relative text-base sm:text-sm">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src="https://images.pexels.com/photos/7869238/pexels-photo-7869238.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Drawstring top with elastic loop closure and textured interior padding."
                  className="object-cover object-center"
                />
              </div>
              <Link to="/Kids" className="mt-6 block font-medium text-gray-900">
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
                  src="https://images.pexels.com/photos/6941846/pexels-photo-6941846.jpeg?auto=compress&cs=tinysrgb&w=600"
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
                <Link to="/Kids">Clothing</Link>
              </p>
              <ul
                role="list"
                aria-labelledby="Clothing-heading"
                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
              >
                <li className="flex">
                  <Link
                    to="/Kids?category=tshirt"
                    className="hover:text-gray-800"
                  >
                    T-shirts
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?category=shirt"
                    className="hover:text-gray-800"
                  >
                    Jeans
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?category=shirt"
                    className="hover:text-gray-800"
                  >
                    Dresses
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?category=hoodie"
                    className="hover:text-gray-800"
                  >
                    Hoodies
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?category=shirt"
                    className="hover:text-gray-800"
                  >
                    Leggings
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?category=jackets"
                    className="hover:text-gray-800"
                  >
                    Jackets
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?category=shirt"
                    className="hover:text-gray-800"
                  >
                    Shorts
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
                    to="/Kids?Accessories=Watches"
                    className="hover:text-gray-800"
                  >
                    Watches
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?Accessories=Wallets"
                    className="hover:text-gray-800"
                  >
                    Wallets
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?Accessories=Bags"
                    className="hover:text-gray-800"
                  >
                    Bags
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?Accessories=Sunglasses"
                    className="hover:text-gray-800"
                  >
                    Sunglasses
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?Accessories=Hats"
                    className="hover:text-gray-800"
                  >
                    Hats
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?Accessories=Belts"
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
                  <Link to="/Kids?Brand=Nike" className="hover:text-gray-800">
                    Nike Kids
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?category=shirt"
                    className="hover:text-gray-800"
                  >
                    Levi's Kids
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?category=shirt"
                    className="hover:text-gray-800"
                  >
                    Gucci Kids
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?category=shirt"
                    className="hover:text-gray-800"
                  >
                    Abercrombie Kids
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    to="/Kids?category=shirt"
                    className="hover:text-gray-800"
                  >
                    Mini Rodini
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

export default KidStoreNav;
