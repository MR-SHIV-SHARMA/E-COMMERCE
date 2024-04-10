import React, { useState } from "react";

// CheckOutPage component
function CheckOutPage() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    // Add to cart logic
  };

  const handleBuyNow = () => {
    // Buy now logic
  };

  return (
    <div>
      {/* Product details */}
      <h1>Product Name</h1>
      <p>
        Description: Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <p>Price: $XX.XX</p>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
}

// CheckoutPage component
function CheckoutPage() {
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={deliveryDetails.name}
          onChange={handleChange}
        />
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={deliveryDetails.address}
          onChange={handleChange}
        />
        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={deliveryDetails.paymentMethod}
          onChange={handleChange}
        >
          <option value="cashOnDelivery">Cash on Delivery</option>
          <option value="standardDelivery">Standard Delivery</option>
        </select>
        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
}

// ConfirmationPage component
function ConfirmationPage() {
  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Your order has been placed successfully!</p>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CheckOutPage />;
      case 2:
        return <CheckoutPage />;
      case 3:
        return <ConfirmationPage />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
      {step < 3 && <button onClick={handleNextStep}>Next</button>}
    </div>
  );
}
