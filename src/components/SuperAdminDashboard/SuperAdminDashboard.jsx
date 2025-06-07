import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SuperAdminDashboard() {
  const [status, setStatus] = useState("loading");
  const [superAdmin, setSuperAdmin] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const fetchData = async () => {
    try {
      setStatus("loading");
      const superAdminRes = await axios.get("/api/v1/super-admin/super-admin");
      setSuperAdmin(superAdminRes.data?.data?.[0]);

      const adminsRes = await axios.get("/api/v1/super-admin/admins");
      setAdmins(adminsRes.data?.data || []);

      setMessage("Data fetched successfully.");
      setStatus("success");
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch data.");
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateAdmin = async () => {
    try {
      await axios.post(
        "/api/v1/super-admin/super-admin/create-admin",
        newAdmin
      );
      setMessage("Admin created successfully.");
      setShowCreateForm(false);
      setNewAdmin({ email: "", password: "", role: "admin" });
      fetchData(); // Refresh
    } catch (error) {
      console.error(error);
      setMessage("Failed to create admin.");
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`/api/v1/super-admin/super-admin/delete-admin/${id}`);
      setMessage("Admin deleted successfully.");
      fetchData(); // Refresh
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete admin.");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Welcome, Super Admin 👋
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Here's your system overview and tools to manage users.
      </p>

      {status === "loading" && (
        <p className="text-center text-blue-500">Loading...</p>
      )}

      {status === "error" && (
        <p className="text-center text-red-500">{message}</p>
      )}

      {status === "success" && (
        <>
          {/* Super Admin Info */}
          {superAdmin && (
            <div className="bg-white shadow-md rounded-xl p-6 mt-4 border">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Default Super Admin Info
              </h2>
              <p>
                <strong>Email:</strong> {superAdmin.email}
              </p>
              <p>
                <strong>Role:</strong> {superAdmin.role}
              </p>
              <p>
                <strong>Active:</strong> {superAdmin.isActive ? "Yes" : "No"}
              </p>
              <p>
                <strong>Default Super Admin:</strong>{" "}
                {superAdmin.isDefaultSuperAdmin ? "True" : "False"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(superAdmin.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(superAdmin.updatedAt).toLocaleString()}
              </p>
            </div>
          )}

          {/* Create Admin Button */}
          <div className="mt-6">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? "Cancel" : "➕ Create New Admin"}
            </button>
          </div>

          {/* Create Admin Form */}
          {showCreateForm && (
            <div className="bg-gray-100 p-6 rounded-lg mt-4 shadow-md border">
              <h3 className="text-lg font-semibold mb-4">Add New Admin</h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border px-4 py-2 rounded"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border px-4 py-2 rounded"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                />
                <select
                  className="w-full border px-4 py-2 rounded"
                  value={newAdmin.role}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, role: e.target.value })
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="viewer">Viewer</option>
                </select>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={handleCreateAdmin}
                >
                  Create Admin
                </button>
              </div>
            </div>
          )}

          {/* Admins List */}
          <div className="bg-white shadow-md rounded-xl p-6 mt-6 border">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Admins List
            </h2>
            {admins.length > 0 ? (
              <ul className="space-y-4">
                {admins.map((admin) => (
                  <li
                    key={admin._id}
                    className="border rounded p-4 flex justify-between items-start"
                  >
                    <div>
                      <p>
                        <strong>Email:</strong> {admin.email}
                      </p>
                      <p>
                        <strong>Role:</strong> {admin.role}
                      </p>
                      <p>
                        <strong>Default Super Admin:</strong>{" "}
                        {admin.isDefaultSuperAdmin ? "True" : "False"}
                      </p>
                      <p>
                        <strong>Active:</strong> {admin.isActive ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(admin.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteAdmin(admin._id)}
                      className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      🗑️ Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No admins found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
