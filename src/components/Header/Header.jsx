import React, { useState, useEffect, useRef } from "react"; // Importing React and its hooks
import { Link, NavLink } from "react-router-dom"; // Importing Link and NavLink from React Router
import { FaSearch } from "react-icons/fa"; // Importing Search icon
import { FaHome } from "react-icons/fa"; // Importing Home icon
import iconCart from "../../assets/images/iconCart.png"; // Importing Cart icon
import { useSelector, useDispatch } from "react-redux"; // Importing useSelector and useDispatch from Redux
import { toggleStatusTab } from "../../stores/cart"; // Importing toggleStatusTab from cart store
import { Man } from "../../components/Man_Products_Api_Data/Man_Products_Api_Data"; // Importing Men's Products
import { Woman } from "../Woman_Products_Api_Data/Woman_Products_Api_Data"; // Importing Women's Products
import { Kids } from "../Kids_Products_Api_Data/Kids_Products_Api_Data"; // Importing Kids' Products
import { BsBoxArrowInRight } from "react-icons/bs";
import {
  AiOutlineClose,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineShoppingCart,
  AiOutlineGift,
  AiOutlineLogout,
  AiOutlineQuestionCircle,
  AiOutlineComment,
  AiOutlineSchedule,
} from "react-icons/ai";

