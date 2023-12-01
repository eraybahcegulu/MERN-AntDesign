import { addProduct } from "../../redux-toolkit/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Image, Button, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Product = ({ product }) => {

  const dispatch = useDispatch();

  const addProductToCart = (name) => {
    dispatch(addProduct({ ...product, quantity: 1 }));
    notification.success({
      message: <span className="mt-20" ><strong>{name}</strong> added to cart</span>,
      placement: "top",
      duration: 2
    });
  };

  return (
    <div
      key={product._id}
      className="product border-b hover:shadow-md transition-all select-none"
    >
      <div className="product-img">
        <Image
          className="min-h-[175px] max-h-[175px] w-full object-cover border-b"
          src={product.image}
          alt=""
        />
      </div>
      <div className="text-center p-4 flex flex-col">
        <span className="overflow-hidden">{product.name}</span>
        <span>
          <strong>{product.price}$</strong>
        </span>

        <div className="mt-2 flex flex-row justify-center">
          <Button
            style={{ borderRadius: "0",}}
            onClick={() => addProductToCart(product.name)}
            className="text-2xl flex flex-col"
          >
            <PlusOutlined className="mt-0" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
