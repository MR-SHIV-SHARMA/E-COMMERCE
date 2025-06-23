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
    availabilityZones: [],
    discountPercentage: "",
    discountStartDate: "",
    discountEndDate: "",
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

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
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));

    // Create image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = new FormData();

    for (let img of formData.images) {
      payload.append("images", img);
    }

    Object.entries(formData).forEach(([key, val]) => {
      if (key !== "images" && key !== "availabilityZones") {
        payload.append(key, val);
      }
    });

    payload.append("sizes", JSON.stringify(sizes));
    payload.append("colors", JSON.stringify(colors));

    formData.availabilityZones.forEach((zone) => {
      payload.append("availabilityZones[]", zone);
    });

    try {
      await axios.post("/api/v1/content/createProduct", payload);
      alert("Product created successfully!");
      // Reset form after successful creation
      setFormData({
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
        availabilityZones: [],
        discountPercentage: "",
        discountStartDate: "",
        discountEndDate: "",
        images: [],
      });
      setSizes([]);
      setColors([]);
      setImagePreviews([]);
    } catch (err) {
      console.error("Create product error:", err);
      alert("Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvailabilityZone = (zone) => {
    setFormData((prev) => {
      if (prev.availabilityZones.includes(zone)) {
        return {
          ...prev,
          availabilityZones: prev.availabilityZones.filter((z) => z !== zone),
        };
      } else {
        return {
          ...prev,
          availabilityZones: [...prev.availabilityZones, zone],
        };
      }
    });
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: newImages }));

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  // Tab navigation component
  const TabNavigation = () => (
    <div className="flex flex-wrap mb-6 border-b border-gray-200">
      {["basic", "specs", "manufacturer", "stock", "discount", "images"].map(
        (tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
              activeTab === tab
                ? "text-blue-600 bg-white border border-b-0 border-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        )
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Product
          </h1>
          <p className="text-gray-600 mt-1">
            Fill in the details below to add a new product to your inventory
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <TabNavigation />

          {/* Basic Information Tab */}
          {activeTab === "basic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name} ({cat?.parent?.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) *
                </label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Stock *
                </label>
                <input
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter detailed product description"
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Style
                </label>
                <input
                  name="style"
                  value={formData.style}
                  onChange={handleChange}
                  placeholder="Enter product style"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === "specs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Material
                </label>
                <select
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
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
                  ].map((mat) => (
                    <option key={mat} value={mat}>
                      {mat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fabric
                </label>
                <select
                  name="fabric"
                  value={formData.fabric}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
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
                  ].map((fab) => (
                    <option key={fab} value={fab}>
                      {fab}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pattern
                </label>
                <select
                  name="pattern"
                  value={formData.pattern}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Pattern</option>
                  <option value="Solid">Solid</option>
                  <option value="Striped">Striped</option>
                  <option value="Printed">Printed</option>
                  <option value="Checked">Checked</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fit
                </label>
                <select
                  name="fit"
                  value={formData.fit}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Fit</option>
                  <option value="Regular">Regular</option>
                  <option value="Slim">Slim</option>
                  <option value="Loose">Loose</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Season
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Season</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                  <option value="All Seasons">All Seasons</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occasion
                </label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Occasion</option>
                  <option value="Casual">Casual</option>
                  <option value="Formal">Formal</option>
                  <option value="Party">Party</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origin
                </label>
                <select
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
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
                  ].map((origin) => (
                    <option key={origin} value={origin}>
                      {origin}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability Zones
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {zoneOptions.map((zone) => (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => handleAvailabilityZone(zone)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        formData.availabilityZones.includes(zone)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {zone}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Selected: {formData.availabilityZones.join(", ") || "None"}
                </div>
              </div>
            </div>
          )}

          {/* Manufacturer & Warranty Tab */}
          {activeTab === "manufacturer" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacturer Name
                </label>
                <input
                  name="manufacturerName"
                  value={formData.manufacturerName}
                  onChange={handleChange}
                  placeholder="Enter manufacturer name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacturer Address
                </label>
                <input
                  name="manufacturerAddress"
                  value={formData.manufacturerAddress}
                  onChange={handleChange}
                  placeholder="Enter manufacturer address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Information
                </label>
                <input
                  name="manufacturerContact"
                  value={formData.manufacturerContact}
                  onChange={handleChange}
                  placeholder="Enter contact details"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warranty Period
                </label>
                <input
                  name="warrantyPeriod"
                  value={formData.warrantyPeriod}
                  onChange={handleChange}
                  placeholder="e.g., 1 year"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warranty Details
                </label>
                <textarea
                  name="warrantyDetails"
                  value={formData.warrantyDetails}
                  onChange={handleChange}
                  placeholder="Enter warranty terms and conditions"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
          )}

          {/* Stock Management Tab */}
          {activeTab === "stock" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Sizes
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {predefinedSizes.map((sizeOption) => {
                    const isChecked = sizes.some((s) => s.size === sizeOption);
                    const stockValue =
                      sizes.find((s) => s.size === sizeOption)?.stock || "";

                    return (
                      <div
                        key={sizeOption}
                        className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{sizeOption}</span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSizes([
                                  ...sizes,
                                  { size: sizeOption, stock: "" },
                                ]);
                              } else {
                                setSizes(
                                  sizes.filter((s) => s.size !== sizeOption)
                                );
                              }
                            }}
                            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </div>

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
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Colors
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {predefinedColors.map((colorOption) => {
                    const isChecked = colors.some(
                      (c) => c.color === colorOption
                    );
                    const stockValue =
                      colors.find((c) => c.color === colorOption)?.stock || "";

                    return (
                      <div
                        key={colorOption}
                        className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                        style={{
                          borderLeft: `4px solid ${colorOption.toLowerCase()}`,
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{colorOption}</span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setColors([
                                  ...colors,
                                  { color: colorOption, stock: "" },
                                ]);
                              } else {
                                setColors(
                                  colors.filter((c) => c.color !== colorOption)
                                );
                              }
                            }}
                            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </div>

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
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Discount Tab */}
          {activeTab === "discount" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800">
                  Discount Information
                </h3>
                <p className="text-sm text-blue-700">
                  Set discount details to promote your product
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Percentage
                </label>
                <div className="relative">
                  <input
                    name="discountPercentage"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                    placeholder="0-100%"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    %
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Start Date
                </label>
                <input
                  name="discountStartDate"
                  type="date"
                  value={formData.discountStartDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount End Date
                </label>
                <input
                  name="discountEndDate"
                  type="date"
                  value={formData.discountEndDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2 mt-4">
                {formData.discountPercentage > 0 && (
                  <div className="bg-white border border-blue-200 rounded-lg p-4 flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <svg
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {formData.discountPercentage}% OFF
                      </p>
                      <p className="text-sm text-gray-600">
                        {formData.discountStartDate
                          ? new Date(
                              formData.discountStartDate
                            ).toLocaleDateString()
                          : "Start date not set"}
                        {" - "}
                        {formData.discountEndDate
                          ? new Date(
                              formData.discountEndDate
                            ).toLocaleDateString()
                          : "End date not set"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === "images" && (
            <div className="space-y-6">
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <svg
                    className="h-12 w-12 text-gray-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-600 font-medium">
                    Click to upload product images
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    PNG, JPG, GIF up to 10MB. Minimum 3 images required.
                  </p>
                </label>
              </div>

              {imagePreviews.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Uploaded Images ({imagePreviews.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-full h-40 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-between pt-6 border-t border-gray-200">
            <div>
              {activeTab !== "basic" && (
                <button
                  type="button"
                  onClick={() =>
                    setActiveTab((prev) => {
                      const tabs = [
                        "basic",
                        "specs",
                        "manufacturer",
                        "stock",
                        "discount",
                        "images",
                      ];
                      const currentIndex = tabs.indexOf(prev);
                      return tabs[Math.max(0, currentIndex - 1)];
                    })
                  }
                  className="px-5 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                >
                  Previous
                </button>
              )}
            </div>

            <div className="flex gap-3">
              {activeTab !== "images" ? (
                <button
                  type="button"
                  onClick={() =>
                    setActiveTab((prev) => {
                      const tabs = [
                        "basic",
                        "specs",
                        "manufacturer",
                        "stock",
                        "discount",
                        "images",
                      ];
                      const currentIndex = tabs.indexOf(prev);
                      return tabs[Math.min(tabs.length - 1, currentIndex + 1)];
                    })
                  }
                  className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Create Product
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
