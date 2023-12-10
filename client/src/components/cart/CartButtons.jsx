import React, { useState } from "react";
import {
  Button,
  message,
  Modal,
  Form,
  Input,
  Image,
  Table,
  notification,
  Result,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux-toolkit/cart/cartSlice";
import axios from "axios";
import { fetchOrdersData } from '../../redux-toolkit/orders/ordersSlice';

const CartButtons = () => {
  const [IsCreateOrderModal, setIsCreateOrderModal] = useState(false);
  const [createOrderForm] = Form.useForm();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const createOrder = async (values) => {
    const data = {
      ...values,
      cartProducts: cart.cartProducts,
      subTotal: cart.subTotal,
      tax: ((cart.subTotal * cart.tax) / 100).toFixed(2),
      total: (cart.subTotal + (cart.subTotal * cart.tax) / 100).toFixed(2),
    };
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/api/orders/add", data);
      notification.open({
        message: (
          <Result
            status="success"
            title="Order created successfully!"
          />
        ),
        placement: "top",
        duration: 3,
      });
      dispatch(reset());
      dispatch(fetchOrdersData());
      createOrderForm.resetFields();
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const showCreateOrderModal = () => {
    setIsCreateOrderModal(true);
  };

  const handleCancel = () => {
    setIsCreateOrderModal(false);
  };

  const columns = [
    {
      title: <div className="text-center">NO</div>,
      dataIndex: "number",
      render: (_, record, index) => (
        <div className="flex flex-row justify-center items-center">
          {index + 1}
        </div>
      ),
    },
    {
      title: <div className="text-center">Image</div>,
      dataIndex: "image",
      render: (image) => (
        <div className="flex flex-row justify-center items-center">
          <Image
            className="object-cover "
            width={64}
            height={64}
            src={image}
            alt=""
          />
        </div>
      ),
    },
    {
      title: <div className="text-center">Name</div>,
      dataIndex: "name",
      render: (name) => (
        <div className="flex flex-row justify-center items-center">{name}</div>
      ),
    },

    {
      title: <div className="text-center">Quantity</div>,
      dataIndex: "quantity",
      render: (quantity) => (
        <div className="flex flex-row justify-center items-center">
          {quantity}
        </div>
      ),
    },

    {
      title: <div className="text-center">Price</div>,
      dataIndex: "price",
      render: (price) => (
        <div className="flex flex-row justify-center items-center">
          {price}$
        </div>
      ),
    },

    {
      title: <div className="text-center">Total</div>,
      dataIndex: "total",
      render: (_, product) => {
        const total = product.quantity * product.price;
        return (
          <div className="flex flex-row justify-center items-center">
            <strong>{total}$</strong>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col border-b pb-4 gap-4 mt-4">
      <div className="flex flex-row items-center justify-between gap-1">
        <Button
          className="w-full"
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
                    content: (
                      <span>
                        <strong>Cart cleared</strong>
                      </span>
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
        >
          <strong> CLEAR CART </strong>
        </Button>

        <Button
          className="w-full"
          disabled={cart.cartProducts.length === 0}
          style={{ borderRadius: "0" }}
          type="primary"
          size="large"
          onClick={showCreateOrderModal}
        >
          <strong>
            CONTINUE <ArrowRightOutlined />
          </strong>
        </Button>
      </div>
      <Modal
        style={{ top: 20 }}
        open={IsCreateOrderModal}
        onCancel={handleCancel}
        footer={false}
      >
        <h2>
          <strong>CREATE ORDER</strong>
        </h2>

        <Form
          className="mt-4 flex flex-col gap-4"
          layout="vertical"
          onFinish={createOrder}
          form={createOrderForm}
        >
          <Form.Item
            name="customerName"
            label="Customer Name"
            rules={[{ required: true, message: "Customer Name required" }]}
          >
            <Input style={{ borderRadius: "0" }} size="large" />
          </Form.Item>

          <Form.Item
            name="customerSurname"
            label="Customer Surname"
            rules={[{ required: true, message: "Customer Surname required" }]}
          >
            <Input style={{ borderRadius: "0" }} size="large" />
          </Form.Item>

          <Form.Item
            name="customerContact"
            label={
              <span>
                Customer Contact <strong>(Mail or Phone Number)</strong>
              </span>
            }
            rules={[{ required: true, message: "Customer Contact required" }]}
          >
            <Input style={{ borderRadius: "0" }} size="large" />
          </Form.Item>

          <div className="flex flex-col ">
            <Table
              columns={columns}
              dataSource={cart.cartProducts}
              rowKey="_id"
              size="middle"
              scroll={{ y: 270 }}
              pagination={false}
              className=""
            />
            <div className="flex flex-col mt-2">
              <div className="subtotal flex flex-row justify-between border-b">
                <span className="text-blue-400">SUBTOTAL</span>
                <span className="text-blue-400">{cart.subTotal}$</span>
              </div>

              <div className="tax flex flex-row justify-between border-b mt-2">
                <span className="text-blue-400">VAT {cart.tax}%</span>
                <span className="text-red-500">
                  +{((cart.subTotal * cart.tax) / 100).toFixed(2)}$
                </span>
              </div>

              <div className="tax flex flex-row justify-between border-b mt-5">
                <span className="text-green-600 font-bold text-xl">TOTAL</span>
                <span className="text-green-600 text-xl">
                  {(cart.subTotal + (cart.subTotal * cart.tax) / 100).toFixed(
                    2
                  )}
                  $
                </span>
              </div>
            </div>
          </div>

          <Form.Item className="flex justify-end mb-0">
            <Button
              style={{ borderRadius: "0" }}
              type="primary"
              htmlType="submit"
              size="large"
              disabled={cart.cartProducts.length === 0}
            >
              <strong>CREATE ORDER</strong>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CartButtons;
