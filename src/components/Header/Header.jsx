import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
function Header() {
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    setShowInput(!showInput);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const MobileMenu = () => {
    return (
      <div>
        <button onClick={toggleMobileMenu}>Toggle Menu</button>
      </div>
    );
  };

  const RenderMobileMenu = MobileMenu;

  const handleClick = () => {
    toggleMobileMenu(); // Call toggleMobileMenu directly
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const Open = () => {
    return (
      <div>
        <button onClick={toggleMenu}>Toggle Menu</button>
      </div>
    );
  };

  return (
    <div className="bg-gray-700 text-white sticky z-50 top-0 w-full">
      <div className="relative z-40" role="dialog" aria-modal="true">
        <div
          className={`fixed  bg-black bg-opacity-25 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`fixed  z-40 flex ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                onClick={toggleMobileMenu} // Directly call toggleMobileMenu
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <line
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    x1="6"
                    y1="18"
                    x2="18"
                    y2="6"
                  />
                  <line
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                  />
                </svg>
              </button>
            </div>

            {/* <!-- Links --> */}
            <div className="mt-2">
              <div className="border-b border-gray-200">
                <div
                  className="-mb-px flex space-x-8 px-4"
                  aria-orientation="horizontal"
                  role="tablist"
                >
                  <button
                    onClick={toggleMobileMenu}
                    id="tabs-1-tab-1"
                    className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                    aria-controls="tabs-1-panel-1"
                    role="tab"
                    type="button"
                  >
                    <Link to="/WomanStoarNav">Women</Link>
                  </button>
                  <button
                    onClick={toggleMobileMenu}
                    id="tabs-1-tab-2"
                    className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                    aria-controls="tabs-1-panel-2"
                    role="tab"
                    type="button"
                  >
                    <Link to="/ManStoreNav">Men</Link>
                  </button>
                  <button
                    onClick={toggleMobileMenu}
                    id="tabs-1-tab-3" // Unique ID for this button
                    className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                    aria-controls="tabs-1-panel-3" // Make sure this matches the corresponding panel
                    role="tab"
                    type="button"
                  >
                    <Link to="/KidStoreNav">Kids</Link>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  to="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Company
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  to="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Stores
                </Link>
              </div>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  to="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  to="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <header className="relative text-white bg-gray-300">
          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-14 items-center">
                {/* <!-- Mobile menu toggle, controls the 'mobileMenuOpen' state. --> */}
                <button
                  type="button"
                  className="relative rounded-md bg-gray-300 p-2 text-gray-400 lg:hidden"
                  onClick={toggleMobileMenu}
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-menu"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#000000"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </button>

                {/* <!-- Logo --> */}
                <div className="ml-4 flex lg:ml-0">
                  <NavLink to="">
                    <h2 className="text-4xl font-extrabold text-center text-gray-700">
                      <img
                        src="./shivs-high-resolution-logo-black-removebg.png"
                        alt=""
                        className="h-14"
                      />
                    </h2>
                  </NavLink>
                </div>

                {/* <!-- Flyout menus --> */}
                {/* Home tage */}
                <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    <div className="flex">
                      <div className="relative flex">
                        {/* Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" */}
                        <NavLink
                          to=""
                          className={({ isActive }) => `block ${
                            isActive ? "text-amber-800" : "text-gray-700"
                          } 
                      border-transparent hover:text-gray-800 text-amber-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out
                      `}
                        >
                          Home
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Woman and Man content */}
                <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {/* Woman content */}
                    <div className="flex">
                      <div className="relative flex">
                        {/* <!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" --> */}
                        <NavLink
                          to="WomanStoarNav"
                          className={({ isActive }) => `block ${
                            isActive ? "text-amber-800" : "text-gray-700"
                          } 
                      border-transparent hover:text-gray-800 text-amber-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out
                      `}
                        >
                          Woman
                        </NavLink>
                      </div>
                      <div className="absolute inset-x-0 top-full text-sm text-gray-500">
                        {/* <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow --> */}
                        <div
                          className="absolute inset-0 top-1/2 bg-white shadow"
                          aria-hidden="true"
                        ></div>
                      </div>
                    </div>
                    {/* Kide content */}
                    <div className="flex">
                      <div className="relative flex">
                        {/* Item active: "border-indigo-600 text-indigo-600", Item
                        inactive: "border-transparent text-gray-700
                        hover:text-gray-800" */}
                        <NavLink
                          to="KidStoreNav"
                          className={({ isActive }) => `block ${
                            isActive ? "text-amber-800" : "text-gray-700"
                          } 
                      border-transparent hover:text-gray-800 text-amber-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out
                      `}
                        >
                          Kids
                        </NavLink>
                      </div>
                      <div className="absolute inset-x-0 top-full text-sm text-gray-500">
                        {/* <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow --> */}
                        <div
                          className="absolute inset-0 top-1/2 bg-white shadow"
                          aria-hidden="true"
                        ></div>
                      </div>
                    </div>
                    {/* Man content */}
                    <div className="flex">
                      <div className="relative flex">
                        {/* <!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" --> */}
                        <NavLink
                          to="ManStoreNav"
                          className={({ isActive }) => `block ${
                            isActive ? "text-amber-800" : "text-gray-700"
                          } 
                      border-transparent hover:text-gray-800 text-amber-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out
                      `}
                        >
                          Man
                        </NavLink>
                      </div>
                      <div className="absolute inset-x-0 top-full text-sm text-gray-500">
                        {/* <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow --> */}
                        <div
                          className="absolute inset-0 top-1/2 bg-white shadow"
                          aria-hidden="true"
                        ></div>
                      </div>
                    </div>

                    <Link
                      to="/ContactPages"
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Contact Us
                    </Link>
                    <Link
                      to="/ProductDetailPagePage"
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Collections
                    </Link>
                  </div>
                </div>

                {/* Sign in */}
                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <NavLink
                      to="ApplicationUISignIn"
                      className={({ isActive }) => `block ${
                        isActive ? "text-amber-800" : "text-gray-700"
                      } 
                      border-transparent hover:text-gray-800 text-amber-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out
                      `}
                    >
                      Sign in
                    </NavLink>
                    <span
                      className="h-6 w-px bg-gray-200"
                      aria-hidden="true"
                    ></span>
                    <NavLink
                      to="CreateAccount"
                      className={({ isActive }) => `block ${
                        isActive ? "text-amber-800" : "text-gray-700"
                      } 
                      border-transparent hover:text-gray-800 text-amber-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out
                      `}
                    >
                      Create account
                    </NavLink>
                  </div>

                  {/* <!-- Search --> */}
                  <div className="flex lg:ml-6" ref={inputRef}>
                    {showInput && (
                      <input
                        type="text"
                        placeholder="Search items"
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="px-2 py-1 border text-black font-semibold border-gray-300 rounded-md focus:outline-none"
                      />
                    )}
                    <Link
                      to="#"
                      className="p-2 text-gray-400 hover:text-gray-500"
                      onClick={handleSearchClick}
                    >
                      <span className="sr-only">Search</span>
                      <FaSearch />
                    </Link>
                  </div>

                  {/* <!-- Cart --> */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <NavLink
                      to="ShoppingCart"
                      className="group -m-2 flex items-center p-2 text-gray-600 hover:text-gray-500"
                    >
                      <AiOutlineShoppingCart className="text-xl font-extrabold" />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        0
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}
export default Header;
