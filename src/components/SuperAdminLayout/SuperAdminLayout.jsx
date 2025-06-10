// File: src/components/SuperAdmin/SuperAdminLayout.jsx

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SuperAdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      navigate("/admin"); // Redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Super Admin</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/super-admin"
            end
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/super-admin/manage-admins"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            Manage Admins
          </NavLink>
          <NavLink
            to="/super-admin/activity"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            Activity
          </NavLink>
          <NavLink
            to="/super-admin/category"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            category
          </NavLink>
          <NavLink
            to="/super-admin/brand"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            brand
          </NavLink>
          <NavLink
            to="/super-admin/merchant"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            Merchant
          </NavLink>

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
