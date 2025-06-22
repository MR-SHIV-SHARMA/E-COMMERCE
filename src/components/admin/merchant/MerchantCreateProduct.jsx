import React, { useState } from "react";
import axios from "axios";

export default function MerchantCreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    gender: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

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
      const res = await axios.post("/api/v1/content/createProduct", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${yourAuthToken}`,
        },
      });
      alert("Product created!");
    } catch (err) {
      console.error("Create product error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Product Name" />
      <input name="price" onChange={handleChange} placeholder="Price" />
      <input
        name="category"
        onChange={handleChange}
        placeholder="Category ID"
      />
      <input name="stock" onChange={handleChange} placeholder="Stock" />
      <input
        name="description"
        onChange={handleChange}
        placeholder="Description"
      />
      <input name="gender" onChange={handleChange} placeholder="Gender" />
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Create Product</button>
    </form>
  );
}
