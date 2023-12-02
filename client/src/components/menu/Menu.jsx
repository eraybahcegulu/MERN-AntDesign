import Products from "./Products";
import Categories from "./Categories";
import { LogoutOutlined, DollarOutlined } from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";
import { useOrdersData } from "../../contexts/OrdersContext";
import { useCategoriesData } from "../../contexts/CategoriesContext";
import { useProductsData } from "../../contexts/ProductsContext";
import {  Badge } from 'antd';

const Menu = () => {
  const { orders } = useOrdersData();
  const { categories } = useCategoriesData();
  const { products } = useProductsData();

  return (
    <ul className="flex md:flex-col gap-6 text-lg p-4">

      <Badge className="text-lg" color='gray' count={products.length}
      
      >
      <Products />
      </Badge>

      <Badge className="text-lg" color='gray' count={categories.length}>
      <Categories />
      </Badge>

      
      <Badge className="menu-item text-lg" color='gray' count={orders.length}>
      <Link  to={"/sales"}>
        <li>
          <DollarOutlined />
          <span> SALES </span>
        </li>
      </Link>
      </Badge>

      <li className="menu-item text-lg">
        <LogoutOutlined />
        <span> LOGOUT</span>
      </li>
    </ul>
  );
};

export default Menu;
