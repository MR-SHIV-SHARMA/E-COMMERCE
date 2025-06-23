import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MerchantCreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    gender: "",
    material: "",
    origin: "",
    style: "",
    fabric: "",
    pattern: "",
    fit: "",
    season: "",
    occasion: "",
    manufacturerName: "",
    manufacturerAddress: "",
    manufacturerContact: "",
    warrantyPeriod: "",
    warrantyDetails: "",
    availabilityZones: "",
    discountPercentage: "",
    discountStartDate: "",
    discountEndDate: "",
    images: [],
    sizes: "",
    colors: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/v1/categories");
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

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

    // Images
    for (let img of formData.images) {
      payload.append("images", img);
    }

    // Fields
    payload.append("name", formData.name);
    payload.append("price", formData.price);
    payload.append("stock", formData.stock);
    payload.append("description", formData.description);
    payload.append("gender", formData.gender);
    payload.append("category", formData.category);
    payload.append("material", formData.material);
    payload.append("origin", formData.origin);
    payload.append("style", formData.style);
    payload.append("fabric", formData.fabric);
    payload.append("pattern", formData.pattern);
    payload.append("fit", formData.fit);
    payload.append("season", formData.season);
    payload.append("occasion", formData.occasion);
    payload.append("availabilityZones", formData.availabilityZones);
    payload.append("manufacturer[name]", formData.manufacturerName);
    payload.append("manufacturer[address]", formData.manufacturerAddress);
    payload.append("manufacturer[contact]", formData.manufacturerContact);
    payload.append("warranty[period]", formData.warrantyPeriod);
    payload.append("warranty[details]", formData.warrantyDetails);
    payload.append("discount[percentage]", formData.discountPercentage);
    payload.append("discount[startDate]", formData.discountStartDate);
    payload.append("discount[endDate]", formData.discountEndDate);
    payload.append("sizes", JSON.stringify(sizes));

    // Sizes & Colors (comma separated: size:stock)
    formData.sizes.split(",").forEach((pair) => {
      const [size, stock] = pair.split(":");
      if (size && stock) {
        payload.append("sizes[]", JSON.stringify({ size, stock }));
      }
    });

    formData.colors.split(",").forEach((pair) => {
      const [color, stock] = pair.split(":");
      if (color && stock) {
        payload.append("colors[]", JSON.stringify({ color, stock }));
      }
    });

    try {
      await axios.post("/api/v1/content/createProduct", payload);
      alert("Product created!");
    } catch (err) {
      console.error("Create product error:", err);
    }
  };
  const [sizes, setSizes] = useState([]);

  const predefinedSizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
    "42",
    "44",
    "46",
    "Free Size",
    "Custom",
  ];

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

      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name} ({cat?.parent?.name})
          </option>
        ))}
      </select>

      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
      </select>

      <select name="season" value={formData.season} onChange={handleChange}>
        <option value="">Select Season</option>
        <option value="Summer">Summer</option>
        <option value="Winter">Winter</option>
        <option value="All Seasons">All Seasons</option>
      </select>

      <select name="occasion" value={formData.occasion} onChange={handleChange}>
        <option value="">Select Occasion</option>
        <option value="Casual">Casual</option>
        <option value="Formal">Formal</option>
        <option value="Party">Party</option>
        <option value="Sports">Sports</option>
      </select>

      <select name="pattern" value={formData.pattern} onChange={handleChange}>
        <option value="">Select Pattern</option>
        <option value="Solid">Solid</option>
        <option value="Striped">Striped</option>
        <option value="Printed">Printed</option>
        <option value="Checked">Checked</option>
        <option value="Other">Other</option>
      </select>

      <select name="fit" value={formData.fit} onChange={handleChange}>
        <option value="">Select Fit</option>
        <option value="Regular">Regular</option>
        <option value="Slim">Slim</option>
        <option value="Loose">Loose</option>
      </select>

      <input name="style" onChange={handleChange} placeholder="Style" />
      <input name="fabric" onChange={handleChange} placeholder="Fabric" />
      <input name="material" onChange={handleChange} placeholder="Material" />
      <input name="origin" onChange={handleChange} placeholder="Origin" />
      <input
        name="availabilityZones"
        onChange={handleChange}
        placeholder="Availability Zones (comma separated)"
      />

      {/* Manufacturer Info */}
      <input
        name="manufacturerName"
        onChange={handleChange}
        placeholder="Manufacturer Name"
      />
      <input
        name="manufacturerAddress"
        onChange={handleChange}
        placeholder="Manufacturer Address"
      />
      <input
        name="manufacturerContact"
        onChange={handleChange}
        placeholder="Manufacturer Contact"
      />

      {/* Warranty Info */}
      <input
        name="warrantyPeriod"
        onChange={handleChange}
        placeholder="Warranty Period"
      />
      <input
        name="warrantyDetails"
        onChange={handleChange}
        placeholder="Warranty Details"
      />

      {/* Discount */}
      <input
        name="discountPercentage"
        onChange={handleChange}
        placeholder="Discount %"
      />
      <input name="discountStartDate" type="date" onChange={handleChange} />
      <input name="discountEndDate" type="date" onChange={handleChange} />

      {/* Sizes and Colors */}
      <div>
        <label className="font-semibold">Sizes</label>
        <div className="grid grid-cols-2 gap-3">
          {predefinedSizes.map((sizeOption) => {
            const isChecked = sizes.some((s) => s.size === sizeOption);
            const stockValue =
              sizes.find((s) => s.size === sizeOption)?.stock || "";

            return (
              <div key={sizeOption} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSizes([...sizes, { size: sizeOption, stock: "" }]);
                    } else {
                      setSizes(sizes.filter((s) => s.size !== sizeOption));
                    }
                  }}
                />
                <label>{sizeOption}</label>

                {isChecked && (
                  <input
                    type="number"
                    min={0}
                    placeholder="Stock"
                    value={stockValue}
                    onChange={(e) => {
                      const updatedSizes = sizes.map((s) =>
                        s.size === sizeOption
                          ? { ...s, stock: e.target.value }
                          : s
                      );
                      setSizes(updatedSizes);
                    }}
                    className="border px-2 py-1 w-20"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <input
        name="colors"
        onChange={handleChange}
        placeholder="Colors (Red:10,Blue:5)"
      />

      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Create Product</button>
    </form>
  );
}
