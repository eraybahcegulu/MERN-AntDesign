const Order = require("../models/order.js");
const express = require("express");
const router = express.Router();

router.get("/get-all", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(200).json("Order added successfully.");
    } catch (error) {
      res.status(500).json(error);
    }
  });

  module.exports = router;