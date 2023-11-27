import { Card, Image, Row, Col } from 'antd';

const Cart = () => {
  return (
    <div className="border-black border-2 h-full flex flex-col">
      <ul className="p-5 flex flex-col overflow-y-auto gap-4">
        <li className="border-2">
          <div className="flex justify-between items-center p-2 ">
            <div className="flex flex-col border-2">
            <Image
                width={64}
                height={64}
                src="https://biosantarim.com/tema/genel/uploads/urunler/armut.png"
                alt=""
              />
              <div className="flex flex-row gap-2 justify-center">
                <span>aqwdqdwdqw</span>
                <span>20$</span>
              </div>
            </div>
            <div>
              <span>2x</span>
            </div>
          </div>
        </li>

        <li className="border-2">
          <div className="flex justify-between items-center p-2 ">
            <div className="flex flex-col border-2">
            <Image
                width={64}
                height={64}
                src="https://biosantarim.com/tema/genel/uploads/urunler/armut.png"
                alt=""
              />
              <div className="flex flex-row gap-2 justify-center">
                <span>aqwdqdwdqw</span>
                <span>20$</span>
              </div>
            </div>
            <div>
              <span>2x</span>
            </div>
          </div>
        </li>

        
      </ul>

      <div className="cart-totals mt-auto">
        <div className="subtotal  border-t p-2">
          <div className="flex justify-between">
            <span>SUBTOTAL</span>
            <span> 1 $</span>
          </div>
        </div>

        <div className="vat  border-t p-2">
          <div className="flex justify-between">
            <span>VAT</span>
            <span> 1 $</span>
          </div>
        </div>

        <div className="total border-t p-2">
          <div className="mt-4 flex justify-between ">
            <span>TOTAL</span>
            <span> 1 $ </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
