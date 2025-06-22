import React from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MerchantLayout() {
  const location = useLocation();
  const navigate = useNavigate();
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
      navigate("/merchant/merchant-login"); // Redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200 text-xl font-semibold text-indigo-600">
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
            >
              {link.label}
            </NavLink>
          ))}
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-left text-red-600 font-semibold hover:underline"
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
