import React, { useState } from "react";
import axios from "axios";
import { useCategoriesData } from '../../contexts/CategoriesContext';
import { useProductsData } from '../../contexts/ProductsContext';

import {
  HomeOutlined,
  InboxOutlined,
  LogoutOutlined,
  DollarOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import "./style.css";

import { Button, Input, Form, message, Modal, Select } from "antd";

import { Link } from "react-router-dom";

const Menu = () => {
  const { getProducts } = useProductsData();
  const { categories, getCategories } = useCategoriesData();

  const [categoryForm] = Form.useForm();
  const [productForm] = Form.useForm();
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const onFinishAddCategory = async (values) => {
    try {
      await axios.post("http://localhost:5000/api/categories/add", values);
      message.success(
        <span>
          Category <strong>{values.name.toUpperCase()}</strong> added
          successfully
        </span>
      );
      categoryForm.resetFields();
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

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

  const showAddCategoryModal = () => {
    setIsAddCategoryModalOpen(true);
  };

  const showAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddCategoryModalOpen(false);
    setIsAddProductModalOpen(false);
  };
  return (
    <ul className="flex md:flex-col gap-4 text-lg p-4">
      <Link to={"/"}>
      <li className=" menu-item">
        <HomeOutlined />
        <span> HOME</span>
      </li>
      </Link>

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

      <li className=" menu-item-2 flex flex-col gap-2">
        <div className="flex flex-col items-center ">
          <ApartmentOutlined />
          <span className="max-w-[120px]"> CATEGORIES</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span
            onClick={showAddCategoryModal}
            className="item-button bg-blue-600 p-2"
          >
            ADD
          </span>

          <Modal
            open={isAddCategoryModalOpen}
            onCancel={handleCancel}
            footer={false}
          >
            <h2>
              <strong>ADD CATEGORY</strong>
            </h2>
            <Form
              className="mt-4 flex flex-col gap-4"
              layout="vertical"
              onFinish={onFinishAddCategory}
              form={categoryForm}
            >
              <Form.Item
                name="name"
                label="Category Name"
                rules={[{ required: true, message: "Category Name required" }]}
              >
                <Input style={{ borderRadius: "0" }} size="large" />
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

          <Link className="item-button bg-orange-400 p-2 " to={"/categories"}>
          <span > EDIT </span>
          </Link>
        </div>
      </li>

      <li className="menu-item">
        <DollarOutlined />
        <span> SALES </span>
      </li>

      <li className="menu-item">
        <LogoutOutlined />
        <span> LOGOUT</span>
      </li>
    </ul>
  );
};

export default Menu;
