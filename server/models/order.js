const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    customerName: String,
    customerSurname: String,
    customerContact: String,
    cartProducts: Array,
    subTotal: Number, 
    tax: Number,
    total: Number,
  },
);

module.exports = mongoose.model('Order', OrderSchema);