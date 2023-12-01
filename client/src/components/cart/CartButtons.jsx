import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux-toolkit/cart/cartSlice";

const CartButtons = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
  
  return (
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
  )
}

export default CartButtons