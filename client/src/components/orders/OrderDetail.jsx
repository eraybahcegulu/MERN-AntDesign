import { Table, Modal, Image } from "antd";

const columns = [
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
    title: <div className="text-center">Category</div>,
    dataIndex: "category",
    render: (category) => <div className="text-center">{category}</div>,
  },
  {
    title: <div className="text-center">Name</div>,
    dataIndex: "name",
    render: (name) => <div className="text-center">{name}</div>,
  },
  {
    title: <div className="text-center">Price</div>,
    dataIndex: "price",
    render: (price) => <div className="text-center">{price}$</div>,
  },
  {
    title: <div className="text-center">Quantity</div>,
    dataIndex: "quantity",
    render: (quantity) => <div className="text-center">{quantity}</div>,
  },

  {
    title: <div className="text-center">Total</div>,
    dataIndex: "total",
    render: (_, product) => <div className="text-center">{product.price * product.quantity}$</div>
  },
];

const OrderDetail = ({ isModalOpen, setIsModalOpen, selectedCustomer }) => {
  return (
    <Modal
      title={
        <strong className="text-center">
          <span> 
            Order Details - {selectedCustomer?.customerName} {selectedCustomer?.customerSurname}
          </span>
        </strong>
      }
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <div className="flex flex-col items-center p-10">
        <Table
          columns={columns}
          dataSource={selectedCustomer?.cartProducts}
          rowKey="_id"
          size="middle"
          scroll={{ y: 535 }}
          pagination={false}
          className=""
        />
      </div>
    </Modal>
  );
};

export default OrderDetail;
