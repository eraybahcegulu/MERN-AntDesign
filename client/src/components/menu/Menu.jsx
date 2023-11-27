import { HomeOutlined, InboxOutlined, LogoutOutlined, ProfileOutlined} from "@ant-design/icons";
import "./style.css";

const Menu = () => {
  return (
    <ul className="flex md:flex-col gap-4 text-lg p-2">
      <li className="menu-item">
        <HomeOutlined />
        <span>Home</span>
      </li>

      <li className="menu-item-product flex flex-col gap-2">
        <div className="flex flex-col items-center">
          <InboxOutlined />
          <span>Products</span>
          
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col">
            <span className="product bg-blue-500 p-2"> Add </span>
          </div>
          <div>
            <span className="product bg-orange-300 p-2 "> Edit </span>
          </div>
        </div>
      </li>

      <li className="menu-item">
      <ProfileOutlined />
        <span>Orders</span>
      </li>

      <li className="menu-item">
        <LogoutOutlined />
        <span>Logout</span>
      </li>
    </ul>
  );
};

export default Menu;
