import React, { useState } from "react";

function OrderDetailsForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [activeButton, setActiveButton] = useState("Delivery");

  // Function to handle button click
  const handleClick = (button) => {
    setActiveButton(button); // Update active button state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderDetails = {
      name,
      email,
      address,
      phoneNumber,
      deliveryOption,
    };
    onSubmit(orderDetails);
  };

  return (
    <>
      <div>
        <h1>How would you like to get your order ?</h1>
        <div>
          <button
            className={`px-6 py-2 border border-gray-900 rounded-full text-black mx-2 ${
              activeButton === "Delivery" ? "bg-black text-white" : ""
            }`}
            onClick={() => handleClick("Delivery")}
          >
            Delivery
          </button>
          <button
            className={`px-6 py-2 border border-gray-900 rounded-full text-black mx-2 ${
              activeButton === "Cash On Delivery" ? "bg-black text-white" : ""
            }`}
            onClick={() => handleClick("Cash On Delivery")}
          >
            Cash On Delivery
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="order-details-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div>
          <label>
            <input
              type="radio"
              value="standard"
              checked={deliveryOption === "standard"}
              onChange={() => setDeliveryOption("standard")}
            />
            Standard Delivery
          </label>
          <label>
            <input
              type="radio"
              value="express"
              checked={deliveryOption === "express"}
              onChange={() => setDeliveryOption("express")}
            />
            Express Delivery
          </label>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </>
  );
}

export default OrderDetailsForm;
