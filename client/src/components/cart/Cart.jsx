import { Card, Image, Badge } from "antd";

const Cart = () => {
  return (
    <div className="h-full flex flex-col m-4 md:m-0">
      <div className="text-center border border-b-0">
        <strong>CART</strong>
      </div>
      <Card className=" h-full rounded-none">
        <div>
          <ul className=" flex flex-col gap-4">
            <li className="border ">
              <div className="flex justify-between items-center  p-4 ">
                <div className="flex flex-col border p-2">
                  <Image
                    width={64}
                    height={64}
                    src="https://biosantarim.com/tema/genel/uploads/urunler/armut.png"
                    alt=""
                  />
                  <div className="flex flex-row gap-2 justify-center ">
                    <span >testww</span>
                    <span>20$</span>
                  </div>
                </div>
                <div className="justify-end">
                  <span className="text-4xl">
                    <strong>2</strong>
                  </span>
                  <span className="text-2xl">
                    <strong>X</strong>
                  </span>

                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>

      <div className="cart-totals mt-auto max-w-[300px] ">
        <div className="subtotal  p-2">
          <div className="flex justify-between text-blue-600">
            <span >SUBTOTAL</span>
            <span > 1$</span>
          </div>
        </div>

        <div className="vat  border-t p-2">
          <div className="flex justify-between text-blue-600">
            <span>VAT</span>
            <span> +1$</span>
          </div>
        </div>

        <div className="total border-t border-b p-2">
          <div className="mt-4 flex justify-between text-green-600 text-2xl">
            <span>
              {" "}
              <strong>TOTAL</strong>
            </span>
            <span>
              <strong>1$</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
