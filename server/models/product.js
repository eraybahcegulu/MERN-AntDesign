const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: String,
    image: String,
    price: Number,
    category:String,
  },
);

module.exports = mongoose.model('Product', ProductSchema);