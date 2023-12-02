import { useState } from "react";
import { Table, Button } from "antd";
import { useOrdersData } from "../../contexts/OrdersContext";
import { Link } from "react-router-dom";
import { FileSearchOutlined } from "@ant-design/icons";
import OrderDetail from "./OrderDetail";
const Orders = () => {
  const { orders } = useOrdersData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();

  const columns = [
    {
      title: <div className="text-center">Order ID</div>,
      dataIndex: "_id",
      render: (id) => <div className="text-center text-xs">{id}</div>,
    },
    {
      title: <div className="text-center">Order Date</div>,
      dataIndex: "createdAt",
      render: (date) => (
        <div className="text-center text-xs">{date.substring(0, 19)}</div>
      ),
    },
    {
      title: <div className="text-center">Customer Contact</div>,
      dataIndex: "customerContact",
      render: (contact) => <div className="text-center">{contact}</div>,
    },
    {
      title: <div className="text-center">Customer Name</div>,
      dataIndex: "customerName",
      render: (name) => <div className="text-center">{name}</div>,
    },
    {
      title: <div className="text-center">Customer Surname</div>,
      dataIndex: "customerSurname",
      render: (surname) => <div className="text-center">{surname}</div>,
    },
    {
      title: <div className="text-center">Order Subtotal</div>,
      dataIndex: "subTotal",
      render: (subtotal) => <div className="text-center">{subtotal}$</div>,
    },
    {
      title: <div className="text-center">Order Tax</div>,
      dataIndex: "tax",
      render: (tax) => <div className="text-center">{tax}$</div>,
    },
    {
      title: <div className="text-center">Order Total</div>,
      dataIndex: "total",
      render: (total) => <div className="text-center">{total}$</div>,
    },
    {
      title: <div className="text-center">Order Details</div>,
      dataIndex: "cartProducts",
      render: (_, selectedCustomer) => (
        <div className="text-center text-xl cur">
          <span
            className="cursor-pointer text-blue-500"
            onClick={() => {
              setIsModalOpen(true);
              setSelectedCustomer(selectedCustomer);
            }}
          >
            <FileSearchOutlined />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="w-[100vw] p-10">
        <h1 className="font-bold text-4xl mb-4">SALES</h1>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        size="small"
        scroll={{ y: 630, x: 800 }}
        pagination={false}
      />
      <Link to={"/"}>
        <Button
          size="large"
          className="mt-4 flex flex-row ml-auto"
          style={{ borderRadius: "0" }}
          type="primary"
        >
          Back to Home
        </Button>
      </Link>
      <OrderDetail isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedCustomer={selectedCustomer} />
    </div>
  );
};

export default Orders;
