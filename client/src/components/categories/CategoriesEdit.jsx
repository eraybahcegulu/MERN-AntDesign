import React, { useState, useEffect } from "react";
import { Table, Button, Input, message, Form, Modal } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCategoriesData } from '../../contexts/CategoriesContext';

const CategoriesEdit = () => {
  const { categories , getCategories } = useCategoriesData();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ name: null });
  const [form] = Form.useForm();

  const deleteCategory = async (id, name) => {
    try {
      await axios.delete( process.env.REACT_APP_API_URL + `/api/categories/delete/${id}`);
      message.success(
        <span>
          Category <strong>{name}</strong> deleted
        </span>
      );
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (id) => {
    const name = await form.validateFields();
    try {
      await axios.put(
        process.env.REACT_APP_API_URL + `/api/categories/update/${id}`,
        name
      );
      message.success(<span>Category updated</span>);
      getCategories();
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  const modalOpen = (id, name) => {
    setSelectedCategory({ id, name });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        name: selectedCategory.name,
      });
    }
  }, [isModalOpen, selectedCategory.name, form]);

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
      render: (_id, selectedCategory) => (
        <div className="flex flex-row gap-2 justify-center">
          <Button
            onClick={() => modalOpen(_id, selectedCategory.name)}
            style={{ borderRadius: "0" }}
            type="dashed"
          >
            Edit
          </Button>

          <Button
            style={{ borderRadius: "0" }}
            onClick={() => deleteCategory(_id, selectedCategory.name)}
            danger
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="font-bold text-4xl mb-4">CATEGORIES</h1>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="_id"
        size="middle"
        scroll={{ y: 575 }}
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
          Back to Home
        </Button>
      </Link>

      <Modal
        open={isModalOpen}
        title={<span>Edit Category {selectedCategory.name} </span>}
        footer={false}
        onCancel={handleModalClose}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            name: selectedCategory.name,
            id: selectedCategory._id,
          }}
          onFinish={() => updateCategory(selectedCategory.id)}
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Category Name required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="flex justify-end mb-0">
            <Button
              style={{ borderRadius: "0" }}
              type="primary"
              htmlType="submit"
              size="large"
            >
              <strong> UPDATE </strong>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesEdit;
