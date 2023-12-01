import React, { useState } from "react";
import {
  InboxOutlined,
} from "@ant-design/icons";
import "./style.css";
import { useCategoriesData } from '../../contexts/CategoriesContext';
import { useProductsData } from '../../contexts/ProductsContext';
import axios from "axios";
import { Button, Input, Form, message, Modal, Select } from "antd";
import { Link } from "react-router-dom";
const Products = () => {
  const { getProducts } = useProductsData();
  const { categories } = useCategoriesData();
  const [productForm] = Form.useForm();
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const onFinishAddProduct = async (values) => {
    try {
      await axios.post("http://localhost:5000/api/products/add", values);
      message.success(
        <span>
          Product <strong>{values.name}</strong> added successfully
        </span>
      );
      getProducts();
      productForm.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  const showAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddProductModalOpen(false);
  };
  return (
    <li className=" menu-item-2 flex flex-col gap-2">
    <div className="flex flex-col items-center">
      <InboxOutlined />
      <span> PRODUCTS</span>
    </div>

    <div className="flex flex-col items-center gap-2">
      <span
        onClick={showAddProductModal}
        className="item-button bg-blue-600 p-2"
      >
        ADD
      </span>

      <Modal

        open={isAddProductModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <h2>
          <strong>ADD PRODUCT</strong>
        </h2>
        <Form
          className="mt-4 flex flex-col gap-4"
          layout="vertical"
          onFinish={onFinishAddProduct}
          form={productForm}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Product Name required" }]}
          >
            <Input style={{ borderRadius: "0" }} size="large" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Product Image"
            rules={[{ required: true, message: "Product Image required" }]}
          >
            <Input style={{ borderRadius: "0" }} size="large" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Product Price"
            rules={[{ required: true, message: "Product Price required" }]}
          >
            <Input style={{ borderRadius: "0" }} size="large" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Product Category"
            rules={[
              { required: true, message: "Product Category required" },
            ]}
          >
            <Select
              style={{ width: 150 }}
              placeholder="Select Category"
              options={categories.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
            />
          </Form.Item>

          <Form.Item className="flex justify-end mb-0">
            <Button
              style={{ borderRadius: "0" }}
              type="primary"
              htmlType="submit"
              size="large"
            >
              <strong> ADD </strong>
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Link className="item-button bg-orange-400 p-2 " to={"/products"}>
      <span > EDIT </span>
      </Link>

    </div>
  </li>
  )
}

export default Products