import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import iconCart from "../../assets/images/iconCart.png";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../../stores/cart";
import { Man } from "../../components/Man_Products_Api_Data/Man_Products_Api_Data";
import { Woman } from "../Woman_Products_Api_Data/Woman_Products_Api_Data";
import { Kids } from "../Kids_Products_Api_Data/Kids_Products_Api_Data";

const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]);
  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
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
    setShowInput((prev) => !prev);
    setTimeout(() => {
      if (showInput) {
        inputRef.current?.blur();
      } else {
        inputRef.current?.focus();
      }
    }, 0);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = [...Man, ...Woman, ...Kids].filter((item) => {
      if (item) {
        const title = item.title ? item.title.toLowerCase() : "";
        const brand = item.brand ? item.brand.toLowerCase() : "";
        const subCategory = item.sub_category
          ? item.sub_category.toLowerCase()
          : "";
        const category = item.category ? item.category.toLowerCase() : "";
        return (
          title.includes(searchQuery) ||
          brand.includes(searchQuery) ||
          subCategory.includes(searchQuery) ||
          category.includes(searchQuery)
        );
      }
      return false;
    });
    if (filteredData.length > 0 && e.key === "Enter") {
      const url = `/search?query=${searchQuery}`; // Redirect to search page with query
      window.location.href = url;
    } else if (e.key === "Enter" && filteredData.length === 0) {
      console.log("No results found.");
    }
  };

  const handleInputFocus = () => {
    setShowInput(true);
  };

  return (
    <div className="bg-gray-700 text-black sticky z-50 top-0 w-full">
      <div className="relative z-40" role="dialog" aria-modal="true">
        <div
          className={`fixed  bg-black bg-opacity-25 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`fixed min-h-full z-40 flex ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-1 shadow-xl">
            <div className="flex px-4 pb-2 pt-4 ml-2">
              <button
                type="button"
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-900"
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
            <div className="">
              <div className="border-b border-gray-200">
                <div
                  className="flex space-x-16 px-4"
                  aria-orientation="horizontal"
                  role="tablist"
                >
                  <button
                    onClick={toggleMobileMenu}
                    id="tabs-1-tab-1"
                    className="border-transparent text-black flex-1 whitespace-nowrap border-b-2 px-1 text-base font-medium"
                    aria-controls="tabs-1-panel-1"
                    role="tab"
                    type="button"
                  >
                    <NavLink
                      to="/WomanStoarNav"
                      className={({ isActive }) => `block ${
                        isActive ? "text-amber-800" : "text-black"
                      } 
                      border-transparent hover:text-gray-800 text-amber-800 relative flex items-center font-medium transition-colors duration-200 ease-out
                      `}
                    >
                      Women
                    </NavLink>
                  </button>
                  <button
                    onClick={toggleMobileMenu}
                    id="tabs-1-tab-2"
                    className="border-transparent text-black flex-1 whitespace-nowrap border-b-2 px-1 text-base font-medium"
                    aria-controls="tabs-1-panel-2"
                    role="tab"
                    type="button"
                  >
                    <NavLink
                      to="/ManStoreNav"
                      className={({ isActive }) => `block ${
                        isActive ? "text-amber-800" : "text-black"
                      } 
                      border-transparent hover:text-gray-800 text-amber-800 relative flex items-center font-medium transition-colors duration-200 ease-out
                      `}
                    >
                      Men
                    </NavLink>
                  </button>
                  <button
                    onClick={toggleMobileMenu}
                    id="tabs-1-tab-3" // Unique ID for this button
                    className="border-transparent text-black flex-1 whitespace-nowrap border-b-2 px-1 text-base font-medium"
                    aria-controls="tabs-1-panel-3" // Make sure this matches the corresponding panel
                    role="tab"
                    type="button"
                  >
                    <NavLink
                      to="/KidStoreNav"
                      className={({ isActive }) => `block ${
                        isActive ? "text-amber-800" : "text-black"
                      } 
                      border-transparent hover:text-gray-800 text-amber-800 relative flex items-center font-medium transition-colors duration-200 ease-out
                      `}
                    >
                      Kids
                    </NavLink>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <NavLink
                  onClick={toggleMobileMenu}
                  to="/ContactPages"
                  className={({ isActive }) => `block ${
                    isActive ? "text-amber-800" : "text-black"
                  } 
                      border-transparent hover:text-gray-800 text-amber-800 relative flex items-center font-medium transition-colors duration-200 ease-out
                      `}
                >
                  Contact Us
                </NavLink>
              </div>
              <div className="flow-root">
                <NavLink
                  onClick={toggleMobileMenu}
                  to="/ProductDetailPagePage"
                  className={({ isActive }) => `block ${
                    isActive ? "text-amber-800" : "text-black"
                  } 
                      border-transparent hover:text-gray-800 text-amber-800 relative flex items-center font-medium transition-colors duration-200 ease-out
                      `}
                >
                  Collections
                </NavLink>
              </div>
            </div>

            <div className="space-y-8 border-t border-gray-400 px-4 py-8">
              <div className="flow-root">
                <NavLink
                  onClick={toggleMobileMenu}
                  to="ApplicationUISignIn"
                  className={({ isActive }) => `block ${
                    isActive ? "text-amber-800" : "text-black"
                  } 
                      border-transparent hover:text-gray-800 text-amber-800 relative flex items-center font-medium transition-colors duration-200 ease-out
                      `}
                >
                  Sign in
                </NavLink>
              </div>
              <div className="flow-root">
                <NavLink
                  onClick={toggleMobileMenu}
                  to="CreateAccount"
                  className={({ isActive }) => `block ${
                    isActive ? "text-amber-800" : "text-black"
                  } 
                      border-transparent hover:text-gray-800 text-amber-800 relative flex items-center font-medium transition-colors duration-200 ease-out
                      `}
                >
                  Create account
                </NavLink>
              </div>
            </div>
          </div>
        </div>
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
                        <NavLink
                          to=""
                          className={({ isActive }) => `block ${
                            isActive ? "text-amber-800" : "text-gray-700"
                          } 
                      border-transparent hover:text-gray-800 text-amber-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-2xl font-medium transition-colors duration-200 ease-out
                      `}
                        >
                          <FaHome />
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
                          to="/ManStoreNav"
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

                    <NavLink
                      to="/ContactPages"
                      className={({ isActive }) => `block ${
                        isActive ? "text-amber-800" : "text-gray-700"
                      } 
                      border-transparent hover:text-gray-800 text-amber-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out
                      `}
                    >
                      Contact Us
                    </NavLink>

                    <NavLink
                      to="/ProductDetailPagePage"
                      className={({ isActive }) => `block ${
                        isActive ? "text-amber-800" : "text-gray-700"
                      } 
                      border-transparent hover:text-gray-800 text-amber-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out
                      `}
                    >
                      Collections
                    </NavLink>
                  </div>
                </div>

                <div className="lg:hidden">
                  <NavLink
                    to=""
                    className={({ isActive }) => `block ${
                      isActive ? "text-amber-800" : "text-gray-700"
                    } 
                      border-transparent hover:text-gray-800 text-amber-800 relative flex items-center p-2 bg-white rounded-full ml-2
                      `}
                  >
                    <FaHome />
                  </NavLink>
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
                  <div className="flex lg:ml-6 relative" ref={inputRef}>
                    {showInput && (
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search items"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={handleInputChange}
                        onFocus={handleInputFocus}
                        className="px-2 py-1 border text-black font-semibold border-gray-300 focus:outline-none rounded-full absolute right-8 top-0 z-40"
                      />
                    )}
                    <p
                      className="p-2 text-black hover:text-gray-500 rounded-full z-50"
                      onClick={handleSearchClick}
                    >
                      <FaSearch className="cursor-pointer" />
                    </p>
                  </div>

                  {/* <!-- Cart --> */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Link to="/cartTab">
                      <div
                        className="w-10 h-10 rounded-full flex justify-center items-center relative"
                        // onClick={handleOpenTabCart}
                      >
                        <img
                          src={iconCart}
                          alt=""
                          className="w-6 cursor-pointer"
                        />
                        <span className="absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
                          {totalQuantity}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};
export default Header;
