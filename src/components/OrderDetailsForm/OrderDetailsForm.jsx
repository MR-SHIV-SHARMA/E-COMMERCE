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

  const [products, setProducts] = useState([
    { name: "Product 1", price: 10 },
    { name: "Product 2", price: 20 },
    { name: "Product 3", price: 30 },
    { name: "Product 4", price: 40 },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      creditCard: {
        ...formData.creditCard,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the form data to your backend or handle it as needed
    console.log(formData);
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  const [activeButton, setActiveButton] = useState(null);

  const handlePaymentMethodChange = (method) => {
    setActiveButton(method);
    if (method === "debit-card") {
      setShowCreditCardFields(true);
      setShowPaypalCheckout(false);
    } else if (method === "paypal") {
      setShowCreditCardFields(false);
      setShowPaypalCheckout(true);
    }
  };

  const [showCreditCardFields, setShowCreditCardFields] = useState(false);
  const [showPaypalCheckout, setShowPaypalCheckout] = useState(false);

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white text-black mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Purchase Order</h1>
        <p className="text-lg font-medium mb-4">
          What would you like to purchase?
        </p>
        <div className="border-t-2 border-gray-400 mb-4"></div>
        <div className="space-y-4">
          <div className="mb-4 flex flex-col">
            <div>
              <h1 className="text-lg font-semibold mb-2">Your Name</h1>
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="First Name"
                  className="pl-2 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="pl-2 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold mb-2">Your Email</h1>
            <input
              type="text"
              placeholder="Your Email"
              className="pl-2 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <h1 className="text-lg font-semibold mb-2 mr-2">
              Shipping Address
            </h1>
            <div className="md:w-1/2">
              <input
                type="text"
                placeholder="Address Line 1"
                className="pl-2 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Address Line 2"
                className="pl-2 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="City"
                className="pl-2 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="State"
                className="pl-2 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Zip Code"
                className="pl-2 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <h1 className="text-lg font-semibold mb-2 mr-2">My Products</h1>
            <div>
              {products.slice(0, 4).map((product, index) => (
                <div key={index} className="flex items-center mr-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-indigo-600 mr-2"
                    id={`product-${index}`}
                  />
                  <label htmlFor={`product-${index}`}>
                    {product.name} - ${product.price}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-semibold mb-2">
              Total : ${calculateTotal().toFixed(2)}
            </h1>
          </div>
          <div className="space-y-4">
            <div className="mb-4">
              <h1 className="text-lg font-semibold mb-2">Payment Methods</h1>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600 mr-2"
                  id="debit-card"
                  checked={activeButton === "debit-card"}
                  onChange={() => handlePaymentMethodChange("debit-card")}
                />
                <label htmlFor="debit-card">Debit or Credit Card</label>
              </div>
              {showCreditCardFields && (
                <div className="mb-4 flex flex-col">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    className="pl-2 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="securityCode"
                    placeholder="Security Code"
                    className="pl-2 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="expirationDate"
                    placeholder="Expiration Date"
                    className="pl-2 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600 mr-2"
                  id="paypal"
                  checked={activeButton === "paypal"}
                  onChange={() => handlePaymentMethodChange("paypal")}
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
              {showPaypalCheckout && (
                <div className="mb-4">
                  <h1 className="text-lg font-semibold mb-2">
                    PayPal Checkout
                  </h1>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Checkout with PayPal
                  </button>
                </div>
              )}
            </div>

            <div className="border-t-2 border-gray-400 mb-4"></div>
            <div className="flex justify-center">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsForm;
