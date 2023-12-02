const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const orderRoute = require("./routes/orders.js");

const PORT = process.env.PORT || 5000;

const db = require('./database/db.js')
db.connect();

/*
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

*/

app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});