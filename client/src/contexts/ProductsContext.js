import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductsContext = createContext();
const GET_PRODUCTS_API_URL = "http://localhost:5000/api/products/get-all";

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProductsData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductsData(GET_PRODUCTS_API_URL, setProducts);
  }, []);

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