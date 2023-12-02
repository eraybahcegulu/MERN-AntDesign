import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CategoriesContext = createContext();
const GET_CATEGORIES_API_URL = process.env.REACT_APP_API_URL + "/api/categories/get-all";

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategoriesData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategoriesData(GET_CATEGORIES_API_URL, setCategories);
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        getCategories: () => fetchCategoriesData(GET_CATEGORIES_API_URL, setCategories),
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesData = () => {
  return useContext(CategoriesContext);
};