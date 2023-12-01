import React, { useState } from "react";
import { Image, Button, message, Modal } from "antd";
import { MinusOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  removeProduct,
  increase,
  decrease,
} from "../../redux-toolkit/cart/cartSlice";
const CartProducts = ( {cartProduct} ) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <li key={cartProduct._id} className="border-b hover:shadow-md">
      <CloseOutlined
        className="absolute right-7 mt-1 cursor-pointer hover:text-red-500"
        onClick={() => {
          if (!isModalOpen) {
            setModalOpen(true);
            Modal.confirm({
              content: (
                <span>
                  Are you sure you want to remove <strong>{cartProduct.name}
                  </strong> from the cart? </span>
              ),

              onOk() {
                dispatch(removeProduct(cartProduct));
                setModalOpen(false);
                message.success({
                  content: (
                    <span>
                      <strong>{cartProduct.name}</strong> removed from cart </span>
                  ),
                  duration: 2,
                  style: { marginRight: "80%" },
                });
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
                    content: (
                      <span>
                        Are you sure you want to remove last <strong>{cartProduct.name}</strong> from the cart?
                      </span>
                    ),
                    onOk() {
                      dispatch(removeProduct(cartProduct));
                      setModalOpen(false);
                      message.success({
                        content: (
                          <span>
                            <strong>{cartProduct.name}</strong> removed from cart </span>
                        ),
                        duration: 2,
                        style: { marginRight: "80%" },
                      });
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
  );
};

export default CartProducts;
