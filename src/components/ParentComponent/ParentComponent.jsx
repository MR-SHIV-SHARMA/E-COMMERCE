import React, { useState } from "react";
import ProductOverviews from "../ProductOverviews/ProductOverviews"; // Import your ProductOverviews component here
import Home from "../Home_Products_Api_Data/Home_Products_Api_Data";

function ParentComponent() {
  const users = Home;
  // State to hold the selected item's details
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to update the selected item's details when an item is clicked
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      {/* Map through your items and render them */}
      {users.map((item) => (
        <div key={item.id} onClick={() => handleItemClick(item)}>
          {/* <p>{item.name}</p>
                    <p>{item.price}</p> */}

          {/* Render your item */}
          {/* You can display the item's name or image here */}
        </div>
      ))}

      {/* Pass the selected item's details to the ProductOverviews component */}
      {selectedItem && <ProductOverviews selectedItem={selectedItem} />}
    </div>
  );
}

export default ParentComponent;
