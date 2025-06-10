import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SuperAdminDashboard() {
  const [status, setStatus] = useState("loading");
  const [superAdmin, setSuperAdmin] = useState([]);
  const [merchant, setMerchant] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
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
  const [processing, setProcessing] = useState({
    createAdmin: false,
    registerSuper: false,
    deleteAdmin: null,
    deleteSuper: null,
  });

  const fetchData = async () => {
    try {
      setStatus("loading");
      const [superAdminRes, adminsRes, merchantRes] = await Promise.all([
        axios.get("/api/v1/super-admin/super-admin"),
        axios.get("/api/v1/super-admin/admins"),
        axios.get("/api/v1/merchants/super-admin/getAll-merchant"),
      ]);

      setSuperAdmin(superAdminRes.data?.data || []);
      setAdmins(adminsRes.data?.data || []);
      setMerchant(merchantRes.data?.merchants || []);
      setMessage({ text: "Data fetched successfully", type: "success" });
      setStatus("success");
    } catch (error) {
      console.error(error);
      setMessage({
        text: error.response?.data?.message || "Failed to fetch data",
        type: "error",
      });
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!newAdmin.email || !newAdmin.password) {
      setMessage({ text: "Email and password are required", type: "error" });
      return;
    }

    try {
      setProcessing({ ...processing, createAdmin: true });
      await axios.post(
        "/api/v1/super-admin/super-admin/create-admin",
        newAdmin
      );
      setMessage({ text: "Admin created successfully", type: "success" });
      setShowCreateForm(false);
      setNewAdmin({ email: "", password: "", role: "admin" });
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage({
        text: error.response?.data?.message || "Failed to create admin",
        type: "error",
      });
    } finally {
      setProcessing({ ...processing, createAdmin: false });
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      setProcessing({ ...processing, deleteAdmin: id });
      await axios.delete(`/api/v1/super-admin/super-admin/delete-admin/${id}`);
      setMessage({ text: "Admin deleted successfully", type: "success" });
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage({
        text: error.response?.data?.message || "Failed to delete admin",
        type: "error",
      });
    } finally {
      setProcessing({ ...processing, deleteAdmin: null });
    }
  };

  const handleRegisterSuperAdmin = async (e) => {
    e.preventDefault();
    if (!newSuperAdmin.email || !newSuperAdmin.password) {
      setMessage({ text: "Email and password are required", type: "error" });
      return;
    }

    try {
      setProcessing({ ...processing, registerSuper: true });
      await axios.post(
        "/api/v1/super-admin/super-admin/register",
        newSuperAdmin
      );
      setMessage({ text: "Super admin registered", type: "success" });
      setShowRegisterForm(false);
      setNewSuperAdmin({ email: "", password: "" });
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage({
        text: error.response?.data?.message || "Failed to register super admin",
        type: "error",
      });
    } finally {
      setProcessing({ ...processing, registerSuper: false });
    }
  };

  const handleDeleteSuperAdmin = async (id) => {
    const adminToDelete = superAdmin.find((sa) => sa._id === id);
    if (adminToDelete?.isDefaultSuperAdmin) {
      setMessage({
        text: "Default super admin cannot be deleted",
        type: "error",
      });
      return;
    }

    if (!window.confirm("Are you sure you want to delete this super admin?")) {
      return;
    }

    try {
      setProcessing({ ...processing, deleteSuper: id });
      await axios.delete(`/api/v1/super-admin/super-admin/delete/${id}`);
      setMessage({ text: "Super admin deleted", type: "success" });
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage({
        text: error.response?.data?.message || "Failed to delete super admin",
        type: "error",
      });
    } finally {
      setProcessing({ ...processing, deleteSuper: null });
    }
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setShowRegisterForm(false);
    setMessage({ text: "", type: "" });
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
    setShowCreateForm(false);
    setMessage({ text: "", type: "" });
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Welcome, Super Admin 👋
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage system administrators and configure access controls
        </p>
      </header>

      {/* Status Messages */}
      {message.text && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
          <button
            onClick={() => setMessage({ text: "", type: "" })}
            className="ml-4 text-lg"
          >
            &times;
          </button>
        </div>
      )}

      {/* Loading State */}
      {status === "loading" && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {status === "success" && (
        <>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={toggleCreateForm}
              className={`px-6 py-3 rounded-lg transition-all flex-1 ${
                showCreateForm
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              } flex items-center justify-center`}
            >
              {showCreateForm ? (
                "Cancel Create Admin"
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create New Admin
                </>
              )}
            </button>

            <button
              onClick={toggleRegisterForm}
              className={`px-6 py-3 rounded-lg transition-all flex-1 ${
                showRegisterForm
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              } flex items-center justify-center`}
            >
              {showRegisterForm ? (
                "Cancel Super Admin Registration"
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Register Super Admin
                </>
              )}
            </button>
          </div>

          {/* Super Admin Section */}
          <section className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
              <h2 className="text-xl font-semibold">Super Admins</h2>
            </div>
            <div className="p-6">
              {superAdmin.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No super admins found
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {superAdmin.map((sa) => (
                    <div
                      key={sa._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start mb-2">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium text-gray-800">
                            {sa.email}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {sa.role}
                            </span>
                            <span
                              className={`${
                                sa.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              } text-xs px-2 py-1 rounded`}
                            >
                              {sa.isActive ? "Active" : "Inactive"}
                            </span>
                            {sa.isDefaultSuperAdmin && (
                              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Created:</span>{" "}
                          {new Date(sa.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Updated:</span>{" "}
                          {new Date(sa.updatedAt).toLocaleDateString()}
                        </div>
                      </div>

                      {!sa.isDefaultSuperAdmin && (
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => handleDeleteSuperAdmin(sa._id)}
                            disabled={processing.deleteSuper === sa._id}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:opacity-50 flex items-center"
                          >
                            {processing.deleteSuper === sa._id ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-700"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Deleting...
                              </>
                            ) : (
                              "Delete"
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
              <h2 className="text-xl font-semibold">Merchant</h2>
            </div>
            <div className="p-6">
              {merchant.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No merchant found
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {merchant.map((sa) => (
                    <div
                      key={sa._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start mb-2">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium text-gray-800">
                            {sa.email}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {sa.role}
                            </span>
                            <span
                              className={`${
                                sa.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              } text-xs px-2 py-1 rounded`}
                            >
                              {sa.isActive ? "Active" : "Inactive"}
                            </span>
                            {sa.isDefaultSuperAdmin && (
                              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Created:</span>{" "}
                          {new Date(sa.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Updated:</span>{" "}
                          {new Date(sa.updatedAt).toLocaleDateString()}
                        </div>
                      </div>

                      {!sa.isDefaultSuperAdmin && (
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => handleDeleteSuperAdmin(sa._id)}
                            disabled={processing.deleteSuper === sa._id}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:opacity-50 flex items-center"
                          >
                            {processing.deleteSuper === sa._id ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-700"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Deleting...
                              </>
                            ) : (
                              "Delete"
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Create Admin Form */}
          {showCreateForm && (
            <form
              onSubmit={handleCreateAdmin}
              className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Create New Admin
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newAdmin.email}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newAdmin.role}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, role: e.target.value })
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={processing.createAdmin}
                    className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                  >
                    {processing.createAdmin ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      "Create Admin"
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Register Super Admin Form */}
          {showRegisterForm && (
            <form
              onSubmit={handleRegisterSuperAdmin}
              className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Register New Super Admin
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="superadmin@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={newSuperAdmin.email}
                    onChange={(e) =>
                      setNewSuperAdmin({
                        ...newSuperAdmin,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={newSuperAdmin.password}
                    onChange={(e) =>
                      setNewSuperAdmin({
                        ...newSuperAdmin,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={processing.registerSuper}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
                  >
                    {processing.registerSuper ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Registering...
                      </>
                    ) : (
                      "Register Super Admin"
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Admins List */}
          <section className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h2 className="text-xl font-semibold">Administrators</h2>
                <span className="text-sm opacity-80 mt-1 md:mt-0">
                  {admins.length} {admins.length === 1 ? "admin" : "admins"}{" "}
                  total
                </span>
              </div>
            </div>
            <div className="p-6">
              {admins.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No administrators found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Admin
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Created
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {admins.map((admin) => (
                        <tr
                          key={admin._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {admin.email}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {admin.role}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                admin.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {admin.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(admin.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleDeleteAdmin(admin._id)}
                              disabled={processing.deleteAdmin === admin._id}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50 flex items-center"
                            >
                              {processing.deleteAdmin === admin._id ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Deleting
                                </>
                              ) : (
                                "Delete"
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
