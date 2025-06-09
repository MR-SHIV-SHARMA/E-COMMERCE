import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState({ brandName: "", logo: "" });
  const [merchantId, setMerchantId] = useState(""); // ID required for creating brand
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  // Fetch all brands
  const fetchBrands = async () => {
    try {
      const res = await axios.get(`/api/v1/merchants/brands`);
      setBrands(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch brands", err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Create brand
  const handleCreate = async () => {
    if (!merchantId) return alert("Merchant ID required");
    try {
      await axios.post(
        `/api/v1/merchants/super-admin/createBrand/${merchantId}`,
        form
      );
      fetchBrands();
      setForm({ brandName: "", logo: "" });
    } catch (err) {
      console.error("Failed to create brand", err);
    }
  };

  // Update brand
  const handleUpdate = async () => {
    if (!selectedBrandId) return alert("Select a brand to update");
    try {
      await axios.patch(
        `/api/v1/merchants/super-admin/updateBrand/${selectedBrandId}`,
        form
      );
      fetchBrands();
      setSelectedBrandId(null);
      setForm({ brandName: "", logo: "" });
    } catch (err) {
      console.error("Failed to update brand", err);
    }
  };

  // Delete brand
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/merchants/super-admin/deleteBrand/${id}`);
      fetchBrands();
    } catch (err) {
      console.error("Failed to delete brand", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Brand Management</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Merchant ID (for creating brand)"
          value={merchantId}
          onChange={(e) => setMerchantId(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Brand Name"
          value={form.brandName}
          onChange={(e) => setForm({ ...form, brandName: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Logo URL"
          value={form.logo}
          onChange={(e) => setForm({ ...form, logo: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 mr-2"
          onClick={handleCreate}
        >
          Create
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{brand.brandName}</h2>
              <img src={brand.logo} alt="logo" className="h-10 mt-1" />
              <p className="text-sm text-gray-500">{brand._id}</p>
            </div>
            <div>
              <button
                className="bg-yellow-400 text-black px-3 py-1 mr-2"
                onClick={() => {
                  setSelectedBrandId(brand._id);
                  setForm({ brandName: brand.brandName, logo: brand.logo });
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1"
                onClick={() => handleDelete(brand._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
