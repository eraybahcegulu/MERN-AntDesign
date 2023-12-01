import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';

const CategoriesContext = createContext();
const GET_CATEGORIES_API_URL = "http://localhost:5000/api/categories/get-all";

export const CategoriesProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const fetchCategoriesData = async (url, setData) => {
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
    fetchCategoriesData(GET_CATEGORIES_API_URL, setCategories);
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

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