import "./style.css";
import { Alert } from "antd";
import { useCategoriesData } from '../../contexts/CategoriesContext';
import { useLocation } from "react-router-dom";
const Categories = () => {
  const { categories } = useCategoriesData();
  const { pathname } = useLocation();
  
  return (
    <div>
      <div className="text-center border-b p-2">
        <strong>CATEGORIES</strong>
      </div>
      <ul className="flex flex-col gap items-center gap-4 md:mx-0 mt-6 mb-4 mx-4 ">
        <li className={`categories-all-products ${pathname === "/" && "active"}  `}>
          <span>ALL PRODUCTS</span>
        </li>
        {categories.length === 0 ? (
          <div className="p-2">
            <Alert message="Category not found" type="warning" showIcon />
          </div>
        ) : (
          categories.map((category) => (
            <li className="categories-item" key={category._id}>
              <span>{category.name.toUpperCase()}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Categories;
