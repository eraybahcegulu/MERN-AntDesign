import Products from "./Products";
import Categories from "./Categories";
import { HomeOutlined, LogoutOutlined, DollarOutlined, } from "@ant-design/icons";
import "./style.css";

import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <ul className="flex md:flex-col gap-4 text-lg p-4">
      
      <Link className=" menu-item" to={"/"}>
        <li >
          <HomeOutlined />
          <span> HOME</span>
        </li>
      </Link>

      <Products />

      <Categories />

      <li className="menu-item">
        <DollarOutlined />
        <span> SALES </span>
      </li>

      <li className="menu-item">
        <LogoutOutlined />
        <span> LOGOUT</span>
      </li>
    </ul>
  );
};

export default Menu;
