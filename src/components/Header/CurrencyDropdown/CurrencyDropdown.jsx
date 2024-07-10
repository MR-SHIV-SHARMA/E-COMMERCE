import React, { useState, useEffect } from 'react';
import './CurrencyDropdown.css'; // Import CSS file

const CurrencyDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    // Fetch currency data from API
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json');
        if (!response.ok) {
          throw new Error('Failed to fetch currencies');
        }
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrencies();
  }, []); // Run once on component mount

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={handleToggle}>
      {currency}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {currencies.map(currency => (
            <a key={currency.code} href="#">
              <img src={currency.flag} alt="" className="flag-icon" />
              <span className="currency-code">{currency.code}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;
