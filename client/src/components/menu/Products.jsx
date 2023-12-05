import React, { useState } from "react";
import {
  InboxOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./style.css";
import { useCategoriesData } from '../../contexts/CategoriesContext';
import { useProductsData } from '../../contexts/ProductsContext';
import axios from "axios";
import { Button, Input, Form, message, Modal, Select, Popover } from "antd";
import { Link } from "react-router-dom";

const Products = ({ setSearch, selectedCategory }) => {

  const { getProducts } = useProductsData();
  const { categories } = useCategoriesData();
  const [productForm] = Form.useForm();
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const onFinishAddProduct = async (values) => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/api/products/add", values);
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

  return (
    <li className=" menu-item-2 flex flex-col gap-2">
      <div className="flex flex-col items-center">
        <InboxOutlined />
        <span className="max-w-[120px]"> PRODUCTS</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span
          onClick={() => setIsAddProductModalOpen(true)}

          className="item-button bg-blue-600 p-2"
        >
          ADD
        </span>

        <Modal

          open={isAddProductModalOpen}
          onCancel={() => setIsAddProductModalOpen(false)}
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

        <div className="p-2 mb-auto max-w-xs mt-2">
          <Popover placement="right"
            content={
              <>

                {
                  selectedCategory === undefined
                    ?
                    <span >Category <strong>ALL PRODUCTS</strong> selected</span>
                    :
                    <span >Category <strong>{selectedCategory.toUpperCase()}</strong> selected</span>
                }

                <div className="flex flex-row gap-2">
                  <Input size='large' placeholder="Search"
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                  />
                </div>

              </>
            }>

              <span className="text-3xl"> < SearchOutlined /></span>
           
          </Popover>
        </div>


        {/*<Modal
          onCancel={() => setIsSearchProductModalOpen(false)}
          open={isSearchProductModalOpen}
          centered
          footer={false}>
          <div className="flex flex-col text-center p-5">
            <div>
              <span> Total Products: {products.length}</span>
            </div>
            <div>
              <Input size='large' placeholder="Search" />
            </div>
          </div>
        </Modal>
          */}

      </div>
    </li>
  )
}

export default Products