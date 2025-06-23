import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MerchantOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/orders")
      .then((res) => setOrders(res.data?.data || []))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 mb-4 rounded-lg bg-white shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              Order ID: {order._id}
            </h2>

            <p className="text-sm text-gray-600">
              Status: <span className="font-medium">{order.status}</span>
            </p>
            <p className="text-sm text-gray-600">
              Payment Status:{" "}
              <span className="font-medium">{order.paymentStatus}</span>
            </p>
            <p className="text-sm text-gray-600">
              Total Price: ₹{order.totalPrice}
            </p>
            <p className="text-sm text-gray-600">Tax: ₹{order.tax}</p>
            <p className="text-sm text-gray-600">Discount: ₹{order.discount}</p>
            <p className="text-sm text-gray-600">
              Grand Total: ₹{order.grandTotal}
            </p>
            <p className="text-sm text-gray-600">
              Created At: {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              Updated At: {new Date(order.updatedAt).toLocaleString()}
            </p>

            <div className="mt-4">
              <h3 className="font-semibold">Shipping Address:</h3>
              {order.shippingAddress ? (
                <ul className="text-sm pl-4">
                  <li>Full Name: {order.shippingAddress.fullName}</li>
                  <li>Address Line: {order.shippingAddress.addressLine}</li>
                  <li>City: {order.shippingAddress.city}</li>
                  <li>State: {order.shippingAddress.state}</li>
                  <li>Postal Code: {order.shippingAddress.postalCode}</li>
                  <li>Country: {order.shippingAddress.country}</li>
                  <li>Phone: {order.shippingAddress.phone}</li>
                </ul>
              ) : (
                <p className="text-sm text-red-500">No address provided</p>
              )}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Items:</h3>
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="border-t pt-2 mt-2 text-sm text-gray-700"
                >
                  <p className="font-medium">
                    Product: {item.product?.name || "N/A"}
                  </p>
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.name}
                    className="w-32 h-32 object-cover rounded my-2"
                  />
                  <p>Description: {item.product?.description}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Category ID: {item.product?.category}</p>
                  <p>Gender: {item.product?.gender}</p>
                  <p>Stock: {item.product?.stock}</p>
                  <p>Available: {item.product?.isAvailable ? "Yes" : "No"}</p>
                  <p>Featured: {item.product?.isFeatured ? "Yes" : "No"}</p>
                  <p>
                    Discount: {item.product?.discount?.percentage || 0}% (
                    {item.product?.discount?.startDate &&
                      new Date(
                        item.product.discount.startDate
                      ).toLocaleDateString()}{" "}
                    -{" "}
                    {item.product?.discount?.endDate &&
                      new Date(
                        item.product.discount.endDate
                      ).toLocaleDateString()}
                    )
                  </p>
                  <p>
                    Rating: {item.product?.ratings?.average || 0} ⭐ (
                    {item.product?.ratings?.count || 0} reviews)
                  </p>
                  <div>
                    <span>Sizes: </span>
                    {(item.product?.sizes || []).map((s) => (
                      <span
                        key={s._id}
                        className="inline-block bg-gray-200 px-2 py-1 mr-2 rounded"
                      >
                        {s.size} ({s.stock})
                      </span>
                    ))}
                  </div>
                  <div className="mt-1">
                    <span>Colors: </span>
                    {(item.product?.colors || []).map((c) => (
                      <span
                        key={c._id}
                        className="inline-block bg-red-200 px-2 py-1 mr-2 rounded"
                      >
                        {c.color} ({c.stock})
                      </span>
                    ))}
                  </div>
                  <p className="text-xs mt-2 text-gray-500">
                    Product Created:{" "}
                    {item.product?.createdAt &&
                      new Date(item.product.createdAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Product Updated:{" "}
                    {item.product?.updatedAt &&
                      new Date(item.product.updatedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
