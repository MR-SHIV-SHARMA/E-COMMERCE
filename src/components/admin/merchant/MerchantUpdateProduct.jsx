import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MerchantUpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    gender: "unisex",
    isAvailable: true,
    category: "",
    material: "",
    discountPercentage: 0,
    discountStartDate: "",
    discountEndDate: "",
    sizes: [],
    colors: [],
    images: [],
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [categories, setCategories] = useState([]);
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
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          axios.get(`/api/v1/content/getProductById/${id}`),
          axios.get("/api/v1/categories"),
        ]);

        const product = productRes.data.data;
        setCategories(categoriesRes.data.data);

        setFormData({
          name: product.name || "",
          price: product.price || 0,
          stock: product.stock || 0,
          description: product.description || "",
          gender: product.gender || "unisex",
          isAvailable: product.isAvailable,
          category: product.category?._id || "",
          material: product.material || "",
          discountPercentage: product.discount?.percentage || 0,
          discountStartDate: product.discount?.startDate || "",
          discountEndDate: product.discount?.endDate || "",
          sizes: product.sizes || [],
          colors: product.colors || [],
          images: product.images || [],
        });

        setImagePreviews(product.images || []);
      } catch (err) {
        console.error("Failed to load data:", err);
        setMessage({ text: "Failed to fetch product details.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSizeChange = (sizeOption) => {
    setFormData((prev) => {
      const existingIndex = prev.sizes.findIndex((s) => s.size === sizeOption);

      if (existingIndex >= 0) {
        // Remove size if it exists
        const newSizes = [...prev.sizes];
        newSizes.splice(existingIndex, 1);
        return { ...prev, sizes: newSizes };
      } else {
        // Add new size
        return {
          ...prev,
          sizes: [...prev.sizes, { size: sizeOption, stock: 0 }],
        };
      }
    });
  };

  const handleSizeStockChange = (sizeOption, stockValue) => {
    setFormData((prev) => {
      const newSizes = prev.sizes.map((size) =>
        size.size === sizeOption ? { ...size, stock: stockValue } : size
      );
      return { ...prev, sizes: newSizes };
    });
  };

  const handleColorChange = (colorOption) => {
    setFormData((prev) => {
      const existingIndex = prev.colors.findIndex(
        (c) => c.color === colorOption
      );

      if (existingIndex >= 0) {
        // Remove color if it exists
        const newColors = [...prev.colors];
        newColors.splice(existingIndex, 1);
        return { ...prev, colors: newColors };
      } else {
        // Add new color
        return {
          ...prev,
          colors: [...prev.colors, { color: colorOption, stock: 0 }],
        };
      }
    });
  };

  const handleColorStockChange = (colorOption, stockValue) => {
    setFormData((prev) => {
      const newColors = prev.colors.map((color) =>
        color.color === colorOption ? { ...color, stock: stockValue } : color
      );
      return { ...prev, colors: newColors };
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));

    // Create new previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });

    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const payload = {
        ...formData,
        discount:
          formData.discountPercentage > 0
            ? {
                percentage: formData.discountPercentage,
                startDate: formData.discountStartDate,
                endDate: formData.discountEndDate,
              }
            : null,
      };

      const res = await axios.patch(
        `/api/v1/content/update-product/${id}`,
        payload
      );

      setMessage({
        text: "Product updated successfully!",
        type: "success",
      });

      setTimeout(() => navigate("/merchant/products"), 1500);
    } catch (err) {
      console.error("Error updating product:", err);
      setMessage({
        text: "Failed to update product. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-md p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
            <div className="h-32 bg-gray-200 rounded w-full mt-6"></div>
            <div className="h-12 bg-gray-200 rounded w-40 mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Update Product</h1>
          <p className="mt-2 text-gray-600">Edit your product details below</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {message.text && (
            <div
              className={`p-4 ${
                message.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product name"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Material
                </label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Cotton, Leather"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    ₹
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter quantity"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="unisex">Unisex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-medium text-gray-700">
                    Available for purchase
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your product in detail..."
                ></textarea>
              </div>

              <div className="md:col-span-2 border-t border-gray-200 pt-6 mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Discount Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Percentage
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="discountPercentage"
                        value={formData.discountPercentage}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0-100%"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        %
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="discountStartDate"
                      value={formData.discountStartDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="discountEndDate"
                      value={formData.discountEndDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 border-t border-gray-200 pt-6 mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Size & Stock Management
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {predefinedSizes.map((sizeOption) => {
                    const sizeData = formData.sizes.find(
                      (s) => s.size === sizeOption
                    );
                    const isSelected = !!sizeData;

                    return (
                      <div
                        key={sizeOption}
                        className={`p-3 rounded-lg border ${
                          isSelected
                            ? "border-blue-300 bg-blue-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{sizeOption}</span>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSizeChange(sizeOption)}
                            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </div>

                        {isSelected && (
                          <input
                            type="number"
                            min="0"
                            placeholder="Stock"
                            value={sizeData.stock}
                            onChange={(e) =>
                              handleSizeStockChange(sizeOption, e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-2 border-t border-gray-200 pt-6 mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Color Options
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {predefinedColors.map((colorOption) => {
                    const colorData = formData.colors.find(
                      (c) => c.color === colorOption
                    );
                    const isSelected = !!colorData;

                    return (
                      <div
                        key={colorOption}
                        className={`p-3 rounded-lg border ${
                          isSelected
                            ? "border-blue-300 bg-blue-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{colorOption}</span>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleColorChange(colorOption)}
                            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </div>

                        {isSelected && (
                          <input
                            type="number"
                            min="0"
                            placeholder="Stock"
                            value={colorData.stock}
                            onChange={(e) =>
                              handleColorStockChange(
                                colorOption,
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-2 border-t border-gray-200 pt-6 mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Product Images
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
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
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                      className="h-10 w-10 text-gray-400 mb-3"
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
                      Click to upload more images
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/merchant/products")}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
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
                    Updating...
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
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Update Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
