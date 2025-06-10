import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Merchant() {
  const [status, setStatus] = useState("loading");
  const [merchant, setMerchant] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showUpdateForm, setShowUpdateForm] = useState({
    show: false,
    id: null,
  });
  const [formValues, setFormValues] = useState({});

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/merchants/super-admin/getAll-merchant"
      );
      setMerchant(data?.merchants || []);
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

      const newMerchantId = response.data?.merchant?._id;
      setMessage({
        text: "Merchant account created successfully",
        type: "success",
      });
      setShowUpdateForm({ show: true, id: newMerchantId });
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

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Message */}
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
      {/* Loader */}
      {status === "loading" && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {/* Create Form */}
      <div className="bg-white rounded-xl shadow-md mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
          Create Merchant Account
        </h2>
        <form
          onSubmit={createMerchant}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="email"
            placeholder="Email"
            required
            className="border px-3 py-2 rounded w-full"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            required
            className="border px-3 py-2 rounded w-full"
          />
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
            >
              ➕ Create Merchant
            </button>
          </div>
        </form>
      </div>
      {/* Update Form */}
      {showUpdateForm.show && (
        <form
          onSubmit={(e) => updateMerchant(e, showUpdateForm.id)}
          className="p-6 bg-white rounded-xl shadow-md mb-8 space-y-4 border-2 border-green-400"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-green-700">
              Update Merchant Details
            </h2>
            <button
              type="button"
              onClick={() => setShowUpdateForm({ show: false, id: null })}
              className="text-red-600 hover:underline"
            >
              Cancel ✖️
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["name", "Merchant Name"],
              ["phone", "Phone"],
              ["panCard", "PAN Card"],
              ["aadhaarCard", "Aadhaar Card"],
              ["companyName", "Company Name"],
              ["ownerName", "Owner Name"],
              ["fabricTypes", "Fabric Types (comma-separated)"],
              ["deliveryOptions", "Delivery Options (comma-separated)"],
            ].map(([name, placeholder]) => (
              <input
                key={name}
                name={name}
                value={formValues[name] || ""}
                placeholder={placeholder}
                onChange={handleInputChange}
                className="border px-3 py-2 rounded w-full"
              />
            ))}

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isSustainable"
                checked={formValues.isSustainable}
                onChange={handleInputChange}
              />
              <span>Sustainable</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isWholesaleAvailable"
                checked={formValues.isWholesaleAvailable}
                onChange={handleInputChange}
              />
              <span>Wholesale Available</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isVerified"
                checked={formValues.isVerified}
                onChange={handleInputChange}
              />
              <span>Verified</span>
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
            >
              ✅ Update Merchant
            </button>
          </div>
        </form>
      )}

      {/* Merchant List Section */}
      {status === "success" && (
        <>
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
                  {merchant.map((m) => (
                    <div
                      key={m._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {m.companyName} ({m.name})
                      </h3>

                      <div className="text-sm text-gray-600 space-y-2">
                        <div>
                          <span className="font-medium">Email:</span> {m.email}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {m.phone}
                        </div>
                        <div>
                          <span className="font-medium">Owner:</span>{" "}
                          {m.ownerName}
                        </div>
                        <div>
                          <span className="font-medium">PAN:</span> {m.panCard}
                        </div>
                        <div>
                          <span className="font-medium">Aadhaar:</span>{" "}
                          {m.aadhaarCard}
                        </div>
                        <div>
                          <span className="font-medium">GST:</span>{" "}
                          {m.gstNumber}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Store Location
                        </h4>
                        <div className="text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Address:</span>{" "}
                            {m.storeLocation?.address}
                          </div>
                          <div>
                            <span className="font-medium">City:</span>{" "}
                            {m.storeLocation?.city}
                          </div>
                          <div>
                            <span className="font-medium">State:</span>{" "}
                            {m.storeLocation?.state}
                          </div>
                          <div>
                            <span className="font-medium">Postal Code:</span>{" "}
                            {m.storeLocation?.postalCode}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Fabric Types
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {m.fabricTypes?.map((type, i) => (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Delivery Options
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {m.deliveryOptions?.map((opt, i) => (
                            <span
                              key={i}
                              className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded"
                            >
                              {opt}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        {m.isWholesaleAvailable && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                            Wholesale Available
                          </span>
                        )}
                        {m.isSustainable && (
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                            Sustainable
                          </span>
                        )}
                        {m.isVerified && (
                          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                            Verified
                          </span>
                        )}
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Products
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          {m.products?.map((pid, i) => (
                            <div
                              key={i}
                              className="bg-gray-100 px-2 py-1 rounded break-words"
                            >
                              {pid}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Brands
                        </h4>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {m.brands?.map((bid, i) => (
                            <span
                              key={i}
                              className="bg-pink-100 text-pink-800 px-2 py-1 rounded"
                            >
                              {bid}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-gray-500 grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-medium">Created:</span>{" "}
                          {new Date(m.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Updated:</span>{" "}
                          {new Date(m.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(m)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(m._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
