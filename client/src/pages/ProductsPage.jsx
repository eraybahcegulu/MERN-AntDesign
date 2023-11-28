import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsEdit from "../components/products/ProductsEdit";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/get-all"
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="min-w-[300px] max-h-[calc(100vh-80px)] overflow-y-auto  mt-10">
        <ProductsEdit products={products}/>
      </div>
    </div>
  );
};

export default ProductsPage;
