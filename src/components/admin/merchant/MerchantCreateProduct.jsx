import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MerchantCreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "", // This will hold category ID
    stock: "",
    description: "",
    gender: "",
    images: [],
  });

  const [categories, setCategories] = useState([]);

  // ✅ Fetch all categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/v1/categories");
        setCategories(res.data.data); // Assuming API returns { data: [...] }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    for (const key in formData) {
      if (key === "images") {
        for (let img of formData.images) {
          payload.append("images", img);
        }
      } else {
        payload.append(key, formData[key]);
      }
    }

    try {
      const res = await axios.post("/api/v1/content/createProduct", payload);
      alert("Product created!");
    } catch (err) {
      console.error("Create product error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" onChange={handleChange} placeholder="Product Name" />
      <input name="price" onChange={handleChange} placeholder="Price" />
      <input name="stock" onChange={handleChange} placeholder="Stock" />
      <input
        name="description"
        onChange={handleChange}
        placeholder="Description"
      />
      <input name="gender" onChange={handleChange} placeholder="Gender" />

      {/* ✅ Dropdown for category selection */}
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name} ({cat?.parent?.name})
          </option>
        ))}
      </select>

      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Create Product</button>
    </form>
  );
}
