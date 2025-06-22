import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MerchantUpdateProduct() {
  const { id } = useParams(); // Product ID from route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    gender: "unisex",
    isAvailable: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`/api/v1/content/getProductById/${id}`)
      .then((res) => {
        const product = res.data.data;
        setFormData({
          name: product.name || "",
          price: product.price || 0,
          stock: product.stock || 0,
          description: product.description || "",
          gender: product.gender || "unisex",
          isAvailable: product.isAvailable,
        });
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
        setMessage("Failed to fetch product details.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.patch(
        `/api/v1/content/update-product/${id}`,
        formData
      );
      setMessage("Product updated successfully!");
      setTimeout(() => navigate("/merchant/products"), 1500);
    } catch (err) {
      console.error("Error updating product:", err);
      setMessage("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>

      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Available</label>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
