import React, { useState } from "react";
import axios from "axios";
import { useCategoriesData } from '../../contexts/CategoriesContext';
import {

  ApartmentOutlined,
} from "@ant-design/icons";
import "./style.css";

import { Button, Input, Form, message, Modal } from "antd";

import { Link } from "react-router-dom";

const Categories = () => {
  const {getCategories } = useCategoriesData();
  const [categoryForm] = Form.useForm();
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);


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

  const showAddCategoryModal = () => {
    setIsAddCategoryModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddCategoryModalOpen(false);
  };

  return (
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
  )
}

export default Categories