const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0); // State for total quantity
  const carts = useSelector((store) => store.cart.items); // Selector for cart items
  const dispatch = useDispatch(); // Dispatch for Redux actions

  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]); // Effect to update total quantity based on cart items

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab()); // Dispatching action to toggle cart tab status
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu open
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Function to toggle mobile menu
  };

  const MobileMenu = () => {
    return (
      <div>
        <button onClick={toggleMobileMenu}>Toggle Menu</button> // Button to
        toggle menu
      </div>
    );
  };

  const RenderMobileMenu = MobileMenu; // Render for mobile menu

  const handleClick = () => {
    toggleMobileMenu(); // Function to toggle mobile menu
  };

  const [isOpen, setIsOpen] = useState(false); // State for menu open
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Function to toggle menu
  };

  const [showInput, setShowInput] = useState(false); // State for search input show/hide
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const inputRef = useRef(null); // Ref for input
  const searchIconRef = useRef(null); // Ref for search icon

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside of the input and search icon
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        searchIconRef.current &&
        !searchIconRef.current.contains(event.target)
      ) {
        setShowInput(false); // Hide input on outside click
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    setShowInput((prev) => !prev); // Toggle search input visibility
    setTimeout(() => {
      if (!showInput) {
        inputRef.current?.focus(); // Focus input when shown
      } else {
        inputRef.current?.blur(); // Blur input when hidden
      }
    }, 0);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
    const searchQuery = e.target.value.toLowerCase(); // Convert search query to lowercase
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
      console.log("No results found."); // Log message if no results found
    }
  };

  const handleInputFocus = () => {
    setShowInput(true); // Show input onFocus
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
          className={`fixed inset-0 z-40 flex overflow-hidden ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="relative flex flex-col bg-white shadow-xl w-full max-w-xs h-full">
            <div className="flex px-4 pb-2 pt-4 ml-2">
              <button
                type="button"
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-900"
                onClick={toggleMobileMenu}
              >
                <AiOutlineClose className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <div className="border-b border-gray-200">
              <div
                className="flex space-x-16 px-4"
                aria-orientation="horizontal"
                role="tablist"
              >
                <button
                  onClick={toggleMobileMenu}
                  className="border-transparent text-black flex-1 whitespace-nowrap border-b-2 px-1 text-base font-medium"
                >
                  <NavLink
                    to="/WomanStoarNav"
                    className={({ isActive }) =>
                      isActive ? "text-amber-800" : "text-black"
                    }
                  >
                    Women
                  </NavLink>
                </button>
                <button
                  onClick={toggleMobileMenu}
                  className="border-transparent text-black flex-1 whitespace-nowrap border-b-2 px-1 text-base font-medium"
                >
                  <NavLink
                    to="/ManStoreNav"
                    className={({ isActive }) =>
                      isActive ? "text-amber-800" : "text-black"
                    }
                  >
                    Men
                  </NavLink>
                </button>
                <button
                  onClick={toggleMobileMenu}
                  className="border-transparent text-black flex-1 whitespace-nowrap border-b-2 px-1 text-base font-medium"
                >
                  <NavLink
                    to="/KidStoreNav"
                    className={({ isActive }) =>
                      isActive ? "text-amber-800" : "text-black"
                    }
                  >
                    Kids
                  </NavLink>
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-4 px-4 pt-4">
              <button className="text-left text-gray-800 flex hover:text-gray-900">
                <AiOutlinePhone className="h-6 w-6 mr-2" />
                <NavLink
                  onClick={toggleMobileMenu}
                  to="/ContactPages"
                  className={({ isActive }) =>
                    isActive ? "text-amber-800" : "text-black"
                  }
                >
                  Contact Us
                </NavLink>
              </button>
              <button className="text-left text-gray-800 flex hover:text-gray-900">
                <AiOutlineShoppingCart className="h-6 w-6 mr-2" />
                <NavLink
                  onClick={toggleMobileMenu}
                  to="/ProductDetailPagePage"
                  className={({ isActive }) =>
                    isActive ? "text-amber-800" : "text-black"
                  }
                >
                  Collections
                </NavLink>
              </button>
              <button className="text-left text-gray-800 flex hover:text-gray-900">
                <AiOutlineSchedule className="h-6 w-6 mr-2" />
                <NavLink
                  to="/UpcomingOrders"
                  className={({ isActive }) =>
                    isActive ? "text-amber-800" : "text-black"
                  }
                >
                  Upcoming Orders
                </NavLink>
              </button>
              <button className="text-left text-gray-800 flex hover:text-gray-900">
                <AiOutlineGift className="h-6 w-6 mr-2" />
                <NavLink
                  to="/OfferZone"
                  className={({ isActive }) =>
                    isActive ? "text-amber-800" : "text-black"
                  }
                >
                  Offer Zone
                </NavLink>
              </button>
              <button className="text-left text-gray-800 flex hover:text-gray-900">
                <AiOutlineUser className="h-6 w-6 mr-2" />
                <NavLink
                  to="/MyAccount"
                  className={({ isActive }) =>
                    isActive ? "text-amber-800" : "text-black"
                  }
                >
                  My Account
                </NavLink>
              </button>
              <button className="text-left text-gray-800 flex hover:text-gray-900">
                <AiOutlineComment className="h-6 w-6 mr-2" />
                <NavLink
                  to="/MyChats"
                  className={({ isActive }) =>
                    isActive ? "text-amber-800" : "text-black"
                  }
                >
                  My Chats
                </NavLink>
              </button>
              <button className="text-left text-gray-800 flex hover:text-gray-900">
                <AiOutlineQuestionCircle className="h-6 w-6 mr-2" />
                <NavLink
                  to="/Help"
                  className={({ isActive }) =>
                    isActive ? "text-amber-800" : "text-black"
                  }
                >
                  Help
                </NavLink>
              </button>
              <div className="space-y-2 border-t border-gray-400 py-2">
                <div className="flow-root">
                  <NavLink
                    onClick={toggleMobileMenu}
                    to="ApplicationUISignIn"
                    className={({ isActive }) =>
                      isActive ? "text-amber-800" : "text-black"
                    }
                  >
                    <div className="flex">
                      <BsBoxArrowInRight className="h-6 w-6 mr-2" />
                      <span>Sign in</span>
                    </div>
                  </NavLink>
                </div>
                <div className="flow-root">
                  <NavLink
                    onClick={toggleMobileMenu}
                    to="CreateAccount"
                    className={({ isActive }) =>
                      isActive ? "text-amber-800" : "text-black"
                    }
                  >
                    <div className="flex">
                      <AiOutlineUser className="h-6 w-6 mr-2" />
                      <span>Create account</span>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 w-full text-center p-4">
              <hr className="w-full my-2 border-t border-gray-400" />
              <button className="flex items-center justify-center text-black font-bold px-4 rounded">
                <AiOutlineLogout className="h-6 w-6 mr-2" />
                Sign Out
              </button>
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
