import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MerchantProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/product")
      .then((res) => setProducts(res.data?.data || []))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Products</h1>
      {products.length === 0 ? (
        <p>Loading or no products found...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow">
              <img
                src={(product.images || [])[0]}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-bold mt-2">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm text-indigo-600">Price: ₹{product.price}</p>
              <p className="text-sm">Stock: {product.stock}</p>
              <p className="text-sm">Gender: {product.gender}</p>
              <p className="text-sm">
                Available: {product.isAvailable ? "Yes" : "No"}
              </p>

              {/* Discount */}
              <div className="text-sm text-green-700 mt-2">
                Discount: {product.discount?.percentage || 0}% <br />
                From:{" "}
                {product.discount?.startDate
                  ? new Date(product.discount.startDate).toLocaleDateString()
                  : "N/A"}{" "}
                <br />
                To:{" "}
                {product.discount?.endDate
                  ? new Date(product.discount.endDate).toLocaleDateString()
                  : "N/A"}
              </div>

              {/* Sizes */}
              <div className="text-sm mt-2">
                Sizes:{" "}
                {(product.sizes || []).map((s) => (
                  <span
                    key={s._id}
                    className="inline-block bg-gray-200 px-2 py-1 mr-1 rounded"
                  >
                    {s.size} ({s.stock})
                  </span>
                ))}
              </div>

              {/* Colors */}
              <div className="text-sm mt-1">
                Colors:{" "}
                {(product.colors || []).map((c) => (
                  <span
                    key={c._id}
                    className="inline-block bg-red-100 px-2 py-1 mr-1 rounded"
                  >
                    {c.color} ({c.stock})
                  </span>
                ))}
              </div>

              {/* Ratings */}
              <p className="text-sm mt-2 text-yellow-600">
                Rating: {product.ratings?.average || 0} ⭐ (
                {product.ratings?.count || 0} reviews)
              </p>

              {/* Category */}
              <p className="text-sm">Category ID: {product.category}</p>

              {/* isFeatured */}
              <p className="text-sm">
                Featured: {product.isFeatured ? "Yes 🌟" : "No"}
              </p>

              {/* Availability Zones */}
              <p className="text-sm">
                Availability Zones:{" "}
                {(product.availabilityZones || []).length > 0
                  ? product.availabilityZones.join(", ")
                  : "None"}
              </p>

              {/* Merchant ID */}
              <p className="text-xs text-gray-500 mt-2">
                Merchant ID: {product.merchant}
              </p>

              {/* Reviews count */}
              <p className="text-xs text-gray-500">
                Total Reviews: {(product.reviews || []).length}
              </p>

              {/* Created/Updated */}
              <p className="text-xs text-gray-500">
                Created At:{" "}
                {product.createdAt
                  ? new Date(product.createdAt).toLocaleString()
                  : "N/A"}
              </p>
              <p className="text-xs text-gray-500">
                Updated At:{" "}
                {product.updatedAt
                  ? new Date(product.updatedAt).toLocaleString()
                  : "N/A"}
              </p>

              {/* MongoDB __v */}
              <p className="text-xs text-gray-400">__v: {product.__v}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
