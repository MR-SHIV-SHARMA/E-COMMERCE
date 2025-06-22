import React, { useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, X } from "lucide-react"; // optional: use your own icons

export default function MerchantLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { path: "/merchant", label: "Dashboard" },
    { path: "/merchant/products", label: "Products" },
    { path: "/merchant/orders", label: "Orders" },
    { path: "/merchant/merchant-create", label: "Create Merchant" },
    { path: "/merchant/merchant-login", label: "Login Merchant" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      navigate("/merchant/merchant-login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow">
        <h2 className="text-lg font-semibold text-indigo-600">
          Merchant Panel
        </h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-white shadow-lg z-50 lg:z-auto`}
      >
        <div className="p-6 border-b border-gray-200 text-xl font-semibold text-indigo-600 hidden lg:block">
          Merchant Panel
        </div>
        <nav className="p-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-indigo-100"
                }`
              }
              end={link.path === "/merchant"}
              onClick={() => setSidebarOpen(false)} // close sidebar on mobile
            >
              {link.label}
            </NavLink>
          ))}

          {/* Logout Button */}
          <button
            onClick={() => {
              handleLogout();
              setSidebarOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
