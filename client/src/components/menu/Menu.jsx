import Products from "./Products";
import Categories from "./Categories";
import { LogoutOutlined, DollarOutlined, } from "@ant-design/icons";
import "./style.css";

const Menu = () => {
  return (
    <ul className="flex md:flex-col gap-4 text-lg p-4">

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
