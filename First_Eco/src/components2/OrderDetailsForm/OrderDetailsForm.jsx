import React, { useState } from "react";

function OrderDetailsForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    stateProvince: "Select State",
    country: "Select Country",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the form data to your backend or handle it as needed
    console.log(formData);
  };
  const [activeButton, setActiveButton] = useState("Delivery");

  // Function to handle button click
  const handleClick = (button) => {
    setActiveButton(button); // Update active button state
  };



  return (
    <>
      <div>
        <h1>How would you like to get your order ?</h1>
        <div>
          <button
            className={`px-6 py-2 border border-gray-900 rounded-full text-black mx-2 ${activeButton === "Delivery" ? "bg-black text-white" : ""
              }`}
            onClick={() => handleClick("Delivery")}
          >
            Delivery
          </button>
          <button
            className={`px-6 py-2 border border-gray-900 rounded-full text-black mx-2 ${activeButton === "Cash On Delivery" ? "bg-black text-white" : ""
              }`}
            onClick={() => handleClick("Cash On Delivery")}
          >
            Cash On Delivery
          </button>
        </div>
        <h1>Enter your name and address</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              className="px-6 py-2 border border-gray-900 rounded-full text-black mx-2"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="For customs clearance please enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              className="px-6 py-2 border border-gray-900 rounded-full text-black mx-2"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="For customs clearance please enter your Surname"
              required
            />
          </div>
          <div>
            <label htmlFor="address1">Address 1</label>
            <input
              className="px-6 py-2 border border-gray-900 rounded-full text-black mx-2"
              type="text"
              id="address1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="Address line 1"
              required
            />
          </div>
          <div>
            <label htmlFor="address2">Address 2</label>
            <input
              className="px-6 py-2 border border-gray-900 rounded-full text-black mx-2"
              type="text"
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Address line 2"
            />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              className="px-6 py-2 border border-gray-900 rounded-full text-black mx-2"
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              required
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              className="px-6 py-2 border border-gray-900 rounded-full text-black mx-2"
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>
          <div>
            <label htmlFor="stateProvince">State/Province</label>
            <select
              className="px-6 py-2 border border-gray-900 rounded-full text-black mx-2"
              id="State"
              name="State"
              value={formData.State}
              onChange={handleChange}
              required
            >
              <option value="Select State" disabled>
                Select State
              </option>
              {/* Add your country options here */}
              <option value="RJ">Rajasthan</option>
              <option value="UK">Uttra khandh</option>
              <option value="HR">Hryana</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <select
              className="px-6 py-2 border border-gray-900 rounded-full text-black mx-2"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="Select Country" disabled>
                Select Country
              </option>
              {/* Add your country options here */}
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <button
            className="px-6 py-2 border border-gray-900 rounded-full text-black mx-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default OrderDetailsForm;
