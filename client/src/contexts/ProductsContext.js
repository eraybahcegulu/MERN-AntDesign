import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';

const ProductsContext = createContext();
const GET_PRODUCTS_API_URL = "http://localhost:5000/api/products/get-all";

export const ProductsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProductsData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData(GET_PRODUCTS_API_URL, setProducts);
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProducts: () => fetchProductsData(GET_PRODUCTS_API_URL , setProducts),
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsData = () => {
  return useContext(ProductsContext);
};