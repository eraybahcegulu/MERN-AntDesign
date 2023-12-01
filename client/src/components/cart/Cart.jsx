import { Card, Empty } from "antd";

import { useSelector } from "react-redux";

import CartProducts from "./CartProducts";
import CartAmount from "./CartAmount";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="h-full flex flex-col m-4 md:m-0">
      <div className="text-center border border-b-0 p-2">
        <strong>CART</strong>
      </div>
      <Card className=" h-full rounded-none overflow-auto">
        <div className="">
          <ul className=" flex flex-col gap-4 ">
            {cart.cartProducts.length > 0 ? (
              cart.cartProducts.map((cartProduct) => (
                <CartProducts cartProduct={cartProduct} key={cartProduct._id} />
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </ul>
        </div>
      </Card>
      
      <CartAmount/>
    </div>
  );
};

export default Cart;
