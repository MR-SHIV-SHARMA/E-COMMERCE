import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Merchant({ id }) {
  const [status, setStatus] = useState("loading");
  const [merchant, setMerchant] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showUpdateForm, setShowUpdateForm] = useState({
    show: false,
    id: null,
  });
  const [formValues, setFormValues] = useState({});
  const [expandedCards, setExpandedCards] = useState({});
  const userId = Cookies.get("userId");

  const fetchData = async () => {
    try {
      setStatus("loading");
      const { data } = await axios.get(
        `/api/v1/merchants/super-admin/get-merchant/${userId}`
      );
      setMerchant(data?.merchant || []);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage({
        text: error.response?.data?.message || "Failed to fetch merchants",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createMerchant = async (e) => {
    e.preventDefault();
    try {
      setStatus("loading");
      const formData = new FormData(e.target);
      const basicData = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const response = await axios.post(
        "/api/v1/merchants/super-admin/create-merchant",
        basicData
      );

      setMessage({
        text: "Merchant account created successfully",
        type: "success",
      });
      setShowUpdateForm({ show: true, id: response.data?.merchant?._id });
      setFormValues({});
      e.target.reset();
      await fetchData();
    } catch (error) {
      console.error(error);
      setMessage({
        text: error.response?.data?.message || "Failed to create merchant",
        type: "error",
      });
    } finally {
      setStatus("success");
    }
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

  const toggleCardExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Message Notification */}
      {message.text && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all transform ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          } animate-fadeIn`}
        >
          <div className="flex items-center">
            <span>{message.text}</span>
            <button
              onClick={() => setMessage({ text: "", type: "" })}
              className="ml-4 text-xl focus:outline-none"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Loader */}
      {status === "loading" && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Merchant Management
        </h1>
        <p className="text-gray-600 mt-2">
          Create, update, and manage merchant accounts
        </p>
      </div>

      {/* Create Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 p-5 md:p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Create Merchant Account
        </h2>
        <form
          onSubmit={createMerchant}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="merchant@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-3 rounded-lg transition duration-300 flex items-center justify-center"
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
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              Create Merchant
            </button>
          </div>
        </form>
      </div>

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
                <div
                  key={merchant._id}
                  className="border border-gray-200 rounded-xl p-5 transition-all hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {merchant.companyName}
                      </h3>
                      <p className="text-gray-600">{merchant.name}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(merchant)}
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
                        onClick={() => handleDelete(merchant._id)}
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
                      <span className="break-all">{merchant.email}</span>
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
                      <span>{merchant.phone || "Not provided"}</span>
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
                      <span>{merchant.ownerName || "Not provided"}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {merchant.isWholesaleAvailable && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Wholesale
                      </span>
                    )}
                    {merchant.isSustainable && (
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-medium">
                        Sustainable
                      </span>
                    )}
                    {merchant.isVerified && (
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium">
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                    <span>
                      Created:{" "}
                      {new Date(merchant.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      Updated:{" "}
                      {new Date(merchant.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Expandable details */}
                  <button
                    onClick={() => toggleCardExpand(merchant._id)}
                    className="mt-4 w-full text-center text-sm text-indigo-600 hover:text-indigo-800 flex items-center justify-center"
                  >
                    {expandedCards[merchant._id] ? "Show Less" : "Show More"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ml-1 transition-transform ${
                        expandedCards[merchant._id] ? "rotate-180" : ""
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

                  {expandedCards[merchant._id] && (
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
                            {merchant.storeLocation?.address || "Not provided"}
                          </div>
                          <div>
                            {merchant.storeLocation?.city &&
                              `${merchant.storeLocation.city}, `}
                            {merchant.storeLocation?.state}{" "}
                            {merchant.storeLocation?.postalCode}
                          </div>
                        </div>
                      </div>

                      {merchant.fabricTypes?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Fabric Types
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {merchant.fabricTypes.map((type, i) => (
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

                      {merchant.deliveryOptions?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Delivery Options
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {merchant.deliveryOptions.map((opt, i) => (
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

                      {merchant.products?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Products
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                            {merchant.products.slice(0, 4).map((pid, i) => (
                              <div
                                key={i}
                                className="bg-gray-100 px-2 py-1 rounded break-words truncate"
                              >
                                {pid}
                              </div>
                            ))}
                            {merchant.products.length > 4 && (
                              <div className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-500">
                                +{merchant.products.length - 4} more
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {merchant.brands?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Brands
                          </h4>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {merchant.brands.slice(0, 4).map((bid, i) => (
                              <span
                                key={i}
                                className="bg-pink-100 text-pink-800 px-2 py-1 rounded"
                              >
                                {bid}
                              </span>
                            ))}
                            {merchant.brands.length > 4 && (
                              <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                                +{merchant.brands.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
