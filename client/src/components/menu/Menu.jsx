import { useEffect } from "react";
import Products from "./Products";
import Categories from "./Categories";
import { LogoutOutlined, DollarOutlined } from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";
import { useCategoriesData } from "../../contexts/CategoriesContext";
import { useProductsData } from "../../contexts/ProductsContext";
import { Badge } from 'antd';
import { fetchOrdersData } from '../../redux-toolkit/orders/ordersSlice';
import { useSelector, useDispatch } from "react-redux";

const Menu = ({setSearch, selectedCategory}) => {
  const dispatch = useDispatch();
  const { categories } = useCategoriesData();
  const { products } = useProductsData();

  const orders = useSelector(state => state.orders.data);
  
  useEffect(() => {
    dispatch(fetchOrdersData());
}, [dispatch]);

  return (
    <ul className="flex md:flex-col gap-6 text-lg p-4">

      <Badge className="text-lg" color='gray' count={products.length}
      
      >
      <Products setSearch={setSearch} selectedCategory={selectedCategory} />
      </Badge>

      <Badge className="text-lg" color='gray' count={categories.length}>
      <Categories />
      </Badge>

      <Badge color='gray' count={orders.length}>
      <Link to={"/sales"}>
        <li className="menu-item text-lg">
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
