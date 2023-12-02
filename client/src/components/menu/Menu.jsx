import Products from "./Products";
import Categories from "./Categories";
import { LogoutOutlined, DollarOutlined } from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <ul className="flex md:flex-col gap-4 text-lg p-4">
      <Products />

      <Categories />

      <Link className="menu-item bg-orange-400 p-2 " to={"/sales"}>
        <li >
          <DollarOutlined />
          <span> SALES </span>
        </li>
      </Link>

      <li className="menu-item">
        <LogoutOutlined />
        <span> LOGOUT</span>
      </li>
    </ul>
  );
};

export default Menu;
