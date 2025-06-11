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

  const [showUpdateForm, setShowUpdateForm] = useState({
    show: false,
    id: null,
  });
  const [formValues, setFormValues] = useState({});
  const [expandedCards, setExpandedCards] = useState({});

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

  const toggleCardExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateMerchant = async (e, id) => {
    e.preventDefault();
    try {
      setStatus("loading");
      const payload = {
        ...formValues,
        fabricTypes: formValues.fabricTypes?.split(",").map((x) => x.trim()),
        deliveryOptions: formValues.deliveryOptions
          ?.split(",")
          .map((x) => x.trim()),
      };

      await axios.patch(
        `/api/v1/merchants/super-admin/update-merchant/${id}`,
        payload
      );

      setMessage({ text: "Merchant updated successfully", type: "success" });
      setShowUpdateForm({ show: false, id: null });
      setFormValues({});
      await fetchData();
    } catch (error) {
      console.error(error);
      setMessage({
        text: error.response?.data?.message || "Failed to update merchant",
        type: "error",
      });
    } finally {
      setStatus("success");
    }
  };

  const handleEdit = (merchant) => {
    setShowUpdateForm({ show: true, id: merchant._id });
    setFormValues({
      name: merchant.name || "",
      phone: merchant.phone || "",
      panCard: merchant.panCard || "",
      aadhaarCard: merchant.aadhaarCard || "",
      companyName: merchant.companyName || "",
      ownerName: merchant.ownerName || "",
      fabricTypes: (merchant.fabricTypes || []).join(", "),
      deliveryOptions: (merchant.deliveryOptions || []).join(", "),
      isSustainable: merchant.isSustainable || false,
      isWholesaleAvailable: merchant.isWholesaleAvailable || false,
      isVerified: merchant.isVerified || false,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this merchant?"))
      return;
    try {
      await axios.delete(`/api/v1/merchants/super-admin/delete-merchant/${id}`);
      setMessage({ text: "Merchant deleted successfully", type: "success" });
      await fetchData();
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Failed to delete merchant",
        type: "error",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

          {/* Merchant List Section */}
          {status === "success" && (
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Merchant Accounts
                  <span className="ml-2 bg-indigo-800 text-xs font-medium px-2 py-1 rounded-full">
                    {merchant.length}
                  </span>
                </h2>
              </div>

              <div className="p-4 md:p-5">
                {merchant.length === 0 ? (
                  <div className="text-center py-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-700">
                      No merchants found
                    </h3>
                    <p className="mt-1 text-gray-500">
                      Create your first merchant account to get started
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {merchant.map((m) => (
                      <div
                        key={m._id}
                        className="border border-gray-200 rounded-xl p-5 transition-all hover:shadow-md"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">
                              {m.companyName}
                            </h3>
                            <p className="text-gray-600">{m.name}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(m)}
                              className="text-indigo-600 hover:text-indigo-800 transition-colors"
                              title="Edit"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(m._id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Delete"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-600 space-y-2">
                          <div className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mt-0.5 mr-2 text-gray-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="break-all">{m.email}</span>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 text-gray-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span>{m.phone || "Not provided"}</span>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 text-gray-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{m.ownerName || "Not provided"}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {m.isWholesaleAvailable && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              Wholesale
                            </span>
                          )}
                          {m.isSustainable && (
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-medium">
                              Sustainable
                            </span>
                          )}
                          {m.isVerified && (
                            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium">
                              Verified
                            </span>
                          )}
                        </div>

                        <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                          <span>
                            Created:{" "}
                            {new Date(m.createdAt).toLocaleDateString()}
                          </span>
                          <span>
                            Updated:{" "}
                            {new Date(m.updatedAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Expandable details */}
                        <button
                          onClick={() => toggleCardExpand(m._id)}
                          className="mt-4 w-full text-center text-sm text-indigo-600 hover:text-indigo-800 flex items-center justify-center"
                        >
                          {expandedCards[m._id] ? "Show Less" : "Show More"}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 transition-transform ${
                              expandedCards[m._id] ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {expandedCards[m._id] && (
                          <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Store Location
                              </h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div>
                                  {m.storeLocation?.address || "Not provided"}
                                </div>
                                <div>
                                  {m.storeLocation?.city &&
                                    `${m.storeLocation.city}, `}
                                  {m.storeLocation?.state}{" "}
                                  {m.storeLocation?.postalCode}
                                </div>
                              </div>
                            </div>

                            {m.fabricTypes?.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                  Fabric Types
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {m.fabricTypes.map((type, i) => (
                                    <span
                                      key={i}
                                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                    >
                                      {type}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {m.deliveryOptions?.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                  Delivery Options
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {m.deliveryOptions.map((opt, i) => (
                                    <span
                                      key={i}
                                      className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded"
                                    >
                                      {opt}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {m.products?.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                  Products
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                  {m.products.slice(0, 4).map((pid, i) => (
                                    <div
                                      key={i}
                                      className="bg-gray-100 px-2 py-1 rounded break-words truncate"
                                    >
                                      {pid}
                                    </div>
                                  ))}
                                  {m.products.length > 4 && (
                                    <div className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-500">
                                      +{m.products.length - 4} more
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {m.brands?.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                  Brands
                                </h4>
                                <div className="flex flex-wrap gap-2 text-xs">
                                  {m.brands.slice(0, 4).map((bid, i) => (
                                    <span
                                      key={i}
                                      className="bg-pink-100 text-pink-800 px-2 py-1 rounded"
                                    >
                                      {bid}
                                    </span>
                                  ))}
                                  {m.brands.length > 4 && (
                                    <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                                      +{m.brands.length - 4} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Update Form */}
          {showUpdateForm.show && (
            <div className="bg-white rounded-xl shadow-md mb-8 p-5 md:p-6 border-2 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-green-700 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Update Merchant Details
                </h2>
                <button
                  type="button"
                  onClick={() => setShowUpdateForm({ show: false, id: null })}
                  className="text-red-600 hover:text-red-800 transition-colors flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cancel
                </button>
              </div>

              <form
                onSubmit={(e) => updateMerchant(e, showUpdateForm.id)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ["name", "Merchant Name"],
                    ["phone", "Phone", "tel"],
                    ["panCard", "PAN Card"],
                    ["aadhaarCard", "Aadhaar Card"],
                    ["companyName", "Company Name"],
                    ["ownerName", "Owner Name"],
                    ["fabricTypes", "Fabric Types (comma-separated)"],
                    ["deliveryOptions", "Delivery Options (comma-separated)"],
                  ].map(([name, placeholder, type = "text"]) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {placeholder}
                      </label>
                      <input
                        name={name}
                        value={formValues[name] || ""}
                        type={type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  ))}

                  <div className="space-y-3">
                    {[
                      ["isSustainable", "Sustainable"],
                      ["isWholesaleAvailable", "Wholesale Available"],
                      ["isVerified", "Verified"],
                    ].map(([name, label]) => (
                      <div key={name} className="flex items-center">
                        <input
                          type="checkbox"
                          name={name}
                          checked={formValues[name] || false}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUpdateForm({ show: false, id: null })}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg transition duration-300 flex items-center"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
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
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    Update Merchant
                  </button>
                </div>
              </form>
            </div>
          )}

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
