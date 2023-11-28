import { Table, Button, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoriesEdit = ({ categories, categoryDeleted }) => {
  const columns = [
    {
      title: <div className="text-center">Name</div>,
      dataIndex: "name",
      render: (name) => <div className="text-center">{name}</div>,
    },
    {
      title: <div style={{ textAlign: "center" }}>Actions</div>,
      dataIndex: "_id",
      key: "action",
      render: (_id, record) => (
        <div className="flex flex-row gap-2 justify-center">
          <Button style={{ borderRadius: "0" }} type="dashed">
            Edit
          </Button>
          <Button
            style={{ borderRadius: "0" }}
            onClick={() => deleteCategory(_id, record.name)}
            danger
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const deleteCategory = async (id, name) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
      message.success(
        <span>
          Category <strong>{name}</strong> deleted
        </span>
      );
      categoryDeleted();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="_id"
        size="middle"
        scroll={{ y: 600 }}
        pagination={false}
        className="max-w-[500px]"
      />

      <Link to={"/"}>
        <Button
          size="large"
          className="mt-4 flex flex-row ml-auto"
          style={{ borderRadius: "0" }}
          type="primary"
        >
          {" "}
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default CategoriesEdit;
