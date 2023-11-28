import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoriesEdit from "../components/categories/CategoriesEdit";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
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

    const handleCategoryDeleted = () => {
        getCategories();
      };

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
        <CategoriesEdit categories={categories} categoryDeleted={handleCategoryDeleted}/>
    </div>
  );
};

export default CategoriesPage;
