import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { Home } from "../Home_Products_Api_Data/Home_Products_Api_Data";

function HomeProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch("/api/v1/product");
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     setProducts(data.data || []);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    // fetchProducts();
    setProducts(Home);
    setLoading(false); // ✅ YE ADD KARO
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="text-center mt-10 mb-5 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Create a new collection
        </h1>
        <p className="text-sm md:text-base p-4 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa fuga eum
          soluta, nulla accusantium error ullam
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 pb-8">
        {products.slice(0, 20).map((product) => (
          <Card key={product._id || product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default HomeProduct;
