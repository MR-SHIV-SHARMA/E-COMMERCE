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
  });

  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

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

  const predefinedColors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Black",
    "White",
    "Orange",
    "Purple",
    "Pink",
    "Brown",
    "Gray",
    "Beige",
    "Maroon",
    "Navy",
    "Cyan",
    "Magenta",
    "Olive",
    "Teal",
    "Silver",
    "Gold",
    "Peach",
    "Turquoise",
    "Lavender",
    "Mustard",
    "Coral",
    "Mint",
    "Ivory",
    "Charcoal",
    "Khaki",
    "Sky Blue",
  ];

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

    for (let img of formData.images) {
      payload.append("images", img);
    }

    Object.entries(formData).forEach(([key, val]) => {
      if (key !== "images") payload.append(key, val);
    });

    payload.append("sizes", JSON.stringify(sizes));
    payload.append("colors", JSON.stringify(colors));
    
    formData.availabilityZones.forEach((zone) => {
      payload.append("availabilityZones[]", zone);
    });

    try {
      await axios.post("/api/v1/content/createProduct", payload);
      alert("Product created!");
    } catch (err) {
      console.error("Create product error:", err);
    }
  };

  const zoneOptions = [
    "All India",
    "North India",
    "South India",
    "East India",
    "West India",
    "Central India",
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Kolkata",
    "Chennai",
    "Pune",
    "Ahmedabad",
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
      <select name="fabric" value={formData.fabric} onChange={handleChange}>
        <option value="">Select Fabric</option>
        {[
          "Cotton",
          "Polyester",
          "Linen",
          "Silk",
          "Wool",
          "Rayon",
          "Nylon",
          "Denim",
          "Leather",
          "Lycra",
          "Satin",
          "Georgette",
          "Velvet",
          "Chiffon",
          "Crepe",
          "Terrycot",
          "Acrylic",
          "Viscose",
          "Tweed",
          "Khadi",
          "Fleece",
          "Jersey",
          "Net",
          "Organza",
          "Mesh",
          "Canvas",
          "Suede",
          "Taffeta",
          "Batiste",
        ].map((fab) => (
          <option key={fab} value={fab}>
            {fab}
          </option>
        ))}
      </select>
      <select name="material" value={formData.material} onChange={handleChange}>
        <option value="">Select Material</option>
        {[
          "Cotton",
          "Linen",
          "Polyester",
          "Silk",
          "Wool",
          "Denim",
          "Nylon",
          "Spandex",
          "Rayon",
          "Viscose",
          "Leather",
          "Faux Leather",
          "Canvas",
          "Suede",
          "Jute",
          "Rubber",
          "Plastic",
          "Metal",
          "Stainless Steel",
          "Alloy",
          "Ceramic",
          "Wood",
          "Glass",
        ].map((mat) => (
          <option key={mat} value={mat}>
            {mat}
          </option>
        ))}
      </select>
      <select name="origin" value={formData.origin} onChange={handleChange}>
        <option value="">Select Origin</option>
        {[
          "India",
          "China",
          "Bangladesh",
          "Vietnam",
          "Sri Lanka",
          "Pakistan",
          "Indonesia",
          "Turkey",
          "USA",
          "UK",
          "Italy",
          "Germany",
          "France",
          "Japan",
          "South Korea",
          "Made in India",
          "Designed in Italy",
          "Imported from China",
          "Locally Manufactured",
        ].map((origin) => (
          <option key={origin} value={origin}>
            {origin}
          </option>
        ))}
      </select>
      <select
        multiple
        name="availabilityZones"
        value={formData.availabilityZones}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions).map(
            (opt) => opt.value
          );
          setFormData((prev) => ({ ...prev, availabilityZones: selected }));
        }}
      >
        {zoneOptions.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>

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

      <input
        name="discountPercentage"
        onChange={handleChange}
        placeholder="Discount %"
      />
      <input name="discountStartDate" type="date" onChange={handleChange} />
      <input name="discountEndDate" type="date" onChange={handleChange} />

      {/* ✅ Sizes Section */}
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
                      const updated = sizes.map((s) =>
                        s.size === sizeOption
                          ? { ...s, stock: e.target.value }
                          : s
                      );
                      setSizes(updated);
                    }}
                    className="border px-2 py-1 w-20"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Colors Section */}
      <div>
        <label className="font-semibold">Colors</label>
        <div className="grid grid-cols-2 gap-3">
          {predefinedColors.map((colorOption) => {
            const isChecked = colors.some((c) => c.color === colorOption);
            const stockValue =
              colors.find((c) => c.color === colorOption)?.stock || "";

            return (
              <div key={colorOption} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setColors([...colors, { color: colorOption, stock: "" }]);
                    } else {
                      setColors(colors.filter((c) => c.color !== colorOption));
                    }
                  }}
                />
                <label>{colorOption}</label>
                {isChecked && (
                  <input
                    type="number"
                    min={0}
                    placeholder="Stock"
                    value={stockValue}
                    onChange={(e) => {
                      const updated = colors.map((c) =>
                        c.color === colorOption
                          ? { ...c, stock: e.target.value }
                          : c
                      );
                      setColors(updated);
                    }}
                    className="border px-2 py-1 w-20"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Create Product</button>
    </form>
  );
}
