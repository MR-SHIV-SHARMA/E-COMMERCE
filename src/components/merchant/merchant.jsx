import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Merchant() {
  const [status, setStatus] = useState("loading");
  const [merchant, setMerchant] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });

  const fetchData = async () => {
    try {
      setStatus("loading");
      const [merchantRes] = await Promise.all([
        axios.get("/api/v1/merchants/super-admin/getAll-merchant"),
      ]);

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

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
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
