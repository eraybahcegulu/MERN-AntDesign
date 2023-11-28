import { Card, Image, Button } from "antd";
import {MinusOutlined , PlusOutlined} from "@ant-design/icons";
const Cart = () => {
  return (
    <div className="h-full flex flex-col m-4 md:m-0">
      <div className="text-center border border-b-0 p-2">
        <strong>CART</strong>
      </div>
      <Card className=" h-full rounded-none overflow-auto">
        <div className="">
          <ul className=" flex flex-col gap-4 ">
            <li className="border ">
              <div className="flex justify-between items-center  p-4 ">
                <div className="flex flex-col text-center">
                  <Image
                    width={64}
                    height={64}
                    src="https://biosantarim.com/tema/genel/uploads/urunler/armut.png"
                    alt=""
                  />

                  <div className="flex flex-col ">
                    <span className="max-w-[150px] text-xl"> <strong>Pear</strong></span>
                    <span className="max-w-[150px]">
                      <strong className="text-xl">1$</strong>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                <Button icon={<PlusOutlined />} />

                  <span className="text-4xl">
                    <strong>2</strong>
                  </span>
                  <Button  className="mt-1" icon={<MinusOutlined />} />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>

      <div className="cart-totals mt-auto ">
        <div className="subtotal  p-2">
          <div className="flex justify-between text-blue-400">
            <span>SUBTOTAL</span>
            <span> 1$</span>
          </div>
        </div>

        <div className="vat  border-t p-2">
          <div className="flex justify-between text-blue-400">
            <span>VAT</span>
            <span> +1$</span>
          </div>
        </div>

        <div className="total border-t border-b-2 border-b-black p-2">
          <div className="mt-4 flex justify-between text-green-600 text-2xl">
            <span>
              <strong>TOTAL</strong>
            </span>
            <span>
              <strong>1$</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <Button style={{borderRadius: '0'}} type="primary" size="large" danger>
            <strong> CLEAR CART </strong>
          </Button>
          <Button style={{borderRadius: '0'}} type="primary" size="large">
          <strong> CREATE ORDER </strong>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
