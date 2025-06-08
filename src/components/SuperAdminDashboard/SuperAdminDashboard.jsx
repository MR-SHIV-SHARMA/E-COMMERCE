import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SuperAdminDashboard() {
  const [status, setStatus] = useState("loading");
  const [superAdmin, setSuperAdmin] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
    role: "admin",
  });
  const [newSuperAdmin, setNewSuperAdmin] = useState({
    email: "",
    password: "",
  });

  const fetchData = async () => {
    try {
      setStatus("loading");
      const superAdminRes = await axios.get("/api/v1/super-admin/super-admin");
      setSuperAdmin(superAdminRes.data?.data);

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
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage("Failed to create admin.");
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`/api/v1/super-admin/super-admin/delete-admin/${id}`);
      setMessage("Admin deleted successfully.");
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete admin.");
    }
  };

  const handleRegisterSuperAdmin = async () => {
    try {
      await axios.post(
        "/api/v1/super-admin/super-admin/register",
        newSuperAdmin
      );
      setMessage("Super admin registered successfully.");
      setShowRegisterForm(false);
      setNewSuperAdmin({ email: "", password: "" });
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage("Failed to register super admin.");
    }
  };

  const handleDeleteSuperAdmin = async (id) => {
    try {
      await axios.delete(`/api/v1/super-admin/super-admin/delete/${id}`);
      setMessage("Super admin deleted successfully.");
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete super admin.");
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
          {superAdmin.length > 0 && (
            <div className="bg-white shadow-md rounded-xl p-6 mt-4 border">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                Super Admins
              </h2>
              <div className="space-y-4">
                {superAdmin.map((sa) => (
                  <div key={sa._id} className="border p-4 rounded-md">
                    <p>
                      <strong>Email:</strong> {sa.email}
                    </p>
                    <p>
                      <strong>Role:</strong> {sa.role}
                    </p>
                    <p>
                      <strong>Active:</strong> {sa.isActive ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Default Super Admin:</strong>{" "}
                      {sa.isDefaultSuperAdmin ? "True" : "False"}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(sa.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>Updated At:</strong>{" "}
                      {new Date(sa.updatedAt).toLocaleString()}
                    </p>

                    {superAdmin?.isDefaultSuperAdmin &&
                      !sa.isDefaultSuperAdmin && (
                        <button
                          onClick={() => handleDeleteSuperAdmin(sa._id)}
                          className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 space-x-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                setShowCreateForm((prev) => !prev);
                setShowRegisterForm(false);
              }}
            >
              {showCreateForm ? "Cancel" : "➕ Create New Admin"}
            </button>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={() => {
                setShowRegisterForm((prev) => !prev);
                setShowCreateForm(false);
              }}
            >
              {showRegisterForm ? "Cancel" : "🔐 Register Super Admin"}
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

          {/* Register Super Admin Form */}
          {showRegisterForm && (
            <div className="bg-gray-100 p-6 rounded-lg mt-4 shadow-md border">
              <h3 className="text-lg font-semibold mb-4">
                Register Super Admin
              </h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border px-4 py-2 rounded"
                  value={newSuperAdmin.email}
                  onChange={(e) =>
                    setNewSuperAdmin({
                      ...newSuperAdmin,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border px-4 py-2 rounded"
                  value={newSuperAdmin.password}
                  onChange={(e) =>
                    setNewSuperAdmin({
                      ...newSuperAdmin,
                      password: e.target.value,
                    })
                  }
                />
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  onClick={handleRegisterSuperAdmin}
                >
                  Register Super Admin
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
