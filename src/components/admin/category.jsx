import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`/api/v1/categories`);
      setCategories(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error("Error fetching categories", err);
      setCategories([]); // fallback to empty array on error
    }
  };

  const createCategory = async () => {
    try {
      await axios.post(`/api/v1/categories`, { name });
      setName("");
      fetchCategories();
    } catch (err) {
      console.error("Error creating category", err);
    }
  };

  const updateCategory = async () => {
    if (!selectedCategory) return;
    try {
      await axios.put(`/api/v1/categories/${selectedCategory._id}`, {
        name: updatedName,
      });
      setSelectedCategory(null);
      setUpdatedName("");
      fetchCategories();
    } catch (err) {
      console.error("Error updating category", err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`/api/v1/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category", err);
    }
  };

  const seedCategories = async () => {
    try {
      await axios.post(`/api/v1/categories/categories/seed`);
      fetchCategories();
    } catch (err) {
      console.error("Error seeding categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Category Manager</h2>

      {/* Create New Category */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={createCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* Seed Data Button */}
      <div className="mb-4">
        <button
          onClick={seedCategories}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Seed Categories
        </button>
      </div>

      {/* Categories List */}
      <ul className="space-y-2">
        {Array.isArray(categories) &&
          categories.map((cat) => (
            <li
              key={cat._id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{cat.name}</span>
              <div className="space-x-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setUpdatedName(cat.name);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteCategory(cat._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>

      {/* Update Category Form */}
      {selectedCategory && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Updated category name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            onClick={updateCategory}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setUpdatedName("");
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
