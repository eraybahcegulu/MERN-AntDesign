import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  message,
  Form,
  Modal,
  Select,
  Image,
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useProductsData } from "../../contexts/ProductsContext";
import { useCategoriesData } from "../../contexts/CategoriesContext";

import { useDispatch } from "react-redux";
import { reset } from "../../redux-toolkit/cart/cartSlice";

const ProductsEdit = () => {
  const { products, getProducts } = useProductsData();
  const { categories } = useCategoriesData();

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ name: null });
  const [form] = Form.useForm();

  const deleteProduct = async (id, name) => {
    try {
      await axios.delete(
        process.env.REACT_APP_API_URL + `/api/products/delete/${id}`
      );
      message.success(
        <span>
          Product <strong>{name}</strong> deleted
        </span>
      );
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const updateProduct = async (id) => {
    const productInfos = await form.validateFields();
    try {
      await axios.put(
        process.env.REACT_APP_API_URL + `/api/products/update/${id}`,
        productInfos
      );
      message.success(<span>Product updated</span>);
      getProducts();
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  const modalOpen = (id, image, name, category, price) => {
    setSelectedProduct({ id, image, name, category, price });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        name: selectedProduct.name,
        image: selectedProduct.image,
        price: selectedProduct.price,
        category: selectedProduct.category,
      });
    }
  }, [isModalOpen, selectedProduct.name, form, selectedProduct.image, selectedProduct.price, selectedProduct.category]);

  const columns = [
    {
      title: <div className="text-center">Image</div>,
      dataIndex: "image",
      render: (image) => (
        <div className="text-center flex flex-col justify-center items-center">
          <Image
            className="object-cover "
            width={95}
            height={95}
            src={image}
            alt=""
          />
        </div>
      ),
    },
    {
      title: <div className="text-center">Name</div>,
      dataIndex: "name",
      render: (name) => <div className="text-center">{name}</div>,
    },
    {
      title: <div className="text-center">Category</div>,
      dataIndex: "category",
      render: (category) => <div className="text-center">{category}</div>,
    },
    {
      title: <div className="text-center">Price</div>,
      dataIndex: "price",
      render: (price) => <div className="text-center">{price}$</div>,
    },

    {
      title: <div style={{ textAlign: "center" }}>Actions</div>,
      dataIndex: "_id",
      key: "action",
      render: (_id, selectedProduct) => (
        <div className="flex flex-row gap-2 justify-center">
          <Button
            onClick={() =>
              modalOpen(
                _id,
                selectedProduct.image,
                selectedProduct.name,
                selectedProduct.category,
                selectedProduct.price
              )
            }
            style={{ borderRadius: "0" }}
            type="dashed"
          >
            Edit
          </Button>

          <Button
            style={{ borderRadius: "0" }}
            danger
            onClick={() => deleteProduct(_id, selectedProduct.name)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="font-bold text-4xl mb-4">PRODUCTS</h1>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="_id"
        size="middle"
        scroll={{ y: 600 }}
        pagination={false}
        className="max-w-[900px]"
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
        title={<span>Edit Product {selectedProduct.name} </span>}
        footer={false}
        onCancel={handleModalClose}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            id: selectedProduct._id,
            image: selectedProduct.image,
            name: selectedProduct.name,
            category: selectedProduct.category,
            price: selectedProduct.price,
          }}
          onFinish={() => updateProduct(selectedProduct.id)}
        >
          <Form.Item
            label="Product Image"
            name="image"
            rules={[{ required: true, message: "Product Image required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Product Name required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Product Category"
            rules={[{ required: true, message: "Product Category required" }]}
          >
            <Select
              style={{ width: 150 }}
              options={categories.map((category) => ({
                value: category.name,
                label: category.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Product Price"
            name="price"
            rules={[{ required: true, message: "Product Price required" }]}
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

export default ProductsEdit;
