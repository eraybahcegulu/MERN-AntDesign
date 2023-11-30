import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsEdit from "../components/products/ProductsEdit";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      getProducts();
      getCategories();
    }, []);

    const getCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories/get-all"
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

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

    const handleProductDeleted = () => {
      getProducts();
    };

    const handleProductUpdated = () => {
      getProducts();
    };

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
        <ProductsEdit products={products} categories={categories} productDeleted={handleProductDeleted} productUpdated={handleProductUpdated} />
    </div>
  );
};

export default ProductsPage;
