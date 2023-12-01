import React, { useState } from 'react';
import { Card, Image, Button, message, Empty, Modal } from "antd";
import { MinusOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, increase, decrease, reset } from "../../redux-toolkit/cart/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

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
                <li key={cartProduct._id} className="border-b hover:shadow-md">
                    <CloseOutlined
                      className="absolute right-7 mt-1 cursor-pointer hover:text-red-500"
                      onClick={() => {
                        if (!isModalOpen) {
                        setModalOpen(true);
                        Modal.confirm({
                          content: <span>Are you sure you want to remove <strong>{cartProduct.name}</strong> from the cart? </span>,
                          
                          onOk() {
                            dispatch(removeProduct(cartProduct));
                            setModalOpen(false);
                            message.success({
                              content: <span><strong>{cartProduct.name}</strong> removed from cart </span> , 
                              duration:2,
                              style: {  marginRight: '80%' }});
                          },
                          onCancel() {
                            setModalOpen(false);
                          },
                        });

                      }
                      }}
                    />

                  <div className="flex justify-between items-center p-4 mt-2 ">
                    <div className="flex flex-col">
                      <Image
                        className="object-cover"
                        width={80}
                        height={80}
                        src={cartProduct.image}
                        alt=""
                      />
                      <div className="flex flex-col ">
                        <span className="max-w-[150px] text-xl">
                          <strong>{cartProduct.name}</strong>
                        </span>
                        <span className="max-w-[150px]">
                          <strong className="text-xl">{cartProduct.price}$</strong>
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center w-6 ml-auto">
                      <Button
                        className="flex flex-row items-center justify-center"
                        onClick={() => dispatch(increase(cartProduct))}
                        icon={<PlusOutlined />}
                      />
                      <span className="text-4xl mt-1">
                        <strong>{cartProduct.quantity}</strong>
                      </span>
                      <Button
                        className="flex flex-row items-center justify-center"
                        onClick={() => {
                          if (cartProduct.quantity === 1) {
                            if (!isModalOpen) {
                            setModalOpen(true);
                            Modal.confirm({
                              content: <span>Are you sure you want to remove last <strong>{cartProduct.name}</strong> from the cart? </span>,
                              onOk() {
                                dispatch(removeProduct(cartProduct));
                                setModalOpen(false);
                                message.success({
                                  content: <span><strong>{cartProduct.name}</strong> removed from cart </span> , 
                                  duration:2,
                                  style: {  marginRight: '80%' }});
                              },
                              onCancel() {
                                setModalOpen(false);
                              },
                            });
                          }
                          }
                          if (cartProduct.quantity > 1) {
                            dispatch(decrease(cartProduct));
                          }
                        }}
                        icon={<MinusOutlined />}
                      />
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </ul>
        </div>
      </Card>

      <div className="cart-totals mt-auto ">
        <div className="subtotal  p-2">
          <div className="flex justify-between text-blue-400">
            <span>SUBTOTAL</span>
            <span>{cart.subTotal > 0 ? cart.subTotal.toFixed(2) : 0}$</span>
          </div>
        </div>

        <div className="vat border-t p-2">
          <div className="flex justify-between text-blue-400">
            <span>VAT {cart.tax}%</span>
            <span className="text-red-700">
              {(cart.subTotal * cart.tax) / 100 > 0
                ? `+${((cart.subTotal * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
        </div>

        <div className="total border-t border-b-2 border-b-black p-2">
          <div className="mt-4 flex justify-between text-green-600 text-2xl">
            <span>
              <strong>TOTAL</strong>
            </span>
            <span className="text-xl">
              {cart.subTotal + (cart.subTotal * cart.tax) / 100 > 0
                ? (cart.subTotal + (cart.subTotal * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
        </div>

        <div className="flex flex-col border-b pb-4 gap-4 mt-4">
          <Button
            disabled={cart.cartProducts.length === 0}
            style={{ borderRadius: "0" }}
            type="primary"
            size="large"
          >
            <strong> CREATE ORDER </strong>
          </Button>
          <Button
            style={{ borderRadius: "0" }}
            type="primary"
            size="large"
            danger
            disabled={cart.cartProducts.length === 0}
            onClick={() => {
              if (!isModalOpen) {
                setModalOpen(true);
              Modal.confirm({
                content: <span>Are you sure you want to clear cart? </span>,
                onOk() {
                  dispatch(reset());
                  setModalOpen(false);
                  message.success({
                    content: <span><strong>Cart cleared</strong></span> , 
                    duration:2,
                    style: {  marginRight: '80%' }});
                },
                onCancel() {
                  setModalOpen(false);
                },
              });
            }
            }}
          >
            <strong> CLEAR CART </strong>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
