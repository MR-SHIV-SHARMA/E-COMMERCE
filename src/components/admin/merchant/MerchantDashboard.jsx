import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function MerchantDashboard() {
  const [status, setStatus] = useState("loading");
  const [merchant, setMerchant] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [expanded, setExpanded] = useState(false);
  const userId = Cookies.get("merchantId");

  const fetchData = async () => {
    try {
      setStatus("loading");
      const { data } = await axios.get(
        `/api/v1/merchants/super-admin/get-merchant/${userId}`
      );
      setMerchant(data?.merchant || null);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setMessage({
        text:
          error.response?.data?.message || "Failed to fetch merchant details",
        type: "error",
      });
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateMerchant = async (e) => {
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
        `/api/v1/merchants/super-admin/update-merchant/${userId}`,
        payload
      );

      setMessage({ text: "Merchant updated successfully", type: "success" });
      setShowUpdateForm(false);
      await fetchData();
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Failed to update merchant",
        type: "error",
      });
    } finally {
      setStatus("success");
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm("Are you sure you want to delete this merchant account?")
    )
      return;
    try {
      await axios.delete(
        `/api/v1/merchants/super-admin/delete-merchant/${userId}`
      );
      setMessage({
        text: "Merchant account deleted successfully!",
        type: "success",
      });
      setTimeout(() => (window.location.href = "/admin"), 1500);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Failed to delete merchant",
        type: "error",
      });
    }
  };

  const handleEdit = () => {
    if (!merchant) return;

    setShowUpdateForm(true);
    setFormValues({
      name: merchant.name || "",
      phone: merchant.phone || "",
      panCard: merchant.panCard || "",
      aadhaarCard: merchant.aadhaarCard || "",
      companyName: merchant.companyName || "",
      ownerName: merchant.ownerName || "",
      storeLocation: {
        address: merchant.storeLocation?.address || "",
        city: merchant.storeLocation?.city || "",
        state: merchant.storeLocation?.state || "",
        postalCode: merchant.storeLocation?.postalCode || "",
      },
      fabricTypes: (merchant.fabricTypes || []).join(", "),
      deliveryOptions: (merchant.deliveryOptions || []).join(", "),
      isSustainable: merchant.isSustainable || false,
      isWholesaleAvailable: merchant.isWholesaleAvailable || false,
      isVerified: merchant.isVerified || false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (!merchant && status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!merchant && status === "error") {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {message.text ||
                  "Failed to load merchant data. Please try again later."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Notification System */}
      {message.text && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transition-all transform animate-fadeIn ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          <div className="flex items-start">
            <span className="flex-grow pr-4">{message.text}</span>
            <button
              onClick={() => setMessage({ text: "", type: "" })}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Merchant Account
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Manage your merchant profile and business details
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="flex items-center text-red-600 hover:text-red-800 transition-colors px-3 py-2 rounded-lg border border-red-200 hover:bg-red-50"
            title="Delete Account"
          >
            <svg
              className="h-5 w-5 mr-1.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">Delete Account</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Update Form Panel */}
        {showUpdateForm ? (
          <div className="lg:col-span-3 bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <svg
                  className="h-5 w-5 mr-2 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Update Merchant Details
              </h2>
              <button
                onClick={() => setShowUpdateForm(false)}
                className="flex items-center text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-1.5"
                  xmlns="http://www.w3.org/2000/svg"
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

            <form onSubmit={updateMerchant} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "name",
                    label: "Merchant Name",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "phone",
                    label: "Phone Number",
                    type: "tel",
                    required: true,
                  },
                  {
                    name: "panCard",
                    label: "PAN Card Number",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "aadhaarCard",
                    label: "Aadhaar Card Number",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "companyName",
                    label: "Company Name",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "ownerName",
                    label: "Owner Name",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "fabricTypes",
                    label: "Fabric Types (comma separated)",
                    type: "text",
                  },
                  {
                    name: "deliveryOptions",
                    label: "Delivery Options (comma separated)",
                    type: "text",
                  },
                ].map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <input
                      name={field.name}
                      value={formValues[field.name] || ""}
                      type={field.type}
                      onChange={handleInputChange}
                      required={field.required}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                ))}

                <div className="col-span-2 pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    Store Location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-4">
                    {["address", "city", "state", "postalCode"].map((field) => (
                      <div key={field} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {field}
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          name={field}
                          type="text"
                          value={formValues.storeLocation?.[field] || ""}
                          onChange={(e) =>
                            setFormValues((prev) => ({
                              ...prev,
                              storeLocation: {
                                ...prev.storeLocation,
                                [field]: e.target.value,
                              },
                            }))
                          }
                          required
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    Business Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: "isSustainable",
                        label: "Sustainable Business",
                        icon: (
                          <svg
                            className="w-5 h-5 mr-2 text-emerald-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                          </svg>
                        ),
                      },
                      {
                        name: "isWholesaleAvailable",
                        label: "Wholesale Available",
                        icon: (
                          <svg
                            className="w-5 h-5 mr-2 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                          </svg>
                        ),
                      },
                      {
                        name: "isVerified",
                        label: "Verified Account",
                        icon: (
                          <svg
                            className="w-5 h-5 mr-2 text-indigo-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            ></path>
                          </svg>
                        ),
                      },
                    ].map((feature) => (
                      <div
                        key={feature.name}
                        className="flex items-center bg-gray-50 rounded-lg p-3"
                      >
                        <input
                          type="checkbox"
                          name={feature.name}
                          checked={formValues[feature.name] || false}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                        />
                        <label className="ml-3 text-sm text-gray-700 flex items-center">
                          {feature.icon}
                          {feature.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-lg transition duration-300 flex items-center shadow-md hover:shadow-lg"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
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
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Merchant Profile Card */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="bg-gray-100 border-2 border-dashed rounded-xl w-20 h-20 mb-4 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {merchant.companyName}
                  </h2>
                  <p className="text-gray-600 mt-1">{merchant.name}</p>

                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {merchant.isWholesaleAvailable && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                          ></path>
                        </svg>
                        Wholesale
                      </span>
                    )}
                    {merchant.isSustainable && (
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          ></path>
                        </svg>
                        Sustainable
                      </span>
                    )}
                    {merchant.isVerified && (
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          ></path>
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Contact Information
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-lg mr-3">
                          <svg
                            className="h-5 w-5 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-gray-800 font-medium">
                            {merchant.email}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-lg mr-3">
                          <svg
                            className="h-5 w-5 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-gray-800 font-medium">
                            {merchant.phone || "Not provided"}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-lg mr-3">
                          <svg
                            className="h-5 w-5 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Owner</p>
                          <p className="text-gray-800 font-medium">
                            {merchant.ownerName || "Not provided"}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Registration Details
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            ></path>
                          </svg>
                          PAN Card
                        </div>
                        <span className="text-gray-900 font-medium">
                          {merchant.panCard || "Not provided"}
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            ></path>
                          </svg>
                          Aadhaar Card
                        </div>
                        <span className="text-gray-900 font-medium">
                          {merchant.aadhaarCard || "Not provided"}
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            ></path>
                          </svg>
                          GST Number
                        </div>
                        <span className="text-gray-900 font-medium">
                          {merchant.gstNumber || "Not provided"}
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Account Created
                        </div>
                        <span className="text-gray-900 font-medium">
                          {new Date(merchant.createdAt).toLocaleDateString()}
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2">
                        <div className="flex items-center text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Last Updated
                        </div>
                        <span className="text-gray-900 font-medium">
                          {new Date(merchant.updatedAt).toLocaleDateString()}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleEdit}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Merchant Details Panel */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Business Details
                  </h2>
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center px-3 py-2 rounded-lg border border-indigo-200 hover:bg-indigo-50"
                  >
                    {expanded ? "Show Less" : "Show More"}
                    <svg
                      className={`h-5 w-5 ml-1.5 transition-transform ${
                        expanded ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
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
                </div>

                <div className="space-y-6">
                  {/* Store Location */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
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
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      {merchant.storeLocation ? (
                        <div className="space-y-2">
                          <p className="text-gray-800 font-medium">
                            {merchant.storeLocation.address}
                          </p>
                          <p className="text-gray-600">
                            {merchant.storeLocation.city},{" "}
                            {merchant.storeLocation.state}{" "}
                            {merchant.storeLocation.postalCode}
                          </p>
                          <div className="pt-3">
                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                ></path>
                              </svg>
                              View on Map
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          No store location provided
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fabric Types */}
                    {merchant.fabricTypes?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-blue-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20"
                            ></path>
                          </svg>
                          Fabric Types
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {merchant.fabricTypes.map((type, i) => (
                            <span
                              key={i}
                              className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Delivery Options */}
                    {merchant.deliveryOptions?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                          <svg
                            className="w-5 h-5 text-amber-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                            ></path>
                          </svg>
                          Delivery Options
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {merchant.deliveryOptions.map((option, i) => (
                            <span
                              key={i}
                              className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-sm font-medium"
                            >
                              {option}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {expanded && (
                    <div className="space-y-6 pt-6 border-t border-gray-200">
                      {/* Products */}
                      {merchant.products?.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                            <svg
                              className="w-5 h-5 text-purple-500 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              ></path>
                            </svg>
                            Product Catalog
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {merchant.products.slice(0, 4).map((product, i) => (
                              <div
                                key={i}
                                className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                              >
                                <div className="flex items-center">
                                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-3 flex items-center justify-center">
                                    <svg
                                      className="w-6 h-6 text-gray-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                      ></path>
                                    </svg>
                                  </div>
                                  <div className="overflow-hidden">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      Product {i + 1}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                      ID: {product}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {merchant.products.length > 4 && (
                              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center border border-gray-100">
                                <p className="text-gray-500 text-sm font-medium">
                                  +{merchant.products.length - 4} more products
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Brands */}
                      {merchant.brands?.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                            <svg
                              className="w-5 h-5 text-rose-500 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              ></path>
                            </svg>
                            Associated Brands
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {merchant.brands.slice(0, 4).map((brand, i) => (
                              <div
                                key={i}
                                className="bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-100"
                              >
                                <div className="flex items-center">
                                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3 flex items-center justify-center">
                                    <svg
                                      className="w-5 h-5 text-gray-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      ></path>
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="text-gray-800 text-sm font-medium">
                                      Brand {i + 1}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                      ID: {brand}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {merchant.brands.length > 4 && (
                              <div className="bg-gray-50 rounded-lg px-4 py-2 flex items-center justify-center border border-gray-100">
                                <p className="text-gray-500 text-sm font-medium">
                                  +{merchant.brands.length - 4} more brands
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
