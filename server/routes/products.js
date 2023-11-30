const Product = require("../models/product.js");
const express = require("express");
const router = express.Router();

router.get("/get-all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Product added successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id).exec();
    res.status(200).json("Product deleted successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  //const { image, name , category, price } = req.body;

  try {
    await Product.findByIdAndUpdate(id, req.body /* { image, name , category, price } */ );
    res.status(200).json("Category updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = router;